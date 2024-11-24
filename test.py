from transformers import AutoTokenizer, AutoModelForSequenceClassification, Trainer, TrainingArguments
from datasets import Dataset
import pandas as pd
import torch
import json

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
        predictions = torch.sigmoid(outputs.logits)  # Use sigmoid for multi-label classification
        predicted_labels = [idx for idx, prob in enumerate(predictions[0]) if prob > 0.5]  # Threshold for label prediction
    return [decode_label(idx) for idx in predicted_labels]

# Example prediction
personality_input = "Recognition, Reward"
predicted_skills = predict_personality_course(personality_input, tokenizer, model)
print(f"Predicted Skills: {predicted_skills}")
