"use client";
import Link from "next/link";
import React, { useState } from "react";
import ConsultationForm from "../forms/ConsultationForm";

const smartFeatures = [
  {
    href: "/universities",
    title: "Explore Universities",
    description:
      "Surf through 2000+ universities abroad, all in one place, with easy filters & sort options.",
    image: "/Universities.png",
  },
  {
    href: "",
    title: "Test Prep+",
    description:
      "Personalise your GRE prep as you need with live classes, mock tests, practice questions & more.",
    image: "/TestPrep.png",
  },
  {
    href: "/ai-college-finder",
    title: "AI College Finder",
    description:
      "Find the universities & programs that best match your profile with the help of AI.",
    image: "/CollegeFinder.png",
  },
  {
    href: "/community",
    title: "Community",
    description:
      "Connect with over a million study abroad students & aspirants and build your network.",
    image: "/Connect.png",
  },
  {
    href: "/events",
    title: "Events",
    description:
      "Meet & greet the experts of studying abroad in webinars, events, meet-ups & more.",
    image: "/Events.png",
  },
  {
    href: "/finance",
    title: "Finance",
    description:
      "Check your eligibility and start your loan process with 100% free assistance.",
    image: "/Finance.png",
  },
];

const SmartFeatures = () => {
  const [service, setService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-10 bg-gray-50" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl font-bold text-amber-900 mb-4"
          >
            All-Tech For Studying Abroad
          </h2>
          <p className="text-lg sm:text-xl text-amber-700 max-w-7xl mx-auto px-4">
            We have smart features to help you throughout your abroad education
            journey
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-0">
          {smartFeatures.map((service, index) => {
            const isModalCard = service.title === "Test Prep+";

            const CardContent = (
              <div
                onClick={() => {
                  if (isModalCard) {
                    setService(service.title);
                    setIsModalOpen(true);
                  }
                }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 group cursor-pointer h-full flex flex-col border border-gray-200 hover:border-primary-600 hover:ring-1 hover:ring-primary-600"
              >
                <div className="p-6 flex-grow">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 group-hover:text-amber-900 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-amber-700 text-sm sm:text-base mb-4">
                    {service.description}
                  </p>
                </div>
                <div className="p-6 pt-0">
                  <img src={service.image} alt={service.title} />
                </div>
              </div>
            );

            return isModalCard ? (
              <div key={index}>{CardContent}</div>
            ) : (
              <Link key={index} href={service.href || "#"}>
                {CardContent}
              </Link>
            );
          })}
        </div>
      </div>
      {isModalOpen && (
        <ConsultationForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          service={service}
        />
      )}
    </section>
  );
};

export default SmartFeatures;
