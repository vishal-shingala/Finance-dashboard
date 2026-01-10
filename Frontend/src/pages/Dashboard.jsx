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
      <div className="flex flex-col justify-around mb-4 w-full md:flex-row">
        <div className="flex-[0.6]">
          <div className="w-full max-w-4xl mx-auto bg-dark">
            <div className="relative w-full h-[300px] md:h-[400px]">
              <ChartDashboard income={incomeDetail} expense={expenseDetail} />
            </div>
          </div>
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
      <span className="fixed bottom-5 right-5">
        <Chatbot />
      </span>
    </div>
  );
};

export default Dashboard;
