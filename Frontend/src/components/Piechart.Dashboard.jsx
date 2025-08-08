import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PiechartDashboard = ({ income = 50000, expense = 10000 }) => {
  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: [
          "#06b6d4", // Accent cyan for income
          "#8b5cf6", // Accent violet for expense
        ],
        borderColor: "#1e293b", // Slate border
        borderWidth: 2,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive:true,
    plugins: {
      legend: {
        labels: {
          color: "#fff",
          font: { size: 16 },
        },
      },
      tooltip: {
        backgroundColor: "#222",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
  };

  return (
    <div className="bg-dark rounded-xl w-[50rem] h-[25rem] shadow-lg p-6 animate-fade-in-up flex flex-col items-center">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PiechartDashboard;