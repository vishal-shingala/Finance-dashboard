import React, { useState } from "react";

const History = () => {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (tx) => {
    setTransactions((prev) => {
      const updated = [tx, ...prev];
      return updated.slice(0, 5);
    });
  };

  const handleAddSample = () => {
    const sample = {
      id: Date.now(),
      amount: Math.random() > 0.5 ? 120 : -80,
      category: "Utilities",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };
    addTransaction(sample);
  };

  return (
    <div className="bg-dark text-white rounded-lg p-4 w-full h-[25rem] flex flex-col justify-between shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Transaction History</h2>
        <button
          onClick={handleAddSample}
          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 text-sm rounded"
        >
          + Add
        </button>
      </div>

      <div className="flex-1 space-y-2 overflow-hidden">
        {transactions.length === 0 ? (
          <div className="text-sm text-gray-400 mt-4 text-center">
            No transactions yet
          </div>
        ) : (
          transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex justify-between items-start bg-[#111827] rounded-md px-3 py-2"
            >
              {/* Amount */}
              <div
                className="text-md font-bold"
                style={{
                  color: tx.amount >= 0 ? "#22c55e" : "#ef4444",
                }}
              >
                {tx.amount >= 0 ? `+₹${tx.amount}` : `-₹${Math.abs(tx.amount)}`}
              </div>

              {/* Category and Date */}
              <div className="text-right text-sm">
                <div className="font-medium">{tx.category}</div>
                <div className="text-gray-400 text-xs">
                  {tx.date}, {tx.time}
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
