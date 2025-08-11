import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddTransactionForm({ isOpen, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [message, setMessage] = useState("");

  const onSubmit = (data) => {
    setMessage(
      data.type === "income"
        ? "Income added successfully ✅"
        : "Expense added successfully ✅"
    );
    setTimeout(() => {
      setMessage("");
      reset();
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-96 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Date - Top Right Corner */}
          <div className="flex justify-end">
            <input
              type="date"
              {...register("date", { required: "Date is required" })}
              className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm"
            />
          </div>
          {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}

          {/* Transaction Type */}
          <div>
            <select
              {...register("type", { required: "Select type" })}
              className="bg-gray-800 border border-gray-700 rounded px-3 py-2 w-full"
            >
              <option value="">Select Type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
          </div>

          {/* Amount */}
          <div>
            <input
              type="number"
              placeholder="Amount"
              {...register("amount", {
                required: "Amount is required",
                min: { value: 1, message: "Must be greater than 0" }
              })}
              className="bg-gray-800 border border-gray-700 rounded px-3 py-2 w-full"
            />
            {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
          </div>

          {/* Category */}
          <div>
            <input
              type="text"
              placeholder="Category"
              {...register("category", { required: "Category is required" })}
              className="bg-gray-800 border border-gray-700 rounded px-3 py-2 w-full"
            />
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Add Transaction
          </button>

          {/* Success Message */}
          {message && <p className="text-green-400 text-center">{message}</p>}
        </form>
      </div>
    </div>
  );
}
