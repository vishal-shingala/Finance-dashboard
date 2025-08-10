import React from "react";
import Navbar from "../components/Navbar";
import TransactionCard from "../components/TransactionCard";
import ChartDashboard from "../components/Chart.Dashboard";
import CalendarDashboard from "../components/Calendar.Dashboard";
import PiechartDashboard from "../components/Piechart.Dashboard";
import BarChartDashboard from "../components/Barchar.Dashboard";
import History from "../components/History";

const Dashboard = () => {
  return (
    <div className="bg-dashboard min-h-screen">
      <div>
        <Navbar />
      </div>
      <div>
        <TransactionCard />
        
      </div>
      <div className="flex flex-col justify-around mb-4 w-full md:flex-row">
        <div className="flex-[0.6]">
          <ChartDashboard />
        </div>
        <div className="flex-[0.3]">
          <CalendarDashboard />
        </div>
      </div>
      <div className="flex flex-col mx-4 pb-8 justify-around md:flex-row md:gap-3">
        <PiechartDashboard />
        <BarChartDashboard />
        <History />
      </div>
    </div>
  );
};

export default Dashboard;
