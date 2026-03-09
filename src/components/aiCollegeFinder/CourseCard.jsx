import React from "react";
import {
  GraduationCap,
  BookOpen,
  Clock,
  Percent,
  CircleDollarSign,
  Calendar,
  Award,
  User,
  BarChart2,
} from "lucide-react";
import { motion } from "framer-motion";

const CourseCard = ({ course, viewMode, onApplyNow }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ${
        viewMode === "list" ? "flex flex-col md:flex-row" : "flex flex-col"
      }`}
    >
      <div className="p-6 w-full">
        <div className="flex items-start mb-4">
          <img
            src={course.logo}
            alt={`${course.university} logo`}
            className="h-12 w-12 rounded-full object-contain mr-4 border border-gray-200"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-900">{course.name}</h3>
            <div className="text-sm text-gray-500 mt-1">
              {course.university}, {course.country}
            </div>
          </div>
        </div>

        <p className="text-gray-700 mb-4">{course.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-amber-900">
            <GraduationCap className="h-3 w-3 mr-1" /> {course.degree}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <BookOpen className="h-3 w-3 mr-1" /> {course.field}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            <Clock className="h-3 w-3 mr-1" /> {course.duration}
          </span>
          {course.scholarship && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              <Award className="h-3 w-3 mr-1" /> Scholarship:{" "}
              {course.scholarship}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm mb-6">
          <div>
            <div className="text-gray-500 flex items-center">
              <CircleDollarSign className="h-4 w-4 mr-1.5 text-white" />
              Tuition
            </div>
            <div className="font-medium pl-6">{course.tuition || "Varies"}</div>
          </div>
          <div>
            <div className="text-gray-500 flex items-center">
              <Calendar className="h-4 w-4 mr-1.5 text-white" />
              Intake
            </div>
            <div className="font-medium pl-6">{course.intake || "Multiple"}</div>
          </div>
          {course.acceptanceRate && (
            <div>
              <div className="text-gray-500 flex items-center">
                <Percent className="h-4 w-4 mr-1.5 text-white" />
                Acceptance
              </div>
              <div className="font-medium pl-6">{course.acceptanceRate}</div>
            </div>
          )}
          {course.delivery && (
            <div>
              <div className="text-gray-500 flex items-center">
                <User className="h-4 w-4 mr-1.5 text-white" />
                Delivery
              </div>
              <div className="font-medium pl-6">{course.delivery}</div>
            </div>
          )}
        </div>

        {course.curriculum && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <BookOpen className="h-4 w-4 mr-1.5 text-white" />
              Key Topics
            </h4>
            <div className="flex flex-wrap gap-2">
              {course.curriculum.slice(0, 3).map((topic, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 bg-white rounded-md border border-primary-800 text-amber-900"
                >
                  {topic}
                </span>
              ))}
              {course.curriculum.length > 3 && (
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-500">
                  +{course.curriculum.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {course.careerOutcomes && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <BarChart2 className="h-4 w-4 mr-1.5 text-white" />
              Career Outcomes
            </h4>
            <div className="flex flex-wrap gap-2">
              {course.careerOutcomes.slice(0, 3).map((career, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 bg-white rounded-md border border-green-600 text-green-700"
                >
                  {career}
                </span>
              ))}
              {course.careerOutcomes.length > 3 && (
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-500">
                  +{course.careerOutcomes.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
        <div className="flex justify-end items-center mt-4">
          <button
            onClick={() => onApplyNow(course)}
            className="bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Enquiry Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
