"use client";
import React, { useState } from "react";
import { ResultCard } from "../Finance";
import { Calculator, PiggyBank, TrendingUp, Award } from "lucide-react";

const ScholarshipCalculator = () => {
  const [totalCost, setTotalCost] = useState(4000000);
  const [scholarshipAmount, setScholarshipAmount] = useState(1000000);
  const [scholarshipType, setScholarshipType] = useState("percentage");

  const calculateScholarship = () => {
    let scholarshipValue = scholarshipAmount;
    if (scholarshipType === "percentage") {
      scholarshipValue = (totalCost * scholarshipAmount) / 100;
    }

    const remainingCost = totalCost - scholarshipValue;
    const savingsPercentage = (scholarshipValue / totalCost) * 100;

    return {
      scholarshipValue: Math.round(scholarshipValue),
      remainingCost: Math.round(remainingCost),
      savingsPercentage: savingsPercentage.toFixed(1),
      monthlySavings: Math.round(scholarshipValue / 48), // 4 years
    };
  };

  const results = calculateScholarship();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Education Cost (₹)
          </label>
          <input
            type="number"
            value={totalCost}
            onChange={(e) => setTotalCost(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            min="100000"
            step="100000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Scholarship Type
          </label>
          <select
            value={scholarshipType}
            onChange={(e) => setScholarshipType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="percentage">Percentage (%)</option>
            <option value="amount">Fixed Amount (₹)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Scholarship{" "}
            {scholarshipType === "percentage" ? "Percentage" : "Amount"}
          </label>
          <input
            type="number"
            value={scholarshipAmount}
            onChange={(e) => setScholarshipAmount(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            min="0"
            max={scholarshipType === "percentage" ? 100 : totalCost}
            step={scholarshipType === "percentage" ? 5 : 10000}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Scholarship Value"
          value={`₹ ${results.scholarshipValue.toLocaleString()}`}
          subtitle={`${results.savingsPercentage}% of total cost`}
          icon={Award}
          color="primary"
        />
        <ResultCard
          title="Remaining Cost"
          value={`₹ ${results.remainingCost.toLocaleString()}`}
          subtitle="After scholarship"
          icon={Calculator}
          color="secondary"
        />
        <ResultCard
          title="Monthly Savings"
          value={`₹ ${results.monthlySavings.toLocaleString()}`}
          subtitle="Over 4 years"
          icon={PiggyBank}
          color="primary"
        />
        <ResultCard
          title="Savings Percentage"
          value={`${results.savingsPercentage}%`}
          subtitle="Cost reduction"
          icon={TrendingUp}
          color="secondary"
        />
      </div>

      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6">
        <h4 className="text-lg font-bold text-amber-900 mb-4">
          Scholarship Impact Analysis
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium mb-3">Financial Impact</h5>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Original Cost:</span>
                <span className="font-medium">
                  ₹ {totalCost.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Scholarship Benefit:</span>
                <span className="font-medium text-green-600">
                  -₹ {results.scholarshipValue.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span>Final Cost:</span>
                <span className="font-bold">
                  ₹ {results.remainingCost.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          <div>
            <h5 className="font-medium mb-3">Loan Reduction</h5>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Loan Needed:</span>
                <span className="font-medium">
                  ₹ {results.remainingCost.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Loan Saved:</span>
                <span className="font-medium text-green-600">
                  ₹ {results.scholarshipValue.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Interest Saved:</span>
                <span className="font-medium text-green-600">
                  ₹{" "}
                  {Math.round(results.scholarshipValue * 0.4).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCalculator;
