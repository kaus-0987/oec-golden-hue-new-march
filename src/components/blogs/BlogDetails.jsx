"use client";
import React, { useState, useEffect } from "react";
import moment from "moment";
import Link from "next/link";
import ajaxCall from "@/helpers/ajaxCall";
import { notFound } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Share2,
  Bookmark,
  Heart,
  Twitter,
  Instagram,
  Facebook,
  Tag,
  ArrowUp,
  ArrowLeft,
} from "lucide-react";

const shareIcons = [
  {
    icon: Twitter,
    label: "Twitter",
    platform: "twitter",
    color: "hover:bg-blue-50 hover:text-blue-500",
  },
  {
    icon: Instagram,
    label: "Instagram",
    platform: "instagram",
    color: "hover:bg-blue-50 hover:text-blue-700",
  },
  {
    icon: Facebook,
    label: "Facebook",
    platform: "facebook",
    color: "hover:bg-blue-50 hover:text-blue-600",
  },
];

const BlogDetails = ({ slug }) => {
  const [blog, setBlog] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      try {
        const response = await ajaxCall(`/blog/blog/posts/${slug}/`, {
          method: "GET",
        });
        if (response?.data) {
          setBlog(response.data);
        } else {
          notFound();
        }
      } catch (error) {
        console.log("Error fetching blog:", error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = (platform) => {
    const urls = {
      twitter: "https://x.com/oec_india",
      instagram: "https://www.instagram.com/oecdubai",
      facebook: "https://www.facebook.com/oecbaroda",
    };

    if (urls[platform]) {
      window.open(urls[platform], "_blank");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-primary-50">
        <div className="space-y-4 w-full max-w-lg">
          <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-5/6 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse"></div>
          <div className="flex items-center gap-4 mt-8">
            <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>
          </div>
          <div className="w-full h-64 bg-gray-200 rounded-xl mt-8 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return notFound();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      itemScope
      itemType="https://schema.org/BlogPosting"
      className="min-h-screen w-full flex flex-col bg-gray-100"
    >
      <header className="relative overflow-hidden pt-20">
        <div className="container mx-auto px-4 pt-10 pb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-8 mb-8"
          >
            <Link
              href="/blog"
              className="group flex items-center gap-2 text-primary-600 hover:text-amber-900 transition-colors font-medium"
              aria-label="Back to all blog articles"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              Back to All Articles
            </Link>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-3 mb-6">
              {blog.tags?.map((tag) => (
                <span
                  key={tag.id}
                  className="px-4 py-1.5 bg-primary-100/80 text-amber-900 rounded-full text-sm font-medium flex items-center gap-2"
                  itemProp="keywords"
                >
                  <Tag className="w-4 h-4" />
                  {tag.name}
                </span>
              ))}
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight"
              itemProp="headline"
            >
              {blog.title}
            </h1>
            <p className="text-xl text-amber-700 mb-8" itemProp="description">
              {blog.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-12">
              <div
                className="flex items-center gap-4"
                itemProp="author"
                itemScope
                itemType="https://schema.org/Person"
              >
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-amber-900 font-bold">
                  {blog.author_name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-amber-900" itemProp="name">
                    {blog.author_name}
                  </div>
                  <div className="text-sm text-gray-500">Author</div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-white" />
                  <time
                    dateTime={moment(blog.published_at).format("YYYY-MM-DD")}
                    itemProp="datePublished"
                  >
                    {moment(blog.published_at).format("MMM D, YYYY")}
                  </time>
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-white" />
                  {blog.reading_time} min read
                </span>
              </div>
            </div>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden lg:flex flex-col gap-4 absolute -right-24 top-0"
              >
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`group p-3 rounded-xl transition-all duration-300 ${
                    isLiked
                      ? "bg-red-100 text-red-600"
                      : "bg-white hover:bg-red-50 text-white hover:text-red-500"
                  } shadow-sm hover:shadow-md`}
                  aria-label={
                    isLiked ? "Unlike this article" : "Like this article"
                  }
                >
                  <Heart
                    className={`w-5 h-5 transition-transform ${
                      isLiked ? "scale-110" : "group-hover:scale-110"
                    }`}
                    fill={isLiked ? "currentColor" : "none"}
                  />
                </button>
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`group p-3 rounded-xl transition-all duration-300 ${
                    isBookmarked
                      ? "bg-primary-100 text-primary-600"
                      : "bg-white hover:bg-primary-50 text-white hover:text-primary-600"
                  } shadow-sm hover:shadow-md`}
                  aria-label={
                    isBookmarked ? "Remove bookmark" : "Bookmark this article"
                  }
                >
                  <Bookmark
                    className={`w-5 h-5 transition-transform ${
                      isBookmarked ? "scale-110" : "group-hover:scale-110"
                    }`}
                    fill={isBookmarked ? "currentColor" : "none"}
                  />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowShareTooltip(!showShareTooltip)}
                    className="group p-3 rounded-xl bg-white hover:bg-gray-100 text-white hover:text-gray-700 transition-all duration-300 shadow-sm hover:shadow-md"
                    aria-label="Share options"
                    aria-expanded={showShareTooltip}
                  >
                    <Share2 className="w-5 h-5 transition-transform group-hover:scale-110" />
                  </button>
                  <AnimatePresence>
                    {showShareTooltip && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="absolute left-full ml-4 top-0 bg-white rounded-xl shadow-lg border border-gray-100 p-2 w-40"
                        role="menu"
                      >
                        <div className="flex flex-col gap-1">
                          {shareIcons.map(
                            ({ icon: Icon, label, platform, color }) => (
                              <button
                                key={platform}
                                onClick={() => handleShare(platform)}
                                className={`flex items-center gap-2 p-2 rounded-lg text-sm transition-colors w-full ${color}`}
                                role="menuitem"
                                aria-label={`Share on ${label}`}
                              >
                                <Icon className="w-4 h-4 text-white" />
                                <span>{label}</span>
                              </button>
                            )
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                src={blog.featured_image}
                alt={blog.title}
                className="w-full aspect-[16/8] object-cover rounded-2xl shadow-xl"
                itemProp="image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="relative">
        <div className="container mx-auto px-4 mt-[-4rem] z-10 relative">
          <div className="max-w-4xl mx-auto">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 md:p-10 mt-12 mb-12"
            >
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.content }}
                itemProp="articleBody"
              />
            </motion.article>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 p-4 bg-secondary-500 text-white rounded-full shadow-lg hover:opacity-90 hover:shadow-xl transition-all duration-300 z-50"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BlogDetails;
