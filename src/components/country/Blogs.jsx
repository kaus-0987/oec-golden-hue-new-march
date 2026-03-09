"use client";
import ajaxCall from "@/helpers/ajaxCall";
import Link from "next/link";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";

const Blogs = ({ country }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const response = await ajaxCall("/blog/blog/posts/", {
          method: "GET",
        });

        if (response?.data?.results?.length > 0) {
          const blogsData = response.data.results.filter(
            (blog) => blog.category_name === country
          );
          setBlogs(blogsData);
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
  }, [country]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col h-full bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden"
          >
            <div className="relative overflow-hidden animate-pulse">
              <div className="w-full h-56 bg-gray-300"></div>
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <div className="h-4 bg-gray-300 rounded w-1/3 mb-3"></div>
              <div className="h-5 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-5 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="space-y-2 flex-grow">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
            <div className="p-6 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <div className="h-4 bg-gray-300 rounded w-24"></div>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
                <div className="h-4 bg-gray-300 rounded w-28"></div>
              </div>
              <div className="mt-4 h-5 bg-gray-300 rounded w-24"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No blogs found for this country
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((article) => (
        <div
          key={article.id}
          className="group flex flex-col h-full bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 overflow-hidden"
        >
          <div className="relative overflow-hidden">
            <Link href={`/blog/${article.slug}`} aria-label={article.title}>
              <img
                src={article.featured_image}
                alt={article.title}
                width="400"
                height="225"
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </Link>
          </div>
          <div className="p-6 flex-grow flex flex-col">
            <p className="text-sm font-semibold text-white">
              {article.category_name}
            </p>
            <h3 className="mt-2 text-lg font-bold text-gray-900 group-hover:text-amber-900 transition-colors">
              <Link href={`/blog/${article.slug}`} className="line-clamp-2">
                {article.title}
              </Link>
            </h3>
            <p className="mt-3 text-sm text-amber-700 line-clamp-3 flex-grow">
              {article.excerpt}
            </p>
          </div>
          <div className="p-6 pt-4 border-t border-gray-100">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-white" />
                {article.author_name}
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-white" />
                {moment(article.published_at).format("MMM D, YYYY")}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-white" />
                {article.reading_time} min read
              </div>
            </div>
            <Link
              href={`/blog/${article.slug}`}
              className="mt-4 inline-flex items-center gap-1 font-semibold text-primary-600 hover:text-amber-900"
            >
              Read More
              <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
