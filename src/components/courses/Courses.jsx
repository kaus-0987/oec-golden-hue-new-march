"use client";
import React, { useState, useEffect } from "react";
import {
  Grid,
  List,
  Search,
  ChevronDown,
  BookOpen,
  GraduationCap,
  Clock,
  Percent,
  CircleDollarSign,
  Globe,
  Calendar,
  Award,
  ChevronLeft,
  ChevronRight,
  Star,
  School,
  MapPin,
  Clock3,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ajaxCall from "@/helpers/ajaxCall";
import Link from "next/link";

const Courses = ({ course }) => {
  const [viewMode, setViewMode] = useState("grid");
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    degree: "",
    country: "",
    field: course ? course : "",
    duration: "",
    scholarship: "",
    featured: "",
  });
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [fields, setFields] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await ajaxCall("/academics/academics/countries/", {
          method: "GET",
        });

        if (response?.data?.results?.length > 0) {
          setCountries(response.data.results);
        } else {
          setCountries([]);
        }
      } catch (error) {
        console.log("Error fetching countries:", error);
      }
    };

    const fetchFields = async () => {
      try {
        const response = await ajaxCall(
          "/academics/academics/course-categories/",
          {
            method: "GET",
          }
        );

        if (response?.data?.results?.length > 0) {
          setFields(response.data.results);
        } else {
          setFields([]);
        }
      } catch (error) {
        console.log("Error fetching fields:", error);
      }
    };

    fetchCountries();
    fetchFields();
  }, []);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const coursesPerPage = 6;

  const fetchCourses = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await ajaxCall("/academics/academics/courses/", {
        method: "GET",
      });

      setCourses(response.data.results);
      setTotalCourses(response.data.count || response.data.results.length);
      setTotalPages(
        Math.ceil(
          (response.data.count || response.data.results.length) / coursesPerPage
        )
      );
    } catch (err) {
      setError("Unable to fetch course data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      search === "" ||
      course.name.toLowerCase().includes(search.toLowerCase()) ||
      course.university.name?.toLowerCase().includes(search.toLowerCase()) ||
      course.category_name?.toLowerCase().includes(search.toLowerCase()) ||
      course.description?.toLowerCase().includes(search.toLowerCase());

    const matchesDegree =
      !filters.degree || course.degree_level === filters.degree;
    const matchesCountry =
      !filters.country ||
      course.university.country_name
        ?.toLowerCase()
        .includes(filters.country.toLowerCase());
    const matchesField =
      !filters.field ||
      course.category_name?.toLowerCase().includes(filters.field.toLowerCase());
    const matchesDuration =
      !filters.duration ||
      (filters.duration === "short" && course.duration <= 1) ||
      (filters.duration === "medium" &&
        course.duration > 1 &&
        course.duration <= 3) ||
      (filters.duration === "long" && course.duration > 3);
    const matchesScholarship =
      !filters.scholarship ||
      (filters.scholarship === "available" &&
        course.is_scholarship_available) ||
      (filters.scholarship === "unavailable" &&
        !course.is_scholarship_available);
    const matchesFeatured =
      !filters.featured ||
      (filters.featured === "featured" && course.is_featured) ||
      (filters.featured === "regular" && !course.is_featured);

    return (
      matchesSearch &&
      matchesDegree &&
      matchesCountry &&
      matchesField &&
      matchesDuration &&
      matchesScholarship &&
      matchesFeatured
    );
  });

  useEffect(() => {
    setTotalPages(Math.ceil(filteredCourses.length / coursesPerPage));
    setTotalCourses(filteredCourses.length);
    setCurrentPage(1);
  }, [filteredCourses.length, filters, search]);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

  const skeletonCards = Array.from({ length: coursesPerPage }).map((_, i) => (
    <div
      key={`skel-${i}`}
      className={`bg-white rounded-xl shadow-sm overflow-hidden ${
        viewMode === "list"
          ? "flex flex-col md:flex-row w-full"
          : "flex flex-col"
      }`}
    >
      <div className="p-6 w-full">
        <div className="animate-pulse flex flex-col h-full">
          <div className="flex items-center mb-4">
            <div className="h-12 w-12 rounded-full bg-gray-200 mr-3"></div>
            <div>
              <div className="h-5 bg-gray-200 rounded w-48 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="h-6 bg-gray-200 rounded-full w-16"></div>
            <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            <div className="h-6 bg-gray-200 rounded-full w-24"></div>
          </div>
          <div className="flex justify-between items-center mt-auto">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-10 bg-gray-200 rounded-full w-1/4"></div>
          </div>
        </div>
      </div>
    </div>
  ));

  const PaginationControls = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
        <div className="text-sm text-amber-700">
          Showing {indexOfFirstCourse + 1} to{" "}
          {Math.min(indexOfLastCourse, totalCourses)} of {totalCourses} courses
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {startPage > 1 && (
            <>
              <button
                onClick={() => paginate(1)}
                className={`px-3 py-1 rounded-lg ${
                  1 === currentPage
                    ? "bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                1
              </button>
              {startPage > 2 && <span className="px-2">...</span>}
            </>
          )}

          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-3 py-1 rounded-lg ${
                number === currentPage
                  ? "bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {number}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="px-2">...</span>}
              <button
                onClick={() => paginate(totalPages)}
                className={`px-3 py-1 rounded-lg ${
                  totalPages === currentPage
                    ? "bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            aria-label="Next page"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100">
      <header className="bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white mt-20 py-20 md:py-32 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Perfect Course
          </h1>
          <p className="text-white text-xl md:text-2xl max-w-4xl mx-auto">
            Discover programs that match your academic goals and career
            aspirations
          </p>
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-white" />
              <input
                type="search"
                placeholder="Search courses, universities, or fields..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-lg"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div className="flex flex-wrap gap-3 w-full">
              {[
                {
                  name: "degree",
                  label: "Degree Level",
                  options: [
                    { value: "", label: "All Degrees" },
                    { value: "certificate", label: "Certificate" },
                    { value: "diploma", label: "Diploma" },
                    { value: "bachelor", label: "Bachelor" },
                    { value: "master", label: "Master" },
                    { value: "doctorate", label: "Doctorate" },
                    { value: "postgraduate", label: "Post-Graduate" },
                  ],
                  icon: <GraduationCap className="h-4 w-4 mr-2" />,
                },
                {
                  name: "country",
                  label: "Country",
                  options: [
                    { value: "", label: "All Countries" },
                    ...countries.map((country) => ({
                      value: country.name,
                      label: country.name,
                    })),
                  ],
                  icon: <Globe className="h-4 w-4 mr-2" />,
                },
                {
                  name: "field",
                  label: "Field of Study",
                  options: [
                    { value: "", label: "All Fields" },
                    ...fields.map((field) => ({
                      value: field.name,
                      label: field.name,
                    })),
                  ],
                  icon: <BookOpen className="h-4 w-4 mr-2" />,
                },
                {
                  name: "duration",
                  label: "Duration",
                  options: [
                    { value: "", label: "Any Duration" },
                    { value: "short", label: "Short (<1 year)" },
                    { value: "medium", label: "Medium (1-3 years)" },
                    { value: "long", label: "Long (>3 years)" },
                  ],
                  icon: <Clock3 className="h-4 w-4 mr-2" />,
                },
                {
                  name: "scholarship",
                  label: "Scholarship",
                  options: [
                    { value: "", label: "Any Scholarship" },
                    { value: "available", label: "Available" },
                    { value: "unavailable", label: "Unavailable" },
                  ],
                  icon: <Award className="h-4 w-4 mr-2" />,
                },
                {
                  name: "featured",
                  label: "Featured",
                  options: [
                    { value: "", label: "All Courses" },
                    { value: "featured", label: "Featured Only" },
                    { value: "regular", label: "Regular Only" },
                  ],
                  icon: <Star className="h-4 w-4 mr-2" />,
                },
              ].map(({ name, label, options, icon }) => (
                <div key={name} className="relative flex-1 min-w-[150px]">
                  <div className="flex items-center text-sm text-white mb-1 ml-1">
                    {icon}
                    <span className="text-amber-900">{label}</span>
                  </div>
                  <select
                    name={name}
                    value={filters[name]}
                    onChange={handleFilterChange}
                    className="appearance-none w-full pl-3 pr-8 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-primary-800 focus:border-primary-800 shadow-sm"
                  >
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 bottom-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-6 p-1">
              {["grid", "list"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`p-2 rounded-lg flex items-center ${
                    viewMode === mode
                      ? "bg-white text-white shadow-sm"
                      : "text-amber-700 hover:bg-gray-200"
                  }`}
                  aria-label={`${mode} view`}
                >
                  {mode === "grid" ? (
                    <Grid className="h-5 w-5" />
                  ) : (
                    <List className="h-5 w-5" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-6"
            }
          >
            <AnimatePresence>
              {isLoading ? (
                skeletonCards
              ) : error ? (
                <div className="col-span-full text-center py-10">
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg max-w-2xl mx-auto">
                    <h3 className="font-bold text-lg mb-1">
                      Error Loading Data
                    </h3>
                    <p>{error}</p>
                    <button
                      onClick={fetchCourses}
                      className="mt-3 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              ) : currentCourses.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <div className="bg-primary-50 border border-primary-200 text-amber-900 px-4 py-3 rounded-lg max-w-2xl mx-auto">
                    <h3 className="font-bold text-lg mb-1">No Courses Found</h3>
                    <p>Try adjusting your filters or search term</p>
                  </div>
                </div>
              ) : (
                currentCourses.map((course) => (
                  <motion.div
                    key={course.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ${
                      viewMode === "list"
                        ? "flex flex-col md:flex-row"
                        : "flex flex-col"
                    }`}
                  >
                    {viewMode === "list" && course.university.banner_image && (
                      <div className="md:w-1/3">
                        <img
                          src={course.university.banner_image}
                          alt={`${course.university.name} campus`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div
                      className={`p-6 w-full ${
                        viewMode === "list" ? "md:w-2/3" : ""
                      }`}
                    >
                      <div className="flex items-start mb-4">
                        {course.university.logo ? (
                          <img
                            src={course.university.logo}
                            alt={`${course.university.name} logo`}
                            className="h-12 w-12 rounded-full object-cover mr-4"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                            <School className="h-6 w-6 text-amber-900" />
                          </div>
                        )}
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {course.name}
                          </h3>
                          <div className="text-sm text-gray-500 mt-1 flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {course.university.name},{" "}
                            {course.university.country_name}
                          </div>
                        </div>
                        {course.is_featured && (
                          <div className="ml-auto">
                            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                          </div>
                        )}
                      </div>

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

                      {viewMode === "grid" &&
                        course.university.banner_image && (
                          <div className="w-full h-48 mb-4">
                            <img
                              src={course.university.banner_image}
                              alt={`${course.university.name} campus`}
                              className="w-full h-full object-cover rounded-xl"
                            />
                          </div>
                        )}

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
                          <div className="font-medium pl-6">
                            {getIntakes(course)}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500 flex items-center">
                            <Percent className="h-4 w-4 mr-1.5 text-white" />
                            Min GPA
                          </div>
                          <div className="font-medium pl-6">
                            {course.min_gpa}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500 flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1.5 text-white" />
                            IELTS
                          </div>
                          <div className="font-medium pl-6">
                            {course.ielts_score}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end items-center mt-4">
                        <Link
                          href={`/popular-courses/${course.category_name
                            .toLowerCase()
                            .replace(/\s+/g, "-")}/${course.slug}`}
                          className="bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
          {!isLoading && !error && filteredCourses.length > 0 && (
            <PaginationControls />
          )}
        </div>
      </main>
    </div>
  );
};

export default Courses;
