"use client";
import React, { useState } from "react";
import Link from "next/link";
import ConsultationForm from "../forms/ConsultationForm";
import { ArrowRight, Phone, Calendar, MessageCircle } from "lucide-react";

const CTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <section
        className="py-20 bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white relative overflow-hidden"
        aria-labelledby="cta-heading"
      >
        <div
          className="absolute inset-0 bg-black opacity-10"
          aria-hidden="true"
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2
              id="cta-heading"
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Ready to Start Your Study Abroad Journey?
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Join 2,000+ students who have successfully achieved their
              international education dreams with our expert guidance
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: Calendar,
                  title: "Free Consultation",
                  description: "Get personalized guidance from our experts",
                },
                {
                  icon: Phone,
                  title: "24/7 Support",
                  description: "Round-the-clock assistance when you need it",
                },
                {
                  icon: MessageCircle,
                  title: "Expert Guidance",
                  description: "10+ years of experience, 95% success rate",
                },
              ].map((feature, index) => (
                <div key={index} className="text-center">
                  <div
                    className="bg-secondary-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
                    aria-hidden="true"
                  >
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-blue-100">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center py-3 px-6 bg-white text-primary-600 hover:bg-gray-100 font-semibold rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                Book Free Consultation Now
                <ArrowRight className="h-5 w-5 ml-2" aria-hidden="true" />
              </button>

              <Link
                href="tel:+919876543210"
                className="flex items-center justify-center py-3 px-6 border border-white text-white hover:bg-white hover:text-primary-600 rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                aria-label="Call us at +91 93275 81167"
              >
                <Phone className="h-5 w-5 mr-2" aria-hidden="true" />
                Call +91 93275 81167
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {[
                "🎓 No hidden fees",
                "📞 Free consultation",
                "⭐ 95% success rate",
                "🏆 10 years experience",
              ].map((badge, index) => (
                <span
                  key={index}
                  className="text-sm text-white flex items-center"
                  aria-hidden="true"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      {isModalOpen && (
        <ConsultationForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default CTA;
