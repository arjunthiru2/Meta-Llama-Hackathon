"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormData {
  roleValue?: string;
  interestField?: string;
  location?: string;
  companySize?: string;
  skills: string[];
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
    console.log("Saved Preferences:", formData);
    router.push("/"); // Redirect to default calculator page
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-b from-blue-100 to-white p-8">
      {/* Page Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-6xl font-bold text-gradient">Set Your Preferences</h1>
      </header>

      {/* Preferences Form */}
      <form
        className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg space-y-6"
        onSubmit={handleSubmit}
      >
        {/* Role Value */}
        <div>
          <label className="block text-lg font-semibold mb-2">What do you value most in a role?</label>
          <select
            name="roleValue"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={formData.roleValue}
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
          <label className="block text-lg font-semibold mb-2">What fields interest you the most?</label>
          <select
            name="interestField"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={formData.interestField}
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
          <label className="block text-lg font-semibold mb-2">Where would you like to work in the future?</label>
          <select
            name="location"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={formData.location}
            onChange={handleChange}
          >
            <option value="">Select a location</option>
            <option value="US">United States</option>
            <option value="Canada">Canada</option>
          </select>
        </div>

        {/* Company Size */}
        <div>
          <label className="block text-lg font-semibold mb-2">What size of company appeals to you the most?</label>
          <select
            name="companySize"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={formData.companySize}
            onChange={handleChange}
          >
            <option value="">Select a size</option>
            <option value="Small">Small: Flexible, informal, hands-on roles</option>
            <option value="Medium">Medium: More organized, room for growth</option>
            <option value="Large">Large: Established processes, more resources</option>
          </select>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-lg font-semibold mb-2">What are your current skills or skills you want to learn?</label>
          <div className="space-y-2">
            {["Coding", "Logical Thinking", "Problem Solving", "Communication", "Self-Expression", "Management"].map((skill) => (
              <div key={skill}>
                <label>
                  <input
                    type="checkbox"
                    value={skill}
                    checked={formData.skills.includes(skill)}
                    onChange={handleSkillsChange}
                    className="mr-2"
                  />
                  {skill}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Career Importance */}
        <div>
          <label className="block text-lg font-semibold mb-2">How important is a lucrative career to you?</label>
          <select
            name="careerImportance"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={formData.careerImportance}
            onChange={handleChange}
          >
            <option value="">Select an option</option>
            <option value="Very important">Very important</option>
            <option value="Important">Important</option>
            <option value="Somewhat important">Somewhat important</option>
            <option value="Not important">Not important</option>
          </select>
        </div>

        {/* Education Level */}
        <div>
          <label className="block text-lg font-semibold mb-2">What stage are you at in your education?</label>
          <select
            name="educationLevel"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={formData.educationLevel}
            onChange={handleChange}
          >
            <option value="">Select your level</option>
            <option value="Elementary">Elementary</option>
            <option value="High School">High School</option>
            <option value="Undergraduate">Undergraduate (1st Year)</option>
            <option value="Master’s">Master’s (1st Year)</option>
          </select>
        </div>

        {/* Work Environment */}
        <div>
          <label className="block text-lg font-semibold mb-2">What type of work environment do you prefer?</label>
          <select
            name="workEnvironment"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={formData.workEnvironment}
            onChange={handleChange}
          >
            <option value="">Select an option</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-Site">On-Site</option>
          </select>
        </div>

        {/* Career Growth Importance */}
        <div>
          <label className="block text-lg font-semibold mb-2">How important is career growth to you?</label>
          <select
            name="careerGrowthImportance"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={formData.careerGrowthImportance}
            onChange={handleChange}
          >
            <option value="">Select an option</option>
            <option value="Very important">Very important</option>
            <option value="Important">Important</option>
            <option value="Somewhat important">Somewhat important</option>
            <option value="Not important">Not important</option>
          </select>
        </div>

        {/* Work Style */}
        <div>
          <label className="block text-lg font-semibold mb-2">Do you prefer working independently or as part of a team?</label>
          <select
            name="workStyle"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={formData.workStyle}
            onChange={handleChange}
          >
            <option value="">Select an option</option>
            <option value="Independently">Independently</option>
            <option value="In a team">In a team</option>
            <option value="A mix of both">A mix of both</option>
          </select>
        </div>

        {/* Motivation */}
        <div>
          <label className="block text-lg font-semibold mb-2">What motivates you to excel at work?</label>
          <select
            name="motivation"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={formData.motivation}
            onChange={handleChange}
          >
            <option value="">Select an option</option>
            <option value="Challenges">Challenges</option>
            <option value="Achieving goals">Achieving goals</option>
            <option value="Recognition">Recognition</option>
            <option value="Financial rewards">Financial rewards</option>
            <option value="Collaboration">Collaboration</option>
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3 text-white font-bold bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}