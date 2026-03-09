"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";
import ajaxCall from "@/helpers/ajaxCall";
import {
  Globe,
  Trophy,
  ArrowRight,
  GraduationCap,
  Building,
  Plane,
  DollarSign,
  FileText,
  Target,
} from "lucide-react";

const knowledgeCategories = [
  {
    name: "Getting Started",
    href: "/",
    icon: Target,
  },
  {
    name: "University Selection",
    href: "/universities",
    icon: Building,
  },
  {
    name: "Application Process",
    href: "/resources",
    icon: FileText,
  },
  {
    name: "Visa Guidance",
    href: "/faqs",
    icon: Plane,
  },
  {
    name: "Financial Planning",
    href: "/finance",
    icon: DollarSign,
  },
  {
    name: "Test Preparation",
    href: "/test-preparation",
    icon: GraduationCap,
  },
  {
    name: "Living Abroad",
    href: "/country-guides",
    icon: Globe,
  },
  {
    name: "Career Guidance",
    href: "/contact-us",
    icon: Trophy,
  },
];

const KnowledgeBase = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const response = await ajaxCall("/blog/blog/posts/", {
          method: "GET",
        });

        const featuredBlogs =
          response?.data?.results?.filter((blog) => blog.is_featured) || [];

        if (featuredBlogs.length > 0) {
          const shuffledBlogs = [...featuredBlogs].sort(
            () => 0.5 - Math.random()
          );
          setBlogs(shuffledBlogs.slice(0, 2));
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

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {knowledgeCategories.map(({ name, href, icon: Icon }, index) => (
          <div
            key={index}
            className="bg-white border-2 border-primary-600 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
          >
            <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-amber-900 mb-2">{name}</h3>
            <Link
              href={href}
              className="flex items-center text-primary-600 text-sm font-medium"
            >
              Explore <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-amber-900 mb-6">
          Featured Knowledge Articles
        </h3>
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                    <GraduationCap className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{blog.title}</h4>
                    <p className="text-sm text-amber-700">
                      Published {moment(blog.published_at).fromNow()}
                    </p>
                  </div>
                </div>
                <p className="text-amber-700 text-sm mb-4 line-clamp-2">
                  {blog.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {blog.reading_time} min read
                  </span>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="text-primary-600 text-sm font-medium hover:text-amber-900"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No featured articles available
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeBase;
