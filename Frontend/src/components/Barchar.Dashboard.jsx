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
    <div className="w-full md:w-[50rem] h-[400px] bg-dark p-4 rounded-lg shadow-md sm:mb-2">
      <h2 className="text-white text-lg font-bold">Category-wise Expenses</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChartDashboard;
