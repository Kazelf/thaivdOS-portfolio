"use client";
import React from "react";

const FilterTabs = ({ filters, activeFilter, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      {filters.map((filter) => (
        <button
          type="button"
          key={filter}
          onClick={() => onChange(filter)}
          className={`w-full rounded-lg border-l-2 px-4 py-2 text-left text-sm font-semibold ${
            filter === activeFilter
              ? "border-l-red-500 bg-base-300 text-base-foreground"
              : "border-l-transparent bg-base text-base-foreground hover:bg-base-300"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default React.memo(FilterTabs);
