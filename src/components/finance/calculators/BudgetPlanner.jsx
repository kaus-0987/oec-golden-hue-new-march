"use client";
import React from "react";
import { PieChart } from "lucide-react";

const BudgetPlanner = () => {
  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <PieChart className="w-12 h-12 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-amber-900 mb-4">
        Budget Planner
      </h3>
      <p className="text-amber-700 mb-6 max-w-md mx-auto">
        Create comprehensive monthly and yearly budgets for your study abroad
        journey with our interactive budget planner.
      </p>
      <button className="bg-secondary-500 text-white px-6 py-3 rounded-lg hover:bg-secondary-300 transition-colors">
        Coming Soon
      </button>
    </div>
  );
};

export default BudgetPlanner;
