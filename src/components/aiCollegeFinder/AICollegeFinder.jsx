"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import ConsultationForm from "../forms/ConsultationForm";
import CourseCard from "./CourseCard";
import FilterBar from "./FilterBar";
import Pagination from "./Pagination";
import ViewModeToggle from "./ViewModeToggle";
import SearchBar from "./SearchBar";
import SkeletonCard from "./SkeletonCard";
import EducationTrivia from "./EducationTrivia";
import QuickCoursePreview from "./QuickCoursePreview";

const AICollegeFinder = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    degree: "bachelor",
    country: "united-states",
    university: "",
    field: "computer-science",
    duration: "4-years",
    delivery: "on-campus",
  });
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [courseMetadata, setCourseMetadata] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const [metadata, setMetadata] = useState(null);
  const coursesPerPage = 6;

  const getUniversityLogo = (name) => {
    if (!name) return "https://placehold.co/100x100/2563eb/white?text=U";
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
    return `https://placehold.co/100x100/2563eb/white?text=${initials}`;
  };

  const fetchCourses = async () => {
    setIsLoading(true);
    setError(null);
    setCourses([]);
    setCurrentPage(1);

    try {
      // Add timeout for faster failure detection
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 seconds timeout

      const response = await fetch("/api/ai-college-finder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          degree: filters.degree,
          country: filters.country,
          university: filters.university,
          field: filters.field,
          duration: filters.duration,
          delivery: filters.delivery,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch courses");
      }

      const json = await response.json();
      
      // Handle new response structure with metadata
      const coursesData = json.courses || [];
      const metadata = json.metadata || {};
      
      const coursesWithLogos = Array.isArray(coursesData)
        ? coursesData.map((course) => ({
            ...course,
            logo: getUniversityLogo(course.university),
          }))
        : [];
      
      setCourses(coursesWithLogos);
      setTotalCourses(coursesWithLogos.length);
      setTotalPages(Math.ceil(coursesWithLogos.length / coursesPerPage));
      setCourseMetadata(metadata);
      
      // Log metadata for debugging
      if (metadata.dataSource) {
        console.log('Course data source:', metadata.dataSource);
      }
      if (metadata.disclaimer) {
        console.log('Data disclaimer:', metadata.disclaimer);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      if (err.name === 'AbortError') {
        setError("Request timed out. The AI service is taking longer than expected. Please try again.");
      } else {
        setError(
          err.message || "Unable to fetch course data. Please try again later."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyNow = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCourses();
    }, 500);

    return () => clearTimeout(timer);
  }, [filters]);

  const filteredCourses = courses.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.university?.toLowerCase()?.includes(search.toLowerCase()) ||
      c.field?.toLowerCase()?.includes(search.toLowerCase()) ||
      c.curriculum?.some((topic) =>
        topic.toLowerCase().includes(search.toLowerCase())
      )
  );

  useEffect(() => {
    setTotalPages(Math.ceil(filteredCourses.length / coursesPerPage));
    setTotalCourses(filteredCourses.length);
    setCurrentPage(1);
  }, [filteredCourses.length, search]);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

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
          <SearchBar value={search} onChange={handleSearchChange} />
        </div>
      </header>

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <FilterBar filters={filters} onFilterChange={handleFilterChange} />
            <ViewModeToggle
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>

          {/* Quick Preview and Interactive Trivia while loading */}
          {isLoading && <QuickCoursePreview filters={filters} />}
          <EducationTrivia isLoading={isLoading} />

          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-6"
            }
          >
            <AnimatePresence>
              {isLoading ? (
                <SkeletonCard
                  viewMode={viewMode}
                  coursesPerPage={coursesPerPage}
                />
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
                  <CourseCard
                    key={course.id}
                    course={course}
                    viewMode={viewMode}
                    onApplyNow={handleApplyNow}
                  />
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Data Source Disclaimer */}
          {!isLoading && courseMetadata && (
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div className="text-sm text-blue-700">
                  {courseMetadata.disclaimer && (
                    <p className="mb-2">{courseMetadata.disclaimer}</p>
                  )}
                  {courseMetadata.dataSource && (
                    <p className="text-blue-600">
                      <strong>Data Source:</strong> {courseMetadata.dataSource}
                    </p>
                  )}
                  {courseMetadata.searchParameters && (
                    <div className="mt-2">
                      <strong>Search Parameters:</strong>{" "}
                      {Object.entries(courseMetadata.searchParameters).map(([key, value]) => (
                        <span key={key} className="inline-block bg-blue-100 px-2 py-1 rounded text-xs mr-2 mt-1">
                          {key}: {value}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {!isLoading && !error && filteredCourses.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalCourses}
              itemsPerPage={coursesPerPage}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </main>

      {isModalOpen && (
        <ConsultationForm
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          initialEnquiry={{
            name: selectedCourse?.name,
            university: selectedCourse?.university,
            country: selectedCourse?.country,
          }}
        />
      )}
    </div>
  );
};

export default AICollegeFinder;
