"use client";
import React, { useState, useEffect, useMemo } from "react";
import moment from "moment";
import Link from "next/link";
import { motion } from "framer-motion";
import ajaxCall from "@/helpers/ajaxCall";
import ConsultationForm from "@/components/forms/ConsultationForm";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Grid,
  List,
  Search,
  Ticket,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  X,
} from "lucide-react";

const dateFilters = [
  { id: "all", name: "All Dates" },
  { id: "upcoming", name: "Upcoming Events" },
  { id: "past", name: "Past Events" },
  { id: "today", name: "Today" },
  { id: "this-week", name: "This Week" },
  { id: "this-month", name: "This Month" },
];

const Events = () => {
  const eventsPerPage = 6;
  const [events, setEvents] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("upcoming");
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showFloatingForm, setShowFloatingForm] = useState(false);

  // Check for #register hash in URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash === '#register') {
        setShowFloatingForm(true);
        // Remove hash from URL without triggering page reload
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  }, []);

  const handleRegister = (event) => {
    setSelectedEvent(event);
    setShowRegistrationModal(true);
  };

  // Extract country from event title or description
  const getEventCountry = (event) => {
    const title = event.title?.toLowerCase() || '';
    const category = event.category_name?.toLowerCase() || '';
    const description = event.short_description?.toLowerCase() || '';
    
    const countryKeywords = {
      'united kingdom': ['uk', 'united kingdom', 'britain', 'british'],
      'usa': ['usa', 'united states', 'america', 'american'],
      'canada': ['canada', 'canadian'],
      'australia': ['australia', 'australian'],
      'germany': ['germany', 'german'],
      'france': ['france', 'french'],
      'ireland': ['ireland', 'irish'],
      'new zealand': ['new zealand'],
    };

    for (const [country, keywords] of Object.entries(countryKeywords)) {
      if (keywords.some(keyword => 
        title.includes(keyword) || 
        category.includes(keyword) || 
        description.includes(keyword)
      )) {
        return country;
      }
    }
    
    return null;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await ajaxCall("/events/events/categories/", {
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

  const filteredEvents = useMemo(() => {
    const today = moment().startOf("day");
    const endOfWeek = moment().endOf("week");
    const endOfMonth = moment().endOf("month");

    return events.filter((event) => {
      const matchesSearch =
        searchQuery === "" ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.short_description
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || event.category_name === selectedCategory;

      const eventDate = moment(event.start_date);
      let matchesDate = true;

      switch (dateFilter) {
        case "upcoming":
          matchesDate = eventDate.isSameOrAfter(today);
          break;
        case "past":
          matchesDate = eventDate.isBefore(today);
          break;
        case "today":
          matchesDate = eventDate.isSame(today, "day");
          break;
        case "this-week":
          matchesDate = eventDate.isBetween(today, endOfWeek, null, "[]");
          break;
        case "this-month":
          matchesDate = eventDate.isBetween(today, endOfMonth, null, "[]");
          break;
        default: // "all"
          matchesDate = true;
      }

      return matchesSearch && matchesCategory && matchesDate;
    });
  }, [searchQuery, selectedCategory, dateFilter, events]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, dateFilter]);

  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setDateFilter("upcoming");
  };

  const toggleEventExpand = (id) => {
    setExpandedEvent(expandedEvent === id ? null : id);
  };

  if (isLoading) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white py-20 md:py-32 text-center">
          <div className="max-w-7xl mx-auto px-4">
            <div className="h-12 bg-gray-300 rounded w-1/2 mx-auto animate-pulse" />
            <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mt-4 animate-pulse" />
          </div>
        </div>

        <main className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-gray-200" />
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded" />
                      <div className="h-4 bg-gray-200 rounded w-5/6" />
                    </div>
                    <div className="h-10 bg-gray-200 rounded mt-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
      <header className="bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white mt-20 py-20 md:py-32 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Upcoming Education Events
          </h1>
          <p className="text-white text-xl md:text-2xl max-w-4xl mx-auto">
            Connect with universities, attend workshops, and get expert advice
            for your study abroad journey
          </p>
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-white" />
              <input
                type="search"
                placeholder="Search events..."
                aria-label="Search events"
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
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === "all"
                    ? "bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white"
                    : "bg-white text-amber-900 hover:bg-primary-100 border border-primary-800"
                }`}
              >
                All Events
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
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
            <div className="flex items-center gap-2">
              <label htmlFor="dateFilter" className="sr-only">
                Date Filter
              </label>
              <select
                id="dateFilter"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-primary-800"
              >
                {dateFilters.map((filter) => (
                  <option key={filter.id} value={filter.id}>
                    {filter.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <Ticket className="mx-auto h-12 w-12 text-gray-400" />
              <h2 className="mt-2 text-lg font-medium text-gray-900">
                No Events Found
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
              <div className="mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white rounded-md hover:bg-primary-700"
                >
                  Reset Filters
                </motion.button>
              </div>
            </div>
          ) : (
            <>
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentEvents.map((event) => (
                    <motion.article
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 overflow-hidden"
                      itemScope
                      itemType="https://schema.org/Event"
                    >
                      <div className="relative h-48">
                        <Link
                          href={`/events/${event.slug}`}
                          aria-label={event.title}
                        >
                          <img
                            src={event.featured_image}
                            alt={event.title}
                            className="w-full h-full object-cover"
                            itemProp="image"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          <div className="absolute top-4 right-4 bg-white/90 text-amber-900 px-3 py-1 rounded-full text-xs font-bold">
                            FREE
                          </div>
                        </Link>
                      </div>

                      <div className="p-6">
                        <span
                          className="text-sm font-semibold text-white"
                          itemProp="eventType"
                        >
                          {event.category_name}
                        </span>
                        <h3
                          className="mt-2 text-xl font-bold text-gray-900 hover:text-amber-900"
                          itemProp="name"
                        >
                          <Link href={`/events/${event.slug}`}>
                            {event.title}
                          </Link>
                        </h3>

                        <div className="mt-4 space-y-2 text-sm text-amber-700">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-white" />
                            <time
                              dateTime={event.start_date}
                              itemProp="startDate"
                            >
                              {moment(event.start_date).format("MMMM D, YYYY")}
                            </time>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-white" />
                            {moment(event.start_time, "HH:mm:ss").format(
                              "h:mm A"
                            )}{" "}
                            -{" "}
                            {moment(event.end_time, "HH:mm:ss").format(
                              "h:mm A"
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-white" />
                            <span itemProp="location">
                              {event.venue_name || "Online"}
                            </span>
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                          <Link
                            href={`/events/${event.slug}`}
                            className="flex items-center gap-1 font-semibold text-primary-600 hover:text-amber-900"
                            aria-label={`View details for ${event.title}`}
                          >
                            View Details
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleRegister(event)}
                            className="px-4 py-2 bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white text-sm font-medium rounded-lg hover:bg-primary-700"
                          >
                            Register Now
                          </motion.button>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {currentEvents.map((event) => (
                    <motion.article
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 overflow-hidden"
                      itemScope
                      itemType="https://schema.org/Event"
                    >
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="md:w-1/4">
                            <div className="relative h-40 rounded-lg overflow-hidden">
                              <img
                                src={event.featured_image}
                                alt={event.title}
                                className="w-full h-full object-cover"
                                itemProp="image"
                                loading="lazy"
                              />
                              <div className="absolute top-2 right-2 bg-white/90 text-amber-900 px-2 py-1 rounded text-xs font-bold">
                                FREE
                              </div>
                            </div>
                          </div>

                          <div className="md:w-3/4">
                            <div>
                              <span
                                className="text-sm font-semibold text-white"
                                itemProp="eventType"
                              >
                                {event.category_name}
                              </span>
                              <h3
                                className="mt-1 text-xl font-bold text-gray-900 hover:text-amber-900"
                                itemProp="name"
                              >
                                <Link href={`/events/${event.slug}`}>
                                  {event.title}
                                </Link>
                              </h3>
                              <p
                                className="mt-2 text-amber-700 line-clamp-2"
                                itemProp="description"
                              >
                                {event.short_description}
                              </p>

                              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                <div className="flex items-center gap-2 text-amber-700">
                                  <Calendar className="h-4 w-4 text-white" />
                                  <time
                                    dateTime={event.start_date}
                                    itemProp="startDate"
                                  >
                                    {moment(event.start_date).format(
                                      "MMMM D, YYYY"
                                    )}
                                  </time>
                                </div>
                                <div className="flex items-center gap-2 text-amber-700">
                                  <Clock className="h-4 w-4 text-white" />
                                  {moment(event.start_time, "HH:mm:ss").format(
                                    "h:mm A"
                                  )}{" "}
                                  -{" "}
                                  {moment(event.end_time, "HH:mm:ss").format(
                                    "h:mm A"
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-amber-700">
                                  <MapPin className="h-4 w-4 text-white" />
                                  <span itemProp="location">
                                    {event.venue_name || "Online"}
                                  </span>
                                </div>
                              </div>

                              <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <Link
                                  href={`/events/${event.slug}`}
                                  className="flex items-center gap-1 font-semibold text-primary-600 hover:text-amber-900"
                                  aria-label={`View details for ${event.title}`}
                                >
                                  View Details
                                  <ArrowRight className="h-4 w-4" />
                                </Link>
                                <div className="flex gap-3">
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => toggleEventExpand(event.id)}
                                    className="px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 flex items-center gap-1"
                                    aria-expanded={expandedEvent === event.id}
                                  >
                                    {expandedEvent === event.id ? (
                                      <>
                                        <ChevronUp className="h-4 w-4" />
                                        Less Info
                                      </>
                                    ) : (
                                      <>
                                        <ChevronDown className="h-4 w-4" />
                                        More Info
                                      </>
                                    )}
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleRegister(event)}
                                    className="px-4 py-2 bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white text-sm font-medium rounded-lg hover:bg-primary-700"
                                  >
                                    Register Now
                                  </motion.button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {expandedEvent === event.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-6 pt-6 border-t border-gray-200"
                          >
                            <h4 className="font-semibold text-gray-900 mb-3">
                              Event Details
                            </h4>
                            <div className="prose prose-sm text-amber-700">
                              {event.short_description}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <div className="mt-16 flex justify-center">
                  <nav
                    className="flex items-center gap-2"
                    aria-label="Pagination"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                      aria-label="Previous page"
                    >
                      Previous
                    </motion.button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <motion.button
                          key={page}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setCurrentPage(page)}
                          aria-current={
                            currentPage === page ? "page" : undefined
                          }
                          className={`w-10 h-10 rounded-md text-sm font-medium ${
                            currentPage === page
                              ? "bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white"
                              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                          aria-label={`Go to page ${page}`}
                        >
                          {page}
                        </motion.button>
                      )
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setCurrentPage((p) => Math.min(p + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                      aria-label="Next page"
                    >
                      Next
                    </motion.button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Event Registration Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Register for Our Events
            </h2>
            <p className="text-lg text-amber-700">
              Fill out the form below to register for upcoming events and get personalized guidance
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <ConsultationForm inline={true} />
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      {showRegistrationModal && selectedEvent && (
        <ConsultationForm 
          isOpen={showRegistrationModal}
          onClose={() => setShowRegistrationModal(false)}
          defaultCountry={getEventCountry(selectedEvent)}
          initialEnquiry={{
            name: selectedEvent.title,
            university: selectedEvent.venue_name,
            country: selectedEvent.venue_address,
          }}
        />
      )}

      {/* Floating Registration Form */}
      {showFloatingForm && (
        <ConsultationForm 
          isOpen={showFloatingForm}
          onClose={() => setShowFloatingForm(false)}
        />
      )}
    </div>
  );
};

export default Events;
