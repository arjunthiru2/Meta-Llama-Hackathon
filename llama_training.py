from transformers import AutoTokenizer, AutoModelForSequenceClassification, Trainer, TrainingArguments, AutoModelForCausalLM
from datasets import load_dataset, Dataset
import pandas as pd
import torch
import json


# Paths to datasets
course_dataset_path = "./course_dataset.csv"
preference_skill_dataset = "./preference_skill_dataset.csv"

# 1. Load and Prepare Dataset
def prepare_dataset(csv_path):
    df = pd.read_csv(csv_path)
    df = df.rename(columns={"Preferences": "input_text", "Skills": "labels"})
    df["labels"] = df["labels"].astype("category")  # Convert to category type
    categories = df["labels"].cat.categories  # Get the mapping of integers to labels
    label_to_text = dict(enumerate(categories))  # Integer to label
    text_to_label = {v: k for k, v in label_to_text.items()}  # Label to integer

    with open("label_to_text.json", "w") as f:
        json.dump(label_to_text, f)

    with open("text_to_label.json", "w") as f:
        json.dump(text_to_label, f)



    df = pd.read_csv(csv_path)
    # Ensure the dataset has columns: "Preferences" (input) and "Skills" (output)
    df = df.rename(columns={"Preferences": "input_text", "Skills": "labels"})
    df["labels"] = df["labels"].astype("category").cat.codes  # Convert labels to integers
    
    

    return Dataset.from_pandas(df)

# 2. Tokenization Function
def tokenize_function(examples, tokenizer):
    return tokenizer(examples["input_text"], truncation=True, padding="max_length", max_length=128)

# 3. Load Pretrained Model and Tokenizer
# Load model directly
tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-3.2-1B")
tokenizer.pad_token = tokenizer.eos_token
model_name = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3.2-1B")
num_labels = 355  # Replace with the actual number of unique labels in your dataset
model = AutoModelForSequenceClassification.from_pretrained("meta-llama/Llama-3.2-1B", num_labels=num_labels)

# 4. Load and Tokenize Dataset
dataset = prepare_dataset(preference_skill_dataset)
tokenized_dataset = dataset.map(lambda x: tokenize_function(x, tokenizer), batched=True)
tokenized_dataset = tokenized_dataset.shuffle(seed=42)

# Split dataset into training and validation
train_test_split = tokenized_dataset.train_test_split(test_size=0.2)
train_dataset = train_test_split["train"]
val_dataset = train_test_split["test"]

# 5. Training Arguments
training_args = TrainingArguments(
    output_dir="./results",          # Output directory
    evaluation_strategy="epoch",    # Evaluate every epoch
    learning_rate=2e-5,             # Learning rate
    per_device_train_batch_size=1, # Batch size for training
    per_device_eval_batch_size=1,  # Batch size for evaluation
    num_train_epochs=10,             # Number of epochs
    weight_decay=0.01,              # Weight decay
    save_total_limit=2,             # Save only last 2 checkpoints
    logging_dir="./logs",           # Log directory
)

# 6. Define Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=val_dataset,
    tokenizer=tokenizer,
)

# 7. Train the Model
trainer.train()

# 8. Save the Fine-Tuned Model
trainer.save_model("./preference_to_skills_fine_tuned_llama_model")
tokenizer.save_pretrained("./preference_to_skills_fine_tuned_llama_tokenizer")


tokenizer = AutoTokenizer.from_pretrained("./preference_to_skills_fine_tuned_llama_model")
model = AutoModelForSequenceClassification.from_pretrained("./preference_to_skills_fine_tuned_llama_model")

with open("label_to_text.json", "r") as f:
    label_to_text = json.load(f)

# Function to decode predictions
def decode_label(label_int):
    return label_to_text[str(label_int)]  # Convert int to string to match JSON keys

# 9. Test the Model
def predict_personality_course(personality, tokenizer, model):
    inputs = tokenizer(personality, return_tensors="pt", truncation=True, padding="max_length", max_length=128)
    model.eval()  # Put the model in evaluation mode
    with torch.no_grad():
        outputs = model(**inputs)
        predictions = torch.nn.functional.softmax(outputs.logits, dim=-1)
        predicted_label = torch.argmax(predictions, dim=1)
    return predicted_label.item()

# Example prediction
personality_input = "Reward, Mathematics"
print(f"Predicted Skill Label: {decode_label(predict_personality_course(personality_input, tokenizer, model))}")
