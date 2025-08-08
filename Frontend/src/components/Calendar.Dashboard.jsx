import React, { useState } from "react";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const CalendarDashboard = ({ year = new Date().getFullYear() }) => {
  const [selectedMonth, setSelectedMonth] = useState(months[new Date().getMonth()]);

  return (
    <div className="bg-dark rounded-xl shadow-lg p-6 animate-fade-in-up max-h-[500px]">
      <div className="text-white text-xl font-bold mb-4 text-center">{year}</div>
      <div className="grid grid-cols-2 gap-1">  
        {months.map((month) => (
          <div
            key={month}
            onClick={() => setSelectedMonth(month)}
            className={`${
              selectedMonth === month ? "bg-accent text-black" : "bg-slate text-white"
            } rounded-lg py-3 px-2 text-center font-semibold hover:bg-accent hover:text-black transition-colors duration-300 cursor-pointer animate-fade-in-up`}
          >
            {month}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarDashboard;
