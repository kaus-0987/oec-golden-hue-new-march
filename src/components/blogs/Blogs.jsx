"use client";
import React, { useState, useEffect, useMemo } from "react";
import moment from "moment";
import Link from "next/link";
import ajaxCall from "@/helpers/ajaxCall";
import {
  Calendar,
  User,
  Clock,
  ArrowRight,
  Grid,
  List,
  Search,
  BookOpen,
} from "lucide-react";

const Blogs = () => {
  const articlesPerPage = 6;
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await ajaxCall("/blog/blog/categories/", {
          method: "GET",
        });

        if (response?.data?.results?.length > 0) {
          setCategories(response.data.results);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.log("Error fetching categories:", error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const response = await ajaxCall("/blog/blog/posts/", {
          method: "GET",
        });

        if (response?.data?.results?.length > 0) {
          setBlogs(response.data.results);
        } else {
          setBlogs([]);
        }
      } catch (error) {
        console.log("Error fetching blogs:", error);
        setBlogs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredArticles = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        searchQuery === "" ||
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || blog.category_name === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, blogs]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  return (
    <div className="bg-gray-100">
      <header className="bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white mt-20 py-20 md:py-32 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Study Abroad Blogs
          </h1>
          <p className="text-white text-xl md:text-2xl max-w-4xl mx-auto">
            Expert advice, guides, and latest updates for your international
            education journey
          </p>
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-white" />
              <input
                type="search"
                placeholder="Search articles..."
                aria-label="Search articles"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-lg"
              />
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <div className="flex p-1 rounded-full bg-white/10 border border-white/20">
                <button
                  onClick={() => setViewMode("grid")}
                  aria-pressed={viewMode === "grid"}
                  className={`p-2 rounded-full ${
                    viewMode === "grid"
                      ? "bg-white text-white"
                      : "text-white hover:text-white/80"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  aria-pressed={viewMode === "list"}
                  className={`p-2 rounded-full ${
                    viewMode === "list"
                      ? "bg-white text-white"
                      : "text-white hover:text-white/80"
                  }`}
                  aria-label="List view"
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="sticky top-28 z-10 bg-white shadow-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                aria-pressed={selectedCategory === "all"}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === "all"
                    ? "bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white"
                    : "bg-white text-amber-900 hover:bg-primary-100 border border-primary-800"
                }`}
              >
                All Categories
              </button>
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category.name)}
                  aria-pressed={selectedCategory === category.name}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedCategory === category.name
                      ? "bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white"
                      : "bg-white text-amber-900 hover:bg-primary-100 border border-primary-800"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {isLoading ? (
            <div className="space-y-8">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, index) => (
                    <div
                      key={index}
                      className="flex flex-col h-full bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden animate-pulse"
                    >
                      <div className="w-full h-56 bg-gray-200"></div>
                      <div className="p-6 flex-grow flex flex-col space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded"></div>
                          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                      </div>
                      <div className="p-6 pt-4 border-t border-gray-100">
                        <div className="flex flex-wrap gap-4">
                          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                        </div>
                        <div className="mt-4 h-4 bg-gray-200 rounded w-1/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-8">
                  {[...Array(3)].map((_, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden animate-pulse"
                    >
                      <div className="w-full h-48 md:h-full bg-gray-200"></div>
                      <div className="p-6 md:col-span-2 space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded"></div>
                          <div className="h-4 bg-gray-200 rounded"></div>
                          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                        <div className="pt-4 border-t border-gray-100">
                          <div className="flex flex-wrap gap-4">
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : currentArticles.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
              <h2 className="mt-2 text-lg font-medium text-gray-900">
                No Articles Found
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or category filters.
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          ) : (
            <>
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentArticles.map((article) => (
                    <article
                      key={article.id}
                      className="group flex flex-col h-full bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 overflow-hidden"
                      itemScope
                      itemType="https://schema.org/BlogPosting"
                    >
                      <div className="relative overflow-hidden">
                        <Link
                          href={`/blog/${article.slug}`}
                          aria-label={article.title}
                          itemProp="url"
                        >
                          <img
                            src={article.featured_image}
                            alt={article.title}
                            width="400"
                            height="225"
                            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                            itemProp="image"
                            loading="lazy"
                          />
                        </Link>
                      </div>
                      <div className="p-6 flex-grow flex flex-col">
                        <p className="text-sm font-semibold text-white">
                          <span itemProp="articleSection">
                            {article.category_name}
                          </span>
                        </p>
                        <h3 className="mt-2 text-lg font-bold text-gray-900 group-hover:text-amber-900 transition-colors">
                          <Link
                            href={`/blog/${article.slug}`}
                            className="line-clamp-2"
                            itemProp="url"
                          >
                            <span itemProp="headline">{article.title}</span>
                          </Link>
                        </h3>
                        <p
                          className="mt-3 text-sm text-amber-700 line-clamp-3 flex-grow"
                          itemProp="description"
                        >
                          {article.excerpt}
                        </p>
                      </div>
                      <div className="p-6 pt-4 border-t border-gray-100">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                          <div
                            className="flex items-center gap-1.5"
                            itemProp="author"
                            itemScope
                            itemType="https://schema.org/Person"
                          >
                            <User className="h-4 w-4 text-white" />
                            <span itemProp="name">{article.author_name}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-white" />
                            <time
                              dateTime={moment(article.published_at).format(
                                "YYYY-MM-DD"
                              )}
                              itemProp="datePublished"
                            >
                              {moment(article.published_at).format(
                                "MMM D, YYYY"
                              )}
                            </time>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-white" />
                            {article.reading_time} min read
                          </div>
                        </div>
                        <Link
                          href={`/blog/${article.slug}`}
                          className="mt-4 inline-flex items-center gap-1 font-semibold text-primary-600 hover:text-amber-900"
                          aria-label={`Read more about ${article.title}`}
                        >
                          Read More
                          <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="space-y-8">
                  {currentArticles.map((article) => (
                    <article
                      key={article.id}
                      className="group grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden"
                      itemScope
                      itemType="https://schema.org/BlogPosting"
                    >
                      <div className="relative h-full md:col-span-1">
                        <Link href={`/blog/${article.slug}`} itemProp="url">
                          <img
                            src={article.featured_image}
                            alt={article.title}
                            width="400"
                            height="300"
                            className="w-full h-48 md:h-full object-cover"
                            itemProp="image"
                            loading="lazy"
                          />
                        </Link>
                      </div>
                      <div className="p-6 md:col-span-2">
                        <p className="text-sm font-semibold text-white">
                          <span itemProp="articleSection">
                            {article.category_name}
                          </span>
                        </p>
                        <h2 className="mt-2 text-xl font-bold text-gray-900 group-hover:text-amber-900 transition-colors">
                          <Link href={`/blog/${article.slug}`} itemProp="url">
                            <span itemProp="headline">{article.title}</span>
                          </Link>
                        </h2>
                        <p
                          className="mt-3 text-base text-amber-700"
                          itemProp="description"
                        >
                          {article.excerpt}
                        </p>
                        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                            <div
                              className="flex items-center gap-1.5"
                              itemProp="author"
                              itemScope
                              itemType="https://schema.org/Person"
                            >
                              <User className="h-4 w-4 text-white" />
                              <span itemProp="name">{article.author_name}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-4 w-4 text-white" />
                              <time
                                dateTime={moment(article.published_at).format(
                                  "YYYY-MM-DD"
                                )}
                                itemProp="datePublished"
                              >
                                {moment(article.published_at).format(
                                  "MMM D, YYYY"
                                )}
                              </time>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-4 w-4 text-white" />
                              {article.reading_time} min read
                            </div>
                          </div>
                          <Link
                            href={`/blog/${article.slug}`}
                            className="font-semibold text-primary-600 inline-flex items-center gap-1 hover:text-amber-900 whitespace-nowrap"
                            aria-label={`Read more about ${article.title}`}
                          >
                            Read More{" "}
                            <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <div className="mt-16 flex justify-center">
                  <nav
                    className="flex items-center gap-2"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                      aria-label="Previous page"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          aria-current={
                            currentPage === page ? "page" : undefined
                          }
                          className={`w-10 h-10 rounded-md text-sm font-medium transition-colors ${
                            currentPage === page
                              ? "bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white"
                              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                          aria-label={`Go to page ${page}`}
                        >
                          {page}
                        </button>
                      )
                    )}
                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(p + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                      aria-label="Next page"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Blogs;
