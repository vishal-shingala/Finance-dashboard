import React, { useState, useEffect, useContext, useMemo } from "react";
import Navbar from "../components/Navbar";
import FilterBox from "../components/FilterBox";
import DateFormatter, { DateFormat } from "../parts/DateFormatter";
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
        console.log(date)
        if (!acc[date]) acc[date] = { income: 0, expense: 0 };
        acc[date][tx.type] += Number(tx.amount);
        return acc;
      }, {});
      const sortedDates = Object.keys(dailyData).sort(
        (a, b) => new Date(a) - new Date(b)
      );
      const inc = sortedDates.map((date) => dailyData[date].income);
      const exp = sortedDates.map((date) => dailyData[date].expense);
      const formattedLabels = sortedDates.map((date) => DateFormat(date));

      return { incomeData: inc, expenseData: exp, labels: formattedLabels };
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
        : [...transactions]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 10),
    [isFilterApplied, filteredTransactions, transactions]
  );

  // Prepare data for pie chart (by category)
  const pieData = useMemo(() => {
    const categoryTotals = (
      isFilterApplied ? filteredTransactions : transactions
    ).reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + (Number(tx.amount) || 0);
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
          <div className="flex-1 rounded-2xl p-4 md:p-5 bg-dark border border-white shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
            <h2 className="text-white text-lg font-semibold mb-4 tracking-wide">
              Transactions
            </h2>

            <div className="space-y-3 overflow-y-auto pr-1 max-h-[35rem] scrollbar-transparent">
              {displayTransactions.length === 0 ? (
                <div className="text-sm text-gray text-center">
                  No transactions
                </div>
              ) : (
                displayTransactions.map((tx, index) => (
                  <article
                    key={tx._id || `${tx.date}-${tx.category}-${index}`}
                    className="group rounded-xl border border-white/10 bg-gradient-to-r from-[#101827] to-[#0f1723] px-4 py-3 transition-all duration-300 hover:border-white/20 hover:-translate-y-[1px]"
                    style={{ animationDelay: `${index * 0.06}s` }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 min-w-0">
                        <span
                          className="mt-1 h-2.5 w-2.5 rounded-full"
                          style={{
                            backgroundColor:
                              tx.type === "income" ? "#22c55e" : "#ef4444",
                          }}
                        />
                        <div className="min-w-0">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400">
                            Category
                          </p>
                          <p className="truncate text-sm md:text-base font-semibold text-white">
                            {tx.category}
                          </p>
                          <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500 mt-2">
                            Date & Time
                          </p>
                          <p className="text-xs text-gray-300">
                            <DateFormatter isodate={tx.date} />
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400">
                          Amount
                        </p>
                        <p
                          className="text-lg md:text-xl font-extrabold"
                          style={{
                            color:
                              tx.type === "income" ? "#22c55e" : "#ef4444",
                          }}
                        >
                          {tx.type === "income"
                            ? `+₹${tx.amount}`
                            : `-₹${Math.abs(tx.amount)}`}
                        </p>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-col p-4 gap-4 ">
          {/* Line Chart */}
          <div className="min-h-[320px] md:h-[360px] rounded-xl p-4 bg-dark border pb-9">
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
          <div className="min-h-[320px] max-h-[31rem] rounded-xl p-4 bg-dark border">
            <h2 className="text-white text-lg font-semibold mb-2">
              Category Breakdown
            </h2>

            {pieData.labels.length > 0 ? (
              <PiechartDashboard
                data={pieData}
                className="h-[calc(100%-2rem)] w-full md:w-full p-2 md:p-3 shadow-none"
              />
            ) : (
              <div className="h-[calc(100%-2rem)] flex items-center justify-center text-sm text-gray">
                No transaction data for chart
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
