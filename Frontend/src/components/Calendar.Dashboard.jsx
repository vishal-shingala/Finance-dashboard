import React, { useContext } from "react";
import { UserContext } from "../context/User.context";

const mothNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
function generateRangeLoop(start, end) {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}


const CalendarDashboard = () => {
  const {selectMonth,setSelectMonth,selectYear,setSelectYear,registerYear} = useContext(UserContext);
  const currYear = new Date().getFullYear()
  const year = Number.isInteger(registerYear) && registerYear > 0
    ? generateRangeLoop(registerYear, currYear)
    : [];
  
  
  return (
    <div className="bg-dark rounded-xl shadow-lg p-4 sm:p-5 md:p-6 animate-fade-in-up h-full max-h-[500px] border border-white">
      <div className="text-white text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 text-center">
        <select value={selectYear} onChange={(e) => setSelectYear(Number(e.target.value))} name="year" id="year" className="bg-dark text-white rounded-lg p-2 text-sm sm:text-base border border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent">
          {year.length > 0 ? (
            year.map((val) => (
              <option key={val} value={val} className="bg-dark text-white">
                {val}
              </option>
            ))
          ) : (
            <option value={selectYear} className="bg-dark text-white">
              {selectYear}
            </option>
          )}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-1.5 sm:gap-2">  
        {mothNum.map((month) => (
          <div
            key={month} 
            onClick={() => {setSelectMonth(month+1);}
            }
            
            className={`${
              selectMonth === month+1 ? "bg-accent text-teal-500" : "bg-slate text-white"
            } rounded-lg py-2.5 sm:py-3 px-2 text-center text-xs sm:text-sm font-semibold hover:bg-accent hover:text-gray-800 transition-colors duration-300 cursor-pointer animate-fade-in-up`}
          >
            {months[month]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarDashboard;
