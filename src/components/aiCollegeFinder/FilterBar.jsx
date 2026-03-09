import React from "react";
import {
  GraduationCap,
  Globe,
  BookOpen,
  Clock,
  User,
  ChevronDown,
} from "lucide-react";

const FilterBar = ({ filters, onFilterChange }) => {
  const filterConfig = [
    {
      name: "degree",
      options: ["bachelor", "master", "phd", "diploma"],
      icon: <GraduationCap className="h-4 w-4 mr-2" />,
    },
    {
      name: "country",
      options: [
        "united-states",
        "canada",
        "united-kingdom",
        "germany",
        "australia",
      ],
      icon: <Globe className="h-4 w-4 mr-2" />,
    },
    {
      name: "field",
      options: [
        "computer-science",
        "mba",
        "data-science",
        "engineering",
        "business",
        "medicine",
        "architecture",
      ],
      icon: <BookOpen className="h-4 w-4 mr-2" />,
    },
    {
      name: "duration",
      options: ["1-year", "2-years", "3-years", "4-years"],
      icon: <Clock className="h-4 w-4 mr-2" />,
    },
    {
      name: "delivery",
      options: ["on-campus", "online", "hybrid"],
      icon: <User className="h-4 w-4 mr-2" />,
    },
  ];

  const formatOptionText = (text) => {
    return text
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="flex flex-wrap gap-3 w-full">
      {filterConfig.map(({ name, options, icon }) => (
        <div key={name} className="relative flex-1 min-w-[150px]">
          <div className="flex items-center text-sm text-white mb-1 ml-1">
            {icon}
            <span className="text-amber-900">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </span>
          </div>
          <select
            name={name}
            value={filters[name]}
            onChange={onFilterChange}
            className="appearance-none w-full pl-3 pr-8 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-primary-800 focus:border-primary-800 shadow-sm"
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {formatOptionText(option)}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 bottom-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
        </div>
      ))}
    </div>
  );
};

export default FilterBar;
