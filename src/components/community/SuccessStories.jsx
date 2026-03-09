"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Star } from "lucide-react";
import ajaxCall from "@/helpers/ajaxCall";

const SuccessStories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setIsLoading(true);
      try {
        const response = await ajaxCall("/testimonials/testimonials/", {
          method: "GET",
        });

        if (response?.data?.results?.length > 0) {
          setTestimonials(response.data.results.slice(0, 3));
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

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-amber-900 mb-4">
          OEC Success Stories
        </h3>
        <p className="text-amber-700 max-w-2xl mx-auto">
          Discover how our students transformed their dreams into reality with
          our guidance and support
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : testimonials.length > 0 ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {testimonials
              .filter((t) => t.is_featured)
              .sort((a, b) => a.order - b.order)
              .map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
                >
                  <div className="p-6 flex-grow">
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mr-4 text-primary-600 font-bold text-xl">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">
                          {testimonial.name}
                        </h4>
                        <p className="text-amber-700 text-sm">
                          {testimonial.designation}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>

                    <div className="flex mb-2">
                      {renderStars(testimonial.rating)}
                    </div>

                    <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-lg mb-4">
                      <p className="text-gray-700 text-sm italic line-clamp-4">
                        "{testimonial.content}"
                      </p>
                    </div>

                    <div className="text-xs text-gray-500 mt-auto">
                      Shared {moment(testimonial.created_at).fromNow()}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white p-8 rounded-xl text-center">
            <h3 className="text-2xl font-bold mb-4">
              Want to Share Your Success Story?
            </h3>
            <p className="mb-6 text-white opacity-90">
              Inspire future students by sharing your journey with the OEC
              community
            </p>
            <button className="bg-white text-primary-600 hover:text-amber-900 px-6 py-3 rounded-lg font-semibold transition-colors">
              Share My Story
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500">No success stories available yet</p>
        </div>
      )}
    </div>
  );
};

export default SuccessStories;
