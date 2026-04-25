import React, { useContext } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { UserContext } from "../context/User.context";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const BarChartDashboard = () => {
  const {categoryExpense} = useContext(UserContext)
  const category =[];
  const expnese = [];
  
  categoryExpense.forEach(obj => {
    category.push(obj.categoryName);
    expnese.push(obj.totalExpense)
  });

  const data = {
    labels: category,
    datasets: [
      {
        label: "Expenses",
        data:expnese,
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
          font: { size: window.innerWidth < 640 ? 11 : 13 },
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
        ticks: { color: "#fff", font: { size: window.innerWidth < 640 ? 10 : 12 } },
        grid: { color: "#444" },
      },
      y: {
        ticks: {
          color: "#fff",
          font: { size: window.innerWidth < 640 ? 10 : 12 },
          callback: function (value) {
            return `₹${value}`;
          },
        },
        grid: { color: "#444" },
      },
    },
  };

  return (
    <div className="w-full h-[200px] sm:h-[300px] md:h-[400px] bg-dark p-2 sm:p-3 md:p-4 rounded-lg shadow-md border border-white">
      <h2 className="text-white text-sm sm:text-base md:text-lg font-bold mb-2">Category-wise Expenses</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChartDashboard;
