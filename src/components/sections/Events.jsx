"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";
import { motion } from "framer-motion";
import ajaxCall from "@/helpers/ajaxCall";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await ajaxCall("/events/events/events/", {
          method: "GET",
        });
        if (response?.data?.results?.length > 0) {
          setEvents(response.data.results);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.log("Error fetching events:", error);
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="py-20 bg-gray-100" aria-labelledby="services-heading">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl font-bold text-amber-900 mb-4"
          >
            What's happening with overseas education
          </h2>
          <p className="text-lg text-amber-700 mx-auto">
            Stay up-to-date with the latest updates on overseas education,
            student life, rules, COVID-19, and many more!
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-0">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="flex flex-col h-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
              >
                <div className="relative overflow-hidden h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="mt-3 h-6 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="mt-2 h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="h-3 w-40 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-8 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-amber-700">No upcoming events at the moment.</p>
            <p className="text-gray-500 mt-2">Check back later for updates!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-0">
            {events.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col h-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden"
              >
                <div className="relative overflow-hidden h-48">
                  <Link href={`/events/${event.slug}`} aria-label={event.title}>
                    <img
                      src={event.featured_image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder-event.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-white/90 text-amber-900 px-3 py-1 rounded-full text-xs font-bold">
                      {event.event_type === "fair" ? "FAIR" : "EVENT"}
                    </div>
                  </Link>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-semibold text-white">
                      {event.category_name}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      <span className="px-2 py-1 bg-primary-100 text-amber-900 rounded-full text-xs font-medium">
                        {event.event_type}
                      </span>
                      {event.is_online && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          Online
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="mt-3 text-xl font-bold text-gray-900 group-hover:text-amber-900 transition-colors">
                    <Link
                      href={`/events/${event.slug}`}
                      className="line-clamp-2"
                    >
                      {event.title}
                    </Link>
                  </h3>

                  <p className="mt-2 text-amber-700 text-sm line-clamp-2">
                    {event.short_description}
                  </p>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-amber-700">
                      <Calendar className="h-4 w-4 text-white" />
                      {moment(event.start_date).format("MMMM D, YYYY")}
                      {event.end_date &&
                        ` - ${moment(event.end_date).format("MMMM D, YYYY")}`}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-amber-700">
                      <Clock className="h-4 w-4 text-white" />
                      {event.start_time} - {event.end_time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-amber-700">
                      <MapPin className="h-4 w-4 text-white" />
                      {event.is_online ? "Online Event" : event.venue_name}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <Link
                      href={`/events/${event.slug}`}
                      className="inline-flex items-center gap-1 font-semibold text-primary-600 hover:text-amber-900"
                    >
                      View Details
                      <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                      href="/events#register"
                      className="px-4 py-2 bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors inline-block text-center"
                    >
                      Register Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/events"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            aria-label="Explore all study destinations"
          >
            Explore All Events
            <ArrowRight className="h-5 w-5 ml-2" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Events;
