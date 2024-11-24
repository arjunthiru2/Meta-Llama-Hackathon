"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Import course data
import coursesData from "./data/options.json";

interface CourseOption {
  code: string[];
  name: string;
}

export default function CalculatorPage() {
  const searchParams = useSearchParams(); // Access query parameters
  const router = useRouter(); // Router instance for navigation
  const [userPreferences, setUserPreferences] = useState<Record<string, string | string[]>>({});
  const [selectedCourses, setSelectedCourses] = useState<(CourseOption | null)[]>(Array(6).fill(null));
  const [searchQueries, setSearchQueries] = useState<string[]>(Array(6).fill("")); // Search queries for dropdowns
  const [expandedDropdown, setExpandedDropdown] = useState<number | null>(null); // Track open dropdown index
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

    // Generate course recommendations
    const recommendations = generateRecommendations(parsedPreferences);
    setSuggestedCourses(recommendations);
  }, [searchParams]);

  // Generate course recommendations based on user preferences
  const generateRecommendations = (preferences: Record<string, string | string[]>): CourseOption[] => {
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

  const handleCourseSelect = (index: number, course: CourseOption) => {
    const updatedCourses = [...selectedCourses];
    updatedCourses[index] = course;
    setSelectedCourses(updatedCourses);
    setExpandedDropdown(null); // Close the dropdown after selection
  };

  const filteredCourses = (query: string) => {
    if (!query) return coursesData; // If no query, show all courses
    return coursesData.filter(
      (course) =>
        course.name.toLowerCase().includes(query.toLowerCase()) ||
        course.code.some((code) => code.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const handleSearchChange = (index: number, query: string) => {
    const updatedQueries = [...searchQueries];
    updatedQueries[index] = query;
    setSearchQueries(updatedQueries);
  };

  const allCoursesSelected = selectedCourses.every((course) => course);

  const handleCalculate = () => {
    alert(`Calculation complete for courses: ${selectedCourses
      .map((course) => course?.name)
      .join(", ")}`);
  };

  return (
    <div className="flex flex-row min-h-screen bg-gradient-to-b from-blue-100 to-white p-8">
      {/* Recommendations Box */}
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
          <p className="text-gray-500">Set Preferences for Recommended Courses.</p>
        )}
      </aside>

      {/* Main Calculator Content */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient">
            Ideal Major Calculator
          </h1>
        </header>

        <div className="max-w-lg w-full">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="relative mb-4">
              {/* Input for Selected Course */}
              <button
                onClick={() => setExpandedDropdown(expandedDropdown === index ? null : index)}
                className="w-full p-3 text-left bg-white border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {selectedCourses[index]?.name || `Select Course ${index + 1}`}
              </button>

              {/* Dropdown with Search Bar */}
              {expandedDropdown === index && (
                <div className="absolute z-10 mt-2 bg-white border rounded-lg shadow-lg max-h-60 w-full overflow-auto">
                  {/* Search Bar */}
                  <div className="p-2 border-b">
                    <input
                      type="text"
                      placeholder="Search for a course..."
                      value={searchQueries[index]}
                      onChange={(e) => handleSearchChange(index, e.target.value)}
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Filtered Courses */}
                  <ul className="p-2 space-y-2">
                    {filteredCourses(searchQueries[index]).map((course, i) => (
                      <li
                        key={`${index}-${i}`}
                        onClick={() => handleCourseSelect(index, course)}
                        className="cursor-pointer p-2 rounded-lg hover:bg-blue-100"
                      >
                        {course.code.join(", ")} - {course.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          {/* Calculate Button */}
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

          {/* Preferences Button */}
          <div className="mt-4">
            <button
              onClick={() => router.push('/preferences')}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors"
            >
              Set Preferences
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
