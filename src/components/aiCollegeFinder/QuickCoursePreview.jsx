"use client";
import React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, DollarSign, Users } from "lucide-react";

const QuickCoursePreview = ({ filters }) => {
  // Quick preview data based on filters
  const getPreviewCourses = () => {
    const baseFields = {
      "computer-science": ["Software Engineering", "Data Science", "Cybersecurity"],
      "business": ["Business Administration", "Marketing", "Finance"],
      "engineering": ["Mechanical Engineering", "Civil Engineering", "Electrical Engineering"],
      "medicine": ["Medicine", "Nursing", "Pharmacy"],
      "arts": ["Fine Arts", "Graphic Design", "Creative Writing"]
    };

    const countries = {
      "united-states": { flag: "🇺🇸", avg: "$35,000" },
      "united-kingdom": { flag: "🇬🇧", avg: "£25,000" },
      "canada": { flag: "🇨🇦", avg: "CAD 28,000" },
      "australia": { flag: "🇦🇺", avg: "AUD 32,000" },
      "germany": { flag: "🇩🇪", avg: "€15,000" }
    };

    const fieldCourses = baseFields[filters.field] || ["Popular Courses"];
    const countryInfo = countries[filters.country] || { flag: "🌍", avg: "$30,000" };

    return fieldCourses.map((course, index) => ({
      id: index + 1,
      name: `${course} ${filters.degree === 'bachelor' ? 'Bachelor' : 'Master'}`,
      country: countryInfo,
      duration: filters.duration,
      avgFee: countryInfo.avg
    }));
  };

  const previewCourses = getPreviewCourses();

  return (
    <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6 mb-6 border border-primary-100">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-amber-900 mb-2">
          Quick Preview: Popular {filters.field.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Courses
        </h3>
        <p className="text-amber-700 text-sm">
          Here's what you might find while we generate personalized recommendations...
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {previewCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-medium text-amber-900 text-sm leading-tight flex-1">
                {course.name}
              </h4>
              <span className="text-xl ml-2">{course.country.flag}</span>
            </div>
            
            <div className="space-y-2 text-xs text-amber-700">
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-3 h-3" />
                <span>~{course.avgFee}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-3 h-3" />
                <span>High Demand</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-4">
        <p className="text-xs text-gray-500">
          💡 These are example courses. Your personalized results will include specific universities and detailed information.
        </p>
      </div>
    </div>
  );
};

export default QuickCoursePreview;