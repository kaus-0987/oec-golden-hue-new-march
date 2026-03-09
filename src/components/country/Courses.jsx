"use client";
import ajaxCall from "@/helpers/ajaxCall";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  Clock,
  Percent,
  CircleDollarSign,
  Calendar,
  Award,
  Star,
  School,
  MapPin,
  CheckCircle,
  XCircle,
} from "lucide-react";

const Courses = ({ country }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const response = await ajaxCall("/academics/academics/courses/", {
          method: "GET",
        });

        if (response?.data?.results?.length > 0) {
          const courseData = response.data.results.filter(
            (course) => course.university_country === country
          );
          setCourses(courseData);
        } else {
          setCourses([]);
        }
      } catch (error) {
        console.log("Error fetching courses:", error);
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [country]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const getIntakes = (course) => {
    const intakes = [];
    if (course.intake_spring) intakes.push("Spring");
    if (course.intake_summer) intakes.push("Summer");
    if (course.intake_fall) intakes.push("Fall");
    if (course.intake_winter) intakes.push("Winter");
    return intakes.join(", ") || "Not specified";
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col animate-pulse"
          >
            <div className="p-6 w-full">
              <div className="flex items-start mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 mr-4 shrink-0"></div>
                <div className="flex-grow">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <div className="h-6 w-24 bg-gray-300 rounded-full"></div>
                <div className="h-6 w-28 bg-gray-300 rounded-full"></div>
                <div className="h-6 w-20 bg-gray-300 rounded-full"></div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                  <div className="h-5 bg-gray-300 rounded w-24 ml-6"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-16"></div>
                  <div className="h-5 bg-gray-300 rounded w-20 ml-6"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-14"></div>
                  <div className="h-5 bg-gray-300 rounded w-12 ml-6"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-12"></div>
                  <div className="h-5 bg-gray-300 rounded w-10 ml-6"></div>
                </div>
              </div>

              <div className="flex justify-end items-center mt-4">
                <div className="h-10 w-28 bg-gray-300 rounded-lg"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No courses found for this country.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course) => (
        <motion.div
          key={course.id}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
        >
          <div className="p-6 w-full">
            <div className="flex items-start mb-4">
              <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mr-4 shrink-0">
                <School className="h-6 w-6 text-amber-900" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {course.name}
                </h3>
                <div className="text-sm text-gray-500 mt-1 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {course.university_name}, {course.university_country}
                </div>
              </div>
              {course.is_featured && (
                <div className="ml-auto pl-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                </div>
              )}
            </div>

            <div
              className="text-gray-700 mb-4 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: course.description }}
            />

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-amber-900">
                <GraduationCap className="h-3 w-3 mr-1" />
                {course.degree_level.charAt(0).toUpperCase() +
                  course.degree_level.slice(1)}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <BookOpen className="h-3 w-3 mr-1" />
                {course.category_name}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                <Clock className="h-3 w-3 mr-1" />
                {course.duration} {course.duration_type}
              </span>
              {course.is_scholarship_available ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  <Award className="h-3 w-3 mr-1" />
                  Scholarship Available
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-amber-900">
                  <XCircle className="h-3 w-3 mr-1" />
                  No Scholarship
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm mb-6">
              <div>
                <div className="text-gray-500 flex items-center">
                  <CircleDollarSign className="h-4 w-4 mr-1.5 text-white" />
                  Tuition Fee
                </div>
                <div className="font-medium pl-6">
                  {course.currency} {course.tuition_fee}
                </div>
              </div>
              <div>
                <div className="text-gray-500 flex items-center">
                  <Calendar className="h-4 w-4 mr-1.5 text-white" />
                  Intakes
                </div>
                <div className="font-medium pl-6">{getIntakes(course)}</div>
              </div>
              <div>
                <div className="text-gray-500 flex items-center">
                  <Percent className="h-4 w-4 mr-1.5 text-white" />
                  Min GPA
                </div>
                <div className="font-medium pl-6">{course.min_gpa}</div>
              </div>
              <div>
                <div className="text-gray-500 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1.5 text-white" />
                  IELTS
                </div>
                <div className="font-medium pl-6">{course.ielts_score}</div>
              </div>
            </div>

            <div className="flex justify-end items-center mt-4">
              <Link
                href={`/courses/${course.slug}`}
                className="bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Courses;
