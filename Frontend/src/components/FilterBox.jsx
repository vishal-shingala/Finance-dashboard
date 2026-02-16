import React from 'react';

const FilterBox = ({ filters, categories, onReset, onChange }) => {
  return (
    <div className="rounded-xl p-4 bg-dark">
      <h2 className="text-white text-lg font-semibold mb-4">filter box</h2>
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-0">
          <label className="block text-sm font-medium mb-1 text-white">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            className="w-full p-2 bg-gray-700 rounded text-white placeholder:text-sm"
            placeholder="mm/dd/yyyy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <label className="block text-sm font-medium mb-1 text-white">End Date</label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            className="w-full p-2 bg-gray-700 rounded text-white placeholder:text-sm"
            placeholder="mm/dd/yyyy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <label className="block text-sm font-medium mb-1 text-white">Month</label>
          <select
            name="month"
            value={filters.month}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            className="w-full p-2 bg-gray-700 rounded text-white"
          >
            <option value="">All</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-0">
          <label className="block text-sm font-medium mb-1 text-white">Year</label>
          <select
            name="year"
            value={filters.year}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            className="w-full p-2 bg-gray-700 rounded text-white"
          >
            <option value="">All</option>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={2020 + i} value={2020 + i}>
                {2020 + i}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-0">
          <label className="block text-sm font-medium mb-1 text-white">Category</label>
          <select
            name="category"
            value={filters.category}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            className="w-full p-2 bg-gray-700 rounded text-white"
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-0">
          <label className="block text-sm font-medium mb-1 text-white">Type</label>
          <select
            name="type"
            value={filters.type}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            className="w-full p-2 bg-gray-700 rounded text-white"
          >
            <option value="">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="mt-4 w-full p-2 bg-gray-600 text-white rounded hover:bg-gray-500"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterBox;