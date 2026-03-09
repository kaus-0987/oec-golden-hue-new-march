"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import ajaxCall from "@/helpers/ajaxCall";
import { Download, Search, Frown } from "lucide-react";

const Resources = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

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
        console.error("Error fetching countries:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await ajaxCall("/resources/resources/categories/", {
          method: "GET",
        });
        if (response?.data?.results?.length > 0) {
          setCategories(response.data.results);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchResources = async () => {
      try {
        const response = await ajaxCall("/resources/resources/resources/", {
          method: "GET",
        });
        if (response?.data?.results?.length > 0) {
          setResources(response.data.results);
        } else {
          setResources([]);
        }
      } catch (error) {
        console.error("Error fetching resources:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountries();
    fetchCategories();
    fetchResources();
  }, []);

  const filteredResources = resources.filter((resource) => {
    const matchesTab =
      activeTab === "all" ||
      resource.category_name.toLowerCase() === activeTab.toLowerCase();
    const matchesCountry =
      selectedCountry === "all" ||
      resource.country_name
        .toLowerCase()
        .includes(selectedCountry.toLowerCase());
    const matchesSearch = resource.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesTab && matchesCountry && matchesSearch;
  });

  const handleDownload = (pdfUrl, title) => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `${title}.pdf` || "resource.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white mt-20 py-20 md:py-32 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Resources & Insights
          </h1>
          <p className="text-white text-xl md:text-2xl max-w-4xl mx-auto">
            Comprehensive guides, latest updates, and expert insights to help
            you make informed decisions about your international education
            journey
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {isLoading ? (
          <>
            <div className="mb-8">
              <div className="relative mb-6 animate-pulse">
                <div className="h-14 w-full bg-gray-300 rounded-lg"></div>
              </div>
              <div className="flex flex-wrap gap-2 mb-6 animate-pulse">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-10 bg-gray-300 rounded-full w-32"
                  ></div>
                ))}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/4">
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                  <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="space-y-3">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-3">
                          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
                          <div className="h-5 bg-gray-300 rounded w-4/6"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-3/4">
                <div className="h-8 bg-gray-300 rounded w-1/2 mb-6 animate-pulse"></div>
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
                    >
                      <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-4 py-1">
                          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                          <div className="space-y-3">
                            <div className="h-6 bg-gray-300 rounded"></div>
                            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                            <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                          </div>
                          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                          <div className="flex justify-between pt-2">
                            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                          </div>
                        </div>
                        <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mb-8">
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  className={`px-4 py-2 rounded-full ${
                    activeTab === "all"
                      ? "bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white"
                      : "bg-primary-100 text-amber-900 hover:bg-primary-200 border border-primary-800"
                  }`}
                  onClick={() => setActiveTab("all")}
                >
                  All Resources
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`px-4 py-2 rounded-full ${
                      activeTab === category.slug
                        ? "bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white"
                        : "bg-primary-100 text-amber-900 hover:bg-primary-200 border border-primary-800"
                    }`}
                    onClick={() => setActiveTab(category.slug)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/4">
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                  <h3 className="font-bold text-lg mb-4 text-amber-900">
                    Filter by Country
                  </h3>
                  <div className="space-y-2 max-h-[500px] overflow-y-auto">
                    <button
                      className={`w-full text-left flex items-center px-3 py-2 rounded-md ${
                        selectedCountry === "all"
                          ? "bg-primary-100 text-amber-900 border border-primary-800"
                          : "hover:bg-primary-100 hover:border hover:border-primary-800"
                      }`}
                      onClick={() => setSelectedCountry("all")}
                    >
                      <span>All Countries</span>
                    </button>
                    {countries.map((country) => (
                      <button
                        key={country.id}
                        className={`w-full text-left flex items-center px-3 py-2 rounded-md ${
                          selectedCountry === country.name
                            ? "bg-primary-100 text-amber-900 border border-primary-800"
                            : "hover:bg-primary-100 hover:border hover:border-primary-800"
                        }`}
                        onClick={() => setSelectedCountry(country.name)}
                      >
                        {country.flag_image && (
                          <div className="w-6 h-6 mr-3 rounded-full overflow-hidden flex-shrink-0">
                            <img
                              src={country.flag_image}
                              alt={`${country.name} flag`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <span>{country.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full md:w-3/4">
                <h2 className="text-2xl font-bold mb-6 text-amber-900">
                  {selectedCountry === "all"
                    ? "All Resources"
                    : `Resources for ${selectedCountry}`}
                </h2>

                {filteredResources.length > 0 ? (
                  <div className="space-y-4">
                    {filteredResources.map((resource) => (
                      <div
                        key={resource.id}
                        className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-300"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-grow pr-4">
                            <div className="mb-2">
                              <span className="bg-primary-100 text-amber-900 border border-primary-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                {resource.category_name}
                              </span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-amber-900">
                              {resource.title}
                            </h3>
                          </div>
                          <button
                            onClick={() =>
                              handleDownload(resource.pdf_file, resource.title)
                            }
                            className="flex-shrink-0 flex items-center justify-center p-2 rounded-full bg-secondary-100 hover:bg-secondary-200 transition-colors"
                            title="Download PDF"
                          >
                            <Download className="h-5 w-5 text-white" />
                          </button>
                        </div>
                        <div className="mb-2 text-sm text-amber-700">
                          <span>Country: {resource.country_name}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-amber-700">
                          <span>
                            Published:{" "}
                            {moment(resource.publication_date).format(
                              "DD MMM YYYY"
                            )}
                          </span>
                          <span>{resource.author}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Frown className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">
                      No resources found
                    </h3>
                    <p className="mt-1 text-gray-500">
                      Try adjusting your search or filter to find what you're
                      looking for.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Resources;
