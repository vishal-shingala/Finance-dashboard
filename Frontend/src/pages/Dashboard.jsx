import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import TransactionCard from "../components/TransactionCard";
import ChartDashboard from "../components/Chart.Dashboard";
import CalendarDashboard from "../components/Calendar.Dashboard";
import PiechartDashboard from "../components/Piechart.Dashboard";
import BarChartDashboard from "../components/Barchar.Dashboard";
import History from "../components/History";
import Chatbot from "../components/Chatbot";
import { UserContext } from "../context/User.context";

const Dashboard = () => {
  const { incomeDetail, expenseDetail } = useContext(UserContext);

  return (
    <div className="bg-dashboard min-h-screen">
      <div>
        <Navbar />
      </div>
      <div>
        <TransactionCard />
      </div>
      <div className="px-2 sm:px-3 md:px-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
          <div className="md:col-span-8">
            <div className="w-full bg-dark">
              <div className="relative w-full h-[280px] sm:h-[320px] md:h-[430px] border border-white rounded-xl p-2 sm:p-3">
              <ChartDashboard income={incomeDetail} expense={expenseDetail} />
              </div>
            </div>
          </div>
          <div className="md:col-span-4 h-full">
            <CalendarDashboard />
          </div>
        </div>
      </div>
      <div className="mx-4 pb-8 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-3 items-stretch">
        <div className="w-full h-full">
          <PiechartDashboard className="w-full md:w-full" />
        </div>
        <div className="w-full h-full">
          <BarChartDashboard />
        </div>
        <div className="w-full h-full">
          <History />
        </div>
      </div>
      <span className="fixed bottom-5 right-5">
        <Chatbot />
      </span>
    </div>
  );
};

export default Dashboard;
