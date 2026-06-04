import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../context/User.context';

const FilterBox = ({ onFilterChange }) => {
  const { transactions, registerYear } = useContext(UserContext);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    month: "",
    year: "",
    category: "",
    type: "",
  });
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [dbCategories, setDbCategories] = useState([]);

  // Fetch categories from database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/v1/categories");
        const sortedCategories = res.data.data.sort((a, b) =>
          a.localeCompare(b)
        );
        setDbCategories(sortedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Generate year range from registered year to current year
  const generateYearRange = (startYear, endYear) => {
    const result = [];
    for (let i = startYear; i <= endYear; i++) {
      result.push(i);
    }
    return result;
  };

  const currYear = new Date().getFullYear();
  const yearRange = Number.isInteger(registerYear) && registerYear > 0
    ? generateYearRange(registerYear, currYear)
    : [];

  const handleApplyFilters = async () => {
    try {
      const res = await axios.post("/api/v1/filtered-transactions", filters);
      setFilteredTransactions(res.data.data);
      const isFilterApplied = Object.values(filters).some((value) => value !== "");
      onFilterChange({
        filteredTransactions: res.data.data,
        isFilterApplied: isFilterApplied,
      });
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilter = () => {
    setFilters({
      startDate: "",
      endDate: "",
      month: "",
      year: "",
      category: "",
      type: "",
    });
  };

  return (
    <div className="rounded-xl p-3 sm:p-4 bg-dark border ">
      <h2 className="text-white text-base sm:text-lg font-semibold mb-3 sm:mb-4">Filters</h2>
      <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
        <div className="w-full sm:flex-1 sm:min-w-0">
          <label className="block text-xs font-medium mb-1 text-gray-300 uppercase tracking-wide">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
            placeholder="mm/dd/yyyy"
          />
        </div>
        <div className="w-full sm:flex-1 sm:min-w-0">
          <label className="block text-xs font-medium mb-1 text-gray-300 uppercase tracking-wide">End Date</label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
            placeholder="mm/dd/yyyy"
          />
        </div>
        <div className="w-full sm:flex-1 sm:min-w-0">
          <label className="block text-xs font-medium mb-1 text-gray-300 uppercase tracking-wide">Month</label>
          <select
            name="month"
            value={filters.month}
            onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
          >
            <option value="">All</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full sm:flex-1 sm:min-w-0">
          <label className="block text-xs font-medium mb-1 text-gray-300 uppercase tracking-wide">Year</label>
          <select
            name="year"
            value={filters.year}
            onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
          >
            <option value="">All</option>
            {yearRange.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full sm:flex-1 sm:min-w-0">
          <label className="block text-xs font-medium mb-1 text-gray-300 uppercase tracking-wide">Category</label>
          <select
            name="category"
            value={filters.category}
            onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
          >
            <option value="">All</option>
            {dbCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full sm:flex-1 sm:min-w-0">
          <label className="block text-xs font-medium mb-1 text-gray-300 uppercase tracking-wide">Type</label>
          <select
            name="type"
            value={filters.type}
            onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
          >
            <option value="">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-4">
        <button
          type="button"
          onClick={handleApplyFilters}
          className="flex-1 p-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 font-medium transition text-sm"
        >
          Apply Filters
        </button>
        <button
          type="button"
          onClick={resetFilter}
          className="flex-1 p-2 bg-gray-700 text-white rounded hover:bg-gray-600 font-medium transition text-sm"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterBox;