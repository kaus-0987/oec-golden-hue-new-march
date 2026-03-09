"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ajaxCall from "@/helpers/ajaxCall";
import parse from 'html-react-parser';
import { Search, ArrowRight, GraduationCap } from "lucide-react";

const CountryGuides = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true);
      try {
        const response = await ajaxCall("/academics/academics/countries/", {
          method: "GET",
        });

        const results = response?.data?.results || [];
        setCountries(results);
        setFilteredCountries(results);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setCountries([]);
        setFilteredCountries([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    let filtered = [...countries];

    if (searchTerm) {
      const lowercasedFilter = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (country) =>
          country.name.toLowerCase().includes(lowercasedFilter) ||
          (country.description &&
            country.description.toLowerCase().includes(lowercasedFilter))
      );
    }

    if (activeFilter !== "all") {
      filtered = filtered.filter((country) => {
        const count = country.university_count;
        if (activeFilter === "high") return count >= 10;
        if (activeFilter === "medium") return count >= 5 && count < 10;
        if (activeFilter === "low") return count < 5;
        return true;
      });
    }

    setFilteredCountries(filtered);
    setCurrentPage(1);
  }, [searchTerm, activeFilter, countries]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCountries = filteredCountries.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white mt-20 py-20 md:py-32 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Country Study Guides
          </h1>
          <p className="text-white text-xl md:text-2xl max-w-4xl mx-auto">
            Explore comprehensive guides and expert insights to choose the
            perfect destination for your international education.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section
          aria-labelledby="search-and-filter-heading"
          className="mb-12 p-6 bg-white rounded-xl shadow-md border border-gray-200"
        >
          <h2 id="search-and-filter-heading" className="sr-only">
            Search and Filter Country Guides
          </h2>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <label htmlFor="search-input" className="sr-only">
                Search by country or program
              </label>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="search-input"
                type="search"
                placeholder="Search by country or program..."
                className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <label
                htmlFor="filter-select"
                className="text-amber-700 font-medium whitespace-nowrap"
              >
                Filter by Universities:
              </label>
              <select
                id="filter-select"
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="high">10+ Universities</option>
                <option value="medium">5-9 Universities</option>
                <option value="low">1-4 Universities</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-primary-50 p-4 rounded-lg">
              <p className="font-bold text-2xl text-amber-900">
                {countries.length}
              </p>
              <p className="text-amber-900 text-sm">Countries Covered</p>
            </div>
            <div className="bg-secondary-50 p-4 rounded-lg">
              <p className="font-bold text-2xl text-white">
                {countries.reduce(
                  (sum, country) => sum + country.university_count,
                  0
                )}
              </p>
              <p className="text-white text-sm">Universities Listed</p>
            </div>
            <div className="bg-primary-50 p-4 rounded-lg">
              <p className="font-bold text-2xl text-amber-900">100+</p>
              <p className="text-amber-900 text-sm">Program Categories</p>
            </div>
          </div>
        </section>

        {isLoading ? (
          <div
            className="flex justify-center items-center h-64"
            role="status"
            aria-live="polite"
          >
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
            <span className="sr-only">Loading...</span>
          </div>
        ) : filteredCountries.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentCountries.map((country) => (
                <article
                  key={country.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full group"
                  aria-labelledby={`country-name-${country.id}`}
                >
                  <div className="relative h-48">
                    <img
                      src={country.flag_image}
                      alt={`${country.name} flag`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3
                        id={`country-name-${country.id}`}
                        className="text-2xl font-bold text-white"
                      >
                        {country.name}
                      </h3>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 text-amber-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                      <GraduationCap className="w-4 h-4 mr-1.5" />
                      {country.university_count} Universities
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col">
                    <h4 className="font-semibold text-amber-900 mb-2">
                      Why Study in {country.name}?
                    </h4>
                    <div className="text-amber-700 text-sm line-clamp-3">
                      {parse(
                        country.description
                          ?.replace(/<[^>]+>/g, "")
                          .substring(0, 200) ||
                          `Explore top universities and programs in ${country.name}.`
                      )}
                      ...
                    </div>
                    <div className="mt-auto pt-4">
                      <Link
                        href={`/country-guides/${country.name
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="inline-flex items-center text-primary-600 font-bold group-hover:text-amber-900 transition-colors"
                        aria-label={`Explore study guide for ${country.name}`}
                      >
                        Explore Guide
                        <ArrowRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <nav aria-label="Pagination" className="flex justify-center">
                <ul className="flex items-center gap-2">
                  <li>
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-md border border-gray-300 disabled:opacity-50"
                    >
                      Prev
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (num) => (
                      <li key={num}>
                        <button
                          onClick={() => paginate(num)}
                          className={`px-4 py-2 rounded-md border ${
                            currentPage === num
                              ? "bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white border-primary-600"
                              : "border-gray-300"
                          }`}
                          aria-current={
                            currentPage === num ? "page" : undefined
                          }
                        >
                          {num}
                        </button>
                      </li>
                    )
                  )}
                  <li>
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-md border border-gray-300 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700">
              No Matches Found
            </h3>
            <p className="text-gray-500 mt-2">
              {searchTerm
                ? `Your search for "${searchTerm}" did not return any results.`
                : "No country guides are available at the moment."}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CountryGuides;
