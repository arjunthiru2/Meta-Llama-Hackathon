"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { savePreferences, loadPreferences } from "../helpers/preferencesStorage";

interface FormData {
  roleValue: string;
  interestField: string;
  location: string;
  companySize: string;
  skills: string[];
  careerImportance: string;
  educationLevel: string;
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
  });

  useEffect(() => {
    // Load saved preferences on page load
    const savedPreferences = loadPreferences();
    if (savedPreferences) {
      setFormData(savedPreferences);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      skills: checked ? [...prev.skills, value] : prev.skills.filter((skill) => skill !== value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    savePreferences(formData); // Save preferences to localStorage
    router.push("/"); // Redirect to the Calculator page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-100 to-white p-8">
      <h1 className="text-4xl font-bold mb-6">Set Your Preferences</h1>
      <form className="max-w-lg w-full space-y-6" onSubmit={handleSubmit}>
        {/* Form Fields */}
        {/* ... Include all fields as implemented before ... */}

        <div>
          <button type="submit" className="w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}