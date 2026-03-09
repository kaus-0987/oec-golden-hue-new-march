"use client";
import React, { useState } from "react";
import { ResultCard } from "../Finance";
import { DollarSign, TrendingUp, Calendar, AlertCircle } from "lucide-react";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(10.5);
  const [loanTenure, setLoanTenure] = useState(10);

  const calculateLoan = () => {
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = loanTenure * 12;

    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    const totalAmount = emi * totalMonths;
    const totalInterest = totalAmount - loanAmount;

    return {
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      interestPercentage: ((totalInterest / loanAmount) * 100).toFixed(1),
    };
  };

  const results = calculateLoan();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Amount (₹)
          </label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            min="100000"
            step="100000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interest Rate (%)
          </label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            min="1"
            max="20"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Tenure (Years)
          </label>
          <select
            value={loanTenure}
            onChange={(e) => setLoanTenure(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            {Array.from({ length: 20 }, (_, i) => i + 1).map((year) => (
              <option key={year} value={year}>
                {year} Year{year > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Monthly EMI"
          value={`₹ ${results.emi.toLocaleString()}`}
          subtitle="Principal + Interest"
          icon={Calendar}
          color="primary"
        />
        <ResultCard
          title="Total Amount"
          value={`₹ ${results.totalAmount.toLocaleString()}`}
          subtitle="EMI × Tenure"
          icon={DollarSign}
          color="secondary"
        />
        <ResultCard
          title="Total Interest"
          value={`₹ ${results.totalInterest.toLocaleString()}`}
          subtitle={`${results.interestPercentage}% of principal`}
          icon={TrendingUp}
          color="primary"
        />
        <ResultCard
          title="Interest Burden"
          value={`${results.interestPercentage}%`}
          subtitle="Of loan amount"
          icon={AlertCircle}
          color="secondary"
        />
      </div>

      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6">
        <h4 className="text-lg font-bold text-amber-900 mb-4">
          Loan Breakdown
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium mb-3">Payment Schedule</h5>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Monthly EMI:</span>
                <span className="font-medium">
                  ₹ {results.emi.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Yearly Payment:</span>
                <span className="font-medium">
                  ₹ {(results.emi * 12).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Payments:</span>
                <span className="font-medium">{loanTenure * 12} EMIs</span>
              </div>
            </div>
          </div>
          <div>
            <h5 className="font-medium mb-3">Cost Analysis</h5>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Principal Amount:</span>
                <span className="font-medium">
                  ₹ {loanAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Interest Component:</span>
                <span className="font-medium">
                  ₹ {results.totalInterest.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Cost:</span>
                <span className="font-medium">
                  ₹ {results.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
