"use client";
import React, { useEffect, useState } from "react";
import ajaxCall from "@/helpers/ajaxCall";
import { CalendarDays, Crown, Globe } from "lucide-react";

const Universities = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      try {
        const response = await ajaxCall(
          "/students/students/admitted-students/",
          {
            method: "GET",
          }
        );
        if (response?.data?.results?.length > 0) {
          setStudents(response.data.results);
        } else {
          setStudents([]);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        setStudents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <section
      className="py-20 bg-gray-100"
      aria-labelledby="study-destinations-heading"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            id="study-destinations-heading"
            className="text-4xl font-bold text-amber-900 mb-4"
          >
            Our Students Admitted To Top Universities
          </h2>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto">
            Your gateway to overseas education and success.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : students.length > 0 ? (
          <div className="relative w-full overflow-hidden py-4 group">
            <div className="flex gap-8 animate-infinite-scroll-seamless">
              {/* Create seamless infinite scroll by triplicating the data */}
              {/* Ensure we have enough cards for smooth animation by repeating 3 times */}
              {[...students, ...students, ...students].map((student, index) => (
                <div
                  key={`${student.id}-${index}`}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:!scale-105 flex flex-col w-96 flex-shrink-0"
                >
                  <div className="p-6 flex-grow">
                    <div className="relative mb-6">
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white text-xs font-semibold px-4 py-1 rounded-t-none rounded-b-full shadow-md">
                        <div className="flex items-center gap-2">
                          <Crown className="w-4 h-4" /> <span>Admit</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-amber-900 mb-4 text-center">
                      {student.university_name}
                    </h3>
                    <div className="flex justify-between space-x-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <CalendarDays className="text-white w-5 h-5 flex-shrink-0" />
                        <div className="text-sm">
                          <div className="font-semibold text-gray-900">
                            {student.admission_year}
                          </div>
                          <div className="text-gray-500">Admission Year</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="text-white w-5 h-5 flex-shrink-0" />
                        <div className="text-sm">
                          <div className="font-semibold text-gray-900">
                            {student.nationality}
                          </div>
                          <div className="text-gray-500">Nationality</div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-48 mb-4">
                      <img
                        src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt={`${student.university_name} campus`}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="bg-primary-50 p-4 rounded-b-2xl border-t border-primary-100 mt-auto">
                    <div className="flex items-center space-x-3">
                      {student.profile_image ? (
                        <img
                          src={student.profile_image}
                          alt={student.full_name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 text-white flex items-center justify-center ring-2 ring-white">
                          <span className="font-medium text-sm">
                            {getInitials(student.full_name)}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-sm text-amber-900">
                          {student.full_name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {student.course_name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <p className="text-gray-500">
              No student admission data available yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Universities;
