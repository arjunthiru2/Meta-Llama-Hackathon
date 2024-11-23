"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Import course data
import coursesData from "../data/options.json";

interface CourseOption {
  code: string[];
  name: string;
}

export default function CalculatorPage() {
  const searchParams = useSearchParams(); // Get query parameters
  const [userPreferences, setUserPreferences] = useState<Record<string, string | string[]>>({});
  const [selectedCourses, setSelectedCourses] = useState<(CourseOption | null)[]>(Array(6).fill(null));
  const [suggestedCourses, setSuggestedCourses] = useState<CourseOption[]>([]);

  useEffect(() => {
    // Parse query parameters into user preferences
    const parsedPreferences = Object.fromEntries(
      Array.from(searchParams.entries()).map(([key, value]) => [
        key,
        value.includes(",") ? value.split(",") : value, // Split comma-separated values into arrays
      ])
    );
    setUserPreferences(parsedPreferences);

    // Generate course suggestions based on preferences
    const recommendations = generateSuggestions(parsedPreferences);
    setSuggestedCourses(recommendations);
  }, [searchParams]);

  const generateSuggestions = (preferences: Record<string, string | string[]>): CourseOption[] => {
    // Basic logic to suggest courses based on preferences
    return coursesData.filter((course) => {
      const courseName = course.name.toLowerCase();
      const courseCodes = course.code.map((c) => c.toLowerCase());

      // Match preferences to course name or code
      return (
        (preferences.interestField &&
          courseName.includes((preferences.interestField as string).toLowerCase())) ||
        (preferences.skills &&
          Array.isArray(preferences.skills) &&
          preferences.skills.some((skill) => courseName.includes(skill.toLowerCase())))
      );
    });
  };

  const handleCourseChange = (index: number, courseCode: string) => {
    const selectedCourse = coursesData.find((course) =>
      course.code.includes(courseCode)
    ) || null;
    const updatedCourses = [...selectedCourses];
    updatedCourses[index] = selectedCourse;
    setSelectedCourses(updatedCourses);
  };

  const handleCalculate = () => {
    alert(`Calculation complete for courses: ${selectedCourses
      .map((course) => course?.name)
      .join(", ")}`);
  };

  const allCoursesSelected = selectedCourses.every((course) => course);

  return (
    <div className="flex flex-row min-h-screen bg-gradient-to-b from-blue-100 to-white p-8">
      {/* Suggestions Box */}
      <aside className="w-1/4 bg-gray-100 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Recommended Courses</h2>
        {suggestedCourses.length > 0 ? (
          <ul className="space-y-2">
            {suggestedCourses.map((course, index) => (
              <li key={index} className="text-sm">
                {course.code.join(", ")} - {course.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No recommendations available.</p>
        )}
      </aside>

      {/* Calculator Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient">
          
           Ideal Major Calculator
          </h1>
        </header>

        <div className="max-w-lg w-full">
          <div className="grid grid-cols-1 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="relative">
                <select
                  className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedCourses[index]?.code[0] || ""}
                  onChange={(e) => handleCourseChange(index, e.target.value)}
                >
                  <option value="" disabled>
                    Select Course {index + 1}
                  </option>
                  {coursesData.map((course) => (
                    <option key={course.code.join(",")} value={course.code[0]}>
                      {course.code.join(", ")} - {course.name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <button
              onClick={handleCalculate}
              disabled={!allCoursesSelected}
              className={`w-full py-3 text-white font-bold rounded-lg transition-colors ${
                allCoursesSelected
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Calculate
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}