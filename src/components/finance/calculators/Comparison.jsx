"use client";
import React from "react";
import { BarChart3 } from "lucide-react";

const Comparison = () => {
  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <BarChart3 className="w-12 h-12 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-amber-900 mb-4">
        Country Comparison
      </h3>
      <p className="text-amber-700 mb-6 max-w-md mx-auto">
        Compare costs, ROI, and financial requirements across multiple countries
        to make the best decision for your education.
      </p>
      <button className="bg-secondary-500 text-white px-6 py-3 rounded-lg hover:bg-secondary-300 transition-colors">
        Coming Soon
      </button>
    </div>
  );
};

export default Comparison;
