"use client";
import React, { useState } from "react";
import { countryData, ResultCard } from "../Finance";
import {
  Calculator,
  GraduationCap,
  Home,
  Target,
  ShoppingCart,
  Heart,
  Zap,
  Coffee,
  Car,
} from "lucide-react";

const EducationCalculator = () => {
  const [country, setCountry] = useState("usa");
  const [courseLevel, setCourseLevel] = useState("undergraduate");
  const [duration, setDuration] = useState(4);
  const [city, setCity] = useState("Other Cities");
  const [tuitionType, setTuitionType] = useState("avg");
  const [livingType, setLivingType] = useState("avg");

  const calculateEducationCost = () => {
    const data = countryData[country];
    const cityMultiplier =
      data.cities.find((c) => c.name === city)?.costMultiplier || 1;

    const tuitionPerYear = data.tuition[courseLevel][tuitionType];
    const livingCostsPerYear = Object.values(data.livingCosts).reduce(
      (sum, cost) => sum + cost[livingType] * cityMultiplier,
      0
    );

    const totalPerYear = tuitionPerYear + livingCostsPerYear;
    const totalCourse = totalPerYear * duration;
    const totalInINR = totalCourse * data.exchangeRate;

    return {
      tuitionPerYear,
      livingCostsPerYear,
      totalPerYear,
      totalCourse,
      totalInINR,
      currency: data.currency,
      breakdown: {
        accommodation:
          data.livingCosts.accommodation[livingType] * cityMultiplier,
        food: data.livingCosts.food[livingType] * cityMultiplier,
        transport: data.livingCosts.transport[livingType] * cityMultiplier,
        utilities: data.livingCosts.utilities[livingType] * cityMultiplier,
        healthcare: data.livingCosts.healthcare[livingType] * cityMultiplier,
        miscellaneous:
          data.livingCosts.miscellaneous[livingType] * cityMultiplier,
      },
    };
  };

  const results = calculateEducationCost();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            {Object.entries(countryData).map(([key, data]) => (
              <option key={key} value={key}>
                {data.flag} {data.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Level
          </label>
          <select
            value={courseLevel}
            onChange={(e) => setCourseLevel(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="undergraduate">Undergraduate</option>
            <option value="graduate">Graduate/Masters</option>
            <option value="phd">PhD/Doctorate</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration (Years)
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            {[1, 2, 3, 4, 5, 6].map((year) => (
              <option key={year} value={year}>
                {year} Year{year > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City
          </label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            {countryData[country].cities.map((cityData, index) => (
              <option key={index} value={cityData.name}>
                {cityData.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tuition Fee Range
          </label>
          <div className="flex space-x-2">
            {[
              { key: "min", label: "Budget" },
              { key: "avg", label: "Average" },
              { key: "max", label: "Premium" },
            ].map((option) => (
              <button
                key={option.key}
                onClick={() => setTuitionType(option.key)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  tuitionType === option.key
                    ? "bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Living Standard
          </label>
          <div className="flex space-x-2">
            {[
              { key: "min", label: "Basic" },
              { key: "avg", label: "Comfortable" },
              { key: "max", label: "Luxury" },
            ].map((option) => (
              <button
                key={option.key}
                onClick={() => setLivingType(option.key)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  livingType === option.key
                    ? "bg-secondary-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Tuition (Per Year)"
          value={`${results.tuitionPerYear.toLocaleString()} ${
            results.currency
          }`}
          subtitle="Academic fees only"
          icon={GraduationCap}
          color="primary"
        />
        <ResultCard
          title="Living (Per Year)"
          value={`${Math.round(results.livingCostsPerYear).toLocaleString()} ${
            results.currency
          }`}
          subtitle="All living expenses"
          icon={Home}
          color="secondary"
        />
        <ResultCard
          title="Total Per Year"
          value={`${Math.round(results.totalPerYear).toLocaleString()} ${
            results.currency
          }`}
          subtitle="Tuition + Living"
          icon={Calculator}
          color="primary"
        />
        <ResultCard
          title="Total Course Cost"
          value={`₹ ${Math.round(results.totalInINR).toLocaleString()}`}
          subtitle={`${duration} year${duration > 1 ? "s" : ""} in INR`}
          icon={Target}
          color="secondary"
        />
      </div>

      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6">
        <h4 className="text-lg font-bold text-amber-900 mb-4">
          Living Expenses Breakdown (Per Year)
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(results.breakdown).map(([category, amount]) => (
            <div key={category} className="bg-white p-3 rounded-lg">
              <div className="flex items-center mb-2">
                {category === "accommodation" && (
                  <Home className="w-4 h-4 text-primary-600 mr-2" />
                )}
                {category === "food" && (
                  <Coffee className="w-4 h-4 text-secondary-600 mr-2" />
                )}
                {category === "transport" && (
                  <Car className="w-4 h-4 text-primary-600 mr-2" />
                )}
                {category === "utilities" && (
                  <Zap className="w-4 h-4 text-secondary-600 mr-2" />
                )}
                {category === "healthcare" && (
                  <Heart className="w-4 h-4 text-primary-600 mr-2" />
                )}
                {category === "miscellaneous" && (
                  <ShoppingCart className="w-4 h-4 text-secondary-600 mr-2" />
                )}
                <span className="text-sm font-medium capitalize">
                  {category}
                </span>
              </div>
              <div className="text-lg font-bold text-amber-900">
                {Math.round(amount).toLocaleString()} {results.currency}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationCalculator;
