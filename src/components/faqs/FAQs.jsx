"use client";
import React, { useEffect, useState } from "react";
import ajaxCall from "@/helpers/ajaxCall";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  HelpCircle,
  BookOpen,
  Globe,
  GraduationCap,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const FAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [expandedFaqs, setExpandedFaqs] = useState({});
  const [activeCategory, setActiveCategory] = useState(null);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
    currentPage: 1,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await ajaxCall("/faq/categories/", { method: "GET" });
        if (response?.data?.results?.length > 0) {
          setCategories(response.data.results);
          setActiveCategory(response.data.results[0].slug);
        }
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const fetchFaqs = async (page = 1, categorySlug = null) => {
    setIsLoading(true);
    try {
      let url = `/faq/faqs/?page=${page}`;
      if (categorySlug) {
        const category = categories.find((cat) => cat.slug === categorySlug);
        if (category) {
          url += `&category=${category.id}`;
        }
      }

      const response = await ajaxCall(url, { method: "GET" });

      if (response?.data?.results?.length > 0) {
        setFaqs(response.data.results);
        setPagination({
          count: response.data.count,
          next: response.data.next,
          previous: response.data.previous,
          currentPage: page,
        });
      } else {
        setFaqs([]);
      }
    } catch (error) {
      console.log("Error fetching FAQs:", error);
      setFaqs([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeCategory) {
      fetchFaqs(1, activeCategory);
    }
  }, [activeCategory, categories]);

  const handleCategoryChange = (categorySlug) => {
    setActiveCategory(categorySlug);
    setExpandedFaqs({});
  };

  const handlePageChange = (page) => {
    fetchFaqs(page, activeCategory);
    window.scrollTo({
      top: document.getElementById("faq-content").offsetTop - 100,
      behavior: "smooth",
    });
  };

  const toggleFaq = (id) => {
    setExpandedFaqs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getCategoryIcon = (categoryName) => {
    switch (categoryName.toLowerCase()) {
      case "general questions":
        return <HelpCircle className="h-5 w-5" />;
      case "usa education":
        return <BookOpen className="h-5 w-5" />;
      case "canada education":
        return <Globe className="h-5 w-5" />;
      case "uk education":
        return <GraduationCap className="h-5 w-5" />;
      case "work opportunities":
        return <Briefcase className="h-5 w-5" />;
      default:
        return <HelpCircle className="h-5 w-5" />;
    }
  };

  const filteredFaqs = faqs.filter((faq) => {
    if (!activeCategory) return false;
    const category = categories.find((cat) => cat.slug === activeCategory);
    return category ? faq.category_name === category.name : false;
  });

  const totalPages = Math.ceil(pagination.count / 20);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white mt-20 py-20 md:py-32 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">FAQs</h1>
          <p className="text-white text-xl md:text-2xl max-w-5xl mx-auto">
            Expert advice, guides, and latest updates for your international
            education journey
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading && !faqs.length ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1 space-y-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-12 bg-gray-200 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
            <div className="md:col-span-3 space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="p-6 bg-white rounded-lg shadow">
                  <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-amber-900" />
                Categories
              </h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.slug)}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                      activeCategory === category.slug
                        ? "bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white"
                        : "bg-white text-gray-700 hover:bg-primary-100"
                    }`}
                  >
                    {getCategoryIcon(category.name)}
                    <span>{category.name}</span>
                    <span className="ml-auto bg-primary-100 text-amber-900 text-xs font-bold px-2 py-1 rounded-full">
                      {category.faq_count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-3" id="faq-content">
              {activeCategory && (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    {getCategoryIcon(
                      categories.find((cat) => cat.slug === activeCategory)
                        ?.name
                    )}
                    <h2 className="text-2xl font-bold text-amber-900">
                      {
                        categories.find((cat) => cat.slug === activeCategory)
                          ?.name
                      }
                    </h2>
                  </div>
                  <p className="text-amber-700 mb-8">
                    {
                      categories.find((cat) => cat.slug === activeCategory)
                        ?.description
                    }
                  </p>
                </>
              )}

              {filteredFaqs.length > 0 ? (
                <>
                  <div className="space-y-4">
                    {filteredFaqs.map((faq) => (
                      <div
                        key={faq.id}
                        className="bg-white rounded-lg shadow overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                        >
                          <h3 className="text-lg font-semibold text-amber-900">
                            {faq.question}
                          </h3>
                          <motion.div
                            animate={{
                              rotate: expandedFaqs[faq.id] ? 180 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="h-5 w-5 text-amber-900" />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {expandedFaqs[faq.id] && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="px-6 pb-6 text-amber-700"
                            >
                              <p>{faq.answer_preview}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>

                  {pagination.count > 20 && (
                    <div className="mt-8 flex justify-center items-center gap-2">
                      <button
                        onClick={() =>
                          handlePageChange(pagination.currentPage - 1)
                        }
                        disabled={!pagination.previous}
                        className={`p-2 rounded-md ${
                          !pagination.previous
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-amber-900 hover:bg-primary-100"
                        }`}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>

                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (pagination.currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (pagination.currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = pagination.currentPage - 2 + i;
                          }

                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`w-10 h-10 rounded-md flex items-center justify-center ${
                                pagination.currentPage === pageNum
                                  ? "bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white"
                                  : "text-gray-700 hover:bg-primary-100"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                      )}

                      {totalPages > 5 &&
                        pagination.currentPage < totalPages - 2 && (
                          <span className="px-2">...</span>
                        )}

                      {totalPages > 5 &&
                        pagination.currentPage < totalPages - 2 && (
                          <button
                            onClick={() => handlePageChange(totalPages)}
                            className={`w-10 h-10 rounded-md flex items-center justify-center ${
                              pagination.currentPage === totalPages
                                ? "bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white"
                                : "text-gray-700 hover:bg-primary-100"
                            }`}
                          >
                            {totalPages}
                          </button>
                        )}

                      <button
                        onClick={() =>
                          handlePageChange(pagination.currentPage + 1)
                        }
                        disabled={!pagination.next}
                        className={`p-2 rounded-md ${
                          !pagination.next
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-amber-900 hover:bg-primary-100"
                        }`}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-amber-900 mb-2">
                    No FAQs found in this category
                  </h3>
                  <p className="text-amber-700">
                    We couldn't find any frequently asked questions for this
                    category.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-16 bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 rounded-xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Still have questions?
          </h3>
          <p className="text-white text-lg mb-6 max-w-3xl mx-auto">
            Our education consultants are ready to help you with any questions
            about studying abroad.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-6 py-3 bg-white text-amber-900 font-medium rounded-lg hover:bg-gray-100 transition-colors">
              Contact Our Experts
            </button>
            <button className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors">
              Book Free Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
