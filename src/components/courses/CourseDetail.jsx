"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ajaxCall from "@/helpers/ajaxCall";
import {
  BookOpen,
  ChevronLeft,
  Clock,
  Calendar,
  Landmark,
  Award,
  MapPin,
  CheckCircle2,
  XCircle,
  Gauge,
  ClipboardList,
  Briefcase,
  Globe,
  School,
  GraduationCap,
  Bookmark,
  Trophy,
  ScrollText,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";

const CourseDetail = ({ slug }) => {
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      setIsLoading(true);
      try {
        const response = await ajaxCall(
          `/academics/academics/courses/${slug}/`,
          {
            method: "GET",
          }
        );

        if (response?.data) {
          setCourse(response.data);
        } else {
          setError("Course not found");
        }
      } catch (error) {
        console.log("Error fetching course:", error);
        setError("Failed to load course data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  const activateLinks = (text) => {
    if (!text) return "";
    const urlRegex = /\[(https?:\/\/[^\]]+)\]/g;
    return text.replace(
      urlRegex,
      '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:underline">$1</a>'
    );
  };

  const formatFee = (amount) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: course?.currency || "USD",
    }).format(amount);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-10 bg-gray-200 rounded w-3/4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-96 bg-gray-200 rounded-xl"></div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-full"></div>
                <div className="h-6 bg-gray-200 rounded w-5/6"></div>
                <div className="h-6 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-64 bg-gray-200 rounded-xl"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 py-12"
      >
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          <h3 className="font-bold text-lg mb-1">Error</h3>
          <p>{error}</p>
          <Link
            href="/courses"
            className="mt-3 inline-flex items-center text-primary-600 hover:text-amber-900 font-medium transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to courses
          </Link>
        </div>
      </motion.div>
    );
  }

  if (!course) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 py-12"
      >
        <div className="bg-primary-50 border border-primary-200 text-amber-900 px-4 py-3 rounded-lg">
          <h3 className="font-bold text-lg mb-1">Course Not Found</h3>
          <p>The requested course could not be found.</p>
          <Link
            href="/courses"
            className="mt-3 inline-flex items-center text-primary-600 hover:text-amber-900 font-medium transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to courses
          </Link>
        </div>
      </motion.div>
    );
  }

  const intakeIcons = [
    {
      season: "Spring",
      active: course.intake_spring,
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      season: "Summer",
      active: course.intake_summer,
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      season: "Fall",
      active: course.intake_fall,
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      season: "Winter",
      active: course.intake_winter,
      icon: <Calendar className="w-5 h-5" />,
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-gray-50"
    >
      <header className="bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white mt-20 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative"
          >
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-4"
              >
                <Link
                  href={`/university/${course.university_name
                    .toLowerCase()
                    .replace(" ", "-")}`}
                  className="inline-flex items-center text-primary-200 hover:text-white transition-colors"
                >
                  <School className="h-5 w-5 mr-2" />
                  <span>{course.university_name}</span>
                </Link>
              </motion.div>

              <h1 className="text-3xl md:text-5xl font-bold mb-2">
                {course.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mt-4">
                <div className="flex items-center text-lg text-primary-200">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  <span className="capitalize">{course.degree_level}</span>
                </div>
                <div className="flex items-center text-lg text-primary-200">
                  <BookOpen className="h-5 w-5 mr-2" />
                  <span>{course.category_name}</span>
                </div>
                <div className="flex items-center text-lg text-primary-200">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{course.university_country}</span>
                </div>
              </div>
            </div>

            {course.university_logo && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="w-32 h-32 bg-white rounded-full p-2 shadow-xl border-4 border-white/20 relative z-10"
              >
                <img
                  src={course.university_logo}
                  alt={`${course.university_name} logo`}
                  width={128}
                  height={128}
                  className="w-full h-full object-contain rounded-full"
                />
              </motion.div>
            )}
          </motion.div>
        </div>
      </header>

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 space-y-8">
              {course.is_featured && (
                <motion.div
                  variants={itemVariants}
                  className="bg-secondary-500 text-white px-4 py-3 rounded-lg flex items-center shadow-lg"
                >
                  <Award className="h-5 w-5 mr-2" />
                  <span className="font-medium">Featured Program</span>
                </motion.div>
              )}

              {course.is_scholarship_available && (
                <motion.div
                  variants={itemVariants}
                  className="bg-blue-600 text-white px-4 py-3 rounded-lg flex items-center shadow-lg"
                >
                  <Trophy className="h-5 w-5 mr-2" />
                  <span className="font-medium">Scholarships Available</span>
                </motion.div>
              )}

              <motion.section variants={itemVariants}>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                  <BookOpen className="h-6 w-6 mr-2 text-white" />
                  Course Description
                </h2>
                {course.description && (
                  <div
                    className="prose max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: activateLinks(course.description),
                    }}
                  />
                )}
              </motion.section>

              {course.curriculum && (
                <motion.section variants={itemVariants}>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                    <ClipboardList className="h-6 w-6 mr-2 text-white" />
                    Curriculum
                  </h2>
                  <div
                    className="prose max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: course.curriculum }}
                  />
                </motion.section>
              )}

              {course.career_prospects && (
                <motion.section variants={itemVariants}>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                    <Briefcase className="h-6 w-6 mr-2 text-white" />
                    Career Prospects
                  </h2>
                  <div
                    className="prose max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: course.career_prospects,
                    }}
                  />
                </motion.section>
              )}

              <motion.section variants={itemVariants}>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                  <Globe className="h-6 w-6 mr-2 text-white" />
                  Key Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center text-gray-500 mb-1">
                      <Clock className="h-4 w-4 mr-2 text-white" />
                      <span className="text-sm text-amber-900">Duration</span>
                    </div>
                    <p className="text-gray-700">
                      {course.duration} {course.duration_type}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center text-gray-500 mb-1">
                      <Landmark className="h-4 w-4 mr-2 text-white" />
                      <span className="text-sm text-amber-900">
                        Total Fees
                      </span>
                    </div>
                    <p className="text-gray-700">
                      {formatFee(course.total_fee)}
                      <span className="text-xs text-gray-500 ml-2">
                        ({course.currency})
                      </span>
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center text-gray-500 mb-1">
                      <Calendar className="h-4 w-4 mr-2 text-white" />
                      <span className="text-sm text-amber-900">Intakes</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {intakeIcons.map((intake) => (
                        <span
                          key={intake.season}
                          className={`px-2 py-1 text-xs rounded-full ${
                            intake.active
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {intake.season}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center text-gray-500 mb-1">
                      <GraduationCap className="h-4 w-4 mr-2 text-white" />
                      <span className="text-sm text-amber-900">
                        Degree Level
                      </span>
                    </div>
                    <p className="text-gray-700 capitalize">
                      {course.degree_level}
                    </p>
                  </div>
                </div>
              </motion.section>
            </div>

            <div className="space-y-6">
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-primary-600 to-primary-800 p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-xl font-bold text-white mb-3">
                  Ready to Apply?
                </h3>
                <p className="text-primary-100 mb-6">
                  Start your application process for this program at{" "}
                  {course.university_name}.
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white text-primary-700 font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Apply Now
                </motion.button>
              </motion.div>
              
              <motion.div
                variants={itemVariants}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
              >
                <h3 className="font-semibold text-xl mb-4 text-amber-900 flex items-center">
                  <School className="h-5 w-5 mr-2 text-white" />
                  University
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    {course.university_logo && (
                      <div className="w-16 h-16 rounded-full bg-white p-1 border border-gray-200">
                        <img
                          src={course.university_logo}
                          alt={`${course.university_name} logo`}
                          className="w-full h-full object-contain rounded-full"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {course.university_name}
                      </h4>
                      <p className="text-sm text-amber-700 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {course.university_country}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/universities/${course.university_country
                      .toLowerCase()
                      .replace(/\s+/g, "-")}/${course.university_slug}`}
                    className="inline-flex items-center text-primary-600 hover:text-amber-900 text-sm font-medium transition-colors"
                  >
                    View university profile
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
              >
                <h3 className="font-semibold text-xl mb-4 text-amber-900 flex items-center">
                  <ClipboardList className="h-5 w-5 mr-2 text-white" />
                  Admission Requirements
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center text-gray-500 mb-1">
                      <Gauge className="h-4 w-4 mr-2 text-white" />
                      <span className="text-sm text-amber-900">Min GPA</span>
                    </div>
                    <p className="text-gray-700">{course.min_gpa}</p>
                  </div>

                  <div>
                    <div className="flex items-center text-gray-500 mb-1">
                      <Bookmark className="h-4 w-4 mr-2 text-white" />
                      <span className="text-sm text-amber-900">IELTS</span>
                    </div>
                    <p className="text-gray-700">{course.ielts_score}</p>
                  </div>

                  <div>
                    <div className="flex items-center text-gray-500 mb-1">
                      <ScrollText className="h-4 w-4 mr-2 text-white" />
                      <span className="text-sm text-amber-900">TOEFL</span>
                    </div>
                    <p className="text-gray-700">{course.toefl_score}</p>
                  </div>

                  <div>
                    <div className="flex items-center text-gray-500 mb-1">
                      <Trophy className="h-4 w-4 mr-2 text-white" />
                      <span className="text-sm text-amber-900">GRE</span>
                    </div>
                    <p className="text-gray-700">
                      {course.gre_required ? (
                        <span className="inline-flex items-center text-green-600">
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Required
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-gray-500">
                          <XCircle className="h-4 w-4 mr-1" />
                          Not Required
                        </span>
                      )}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center text-gray-500 mb-1">
                      <Trophy className="h-4 w-4 mr-2 text-white" />
                      <span className="text-sm text-amber-900">GMAT</span>
                    </div>
                    <p className="text-gray-700">
                      {course.gmat_required ? (
                        <span className="inline-flex items-center text-green-600">
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Required
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-gray-500">
                          <XCircle className="h-4 w-4 mr-1" />
                          Not Required
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
              >
                <h3 className="font-semibold text-xl mb-4 text-amber-900 flex items-center">
                  <Landmark className="h-5 w-5 mr-2 text-white" />
                  Fees Breakdown
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-amber-700">Tuition Fee:</span>
                    <span className="font-medium">
                      {formatFee(course.tuition_fee)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-700">Other Fees:</span>
                    <span className="font-medium">
                      {formatFee(course.other_fees)}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 my-2"></div>
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-amber-900">Total:</span>
                    <span className="text-primary-700">
                      {formatFee(course.total_fee)}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
};

export default CourseDetail;
