"use client";
import React, { useEffect, useState } from "react";
import ajaxCall from "@/helpers/ajaxCall";
import {
  Users,
  Globe,
  MessageCircle,
  Trophy,
  ChevronDown,
  Building,
  User,
  GraduationCap,
  MapPin,
} from "lucide-react";

const statsData = [
  {
    icon: <Users className="w-12 h-12 mx-auto mb-4 text-white" />,
    value: "15,000+",
    label: "Active Alumni",
    labelColor: "text-primary-100",
  },
  {
    icon: <Globe className="w-12 h-12 mx-auto mb-4 text-white" />,
    value: "85+",
    label: "Countries",
    labelColor: "text-secondary-100",
  },
  {
    icon: <Building className="w-12 h-12 mx-auto mb-4 text-white" />,
    value: "500+",
    label: "Top Companies",
    labelColor: "text-primary-100",
  },
  {
    icon: (
      <MessageCircle className="w-12 h-12 mx-auto mb-4 text-white" />
    ),
    value: "2,500+",
    label: "Mentorships",
    labelColor: "text-secondary-100",
  },
];

const benefitsData = [
  {
    icon: <MessageCircle className="w-8 h-8 text-white" />,
    title: "One-on-One Mentoring",
    description: "Get personalized guidance from alumni in your field",
  },
  {
    icon: <Users className="w-8 h-8 text-white" />,
    title: "Networking Events",
    description: "Connect at exclusive alumni networking sessions",
  },
  {
    icon: <Trophy className="w-8 h-8 text-white" />,
    title: "Career Guidance",
    description: "Industry insights and job referrals from successful alumni",
  },
];

const ExpandableSection = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-xl mb-4 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left bg-primary-50 hover:bg-primary-100 transition-colors flex items-center justify-between"
      >
        <h3 className="text-lg font-semibold text-amber-900">{title}</h3>
        <ChevronDown
          className={`w-5 h-5 text-primary-600 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && <div className="p-6 bg-white">{children}</div>}
    </div>
  );
};

const AlumniNetwork = () => {
  const [alumnis, setAlumnis] = useState([]);
  const [featuredAlumnis, setFeaturedAlumnis] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAlumnis = async () => {
      setIsLoading(true);
      try {
        const response = await ajaxCall(
          "/students/students/admitted-students/",
          {
            method: "GET",
          }
        );

        if (response?.data?.results?.length > 0) {
          setAlumnis(response.data.results);

          const shuffled = [...response.data.results].sort(
            () => 0.5 - Math.random()
          );
          setFeaturedAlumnis(shuffled.slice(0, 3));
        } else {
          setAlumnis([]);
          setFeaturedAlumnis([]);
        }
      } catch (error) {
        console.log("Error fetching alumni:", error);
        setAlumnis([]);
        setFeaturedAlumnis([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlumnis();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-amber-900 mb-4">
          Alumni Network
        </h3>
        <p className="text-amber-700 max-w-2xl mx-auto">
          Connect with OEC alumni worldwide for mentorship, career guidance, and
          networking opportunities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white p-6 rounded-xl text-center"
          >
            {stat.icon}
            <div className="text-3xl font-bold mb-2">{stat.value}</div>
            <div className={stat.labelColor}>{stat.label}</div>
          </div>
        ))}
      </div>

      <ExpandableSection title="How Alumni Can Help You" defaultOpen={true}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefitsData.map((benefit, index) => (
            <div key={index} className="text-center p-4">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {benefit.icon}
              </div>
              <h4 className="font-semibold mb-2">{benefit.title}</h4>
              <p className="text-amber-700 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </ExpandableSection>

      <div className="bg-white border-2 border-primary-200 rounded-xl p-8 mb-8">
        <h3 className="text-xl font-bold text-amber-900 mb-6">
          Featured Alumni Mentors
        </h3>

        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : featuredAlumnis.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredAlumnis.map((alumni) => (
              <div
                key={alumni.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                    {alumni.full_name ? (
                      <span className="text-primary-600 font-bold">
                        {alumni.full_name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">
                      {alumni.full_name}
                    </h4>
                    <p className="text-amber-700 text-xs">
                      {alumni.course_name}
                    </p>
                  </div>
                </div>
                <div className="space-y-1 text-xs text-amber-700 mb-3">
                  <div className="flex items-center">
                    <GraduationCap className="w-3 h-3 mr-1 text-white" />
                    <span>{alumni.university_name}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 mr-1 text-white" />
                    <span>{alumni.country_name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No featured alumni available</p>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white p-8 rounded-xl text-center">
        <h3 className="text-2xl font-bold mb-4">Join Our Alumni Network</h3>
        <p className="mb-6 opacity-90">
          Already studying abroad? Connect with fellow OEC students and give
          back to the community
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Become a Mentor
          </button>
          <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
            Update Your Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlumniNetwork;
