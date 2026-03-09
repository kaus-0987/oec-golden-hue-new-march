"use client";
import React, { useState } from "react";
import { Calculator, PiggyBank, Book, Home, CreditCard } from "lucide-react";

const FinancialCalculator = () => {
  const [country, setCountry] = useState("usa");
  const [courseType, setCourseType] = useState("undergraduate");
  const [duration, setDuration] = useState(4);
  const [results, setResults] = useState(null);

  const countryData = {
    usa: {
      name: "United States",
      currency: "USD",
      tuition: { undergraduate: 35000, graduate: 45000 },
      living: 15000,
      exchange: 83,
    },
    canada: {
      name: "Canada",
      currency: "CAD",
      tuition: { undergraduate: 25000, graduate: 35000 },
      living: 12000,
      exchange: 62,
    },
    uk: {
      name: "United Kingdom",
      currency: "GBP",
      tuition: { undergraduate: 25000, graduate: 30000 },
      living: 12000,
      exchange: 105,
    },
    australia: {
      name: "Australia",
      currency: "AUD",
      tuition: { undergraduate: 30000, graduate: 35000 },
      living: 18000,
      exchange: 55,
    },
  };

  const calculateCosts = () => {
    const data = countryData[country];
    const tuitionFee = data.tuition[courseType];
    const livingExpenses = data.living;
    const totalPerYear = tuitionFee + livingExpenses;
    const totalCourse = totalPerYear * duration;
    const totalInINR = totalCourse * data.exchange;

    setResults({
      tuitionPerYear: tuitionFee,
      livingPerYear: livingExpenses,
      totalPerYear,
      totalCourse,
      totalInINR,
      currency: data.currency,
      countryName: data.name,
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <Calculator className="w-8 h-8 text-primary-600 mr-3" />
        <h3 className="text-2xl font-bold text-amber-900">
          Education Cost Calculator
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Country
          </label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="usa">🇺🇸 United States</option>
            <option value="canada">🇨🇦 Canada</option>
            <option value="uk">🇬🇧 United Kingdom</option>
            <option value="australia">🇦🇺 Australia</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Level
          </label>
          <select
            value={courseType}
            onChange={(e) => setCourseType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="undergraduate">Undergraduate</option>
            <option value="graduate">Graduate/Masters</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Duration (Years)
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value={1}>1 Year</option>
            <option value={2}>2 Years</option>
            <option value={3}>3 Years</option>
            <option value={4}>4 Years</option>
            <option value={5}>5 Years</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={calculateCosts}
            className="w-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
          >
            Calculate Costs
          </button>
        </div>
      </div>

      {results && (
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-6">
          <h4 className="text-xl font-bold text-amber-900 mb-4">
            Estimated Costs for {results.countryName}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Book className="w-5 h-5 text-primary-600 mr-2" />
                <span className="text-sm font-medium text-amber-700">
                  Tuition (Per Year)
                </span>
              </div>
              <div className="text-2xl font-bold text-amber-900">
                {results.tuitionPerYear.toLocaleString()} {results.currency}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Home className="w-5 h-5 text-secondary-600 mr-2" />
                <span className="text-sm font-medium text-amber-700">
                  Living Expenses (Per Year)
                </span>
              </div>
              <div className="text-2xl font-bold text-secondary-800">
                {results.livingPerYear.toLocaleString()} {results.currency}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <CreditCard className="w-5 h-5 text-primary-600 mr-2" />
                <span className="text-sm font-medium text-amber-700">
                  Total Per Year
                </span>
              </div>
              <div className="text-2xl font-bold text-amber-900">
                {results.totalPerYear.toLocaleString()} {results.currency}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <PiggyBank className="w-5 h-5 text-secondary-600 mr-2" />
                <span className="text-sm font-medium text-amber-700">
                  Total Course Cost
                </span>
              </div>
              <div className="text-2xl font-bold text-secondary-800">
                {results.totalCourse.toLocaleString()} {results.currency}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-4 rounded-lg text-center">
            <div className="text-sm opacity-90 mb-1">
              Total Cost in Indian Rupees
            </div>
            <div className="text-3xl font-bold">
              ₹ {results.totalInINR.toLocaleString()}
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-amber-700">
              *These are estimated costs. Actual expenses may vary based on
              university, lifestyle, and location.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialCalculator;
