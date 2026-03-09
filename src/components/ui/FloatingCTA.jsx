"use client";
import React, { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import ConsultationForm from "../forms/ConsultationForm";

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000); // Show after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {!isMinimized ? (
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm border border-gray-200 animate-bounce-subtle">
            <button
              onClick={() => setIsMinimized(true)}
              className="absolute top-2 right-2 text-gray-400 hover:text-amber-700"
            >
              <X size={16} />
            </button>

            <div className="flex items-start space-x-3">
              <div className="bg-secondary-500 rounded-full p-2">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Need Help?</h4>
                <p className="text-sm text-amber-700 mb-3">
                  Get expert guidance from our counselors. Book your free
                  consultation now!
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 hover:scale-105"
                >
                  Book Free Consultation
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsMinimized(false)}
            className="bg-secondary-500 text-white rounded-full p-4 shadow-lg hover:scale-110 transition-transform duration-200"
          >
            <MessageCircle className="h-6 w-6" />
          </button>
        )}
      </div>
      {isModalOpen && (
        <ConsultationForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default FloatingCTA;
