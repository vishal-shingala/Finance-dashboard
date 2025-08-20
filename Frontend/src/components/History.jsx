import React, { useContext, useState } from "react";
import { UserContext } from "../context/User.context";
import DateFormatter from "../parts/DateFormatter";

const History = () => {
  const {transactions} = useContext(UserContext)

  return (
    <div className="bg-dark text-white rounded-lg p-4 w-full h-[25rem] flex flex-col justify-between shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Transaction History</h2>
      </div>

      <div className="flex-1 space-y-2 overflow-hidden">
        {transactions.length === 0 ? (
          <div className="text-sm text-gray-400 mt-4 text-center">
            No transactions yet
          </div>
        ) : (
          transactions.map((tx) => (
            <div
              className="flex justify-between items-start bg-[#111827] rounded-md px-3 py-2"
            >
              {/* Amount */}
              <div
                className="text-md font-bold"
                style={{
                  color: tx.type === 'income' ? "#22c55e" : "#ef4444",
                }}
              >
                {tx.type === 'income' ? `+₹${tx.amount}` : `-₹${Math.abs(tx.amount)}`}
              </div>

              {/* Category and Date */}
              <div className="text-right text-sm">
                <div className="font-medium">{tx.category}</div>
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
