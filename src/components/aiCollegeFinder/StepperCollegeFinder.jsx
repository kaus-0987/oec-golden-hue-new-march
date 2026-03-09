"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  GraduationCap,
  MapPin,
  BookOpen,
  Target,
  Sparkles,
  Check,
  Loader2,
} from "lucide-react";
import CourseCard from "./CourseCard";
import Pagination from "./Pagination";
import EnquiryModal from "./EnquiryModal";

const StepperCollegeFinder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    degree: "",
    field: "",
    country: "",
    gpa: "",
    testScore: "",
    workExperience: "",
    preferences: [],
  });
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  const steps = [
    {
      id: 0,
      title: "Degree Level",
      description: "What degree are you pursuing?",
      icon: GraduationCap,
    },
    {
      id: 1,
      title: "Field of Study",
      description: "What would you like to study?",
      icon: BookOpen,
    },
    {
      id: 2,
      title: "Destination",
      description: "Where do you want to study?",
      icon: MapPin,
    },
    {
      id: 3,
      title: "Academic Profile",
      description: "Tell us about your academic background",
      icon: Target,
    },
  ];

  const degreeOptions = [
    { value: "bachelor", label: "Bachelor's Degree", duration: "3-4 years" },
    { value: "master", label: "Master's Degree", duration: "1-2 years" },
    { value: "phd", label: "PhD/Doctorate", duration: "3-5 years" },
    { value: "diploma", label: "Diploma/Certificate", duration: "6-12 months" },
  ];

  const fieldOptions = [
    { value: "computer-science", label: "Computer Science & IT", icon: "💻" },
    { value: "business", label: "Business & Management", icon: "💼" },
    { value: "engineering", label: "Engineering", icon: "⚙️" },
    { value: "medicine", label: "Medicine & Healthcare", icon: "🏥" },
    { value: "arts", label: "Arts & Humanities", icon: "🎨" },
    { value: "science", label: "Natural Sciences", icon: "🔬" },
    { value: "law", label: "Law & Legal Studies", icon: "⚖️" },
    { value: "education", label: "Education", icon: "📚" },
  ];

  const countryOptions = [
    { value: "united-states", label: "United States", flag: "🇺🇸" },
    { value: "united-kingdom", label: "United Kingdom", flag: "🇬🇧" },
    { value: "canada", label: "Canada", flag: "🇨🇦" },
    { value: "australia", label: "Australia", flag: "🇦🇺" },
    { value: "germany", label: "Germany", flag: "🇩🇪" },
    { value: "france", label: "France", flag: "🇫🇷" },
    { value: "netherlands", label: "Netherlands", flag: "🇳🇱" },
    { value: "ireland", label: "Ireland", flag: "🇮🇪" },
  ];



  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.degree !== "";
      case 1:
        return formData.field !== "";
      case 2:
        return formData.country !== "";
      case 3:
        return formData.gpa !== "";
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setShowResults(false);

    try {
      const response = await fetch("/api/ai-college-finder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          degree: formData.degree,
          field: formData.field,
          country: formData.country,
          gpa: formData.gpa,
          testScore: formData.testScore,
          workExperience: formData.workExperience,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }

      const data = await response.json();
      const coursesData = data.courses || [];

      const coursesWithLogos = coursesData.map((course) => ({
        ...course,
        logo: getUniversityLogo(course.university),
      }));

      setCourses(coursesWithLogos);
      setShowResults(true);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching courses:", error);
      alert("Failed to get recommendations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getUniversityLogo = (name) => {
    if (!name) return "https://placehold.co/100x100/2563eb/white?text=U";
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
    return `https://placehold.co/100x100/2563eb/white?text=${initials}`;
  };

  const resetFinder = () => {
    setCurrentStep(0);
    setFormData({
      degree: "",
      field: "",
      country: "",
      gpa: "",
      testScore: "",
      workExperience: "",
      preferences: [],
    });
    setCourses([]);
    setShowResults(false);
    setCurrentPage(1);
  };

  const handleEnquiryClick = (course) => {
    setSelectedCourse(course);
    setIsEnquiryModalOpen(true);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            {degreeOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleInputChange("degree", option.value)}
                className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                  formData.degree === option.value
                    ? "border-primary-600 bg-primary-50 shadow-md"
                    : "border-gray-200 hover:border-primary-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {option.label}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Duration: {option.duration}
                    </p>
                  </div>
                  {formData.degree === option.value && (
                    <div className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 text-white rounded-full p-1">
                      <Check className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        );

      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fieldOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleInputChange("field", option.value)}
                className={`p-6 rounded-xl border-2 transition-all text-left ${
                  formData.field === option.value
                    ? "border-primary-600 bg-primary-50 shadow-md"
                    : "border-gray-200 hover:border-primary-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{option.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {option.label}
                    </h3>
                  </div>
                  {formData.field === option.value && (
                    <div className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 text-white rounded-full p-1">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        );

      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {countryOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleInputChange("country", option.value)}
                className={`p-6 rounded-xl border-2 transition-all text-left ${
                  formData.country === option.value
                    ? "border-primary-600 bg-primary-50 shadow-md"
                    : "border-gray-200 hover:border-primary-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{option.flag}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {option.label}
                    </h3>
                  </div>
                  {formData.country === option.value && (
                    <div className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 text-white rounded-full p-1">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GPA / Percentage <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.gpa}
                onChange={(e) => handleInputChange("gpa", e.target.value)}
                placeholder="e.g., 3.5 or 85%"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Test Scores (IELTS/TOEFL/GRE/GMAT)
              </label>
              <input
                type="text"
                value={formData.testScore}
                onChange={(e) => handleInputChange("testScore", e.target.value)}
                placeholder="e.g., IELTS 7.0, TOEFL 100"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work Experience (in years)
              </label>
              <select
                value={formData.workExperience}
                onChange={(e) =>
                  handleInputChange("workExperience", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select experience</option>
                <option value="0">Fresher / No experience</option>
                <option value="1-2">1-2 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5+">5+ years</option>
              </select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const currentCourses = courses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">AI Recommendations Ready!</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Your Personalized University Matches
            </h1>
            <p className="text-lg text-amber-700 max-w-2xl mx-auto">
              Based on your profile, we found {courses.length} universities that
              match your preferences
            </p>
            <button
              onClick={resetFinder}
              className="mt-6 text-primary-600 hover:text-primary-700 font-medium"
            >
              ← Start New Search
            </button>
          </div>

          {/* Results */}
          {courses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-amber-700">
                No universities found matching your criteria. Please try
                adjusting your preferences.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onApplyNow={handleEnquiryClick}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}

          {/* Enquiry Modal */}
          {isEnquiryModalOpen && selectedCourse && (
            <EnquiryModal
              isOpen={isEnquiryModalOpen}
              onClose={() => {
                setIsEnquiryModalOpen(false);
                setSelectedCourse(null);
              }}
              course={selectedCourse}
              formData={formData}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-amber-900 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">AI-Powered Matching</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect University
          </h1>
          <p className="text-lg text-amber-700">
            Answer a few questions and let AI find the best universities for you
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      index <= currentStep
                        ? "bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {index < currentStep ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span
                    className={`text-xs mt-2 hidden md:block ${
                      index <= currentStep
                        ? "text-primary-600 font-medium"
                        : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded ${
                      index < currentStep ? "bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {steps[currentStep].title}
            </h2>
            <p className="text-amber-700">{steps[currentStep].description}</p>
          </div>

          <div className="max-h-[500px] overflow-y-auto pr-2">
            {renderStepContent()}
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>

          <div className="text-sm text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </div>

          <button
            onClick={handleNext}
            disabled={!isStepValid() || isLoading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Finding...
              </>
            ) : currentStep === steps.length - 1 ? (
              <>
                <Sparkles className="w-5 h-5" />
                Get Recommendations
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepperCollegeFinder;
