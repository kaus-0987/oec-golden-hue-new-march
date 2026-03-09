"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ajaxCall from "@/helpers/ajaxCall";
import parse from 'html-react-parser';
import { ChevronDown, ArrowRight, Globe } from "lucide-react";

const ExpandableSection = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-xl mb-4 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left bg-primary-50 hover:bg-primary-100 transition-colors flex items-center justify-between"
      >
        <h3 className="text-lg font-semibold text-amber-900">{title}</h3>
        <ChevronDown
          className={`w-5 h-5 text-primary-600 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && <div className="p-6 bg-white">{children}</div>}
    </div>
  );
};

const CountryGuides = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        const response = await ajaxCall("/academics/academics/countries/", {
          method: "GET",
        });

        if (response?.data?.results?.length > 0) {
          setCountries(response.data.results);
        } else {
          setCountries([]);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCountries = countries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(countries.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-amber-900 mb-4">
          Country-Specific Guides
        </h3>
        <p className="text-amber-700 max-w-2xl mx-auto">
          Comprehensive guides for popular study destinations with insights from
          our alumni network
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : countries.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentCountries.map((country) => (
              <div
                key={country.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
              >
                <div className="p-6 flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      {country.flag_image ? (
                        <img
                          src={country.flag_image}
                          alt={`${country.name} flag`}
                          className="w-12 h-8 object-cover rounded-sm mr-3"
                        />
                      ) : (
                        <span className="mr-3 text-primary-500">
                          <Globe size={32} />
                        </span>
                      )}
                      <h4 className="font-semibold text-lg">{country.name}</h4>
                    </div>
                    <div className="text-xs bg-primary-100 text-amber-900 px-2 py-1 rounded">
                      {country.university_count} universities
                    </div>
                  </div>

                  <div className="prose prose-sm max-w-none text-amber-700 line-clamp-3 mb-4">
                    {parse(
                      country.description
                        .replace(/<[^>]+>/g, "")
                        .substring(0, 200)
                    )}
                    ...
                  </div>

                  <div className="space-y-2 mt-auto">
                    <Link
                      href={`/country-guides/${country.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="w-full flex items-center justify-center bg-primary-100 text-amber-900 py-2 px-4 rounded-lg text-sm font-medium hover:bg-primary-200 transition-colors"
                    >
                      View Guide <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 mb-12">
              <nav className="flex items-center gap-1">
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`px-3 py-1 rounded-md border ${
                        currentPage === number
                          ? "bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white border-primary-800"
                          : "border-gray-300"
                      }`}
                    >
                      {number}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    paginate(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500">
            No country guides available yet. Please check back later.
          </p>
        </div>
      )}

      <ExpandableSection title="Popular Country Comparisons" defaultOpen={true}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold mb-3">🇺🇸 USA vs 🇨🇦 Canada</h4>
            <ul className="space-y-2 text-sm text-amber-700">
              <li>• Cost comparison and scholarship opportunities</li>
              <li>• Immigration policies and work permits</li>
              <li>• University rankings and program quality</li>
              <li>• Living standards and cultural differences</li>
            </ul>
            <button className="mt-3 text-primary-600 text-sm font-medium hover:text-amber-900">
              Read Comparison <ArrowRight className="inline w-4 h-4" />
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold mb-3">🇬🇧 UK vs 🇦🇺 Australia</h4>
            <ul className="space-y-2 text-sm text-amber-700">
              <li>• Post-study work opportunities</li>
              <li>• Weather and lifestyle factors</li>
              <li>• Course duration and curriculum</li>
              <li>• Healthcare and safety considerations</li>
            </ul>
            <button className="mt-3 text-primary-600 text-sm font-medium hover:text-amber-900">
              Read Comparison <ArrowRight className="inline w-4 h-4" />
            </button>
          </div>
        </div>
      </ExpandableSection>
    </div>
  );
};

export default CountryGuides;
