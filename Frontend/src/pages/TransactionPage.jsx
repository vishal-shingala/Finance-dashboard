import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/User.context";
import axios from "axios";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import DateFormatter from "../parts/DateFormatter";
import Navbar from "../components/Navbar";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, ArcElement);

const TransactionPage = () => {
  const { currUser } = useContext(UserContext);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    month: "",
    year: "",
    category: "",
    type: "",
  });

  useEffect(() => {
    if (currUser) {
      fetchTransactions();
    }
  }, [currUser]);

  const fetchTransactions = async () => {
    try {
      const res = await axios.post("/api/v1/filtered-transactions", filters);
      setTransactions(res.data.data);
      setFilteredTransactions(res.data.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Prepare data for line chart
  const lineChartData = {
    labels: filteredTransactions.map((tx) => new Date(tx.date).toLocaleDateString()),
    datasets: [
      {
        label: "Income",
        data: filteredTransactions
          .filter((tx) => tx.type === "income")
          .map((tx) => tx.amount),
        borderColor: "#22c55e",
        backgroundColor: "#22c55e",
        tension: 0.4,
      },
      {
        label: "Expense",
        data: filteredTransactions
          .filter((tx) => tx.type === "expense")
          .map((tx) => tx.amount),
        borderColor: "#ef4444",
        backgroundColor: "#ef4444",
        tension: 0.4,
      },
    ],
  };

  // Prepare data for pie chart (by category)
  const categoryTotals = filteredTransactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {});

  const pieChartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const categories = [...new Set(transactions.map((tx) => tx.category))];

  return (
    <div className="bg-dashboard min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-white mb-6">Transactions</h1>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left side: Filters and Transaction List */}
          <div className="lg:w-1/2 flex flex-col gap-6">
            {/* Filters */}
            <div className="bg-dark text-white rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-0">
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={filters.startDate}
                    onChange={handleFilterChange}
                    className="w-full p-2 bg-gray-700 rounded"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={filters.endDate}
                    onChange={handleFilterChange}
                    className="w-full p-2 bg-gray-700 rounded"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-sm font-medium mb-1">Month</label>
                  <select
                    name="month"
                    value={filters.month}
                    onChange={handleFilterChange}
                    className="w-full p-2 bg-gray-700 rounded"
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
                  <label className="block text-sm font-medium mb-1">Year</label>
                  <select
                    name="year"
                    value={filters.year}
                    onChange={handleFilterChange}
                    className="w-full p-2 bg-gray-700 rounded"
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
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="w-full p-2 bg-gray-700 rounded"
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
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                    className="w-full p-2 bg-gray-700 rounded"
                  >
                    <option value="">All</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Transaction List */}
            <div className="bg-dark text-white rounded-lg p-4 flex-1">
              <h2 className="text-lg font-semibold mb-4">Transactions</h2>
              <div className="space-y-2">
                {filteredTransactions.length === 0 ? (
                  <div className="text-sm text-gray-400 text-center">No transactions</div>
                ) : (
                  filteredTransactions.map((tx, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-700 rounded p-3">
                      <div>
                        <div className="font-medium">{tx.category}</div>
                        <div className="text-xs text-gray-400">
                          <DateFormatter isodate={tx.date} />
                        </div>
                      </div>
                      <div
                        className="font-bold text-lg"
                        style={{ color: tx.type === "income" ? "#22c55e" : "#ef4444" }}
                      >
                        {tx.type === "income" ? "+" : "-"}₹{tx.amount}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right side: Charts */}
          <div className="lg:w-1/2 flex flex-col gap-6 lg:border-l lg:border-gray-600 lg:pl-6">
            {/* Line Chart */}
            <div className="bg-dark text-white rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">Transaction Trend</h2>
              <Line data={lineChartData} />
            </div>

            {/* Pie Chart */}
            <div className="bg-dark text-white rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">Category Breakdown</h2>
              <Pie data={pieChartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;