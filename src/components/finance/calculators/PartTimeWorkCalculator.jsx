"use client";
import React, { useState } from "react";
import { countryData, ResultCard } from "../Finance";
import { DollarSign, TrendingUp, Target, Calendar } from "lucide-react";

const PartTimeWorkCalculator = () => {
  const [workCountry, setWorkCountry] = useState("usa");
  const [hoursPerWeek, setHoursPerWeek] = useState(15);
  const [weeksPerYear, setWeeksPerYear] = useState(40);

  const calculatePartTimeEarnings = () => {
    const data = countryData[workCountry];
    const weeklyEarnings = hoursPerWeek * data.partTimeWage;
    const annualEarnings = weeklyEarnings * weeksPerYear;
    const annualEarningsINR = annualEarnings * data.exchangeRate;

    return {
      weeklyEarnings,
      monthlyEarnings: Math.round(weeklyEarnings * 4.33),
      annualEarnings,
      annualEarningsINR: Math.round(annualEarningsINR),
      currency: data.currency,
      maxHours: data.maxWorkHours,
    };
  };

  const results = calculatePartTimeEarnings();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <select
            value={workCountry}
            onChange={(e) => setWorkCountry(e.target.value)}
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
            Hours per Week (Max: {results.maxHours})
          </label>
          <input
            type="number"
            value={hoursPerWeek}
            onChange={(e) =>
              setHoursPerWeek(
                Math.min(Number(e.target.value), results.maxHours)
              )
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            min="1"
            max={results.maxHours}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weeks per Year
          </label>
          <select
            value={weeksPerYear}
            onChange={(e) => setWeeksPerYear(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="40">40 weeks (Academic year)</option>
            <option value="45">45 weeks (With breaks)</option>
            <option value="50">50 weeks (Year-round)</option>
            <option value="52">52 weeks (Full year)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hourly Wage ({results.currency})
          </label>
          <input
            type="number"
            value={countryData[workCountry].partTimeWage}
            disabled
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Weekly Earnings"
          value={`${results.weeklyEarnings} ${results.currency}`}
          subtitle={`${hoursPerWeek} hrs × ${countryData[workCountry].partTimeWage} ${results.currency}`}
          icon={Calendar}
          color="primary"
        />
        <ResultCard
          title="Monthly Earnings"
          value={`${results.monthlyEarnings} ${results.currency}`}
          subtitle="Average per month"
          icon={DollarSign}
          color="secondary"
        />
        <ResultCard
          title="Annual Earnings"
          value={`${results.annualEarnings} ${results.currency}`}
          subtitle={`${weeksPerYear} weeks total`}
          icon={TrendingUp}
          color="primary"
        />
        <ResultCard
          title="Earnings in INR"
          value={`₹ ${results.annualEarningsINR.toLocaleString()}`}
          subtitle="Annual total in Indian Rupees"
          icon={Target}
          color="secondary"
        />
      </div>

      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6">
        <h4 className="text-lg font-bold text-amber-900 mb-4">
          Part-time Work Benefits
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium mb-3">Financial Benefits</h5>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Monthly Income:</span>
                <span className="font-medium">
                  ₹{" "}
                  {Math.round(results.annualEarningsINR / 12).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Semester Earnings:</span>
                <span className="font-medium">
                  ₹ {Math.round(results.annualEarningsINR / 2).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Living Cost Coverage:</span>
                <span className="font-medium text-green-600">
                  {Math.round(
                    (results.annualEarningsINR /
                      (countryData[workCountry].livingCosts.food.avg *
                        countryData[workCountry].exchangeRate)) *
                      100
                  )}
                  % of food costs
                </span>
              </div>
            </div>
          </div>
          <div>
            <h5 className="font-medium mb-3">Work Regulations</h5>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Max Hours/Week:</span>
                <span className="font-medium">{results.maxHours} hours</span>
              </div>
              <div className="flex justify-between">
                <span>During Breaks:</span>
                <span className="font-medium">Often full-time allowed</span>
              </div>
              <div className="flex justify-between">
                <span>Work Authorization:</span>
                <span className="font-medium text-green-600">
                  Included with student visa
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartTimeWorkCalculator;
