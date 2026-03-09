import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="mt-8 max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-white" />
        <input
          type="search"
          placeholder="Search courses, universities, or fields..."
          value={value}
          onChange={onChange}
          className="w-full pl-12 pr-4 py-3 rounded-full bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-lg"
        />
      </div>
    </div>
  );
};

export default SearchBar;
