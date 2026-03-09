"use client";
import React, { useEffect, useState } from "react";
import ajaxCall from "@/helpers/ajaxCall";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  Play,
  Pause,
} from "lucide-react";
import Image from "next/image";

const Testimonials = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setIsLoading(true);
      try {
        const response = await ajaxCall("/testimonials/testimonials/", {
          method: "GET",
        });
        console.log("response testimonials :::", response);
        if (response?.data?.results?.length > 0) {
          const formattedData = response.data.results.map((item) => ({
            id: item.id,
            name: item.name,
            program: item.designation,
            outcome: item.company,
            // image: item.name
            //   .split(" ")
            //   .map((n) => n[0])
            //   .join(""),
            image:
              item.image ||
              item.name
                .split(" ")
                .map((n) => n[0])
                .join(""),
            rating: item.rating,
            text: item.content,
            results:
              "OEC Dubai's guidance was crucial for my success story, leading to outstanding academic and career achievements.",
          }));
          setTestimonials(formattedData);
        } else {
          setTestimonials([]);
        }
      } catch (error) {
        console.log("Error fetching testimonials:", error);
        setTestimonials([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    if (testimonials.length <= 1 || isPaused) return;

    const autoScroll = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(autoScroll);
  }, [testimonials.length, isPaused]);

  const nextTestimonial = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    // Briefly pause auto-scroll when user manually navigates
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000); // Resume after 10 seconds
  };

  const prevTestimonial = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    // Briefly pause auto-scroll when user manually navigates
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000); // Resume after 10 seconds
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
    // Briefly pause auto-scroll when user manually navigates
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000); // Resume after 10 seconds
  };

  const currentTestimonial = testimonials[currentIndex];

  const isValidUrl = (value) => {
    if (!value || typeof value !== "string") return false;
    try {
      // new URL will throw if value is not an absolute URL
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <section
      className="py-20 bg-gray-50"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl font-bold text-amber-900 mb-4"
          >
            Premium Student Reviews
          </h2>
          <p className="text-lg sm:text-xl text-amber-700 max-w-3xl mx-auto px-4">
            Why are we the best study abroad consultants?
          </p>
          {testimonials.length > 1 && (
            <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
              {isPaused ? (
                <span className="flex items-center gap-1">
                  <Pause className="w-4 h-4" />
                  Auto-scroll paused
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Play className="w-4 h-4" />
                  Auto-scrolling every 5 seconds
                </span>
              )}
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="relative animate-pulse">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
                <div className="p-8 md:p-10">
                  <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="flex-shrink-0 w-full lg:w-1/3">
                      <div className="flex flex-col md:flex-row lg:flex-col items-center gap-6">
                        <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
                        <div className="text-center lg:text-left w-full">
                          <div className="h-7 bg-gray-200 rounded w-1/2 mx-auto lg:mx-0 mb-2"></div>
                          <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto lg:mx-0 mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto lg:mx-0 mb-4"></div>
                          <div className="flex justify-center lg:justify-start space-x-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className="h-6 w-6 bg-gray-200 rounded-full"
                              ></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 lg:border-l lg:border-gray-200 lg:pl-8 w-full">
                      <div className="h-10 w-10 bg-gray-200 rounded-lg mb-4"></div>
                      <div className="space-y-2 pl-8 -mt-8">
                        <div className="h-5 bg-gray-200 rounded w-full"></div>
                        <div className="h-5 bg-gray-200 rounded w-full"></div>
                        <div className="h-5 bg-gray-200 rounded w-5/6"></div>
                      </div>
                      <div className="bg-gray-100 rounded-xl p-5 mt-6">
                        <div className="h-5 bg-gray-200 rounded w-1/3 mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : !currentTestimonial ? (
          <div className="text-center text-amber-700">
            No testimonials available at the moment.
          </div>
        ) : (
          <div className="relative">
            <div
              className="max-w-6xl mx-auto"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
              tabIndex={0}
            >
              <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-primary-800 transition-all duration-500 ease-in-out">
                <div className="p-8 md:p-10">
                  <div className="flex flex-col lg:flex-row gap-8 items-start animate-fade-in-up">
                    <div className="flex-shrink-0 w-full lg:w-1/3">
                      <div className="flex flex-col md:flex-row lg:flex-col items-center gap-6">
                        {isValidUrl(currentTestimonial?.image) ? (
                          // safe to use next/image (host must still be allowed in next.config)
                          <Image
                            src={currentTestimonial.image}
                            alt={currentTestimonial.name || "testimonial"}
                            width={100}
                            height={100}
                            className="w-32 h-32 rounded-full object-cover"
                          />
                        ) : (
                          <div
                            className="w-32 h-32 rounded-full flex items-center justify-center text-3xl font-bold text-white bg-secondary-500"
                            aria-hidden="true"
                          >
                            {/* If the API provided initials text (e.g. "AS"), show it, otherwise derive from name */}
                            {typeof currentTestimonial?.image === "string" &&
                            currentTestimonial.image.length > 0
                              ? currentTestimonial.image
                              : (currentTestimonial?.name || "")
                                  .split(" ")
                                  .map((n) => n[0] || "")
                                  .slice(0, 2)
                                  .join("")
                                  .toUpperCase()}
                          </div>
                        )}
                        <div className="text-center lg:text-left">
                          <h3 className="text-2xl font-semibold mb-1 text-black">
                            {currentTestimonial.name}
                          </h3>
                          <p className="text-primary-700 mb-2">
                            {currentTestimonial.program}
                          </p>
                          <p className="text-sm text-primary-700 mb-4">
                            {currentTestimonial.outcome}
                          </p>
                          <div
                            className="flex justify-center lg:justify-start space-x-1 mb-4"
                            aria-label={`Rating: ${currentTestimonial.rating} out of 5 stars`}
                          >
                            {[...Array(currentTestimonial.rating)].map(
                              (_, i) => (
                                <Star
                                  key={i}
                                  className="h-6 w-6 text-yellow-400 fill-current"
                                  aria-hidden="true"
                                />
                              )
                            )}
                            {[...Array(5 - currentTestimonial.rating)].map(
                              (_, i) => (
                                <Star
                                  key={i}
                                  className="h-6 w-6 text-gray-300"
                                />
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 lg:border-l lg:border-primary-800 lg:pl-8">
                      <div className="relative">
                        <Quote
                          className="h-10 w-10 text-amber-900 mb-4 opacity-20"
                          aria-hidden="true"
                        />
                        <blockquote className="text-lg leading-relaxed mb-6 text-gray-700 pl-8 -mt-8">
                          "{currentTestimonial.text}"
                        </blockquote>
                      </div>

                      <div className="bg-primary-50 border border-primary-800 rounded-xl p-5">
                        <p className="text-primary-700">
                          {currentTestimonial.results}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center mt-10 space-x-6">
              <button
                onClick={prevTestimonial}
                className="p-3 bg-white border border-primary-800 rounded-full text-white hover:bg-primary-50 transition-colors duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-300 disabled:opacity-50"
                aria-label="Previous testimonial"
                disabled={testimonials.length < 2}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <div className="flex flex-col items-center space-y-4">
                {/* Progress indicator for auto-scroll */}
                {testimonials.length > 1 && !isPaused && (
                  <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      key={currentIndex} // Reset animation on each testimonial change
                      className={`h-full bg-secondary-500 testimonial-progress ${
                        isPaused ? "paused" : ""
                      }`}
                    />
                  </div>
                )}

                <div className="flex space-x-3">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToTestimonial(index)}
                      className={`w-4 h-4 rounded-full transition-all duration-200 focus:outline-none ${
                        index === currentIndex
                          ? "bg-secondary-500 scale-125"
                          : "bg-secondary-300"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={nextTestimonial}
                className="p-3 bg-white border border-primary-800 rounded-full text-white hover:bg-primary-50 transition-colors duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-300 disabled:opacity-50"
                aria-label="Next testimonial"
                disabled={testimonials.length < 2}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
