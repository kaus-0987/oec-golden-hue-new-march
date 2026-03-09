"use client";
import React from "react";
import { useParams, notFound } from "next/navigation";
import { componentMap, testConfig, allTestCategories } from "@/lib/test-config";

const TestComponentPage = () => {
  const params = useParams();
  const { category, subCategory } = params;

  const mainTest = testConfig[category];

  const categoryKey = Object.keys(allTestCategories[category] || {}).find(
    (key) => allTestCategories[category][key].slug === subCategory
  );

  const ComponentToRender = categoryKey
    ? componentMap[category]?.[categoryKey]
    : null;

  if (!ComponentToRender || !mainTest) {
    notFound();
  }

  const categoryTitle =
    allTestCategories[category][categoryKey].title || "Practice";

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white mt-20 py-20 md:py-32 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {mainTest.title}
          </h1>
          <p className="text-white text-xl md:text-2xl max-w-4xl mx-auto">
            {categoryTitle}
          </p>
        </div>
      </header>
      <div className="bg-white rounded-xl shadow-lg p-8">
        {ComponentToRender}
      </div>
    </div>
  );
};

export default TestComponentPage;
