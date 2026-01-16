import React, { useRef, useEffect, useContext } from "react";
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

const ChartDashboard = ({ income, expense }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      chart.resize(); // Fix spelling
    }
  }, []);

  const labels = income.map((_, i) => `Day ${i + 1}`);

  const data = {
    labels,
    datasets: [
      {
        label: "Expenses",
        data: expense,
        borderColor: "#ef4444",
        backgroundColor: "#ef4444",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#ef4444",
      },
      {
        label: "Income",
        data: income,
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

  return <Line ref={chartRef} data={data} options={options} />;
};

export default ChartDashboard;
