"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import ajaxCall from "@/helpers/ajaxCall";
import { motion, AnimatePresence } from "framer-motion";
import {
  Grid,
  List,
  Search,
  ChevronDown,
  Star,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Globe,
  Users,
  Building,
  Award,
  Calendar,
  PoundSterling,
  Mail,
  Phone,
  ExternalLink,
} from "lucide-react";

const Universities = ({ country }) => {
  const [viewMode, setViewMode] = useState("list");
  const [countries, setCountries] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    country: country ? country : "all",
    type: "all",
  });
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUniversities, setTotalUniversities] = useState(0);
  const universitiesPerPage = 6;

  useEffect(() => {
    const fetchUniversities = async () => {
      setIsLoading(true);
      try {
        const response = await ajaxCall("/academics/academics/universities/", {
          method: "GET",
        });

        if (response?.data?.results?.length > 0) {
          setUniversities(response.data.results);
        } else {
          setUniversities([]);
        }
      } catch (error) {
        console.log("Error fetching universities:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUniversities();
  }, []);

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

    fetchCountries();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredUniversities = useMemo(() => {
    if (!universities) return [];
    return universities.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.country_name?.toLowerCase()?.includes(search.toLowerCase()) ||
        u.city?.toLowerCase()?.includes(search.toLowerCase());

      const matchesCountry =
        filters.country === "all" ||
        u.country_name?.toLowerCase() === filters.country.toLowerCase();

      const matchesType =
        filters.type === "all" ||
        u.university_type?.toLowerCase() === filters.type.toLowerCase();

      return matchesSearch && matchesCountry && matchesType;
    });
  }, [universities, search, filters]);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredUniversities.length / universitiesPerPage));
    setTotalUniversities(filteredUniversities.length);
    setCurrentPage(1);
  }, [filteredUniversities.length, search, filters]);

  const indexOfLastUniversity = currentPage * universitiesPerPage;
  const indexOfFirstUniversity = indexOfLastUniversity - universitiesPerPage;
  const currentUniversities = filteredUniversities.slice(
    indexOfFirstUniversity,
    indexOfLastUniversity
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const LogoFallback = ({ name, className }) => (
    <div
      className={`flex items-center justify-center bg-primary-700 text-white font-bold ${className}`}
    >
      {name ? name.charAt(0) : "U"}
    </div>
  );

  const formatTuitionFee = (min, max) => {
    if (!min && !max) return "N/A";
    if (min && max) return `£${min} - £${max}`;
    return min ? `From £${min}` : `Up to £${max}`;
  };

  const formatEstablishedYear = (year) => {
    if (!year) return "";
    const currentYear = new Date().getFullYear();
    const yearsOld = currentYear - year;
    return `Est. ${year} • ${yearsOld}+ years`;
  };

  const skeletonCards = Array.from({ length: universitiesPerPage }).map(
    (_, i) => (
      <div
        key={`skel-${i}`}
        className={`bg-white rounded-xl shadow-md overflow-hidden flex flex-col ${
          viewMode === "list" ? "md:flex-row" : ""
        }`}
      >
        {viewMode === "grid" ? (
          <>
            <div className="h-40 w-full bg-gray-200 animate-pulse"></div>
            <div className="p-6 pt-14 text-center relative">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-4 animate-pulse"></div>
              <div className="h-10 bg-gray-300 rounded w-full mx-auto animate-pulse"></div>
            </div>
          </>
        ) : (
          <div className="flex flex-col md:flex-row items-center w-full">
            <div className="w-full md:w-1/3 h-48 md:h-full bg-gray-200 animate-pulse flex-shrink-0"></div>
            <div className="p-6 w-full animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="flex gap-4">
                <div className="h-5 bg-gray-300 rounded w-1/3"></div>
                <div className="h-5 bg-gray-300 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );

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
          Showing {totalUniversities > 0 ? indexOfFirstUniversity + 1 : 0} to{" "}
          {Math.min(indexOfLastUniversity, totalUniversities)} of{" "}
          {totalUniversities} universities
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
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>

          {startPage > 1 && (
            <>
              <button
                onClick={() => paginate(1)}
                className={`px-3 py-1 rounded-lg ${
                  1 === currentPage
                    ? "bg-secondary-500 text-white"
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
                  ? "bg-secondary-500 text-white"
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
                    ? "bg-secondary-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`p-2 rounded-lg ${
              currentPage === totalPages || totalPages === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            aria-label="Next page"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    );
  };

  const UniversityLogo = ({ uni, isList }) => (
    <div
      className={`${
        isList ? "w-16 h-16" : "w-20 h-20"
      } bg-white rounded-full p-1 shadow-md border-2 border-primary-800`}
    >
      {uni.logo ? (
        <img
          src={uni.logo}
          alt={`${uni.name} logo`}
          className="w-full h-full object-contain rounded-full"
        />
      ) : (
        <LogoFallback
          name={uni.name}
          className={`w-full h-full rounded-full ${
            isList ? "text-2xl" : "text-3xl"
          }`}
        />
      )}
    </div>
  );

  return (
    <div className="bg-gray-100">
      <header className="bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white mt-20 py-20 md:py-32 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Best Colleges & Universities to Study Abroad
          </h1>
          <p className="text-white text-xl md:text-2xl max-w-4xl mx-auto">
            All you need to know about universities worldwide
          </p>
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-white" />
              <input
                type="search"
                placeholder="Search universities, countries, or cities..."
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
            <div className="flex flex-wrap gap-4 w-full">
              <div className="relative flex-1 min-w-[180px]">
                <div className="flex items-center text-sm text-white mb-1 ml-1">
                  <Globe className="h-4 w-4 mr-2" />
                  <span className="text-amber-900 font-medium">Country</span>
                </div>
                <select
                  name="country"
                  value={filters.country}
                  onChange={handleFilterChange}
                  className="appearance-none w-full pl-3 pr-8 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-primary-800 focus:border-primary-800 shadow-sm"
                >
                  <option value="all">All Countries</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 bottom-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>

              <div className="relative flex-1 min-w-[180px]">
                <div className="flex items-center text-sm text-white mb-1 ml-1">
                  <Users className="h-4 w-4 mr-2" />
                  <span className="text-amber-900 font-medium">Type</span>
                </div>
                <select
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="appearance-none w-full pl-3 pr-8 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-primary-800 focus:border-primary-800 shadow-sm"
                >
                  <option value="all">All Types</option>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="government">Goverment</option>
                </select>
                <ChevronDown className="absolute right-3 bottom-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-2 mt-6 p-1 bg-gray-200 rounded-lg">
              {["grid", "list"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`p-2 rounded-md flex items-center transition-colors ${
                    viewMode === mode
                      ? "bg-white text-white shadow-sm"
                      : "text-amber-700 hover:bg-gray-300"
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
              ) : currentUniversities.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <div className="bg-primary-50 border border-primary-200 text-amber-900 px-4 py-3 rounded-lg max-w-2xl mx-auto">
                    <h3 className="font-bold text-lg mb-1">
                      No Universities Found
                    </h3>
                    <p>Try adjusting your filters or search term.</p>
                  </div>
                </div>
              ) : (
                currentUniversities.map((uni) => (
                  <motion.div
                    key={uni.id}
                    layout
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileHover={{
                      y: -5,
                      boxShadow:
                        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    }}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full"
                  >
                    {viewMode === "grid" ? (
                      <>
                        <div className="relative">
                          {uni.banner_image ? (
                            <img
                              src={uni.banner_image}
                              alt={`${uni.name} banner`}
                              className="h-40 w-full object-cover"
                            />
                          ) : (
                            <div className="h-40 w-full bg-gradient-to-br from-primary-50 to-primary-100"></div>
                          )}
                          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                            <UniversityLogo uni={uni} isList={false} />
                          </div>
                          {uni.is_featured && (
                            <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white text-xs font-bold px-2 py-1 rounded">
                              <Award className="inline mr-1 h-3 w-3 text-white" />
                              Featured
                            </div>
                          )}
                        </div>
                        <div className="p-6 pt-14 text-center flex-grow flex flex-col">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            <Link
                              href={`/universities/${uni.country_name
                                .toLowerCase()
                                .replace(/\s+/g, "-")}/${uni.slug}`}
                              className="hover:text-amber-900 hover:underline"
                            >
                              {uni.name}
                            </Link>
                          </h3>
                          <div className="flex items-center justify-center text-sm text-gray-500 mb-2">
                            <MapPin className="h-4 w-4 mr-1 text-white" />
                            <span>
                              {uni.city ? `${uni.city}, ` : ""}
                              {uni.country_name}
                              {uni.state ? `, ${uni.state}` : ""}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-x-3 gap-y-1 justify-center mb-3">
                            <div className="inline-flex items-center bg-primary-50 text-amber-900 text-xs px-2 py-1 rounded">
                              <Building className="h-3 w-3 mr-1 text-white" />
                              <span className="capitalize">
                                {uni.university_type}
                              </span>
                            </div>
                            {uni.established_year && (
                              <div className="inline-flex items-center bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                <Calendar className="h-3 w-3 mr-1 text-white" />
                                <span>
                                  {formatEstablishedYear(uni.established_year)}
                                </span>
                              </div>
                            )}
                          </div>

                          {uni.description && (
                            <p className="text-sm text-amber-700 line-clamp-2 mb-4 text-left">
                              {uni.description.replace(/<[^>]+>/g, "")}
                            </p>
                          )}

                          <div className="mt-auto pt-4 border-t border-gray-200">
                            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                              <div>
                                <p className="text-xs text-gray-500 mb-1">
                                  Tuition
                                </p>
                                <div className="flex items-center justify-center text-gray-700">
                                  <PoundSterling className="h-4 w-4 mr-1 text-white" />
                                  <span className="font-medium">
                                    {formatTuitionFee(
                                      uni.tuition_fee_min,
                                      uni.tuition_fee_max
                                    )}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 mb-1">
                                  Rank
                                </p>
                                <div className="flex items-center justify-center text-gray-700">
                                  <Star className="h-4 w-4 mr-1 text-yellow-500" />
                                  <span className="font-medium">
                                    {uni.ranking_national
                                      ? `#${uni.ranking_national} (National)`
                                      : "N/A"}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500">
                                  {uni.ranking_global
                                    ? `#${uni.ranking_global} (Global)`
                                    : ""}
                                </p>
                              </div>
                            </div>

                            <div className="flex justify-center items-center space-x-4 mb-4">
                              {uni.email && (
                                <a
                                  href={`mailto:${uni.email}`}
                                  className="text-gray-500 hover:text-amber-900"
                                  title="Email"
                                >
                                  <Mail className="h-5 w-5 text-white" />
                                </a>
                              )}
                              {uni.phone && (
                                <a
                                  href={`tel:${uni.phone}`}
                                  className="text-gray-500 hover:text-amber-900"
                                  title="Phone"
                                >
                                  <Phone className="h-5 w-5 text-white" />
                                </a>
                              )}
                            </div>

                            <a
                              href={uni.website_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 hover:bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                            >
                              Visit Website <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col md:flex-row items-stretch w-full h-full">
                        <div className="w-full md:w-1/3 h-48 md:h-full relative flex-shrink-0">
                          {uni.banner_image ? (
                            <>
                              <img
                                src={uni.banner_image}
                                alt={`${uni.name} banner`}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <UniversityLogo uni={uni} isList={true} />
                              </div>
                            </>
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
                              <UniversityLogo uni={uni} isList={true} />
                            </div>
                          )}
                          {uni.is_featured && (
                            <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white text-xs font-bold px-2 py-1 rounded">
                              <Award className="inline mr-1 h-3 w-3 text-white" />
                              Featured
                            </div>
                          )}
                        </div>
                        <div className="p-4 w-full flex-grow flex flex-col">
                          <div className="flex-grow">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                              <Link
                                href={`/universities/${uni.country_name
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}/${uni.slug}`}
                                className="hover:text-amber-900 hover:underline"
                              >
                                {uni.name}
                              </Link>
                            </h3>
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                              <MapPin className="h-4 w-4 mr-1 text-white" />
                              <span>
                                {uni.city ? `${uni.city}, ` : ""}
                                {uni.country_name}
                                {uni.state ? `, ${uni.state}` : ""}
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-3">
                              <div className="inline-flex items-center bg-primary-50 text-amber-900 text-xs px-2 py-1 rounded">
                                <Building className="h-3 w-3 mr-1 text-white" />
                                <span className="capitalize">
                                  {uni.university_type}
                                </span>
                              </div>
                              {uni.established_year && (
                                <div className="inline-flex items-center bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                  <Calendar className="h-3 w-3 mr-1 text-white" />
                                  <span>
                                    {formatEstablishedYear(
                                      uni.established_year
                                    )}
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-xs text-gray-500 mb-1">
                                  Tuition
                                </p>
                                <div className="flex items-center text-gray-700 text-sm">
                                  <PoundSterling className="h-4 w-4 mr-1 text-white" />
                                  <span className="font-medium">
                                    {formatTuitionFee(
                                      uni.tuition_fee_min,
                                      uni.tuition_fee_max
                                    )}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 mb-1">
                                  Rank
                                </p>
                                <div className="flex items-center text-gray-700 text-sm">
                                  <Star className="h-4 w-4 mr-1 text-yellow-500" />
                                  <span className="font-medium">
                                    {uni.ranking_national > 0
                                      ? `National #${uni.ranking_national}`
                                      : "N/A"}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 pl-5">
                                  {uni.ranking_global > 0
                                    ? `Global #${uni.ranking_global}`
                                    : ""}
                                </p>
                              </div>
                            </div>

                            {uni.description && (
                              <p className="text-sm text-amber-700 line-clamp-2 mb-4">
                                {uni.description.replace(/<[^>]+>/g, "")}
                              </p>
                            )}
                          </div>

                          <div className="flex flex-wrap justify-between items-center pt-4 border-t border-gray-200 mt-auto">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-x-4 gap-y-2">
                              {uni.email && (
                                <a
                                  href={`mailto:${uni.email}`}
                                  className="flex items-center space-x-1 text-gray-500 hover:text-amber-900"
                                  title="Email"
                                >
                                  <Mail className="h-4 w-4 text-white flex-shrink-0" />
                                  <span className="text-sm">{uni.email}</span>
                                </a>
                              )}
                              {uni.phone && (
                                <a
                                  href={`tel:${uni.phone}`}
                                  className="flex items-center space-x-1 text-gray-500 hover:text-amber-900"
                                  title="Phone"
                                >
                                  <Phone className="h-4 w-4 text-white flex-shrink-0" />
                                  <span className="text-sm">{uni.phone}</span>
                                </a>
                              )}
                            </div>
                            <a
                              href={uni.website_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-primary-600 hover:text-amber-900 text-sm font-medium mt-2 sm:mt-0 ml-auto"
                            >
                              Visit Website
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
          {!isLoading && filteredUniversities.length > 0 && (
            <PaginationControls />
          )}
        </div>
      </main>
    </div>
  );
};

export default Universities;
