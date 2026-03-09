"use client";
import ajaxCall from "@/helpers/ajaxCall";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border border-gray-200 rounded-lg mb-3 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
      >
        <h4 className="text-base font-medium text-amber-900 pr-4">{question}</h4>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-amber-700 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-amber-700 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-4 bg-gray-50">
          <p className="text-gray-700 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQSection = ({ activeSection }) => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFAQ, setOpenFAQ] = useState(null);

  const formatSection = (slug) => {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        let allFAQs = [];
        let page = 1;
        let hasNextPage = true;

        while (hasNextPage) {
          const response = await ajaxCall(`/faq/faqs/?page=${page}`, {
            method: "GET",
          });

          const results = response.data.results;
          allFAQs = [...allFAQs, ...results];

          hasNextPage = !!response.data.next;
          page += 1;
        }

        const formattedSection = formatSection(activeSection);
        const filtered = allFAQs.filter(
          (faq) => faq.category_name === formattedSection
        );

        setFaqs(filtered);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, [activeSection]);

  if (loading) {
    return (
      <div className="bg-gray-50 rounded-xl p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-amber-700">Loading FAQs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-xl p-8">
      <h3 className="text-2xl font-bold text-amber-900 mb-6 text-center">
        Frequently Asked Questions
      </h3>

      {faqs.length > 0 ? (
        <div className="space-y-3">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer_preview}
              isOpen={openFAQ === faq.id}
              onToggle={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-amber-700">
          No FAQs available for this service.
        </p>
      )}
    </div>
  );
};

export default FAQSection;
