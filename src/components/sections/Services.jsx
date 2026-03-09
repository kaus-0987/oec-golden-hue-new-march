import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  FileText,
  IdCard,
  Calculator,
  Plane,
  Headphones,
} from "lucide-react";

const services = [
  {
    icon: <GraduationCap size={32} />,
    title: "Course Selection & University Matching",
    description:
      "AI-powered matching system to find the perfect university and program based on your goals, budget, and academic background.",
    features: [
      "Personalized university shortlisting",
      "Program finder with career outcomes",
      "Budget optimization strategies",
    ],
  },
  {
    icon: <FileText size={32} />,
    title: "Application Support",
    description:
      "Complete application assistance with document preparation, essay writing, and interview coaching for maximum success.",
    features: [
      "Step-by-step application timeline",
      "Professional essay writing workshops",
      "Mock interview sessions",
    ],
  },
  {
    icon: <IdCard size={32} />,
    title: "Visa & Immigration",
    description:
      "Expert visa guidance with our 95% success rate, including document preparation and mock visa interviews.",
    features: [
      "Country-specific visa guidance",
      "Document checklist and review",
      "Mock visa interview preparation",
    ],
  },
  {
    icon: <Calculator size={32} />,
    title: "Financial Planning",
    description:
      "Comprehensive financial guidance including education loans, scholarship applications, and cost optimization.",
    features: [
      "Education loan partnerships",
      "Scholarship database access",
      "ROI analysis and projections",
    ],
  },
  {
    icon: <Plane size={32} />,
    title: "Pre-Departure Support",
    description:
      "Complete preparation including accommodation, travel arrangements, and comprehensive cultural orientation.",
    features: [
      "Accommodation assistance",
      "Travel planning guidance",
      "Cultural orientation sessions",
    ],
  },
  {
    icon: <Headphones size={32} />,
    title: "Post-Arrival Support",
    description:
      "Continued support after you reach your destination, including academic guidance and emergency assistance.",
    features: [
      "24/7 emergency support",
      "Academic performance monitoring",
      "Career guidance and placement",
    ],
  },
];

const Services = () => {
  return (
    <section className="py-20 bg-gray-50" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            id="services-heading"
            className="text-4xl font-bold text-amber-900 mb-4"
          >
            Comprehensive Support for Your Study Abroad Journey
          </h2>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto">
            From university selection to graduation support, we're with you
            every step of the way
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer h-full flex flex-col border border-gray-100"
              >
                <div className="p-6 flex-grow">
                  <div className="service-icon w-16 h-16 bg-secondary-500 rounded-xl flex items-center justify-center text-white mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-amber-700 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start text-sm text-gray-700"
                      >
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-6 pb-6">
                  <Link
                    href="/services"
                    className="text-amber-900 font-medium hover:text-primary-500 inline-flex items-center"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    Learn more
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 hover:opacity-90 transition-opacity"
            aria-label="View all services"
          >
            View All Services
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
