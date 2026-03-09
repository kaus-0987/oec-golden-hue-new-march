"use client";
import React, { useState } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { testConfig, allTestCategories } from "@/lib/test-config";

const TestSelectionMenu = ({ onSelectTest, activeCategory }) => {
  return (
    <div className="w-full md:w-1/3 lg:w-1/4 bg-white rounded-xl shadow-lg p-4">
      <h2 className="text-xl font-bold text-amber-900 mb-4 p-2">
        Choose Your Test
      </h2>
      <div className="space-y-2">
        {Object.entries(testConfig).map(([id, { title, icon }]) => (
          <button
            key={id}
            onClick={() => onSelectTest(id)}
            className={`w-full flex items-center p-4 rounded-lg text-left transition-all duration-300 ${
              activeCategory === id
                ? "bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white shadow-md"
                : "bg-gray-50 hover:bg-primary-100 hover:shadow-sm"
            }`}
          >
            <div className="mr-4 flex-shrink-0">{icon}</div>
            <span className="font-semibold">{title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const TestPreparation = () => {
  const [activeCategory, setActiveCategory] = useState("ielts");

  const handleSelectTest = (testId) => {
    setActiveCategory(testId);
  };

  const renderMainContent = () => {
    if (activeCategory) {
      const categories = allTestCategories[activeCategory];
      const mainTest = testConfig[activeCategory];
      return (
        <div className="p-6">
          <h2 className="text-3xl font-bold text-amber-900 mb-6 text-center">
            {mainTest.title} Preparation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(categories).map(
              ([id, { title, description, icon, slug }]) => (
                <Link
                  key={id}
                  href={`/test-preparation/${activeCategory}/${slug}`}
                  className="bg-white p-6 rounded-xl shadow border border-gray-200 hover:shadow-lg hover:border-primary-500 transition-all duration-300 flex flex-col items-center text-center"
                >
                  <div className="mb-4">{icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {title}
                  </h3>
                  <p className="text-amber-700">{description}</p>
                </Link>
              )
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="text-center p-8">
        <BookOpen className="mx-auto h-20 w-20 text-amber-900 opacity-50 mb-4" />
        <h2 className="text-3xl font-bold text-amber-900">
          Welcome to the Practice Center
        </h2>
        <p className="mt-4 text-lg text-amber-700 max-w-lg mx-auto">
          Select a test from the menu on the left to begin your practice
          session. Good luck!
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white mt-20 py-20 md:py-32 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Test Preparation
          </h1>
          <p className="text-white text-xl md:text-2xl max-w-4xl mx-auto">
            Select a test, challenge your knowledge, and track your progress.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <TestSelectionMenu
            onSelectTest={handleSelectTest}
            activeCategory={activeCategory}
          />
          <main className="w-full md:w-2/3 lg:w-3/4 bg-white rounded-xl shadow-lg border border-gray-200 min-h-[600px] flex flex-col justify-center">
            {renderMainContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default TestPreparation;
