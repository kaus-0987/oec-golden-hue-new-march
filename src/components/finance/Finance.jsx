"use client";
import React, { useState } from "react";
import {
  Calculator,
  DollarSign,
  PiggyBank,
  TrendingUp,
  Home,
  Briefcase,
  CreditCard,
  Target,
  BarChart3,
  PieChart,
  Award,
  Clock,
  ChevronDown,
} from "lucide-react";
import Comparison from "./calculators/Comparison";
import BudgetPlanner from "./calculators/BudgetPlanner";
import LoanCalculator from "./calculators/LoanCalculator";
import ROICalculator from "./calculators/ROICalculator";
import EducationCalculator from "./calculators/EducationCalculator";
import ScholarshipCalculator from "./calculators/ScholarshipCalculator";
import PartTimeWorkCalculator from "./calculators/PartTimeWorkCalculator";

export const countryData = {
  usa: {
    name: "United States",
    currency: "USD",
    flag: "🇺🇸",
    exchangeRate: 83,
    tuition: {
      undergraduate: { min: 25000, max: 55000, avg: 35000 },
      graduate: { min: 30000, max: 65000, avg: 45000 },
      phd: { min: 25000, max: 50000, avg: 35000 },
    },
    livingCosts: {
      accommodation: { min: 8000, max: 20000, avg: 12000 },
      food: { min: 3000, max: 6000, avg: 4000 },
      transport: { min: 1000, max: 2500, avg: 1500 },
      utilities: { min: 1200, max: 2000, avg: 1500 },
      healthcare: { min: 1500, max: 3000, avg: 2000 },
      miscellaneous: { min: 2000, max: 4000, avg: 3000 },
    },
    partTimeWage: 15,
    maxWorkHours: 20,
    postStudyWork: 12,
    averageSalary: { undergraduate: 55000, graduate: 75000, phd: 90000 },
    cities: [
      { name: "New York", costMultiplier: 1.4 },
      { name: "Los Angeles", costMultiplier: 1.3 },
      { name: "Chicago", costMultiplier: 1.1 },
      { name: "Boston", costMultiplier: 1.2 },
      { name: "Austin", costMultiplier: 1.0 },
      { name: "Other Cities", costMultiplier: 0.9 },
    ],
  },
  canada: {
    name: "Canada",
    currency: "CAD",
    flag: "🇨🇦",
    exchangeRate: 62,
    tuition: {
      undergraduate: { min: 15000, max: 35000, avg: 25000 },
      graduate: { min: 20000, max: 45000, avg: 30000 },
      phd: { min: 15000, max: 25000, avg: 20000 },
    },
    livingCosts: {
      accommodation: { min: 6000, max: 15000, avg: 10000 },
      food: { min: 2500, max: 4500, avg: 3500 },
      transport: { min: 800, max: 1800, avg: 1200 },
      utilities: { min: 1000, max: 1800, avg: 1400 },
      healthcare: { min: 800, max: 1500, avg: 1000 },
      miscellaneous: { min: 1500, max: 3000, avg: 2000 },
    },
    partTimeWage: 16,
    maxWorkHours: 20,
    postStudyWork: 36,
    averageSalary: { undergraduate: 45000, graduate: 65000, phd: 80000 },
    cities: [
      { name: "Toronto", costMultiplier: 1.3 },
      { name: "Vancouver", costMultiplier: 1.4 },
      { name: "Montreal", costMultiplier: 1.0 },
      { name: "Calgary", costMultiplier: 1.1 },
      { name: "Ottawa", costMultiplier: 1.2 },
      { name: "Other Cities", costMultiplier: 0.9 },
    ],
  },
  uk: {
    name: "United Kingdom",
    currency: "GBP",
    flag: "🇬🇧",
    exchangeRate: 105,
    tuition: {
      undergraduate: { min: 15000, max: 35000, avg: 25000 },
      graduate: { min: 18000, max: 40000, avg: 28000 },
      phd: { min: 15000, max: 30000, avg: 22000 },
    },
    livingCosts: {
      accommodation: { min: 6000, max: 18000, avg: 10000 },
      food: { min: 2000, max: 4000, avg: 3000 },
      transport: { min: 800, max: 2000, avg: 1200 },
      utilities: { min: 1200, max: 2000, avg: 1500 },
      healthcare: { min: 0, max: 500, avg: 200 },
      miscellaneous: { min: 1500, max: 3500, avg: 2500 },
    },
    partTimeWage: 12,
    maxWorkHours: 20,
    postStudyWork: 24,
    averageSalary: { undergraduate: 25000, graduate: 35000, phd: 45000 },
    cities: [
      { name: "London", costMultiplier: 1.5 },
      { name: "Edinburgh", costMultiplier: 1.2 },
      { name: "Manchester", costMultiplier: 1.0 },
      { name: "Birmingham", costMultiplier: 0.9 },
      { name: "Liverpool", costMultiplier: 0.9 },
      { name: "Other Cities", costMultiplier: 0.8 },
    ],
  },
  australia: {
    name: "Australia",
    currency: "AUD",
    flag: "🇦🇺",
    exchangeRate: 55,
    tuition: {
      undergraduate: { min: 20000, max: 45000, avg: 30000 },
      graduate: { min: 25000, max: 50000, avg: 35000 },
      phd: { min: 20000, max: 40000, avg: 28000 },
    },
    livingCosts: {
      accommodation: { min: 8000, max: 20000, avg: 12000 },
      food: { min: 3000, max: 5000, avg: 4000 },
      transport: { min: 1000, max: 2000, avg: 1500 },
      utilities: { min: 1500, max: 2500, avg: 2000 },
      healthcare: { min: 500, max: 1000, avg: 700 },
      miscellaneous: { min: 2000, max: 4000, avg: 3000 },
    },
    partTimeWage: 18,
    maxWorkHours: 20,
    postStudyWork: 24,
    averageSalary: { undergraduate: 50000, graduate: 70000, phd: 85000 },
    cities: [
      { name: "Sydney", costMultiplier: 1.4 },
      { name: "Melbourne", costMultiplier: 1.3 },
      { name: "Brisbane", costMultiplier: 1.1 },
      { name: "Perth", costMultiplier: 1.2 },
      { name: "Adelaide", costMultiplier: 1.0 },
      { name: "Other Cities", costMultiplier: 0.9 },
    ],
  },
  germany: {
    name: "Germany",
    currency: "EUR",
    flag: "🇩🇪",
    exchangeRate: 91,
    tuition: {
      undergraduate: { min: 0, max: 20000, avg: 5000 },
      graduate: { min: 0, max: 25000, avg: 8000 },
      phd: { min: 0, max: 15000, avg: 3000 },
    },
    livingCosts: {
      accommodation: { min: 4000, max: 12000, avg: 7000 },
      food: { min: 2000, max: 4000, avg: 3000 },
      transport: { min: 800, max: 1500, avg: 1000 },
      utilities: { min: 1000, max: 2000, avg: 1500 },
      healthcare: { min: 1000, max: 1500, avg: 1200 },
      miscellaneous: { min: 1500, max: 3000, avg: 2000 },
    },
    partTimeWage: 12,
    maxWorkHours: 20,
    postStudyWork: 18,
    averageSalary: { undergraduate: 35000, graduate: 50000, phd: 65000 },
    cities: [
      { name: "Munich", costMultiplier: 1.3 },
      { name: "Frankfurt", costMultiplier: 1.2 },
      { name: "Berlin", costMultiplier: 1.1 },
      { name: "Hamburg", costMultiplier: 1.1 },
      { name: "Stuttgart", costMultiplier: 1.2 },
      { name: "Other Cities", costMultiplier: 0.9 },
    ],
  },
};

