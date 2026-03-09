"use client";
import React, { useEffect, useState } from "react";

const ShimmerEffect = () => (
  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-gray-300/50 to-transparent"></div>
);

const Skeleton = ({ className }) => (
  <div
    className={`relative overflow-hidden bg-gray-200 rounded-md ${className}`}
  >
    <ShimmerEffect />
  </div>
);

const NewsCard = ({ article }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
    {article.image && (
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.src = "/default-news-image.jpg";
          e.target.onerror = null;
        }}
      />
    )}
    <div className="p-4 flex-grow">
      <h3 className="font-bold text-lg mb-2 line-clamp-2">{article.title}</h3>
      <p className="text-amber-700 text-sm mb-3 line-clamp-3">
        {article.description}
      </p>
      <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
        <span>{article.source?.name || "Unknown Source"}</span>
        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
      </div>
    </div>
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 text-primary-600 hover:text-amber-900 text-sm font-medium border-t border-gray-100"
    >
      Read More →
    </a>
  </div>
);

const News = ({ activeTab, countryData }) => {
  const [news, setNews] = useState([]);
  const [isNewsLoading, setIsNewsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  const itemsPerPage = 6;
  const maxVisiblePages = 5;

  useEffect(() => {
    if (activeTab === "latest-news" && countryData) {
      const fetchNews = async () => {
        setIsNewsLoading(true);
        setError(null);
        try {
          const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
          const query = encodeURIComponent(
            `${countryData.name} university OR education`
          );
          const response = await fetch(
            `https://gnews.io/api/v4/search?q=${query}&lang=en&country=${countryData.code}&page=${currentPage}&max=${itemsPerPage}&apikey=${apiKey}`
          );

          if (!response.ok) {
            throw new Error(
              `API request failed with status ${response.status}`
            );
          }

          const data = await response.json();

          if (data?.articles) {
            setNews(data.articles);
            setTotalPages(Math.ceil(data.totalArticles / itemsPerPage));
          } else {
            setNews([]);
            setTotalPages(1);
          }
        } catch (err) {
          console.error("Failed to fetch news:", err);
          setError(err.message);
          setNews([]);
        } finally {
          setIsNewsLoading(false);
        }
      };

      fetchNews();
    }
  }, [activeTab, countryData, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded-md ${
            currentPage === i
              ? "bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md bg-white text-gray-700 disabled:opacity-50 hover:bg-gray-100"
        >
          «
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md bg-white text-gray-700 disabled:opacity-50 hover:bg-gray-100"
        >
          ‹
        </button>

        {startPage > 1 && <span className="px-2 py-1">...</span>}

        {pages}

        {endPage < totalPages && <span className="px-2 py-1">...</span>}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md bg-white text-gray-700 disabled:opacity-50 hover:bg-gray-100"
        >
          ›
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md bg-white text-gray-700 disabled:opacity-50 hover:bg-gray-100"
        >
          »
        </button>
      </div>
    );
  };

  if (activeTab !== "latest-news") return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-amber-900 mb-6">
        Latest Education News from {countryData?.name || ""}
      </h2>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {isNewsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: itemsPerPage }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-4 h-full">
              <Skeleton className="h-48 w-full mb-4" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : news.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <NewsCard key={`${article.url}-${index}`} article={article} />
            ))}
          </div>
          {renderPagination()}
        </>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500">
            No recent news articles found. Please try again later.
          </p>
        </div>
      )}
    </div>
  );
};

export default News;
