import React, { useContext } from "react";
import { UserContext } from "../context/User.context";
import DateFormatter from "../parts/DateFormatter"; // Default import works now

const History = () => {
  const {transactions} = useContext(UserContext)

  return (
    <div className="bg-dark text-white rounded-lg p-3 sm:p-4 w-full h-[20rem] sm:h-[25rem] flex flex-col justify-between shadow-md border border-white">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-base sm:text-lg font-semibold">Transaction History</h2>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
        {transactions.length === 0 ? (
          <div className="text-xs sm:text-sm text-gray-400 mt-4 text-center">
            No transactions yet
          </div>
        ) : (
          transactions.map((tx, idx) => (
            <div
              key={idx}
              className="flex justify-between items-start bg-[#111827] rounded-md px-2 sm:px-3 py-2 gap-2"
            >
              {/* Amount */}
              <div
                className="text-sm sm:text-base font-bold whitespace-nowrap"
                style={{
                  color: tx.type === 'income' ? "#22c55e" : "#ef4444",
                }}
              >
                {tx.type === 'income' ? `+₹${tx.amount}` : `-₹${Math.abs(tx.amount)}`}
              </div>

              {/* Category and Date */}
              <div className="text-right text-xs sm:text-sm flex-1">
                <div className="font-medium truncate">{tx.category}</div>
                <div className="text-gray-400 text-xs">
                  <DateFormatter isodate={tx.date}/>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;
