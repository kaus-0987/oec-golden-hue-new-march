"use client";
import React, { useState } from "react";
import { countryData, ResultCard } from "../Finance";
import { DollarSign, TrendingUp, Target, Clock } from "lucide-react";

const ROICalculator = () => {
  const [country, setCountry] = useState("usa");
  const [courseLevel, setCourseLevel] = useState("undergraduate");
  const [duration, setDuration] = useState(4);
  const [city, setCity] = useState("Other Cities");
  const [tuitionType, setTuitionType] = useState("avg");
  const [livingType, setLivingType] = useState("avg");

  const [roiCountry, setRoiCountry] = useState("usa");
  const [roiCourseLevel, setRoiCourseLevel] = useState("undergraduate");
  const [roiDuration, setRoiDuration] = useState(4);
  const [expectedSalary, setExpectedSalary] = useState(55000);

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
  const calculateROI = () => {
    const data = countryData[roiCountry];
    const totalInvestment = calculateEducationCost().totalInINR;
    const annualSalaryINR = expectedSalary * data.exchangeRate;

    const paybackPeriod = totalInvestment / annualSalaryINR;
    const fiveYearROI =
      ((annualSalaryINR * 5 - totalInvestment) / totalInvestment) * 100;
    const tenYearROI =
      ((annualSalaryINR * 10 - totalInvestment) / totalInvestment) * 100;

    return {
      totalInvestment,
      annualSalaryINR,
      paybackPeriod: paybackPeriod.toFixed(1),
      fiveYearROI: fiveYearROI.toFixed(1),
      tenYearROI: tenYearROI.toFixed(1),
      monthlyIncome: Math.round(annualSalaryINR / 12),
    };
  };

  const results = calculateROI();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <select
            value={roiCountry}
            onChange={(e) => setRoiCountry(e.target.value)}
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
            value={roiCourseLevel}
            onChange={(e) => setRoiCourseLevel(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="undergraduate">Undergraduate</option>
            <option value="graduate">Graduate/Masters</option>
            <option value="phd">PhD/Doctorate</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration
          </label>
          <select
            value={roiDuration}
            onChange={(e) => setRoiDuration(Number(e.target.value))}
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
            Expected Salary ({countryData[roiCountry].currency})
          </label>
          <input
            type="number"
            value={expectedSalary}
            onChange={(e) => setExpectedSalary(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            min="20000"
            step="5000"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Total Investment"
          value={`₹ ${Math.round(results.totalInvestment / 100000)} L`}
          subtitle="Education cost in India"
          icon={DollarSign}
          color="primary"
        />
        <ResultCard
          title="Annual Income"
          value={`₹ ${Math.round(results.annualSalaryINR / 100000)} L`}
          subtitle="First year salary in INR"
          icon={TrendingUp}
          color="secondary"
        />
        <ResultCard
          title="Payback Period"
          value={`${results.paybackPeriod} years`}
          subtitle="To recover investment"
          icon={Clock}
          color="primary"
        />
        <ResultCard
          title="10-Year ROI"
          value={`${results.tenYearROI}%`}
          subtitle="Return on investment"
          icon={Target}
          color="secondary"
        />
      </div>

      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6">
        <h4 className="text-lg font-bold text-amber-900 mb-4">
          ROI Analysis Timeline
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h5 className="font-medium mb-3">Short Term (1-3 years)</h5>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Monthly Income:</span>
                <span className="font-medium">
                  ₹ {results.monthlyIncome.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>3-Year Earnings:</span>
                <span className="font-medium">
                  ₹ {Math.round((results.annualSalaryINR * 3) / 100000)} L
                </span>
              </div>
              <div className="flex justify-between">
                <span>Net Gain/Loss:</span>
                <span
                  className={`font-medium ${
                    results.annualSalaryINR * 3 > results.totalInvestment
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  ₹{" "}
                  {Math.round(
                    (results.annualSalaryINR * 3 - results.totalInvestment) /
                      100000
                  )}{" "}
                  L
                </span>
              </div>
            </div>
          </div>
          <div>
            <h5 className="font-medium mb-3">Medium Term (5 years)</h5>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>5-Year Earnings:</span>
                <span className="font-medium">
                  ₹ {Math.round((results.annualSalaryINR * 5) / 100000)} L
                </span>
              </div>
              <div className="flex justify-between">
                <span>ROI:</span>
                <span className="font-medium text-green-600">
                  {results.fiveYearROI}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Net Profit:</span>
                <span className="font-medium text-green-600">
                  ₹{" "}
                  {Math.round(
                    (results.annualSalaryINR * 5 - results.totalInvestment) /
                      100000
                  )}{" "}
                  L
                </span>
              </div>
            </div>
          </div>
          <div>
            <h5 className="font-medium mb-3">Long Term (10 years)</h5>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>10-Year Earnings:</span>
                <span className="font-medium">
                  ₹ {Math.round((results.annualSalaryINR * 10) / 100000)} L
                </span>
              </div>
              <div className="flex justify-between">
                <span>ROI:</span>
                <span className="font-medium text-green-600">
                  {results.tenYearROI}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Net Wealth:</span>
                <span className="font-medium text-green-600">
                  ₹{" "}
                  {Math.round(
                    (results.annualSalaryINR * 10 - results.totalInvestment) /
                      100000
                  )}{" "}
                  L
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;
