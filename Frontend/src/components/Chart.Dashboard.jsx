import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const ChartDashboard = ({ income = [], expense = [], labels: externalLabels }) => {
  const safeIncome = useMemo(
    () => (Array.isArray(income) ? income.map((value) => Number(value) || 0) : []),
    [income]
  );

  const safeExpense = useMemo(
    () => (Array.isArray(expense) ? expense.map((value) => Number(value) || 0) : []),
    [expense]
  );

  const labels = useMemo(() => {
    if (Array.isArray(externalLabels) && externalLabels.length === safeIncome.length) {
      return externalLabels;
    }
    return safeIncome.map((_, i) => `Day ${i + 1}`);
  }, [externalLabels, safeIncome]);

  const data = {
    labels,
    datasets: [
      {
        label: "Expenses",
        data: safeExpense,
        borderColor: "#ef4444",
        backgroundColor: "#ef4444",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#ef4444",
      },
      {
        label: "Income",
        data: safeIncome,
        borderColor: "#22c55e",
        backgroundColor: "#22c55e",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#22c55e",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#fff",
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#222",
        titleColor: "#fff",
        bodyColor: "#fff",
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) label += ": ";
            if (context.parsed.y !== null) {
              label += `₹${context.parsed.y}`;
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#fff" },
        grid: { color: "#444" },
      },
      y: {
        ticks: {
          color: "#fff",
          callback: function (value) {
            return `₹${value}`;
          },
        },
        grid: { color: "#444" },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ChartDashboard;
