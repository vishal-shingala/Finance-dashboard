import React, { useState, useEffect, useContext, useMemo } from "react";
import Navbar from "../components/Navbar";
import FilterBox from "../components/FilterBox";
import DateFormatter from "../parts/DateFormatter";
import ChartDashboard from "../components/Chart.Dashboard";
import PiechartDashboard from "../components/Piechart.Dashboard";
import { UserContext } from "../context/User.context";

export default function TransactionsPage() {
  const { currUser, incomeDetail, expenseDetail } = useContext(UserContext);
  const { transactions } = useContext(UserContext);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  useEffect(() => {
    if (!isFilterApplied) {
      setFilteredTransactions([]);
    }
  }, [isFilterApplied]);

  const handleFilterChange = (filterData) => {
    setFilteredTransactions(filterData.filteredTransactions);
    setIsFilterApplied(filterData.isFilterApplied);
  };

  // Prepare data for line chart
  const { incomeData, expenseData, labels } = useMemo(() => {
    if (isFilterApplied) {
      const dailyData = filteredTransactions.reduce((acc, tx) => {
        const date = new Date(tx.date).toLocaleDateString();
        if (!acc[date]) acc[date] = { income: 0, expense: 0 };
        acc[date][tx.type] += tx.amount;
        return acc;
      }, {});
      const sortedDates = Object.keys(dailyData).sort(
        (a, b) => new Date(a) - new Date(b)
      );
      const inc = sortedDates.map((date) => dailyData[date].income);
      const exp = sortedDates.map((date) => dailyData[date].expense);
      return { incomeData: inc, expenseData: exp, labels: sortedDates };
    } else {
      return {
        incomeData: incomeDetail,
        expenseData: expenseDetail,
        labels: undefined,
      };
    }
  }, [isFilterApplied, filteredTransactions, incomeDetail, expenseDetail]);

  // For transactions display
  const displayTransactions = useMemo(
    () =>
      isFilterApplied
        ? filteredTransactions
        : transactions
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 10),
    [isFilterApplied, filteredTransactions, transactions]
  );

  // Prepare data for pie chart (by category)
  const pieData = useMemo(() => {
    const categoryTotals = (
      isFilterApplied ? filteredTransactions : transactions
    ).reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {});
    return {
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
  }, [isFilterApplied, filteredTransactions, transactions]);

  return (
    <>
      {/* Navbar */}
      <div className="w-full sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-dashboard">
        {/* LEFT SECTION */}
        <div className="flex flex-col p-4 gap-4">
          {/* Filter Box */}
          <FilterBox onFilterChange={handleFilterChange} />

          {/* Transactions */}
          <div className="flex-1 rounded-xl p-4 bg-dark border">
            <h2 className="text-white text-lg font-semibold mb-4">
              Transactions
            </h2>

            <div className="space-y-2">
              {displayTransactions.length === 0 ? (
                <div className="text-sm text-gray text-center">
                  No transactions
                </div>
              ) : (
                displayTransactions.map((tx, index) => (
                  <div className="flex justify-between items-start bg-[#111827] rounded-md px-3 py-2">
                    {/* Amount */}
                    <div
                      className="text-md font-bold"
                      style={{
                        color: tx.type === "income" ? "#22c55e" : "#ef4444",
                      }}
                    >
                      {tx.type === "income"
                        ? `+₹${tx.amount}`
                        : `-₹${Math.abs(tx.amount)}`}
                    </div>

                    {/* Category and Date */}
                    <div className="text-right text-sm">
                      <div className="font-medium text-white" >{tx.category}</div>
                      <div className="text-gray-400 text-xs">
                        <DateFormatter isodate={tx.date} />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-col p-4 gap-4 ">
          {/* Line Chart */}
          <div className="h-1/2 rounded-xl p-4 bg-dark border pb-9">
            <h2 className="text-white text-lg font-semibold mb-2">
              Income vs Expense
            </h2>

            <ChartDashboard
              income={incomeData}
              expense={expenseData}
              labels={labels}
            />
          </div>

          {/* Pie Chart */}
          <div className="h-1/2 rounded-xl p-4 bg-dark border">
            <h2 className="text-white text-lg font-semibold mb-2">
              Category Breakdown
            </h2>

            {/* <Pie data={pieData} /> */}
          </div>
        </div>
      </div>
    </>
  );
}