export const CalculatorCard = ({
  title,
  icon: Icon,
  children,
  className = "",
}) => (
  <div
    className={`bg-white rounded-xl shadow-lg border border-gray-200 ${className}`}
  >
    <div className="p-6 border-b border-gray-100">
      <div className="flex items-center">
        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
          <Icon className="w-6 h-6 text-primary-600" />
        </div>
        <h3 className="text-xl font-bold text-amber-900">{title}</h3>
      </div>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

export const ResultCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "primary",
}) => (
  <div
    className={`bg-gradient-to-r from-${color}-50 to-${color}-100 p-4 rounded-lg border border-${color}-200`}
  >
    <div className="flex items-center justify-between mb-2">
      <h4 className={`text-${color}-800 font-medium text-sm`}>{title}</h4>
      {Icon && <Icon className={`w-4 h-4 text-${color}-600`} />}
    </div>
    <div className={`text-2xl font-bold text-${color}-800 mb-1`}>{value}</div>
    {subtitle && <div className={`text-${color}-600 text-xs`}>{subtitle}</div>}
  </div>
);

const ExpandableSection = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-xl mb-4 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left bg-primary-50 hover:bg-primary-100 transition-colors flex items-center justify-between"
      >
        <h3 className="text-lg font-semibold text-amber-900">{title}</h3>
        <ChevronDown
          className={`w-5 h-5 text-primary-600 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && <div className="p-6 bg-white">{children}</div>}
    </div>
  );
};

const financeTipsData = [
  {
    icon: <PiggyBank className="w-8 h-8 text-white" />,
    title: "Start Early",
    description:
      "Begin financial planning 2-3 years before your intended start date for better preparation.",
  },
  {
    icon: <Target className="w-8 h-8 text-secondary-600" />,
    title: "Multiple Scenarios",
    description:
      "Calculate costs for different countries and courses to compare your options effectively.",
  },
  {
    icon: <Award className="w-8 h-8 text-white" />,
    title: "Explore Scholarships",
    description:
      "Always factor in potential scholarships and part-time work to reduce your financial burden.",
  },
];

const Finance = () => {
  const [activeCalculator, setActiveCalculator] = useState("education-cost");

  const calculators = [
    { id: "education-cost", name: "Education Cost", icon: Calculator },
    { id: "loan-calculator", name: "Loan Calculator", icon: CreditCard },
    { id: "scholarship", name: "Scholarship Impact", icon: Award },
    { id: "living-cost", name: "Living Expenses", icon: Home },
    { id: "roi-calculator", name: "ROI Analysis", icon: TrendingUp },
    { id: "part-time-work", name: "Part-time Earnings", icon: Briefcase },
    { id: "budget-planner", name: "Budget Planner", icon: PieChart },
    { id: "comparison", name: "Country Comparison", icon: BarChart3 },
  ];

  const renderContent = () => {
    switch (activeCalculator) {
      case "education-cost":
        return <EducationCalculator />;
      case "loan-calculator":
        return <LoanCalculator />;
      case "scholarship":
        return <ScholarshipCalculator />;
      case "living-cost":
        return <EducationCalculator />;
      case "roi-calculator":
        return <ROICalculator />;
      case "part-time-work":
        return <PartTimeWorkCalculator />;
      case "budget-planner":
        return <BudgetPlanner />;
      case "comparison":
        return <Comparison />;
      default:
        return <EducationCalculator />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white mt-20 mb-20 py-20 md:py-32 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Financial Calculators
          </h1>
          <p className="text-white text-xl md:text-2xl max-w-4xl mx-auto">
            Make informed financial decisions with our comprehensive suite of
            calculators designed specifically for study abroad planning.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">
            Choose Your Calculator
          </h2>
          <p className="text-amber-700 max-w-2xl mx-auto">
            Select from our comprehensive range of financial calculators to plan
            your study abroad budget effectively
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12 p-2 bg-gray-100 rounded-xl">
          {calculators.map((calc, index) => (
            <button
              key={index}
              className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 text-sm ${
                activeCalculator === calc.id
                  ? "bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white"
                  : "bg-white text-amber-900 border border-primary-800 shadow"
              }`}
              onClick={() => setActiveCalculator(calc.id)}
            >
              <calc.icon className="w-4 h-4 mr-2 text-white" />
              {calc.name}
            </button>
          ))}
        </div>

        <CalculatorCard
          title={
            calculators.find((c) => c.id === activeCalculator)?.name ||
            "Calculator"
          }
          icon={
            calculators.find((c) => c.id === activeCalculator)?.icon ||
            Calculator
          }
          className="mb-8"
        >
          {renderContent()}
        </CalculatorCard>

        <ExpandableSection
          title="💡 Financial Planning Tips"
          defaultOpen={true}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {financeTipsData.map((tip, index) => (
              <div key={index} className="text-center p-4">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {tip.icon}
                </div>
                <h4 className="font-semibold mb-2">{tip.title}</h4>
                <p className="text-amber-700 text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </ExpandableSection>
      </div>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: "500K+", label: "Calculations Done", icon: Calculator },
              {
                number: "₹2,500Cr",
                label: "Total Costs Calculated",
                icon: DollarSign,
              },
              { number: "95%", label: "Accuracy Rate", icon: Target },
              { number: "24/7", label: "Available", icon: Clock },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-xl shadow-sm"
              >
                <div className="text-primary-600 mb-3 flex justify-center">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-amber-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-amber-700">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Finance;
