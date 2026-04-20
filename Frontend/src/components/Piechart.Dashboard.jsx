import React, { useContext, useMemo } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { UserContext } from "../context/User.context";

ChartJS.register(ArcElement, Tooltip, Legend);

const PiechartDashboard = ({ data: externalData, className = "" }) => {
  const { income, expense } = useContext(UserContext);

  const defaultData = useMemo(
    () => ({
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
    }),
    [income, expense]
  );

  const chartData = externalData ?? defaultData;

  const options = {
    maintainAspectRatio: false,
    responsive: true,
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
    <div
      className={`bg-dark rounded-xl md:w-[50rem] h-[25rem] shadow-lg p-6 animate-fade-in-up flex flex-col items-center ${className}`}
    >
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PiechartDashboard;