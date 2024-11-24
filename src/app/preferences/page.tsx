"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormData {
  roleValue?: string;
  interestField?: string;
  location?: string;
  companySize?: string;
  skills?: string[];
  careerImportance?: string;
  educationLevel?: string;
  workEnvironment?: string;
  careerGrowthImportance?: string;
  workStyle?: string;
  motivation?: string;
}

export default function PreferencesPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    roleValue: "",
    interestField: "",
    location: "",
    companySize: "",
    skills: [],
    careerImportance: "",
    educationLevel: "",
    workEnvironment: "",
    careerGrowthImportance: "",
    workStyle: "",
    motivation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      skills: checked ? [...(prev.skills || []), value] : prev.skills?.filter((skill) => skill !== value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate saving preferences (e.g., via API call)
    console.log("Saved Preferences:", formData);
    router.push("/"); // Redirect to default calculator page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-100 to-white p-8">
      <h1 className="text-4xl font-bold mb-6">Set Your Preferences</h1>
      <form className="max-w-lg w-full space-y-6" onSubmit={handleSubmit}>
        {/* Role Value */}
        <div>
          <label className="block text-lg font-medium mb-2">What do you value most in a role?</label>
          <select
            name="roleValue"
            className="w-full p-3 border rounded-lg"
            value={formData.roleValue || ""}
            onChange={handleChange}
          >
            <option value="">Select a value</option>
            <option value="Impact">Impact</option>
            <option value="Recognition">Recognition</option>
            <option value="Reward">Reward</option>
            <option value="Work-Life Balance">Work-Life Balance</option>
          </select>
        </div>

        {/* Interest Field */}
        <div>
          <label className="block text-lg font-medium mb-2">What fields interest you the most?</label>
          <select
            name="interestField"
            className="w-full p-3 border rounded-lg"
            value={formData.interestField || ""}
            onChange={handleChange}
          >
            <option value="">Select a field</option>
            <option value="AI/ML">Artificial Intelligence/Machine Learning (AI/ML)</option>
            <option value="SWE">Software Engineering (SWE)</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-lg font-medium mb-2">Where would you like to work in the future?</label>
          <select
            name="location"
            className="w-full p-3 border rounded-lg"
            value={formData.location || ""}
            onChange={handleChange}
          >
            <option value="">Select a location</option>
            <option value="US">United States</option>
            <option value="Canada">Canada</option>
          </select>
        </div>

        {/* Company Size */}
        <div>
          <label className="block text-lg font-medium mb-2">What size of company appeals to you the most?</label>
          <select
            name="companySize"
            className="w-full p-3 border rounded-lg"
            value={formData.companySize || ""}
            onChange={handleChange}
          >
            <option value="">Select a size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-lg font-medium mb-2">What are your current skills or skills you want to learn?</label>
          <div className="space-y-2">
            {["Coding", "Logical Thinking", "Problem Solving", "Communication", "Self-Expression", "Management"].map(
              (skill) => (
                <div key={skill}>
                  <label>
                    <input
                      type="checkbox"
                      value={skill}
                      checked={formData.skills?.includes(skill) || false}
                      onChange={handleSkillsChange}
                      className="mr-2"
                    />
                    {skill}
                  </label>
                </div>
              )
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Save Preferences & Go to Calculator
          </button>
        </div>
      </form>
    </div>
  );
}
