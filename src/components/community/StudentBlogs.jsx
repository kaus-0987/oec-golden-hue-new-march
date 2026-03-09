"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import ajaxCall from "@/helpers/ajaxCall";
import { Globe, Trophy, Lightbulb, Coffee, Eye, User } from "lucide-react";

const StudentBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [popularCategories, setPopularCategories] = useState([]);

  const categoryIcons = [Globe, Trophy, Lightbulb, Coffee];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [categoriesResponse, blogsResponse] = await Promise.all([
          ajaxCall("/blog/blog/categories/", { method: "GET" }),
          ajaxCall("/blog/blog/posts/", { method: "GET" }),
        ]);

        const blogResults = blogsResponse?.data?.results || [];
        const categoryResults = categoriesResponse?.data?.results || [];

        setBlogs(blogResults);
        setCategories(categoryResults);

        if (categoryResults.length > 0) {
          const shuffledCategories = [...categoryResults].sort(
            () => 0.5 - Math.random()
          );
          setPopularCategories(shuffledCategories.slice(0, 4));
        }

        if (blogResults.length > 0) {
          const shuffledBlogs = [...blogResults].sort(
            () => 0.5 - Math.random()
          );
          setFeaturedBlogs(shuffledBlogs.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setCategories([]);
        setBlogs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-amber-900 mb-2">
          Student Experiences
        </h3>
        <p className="text-amber-700 max-w-2xl mx-auto">
          Real stories and advice from OEC students studying across the globe.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : featuredBlogs.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredBlogs.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full group"
              >
                <div className="relative h-48 w-full">
                  {post.featured_image ? (
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-primary-100 to-secondary-100 flex items-center justify-center">
                      <Lightbulb className="w-12 h-12 text-primary-600" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-amber-900">
                      {post.category_name}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <h4 className="font-semibold text-lg mb-3 line-clamp-2 text-black group-hover:text-primary-700">
                    {post.title}
                  </h4>

                  <div className="flex items-center mb-4">
                    <User className="w-4 h-4 text-gray-500 mr-2" />
                    <p className="font-medium text-sm text-gray-700">
                      {post.author_name}
                    </p>
                    <span className="mx-2 text-gray-300">•</span>
                    <p className="text-gray-500 text-xs">
                      {moment(post.published_at).fromNow()}
                    </p>
                  </div>

                  <p className="text-amber-700 text-sm mb-4 line-clamp-3 flex-grow">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1.5" />
                      <span>{post.views_count} views</span>
                    </div>
                    <a
                      href={`/blog/${post.slug}`}
                      className="text-amber-900 font-medium hover:text-primary-600"
                    >
                      Read More →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500">
            No blog posts available yet. Please check back soon!
          </p>
        </div>
      )}

      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-amber-900 mb-6 text-center">
          Popular Blog Categories
        </h3>
        {popularCategories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularCategories.map((category, index) => {
              const IconComponent = categoryIcons[index % categoryIcons.length];
              const blogCount = blogs.filter(
                (blog) => blog.category_name === category.name
              ).length;

              return (
                <div
                  key={category.id}
                  className="bg-white/70 backdrop-blur-sm p-4 rounded-lg text-center hover:shadow-lg hover:bg-white transition-all cursor-pointer"
                >
                  <IconComponent className="w-8 h-8 text-white mx-auto mb-3" />
                  <h4 className="font-semibold text-sm text-black">
                    {category.name}
                  </h4>
                  <p className="text-amber-700 text-xs mt-1">
                    {blogCount} {blogCount === 1 ? "post" : "posts"}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500">
              No categories to display at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentBlogs;
