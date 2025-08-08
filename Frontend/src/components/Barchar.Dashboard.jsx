import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const BarChartDashboard = () => {
  const data = {
    labels: ["Food", "Transport", "Rent", "Entertainment", "Shopping", "Others"],
    datasets: [
      {
        label: "Expenses",
        data: [3000, 1500, 6000, 1200, 2200, 800],
        backgroundColor: "#ef4444", // Red
        borderRadius: 6,
        barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#fff",
        },
      },
      tooltip: {
        backgroundColor: "#222",
        titleColor: "#fff",
        bodyColor: "#fff",
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

  return (
    <div className="w-full md:w-[50rem] h-[400px] bg-dark p-4 rounded-lg shadow-md">
      <h2 className="text-white text-lg font-bold">Category-wise Expenses</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChartDashboard;
