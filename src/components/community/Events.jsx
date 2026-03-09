"use client";
import React, { useEffect, useState } from "react";
import ajaxCall from "@/helpers/ajaxCall";
import { Calendar, MapPin, Clock, Building, Globe } from "lucide-react";
import moment from "moment";

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
          const formattedEvents = response.data.results.map((event) => ({
            ...event,
            formattedDate: moment(event.start_date).format("MMM D, YYYY"),
            formattedTime: `${moment(event.start_time, "HH:mm:ss").format(
              "h:mm A"
            )} - ${moment(event.end_time, "HH:mm:ss").format("h:mm A")}`,
          }));
          setEvents(formattedEvents);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const getEventType = (isOnline) => {
    return isOnline ? "Virtual" : "In-Person";
  };

  const getEventStatus = (startDate) => {
    const daysUntil = moment(startDate).diff(moment(), "days");
    if (daysUntil < 0) return "Past";
    if (daysUntil <= 7) return "Soon";
    return "Upcoming";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-amber-900 mb-2">
          Upcoming Events
        </h3>
        <p className="text-amber-700">
          Connect, learn, and grow with the OEC community
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : events.length > 0 ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
              >
                <div className="relative h-48 w-full">
                  {event.featured_image ? (
                    <img
                      src={event.featured_image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-primary-100 to-secondary-100 flex items-center justify-center">
                      <Building className="w-12 h-12 text-primary-600" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        event.is_online
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {getEventType(event.is_online)}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        getEventStatus(event.start_date) === "Soon"
                          ? "bg-yellow-100 text-yellow-800"
                          : getEventStatus(event.start_date) === "Past"
                          ? "bg-gray-100 text-amber-900"
                          : "bg-primary-100 text-amber-900"
                      }`}
                    >
                      {getEventStatus(event.start_date)}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <h4 className="font-semibold text-lg mb-3">{event.title}</h4>
                  <p className="text-amber-700 text-sm mb-4 line-clamp-2">
                    {event.short_description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-amber-700 text-sm">
                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0 text-white" />
                      {event.formattedDate}
                    </div>
                    <div className="flex items-center text-amber-700 text-sm">
                      <Clock className="w-4 h-4 mr-2 flex-shrink-0 text-white" />
                      {event.formattedTime}
                    </div>
                    <div className="flex items-center text-amber-700 text-sm">
                      {event.is_online ? (
                        <>
                          <Globe className="w-4 h-4 mr-2 flex-shrink-0 text-white" />
                          Online Event
                        </>
                      ) : (
                        <>
                          <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-white" />
                          {event.venue_name}
                        </>
                      )}
                    </div>
                    <div className="flex items-center text-amber-700 text-sm">
                      <Building className="w-4 h-4 mr-2 flex-shrink-0 text-white" />
                      {event.category_name}
                    </div>
                  </div>

                  <a
                    href={`/events/${event.slug}`}
                    className="block w-full text-center bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white py-2 px-4 rounded-lg hover:bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 transition-colors mt-auto"
                  >
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500">No upcoming events available</p>
        </div>
      )}

      <div className="bg-gradient-to-r from-secondary-50 to-primary-50 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-amber-900 mb-6">
          Event Calendar
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-4">This Month's Highlights</h4>
            {events.filter((e) =>
              moment(e.start_date).isSame(moment(), "month")
            ).length > 0 ? (
              events
                .filter((e) => moment(e.start_date).isSame(moment(), "month"))
                .slice(0, 2)
                .map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center p-3 bg-white rounded-lg mb-3"
                  >
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-amber-900 font-bold text-sm">
                        {moment(event.start_date).format("D")}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{event.title}</p>
                      <p className="text-amber-700 text-xs">
                        {event.is_online ? "Online" : event.venue_name}
                      </p>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-gray-500 text-sm">No events this month</p>
            )}
          </div>
          <div>
            <h4 className="font-semibold mb-4">Event Categories</h4>
            <div className="space-y-2">
              {Array.from(
                new Set(events.map((event) => event.category_name))
              ).map((category) => (
                <div
                  key={category}
                  className="flex items-center justify-between"
                >
                  <span className="text-amber-700">{category}</span>
                  <span className="bg-primary-100 text-amber-900 px-2 py-1 rounded text-xs font-medium">
                    {events.filter((e) => e.category_name === category).length}{" "}
                    events
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
