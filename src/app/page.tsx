"use client";

import { useState, useEffect } from "react";
import { loadPreferences } from "./helpers/preferencesStorage";
import coursesData from "./data/options.json";

interface CourseOption {
  code: string[];
  name: string;
}

export default function CalculatorPage() {
  const [userPreferences, setUserPreferences] = useState<Record<string, any> | null>(null);
  const [suggestedCourses, setSuggestedCourses] = useState<CourseOption[]>([]);

  useEffect(() => {
    const preferences = loadPreferences();
    setUserPreferences(preferences);
    if (preferences) {
      const recommendations = generateRecommendations(preferences);
      setSuggestedCourses(recommendations);
    }
  }, []);

  const generateRecommendations = (preferences: Record<string, any>): CourseOption[] => {
    return coursesData.filter((course) => {
      const courseName = course.name.toLowerCase();
      return (
        (preferences.interestField &&
          courseName.includes(preferences.interestField.toLowerCase())) ||
        (preferences.skills &&
          preferences.skills.some((skill: string) => courseName.includes(skill.toLowerCase())))
      );
    });
  };

  return (
    <div className="flex">
      {/* Recommendations */}
      <aside className="w-1/4 bg-gray-100 p-4">
        <h2>Recommended Courses</h2>
        <ul>
          {suggestedCourses.map((course, index) => (
            <li key={index}>
              {course.code.join(", ")} - {course.name}
            </li>
          ))}
        </ul>
      </aside>

      {/* Calculator Content */}
      <div className="flex-1 p-8">
        <h1>Calculator Page</h1>
        {/* ... */}
      </div>
    </div>
  );
}