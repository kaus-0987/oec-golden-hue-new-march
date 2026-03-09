import React from "react";
import { Grid, List } from "lucide-react";

const ViewModeToggle = ({ viewMode, onViewModeChange }) => {
  return (
    <div className="flex items-center gap-2 mt-6 p-1">
      {["grid", "list"].map((mode) => (
        <button
          key={mode}
          onClick={() => onViewModeChange(mode)}
          className={`p-2 rounded-lg flex items-center ${
            viewMode === mode
              ? "bg-white text-white shadow-sm"
              : "text-amber-700 hover:bg-gray-200"
          }`}
          aria-label={`${mode} view`}
        >
          {mode === "grid" ? <Grid className="h-5 w-5" /> : <List className="h-5 w-5" />}
        </button>
      ))}
    </div>
  );
};

export default ViewModeToggle;
