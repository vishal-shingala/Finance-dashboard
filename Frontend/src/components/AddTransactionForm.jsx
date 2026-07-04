import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../config";
import toast from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../context/User.context";

export default function AddTransactionForm({ isOpen, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  
  const { runMutation } = useContext(UserContext);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(
        `${API_URL}/transaction`,
        data
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Transaction added successfully ✅", {
        position: "top-center",
      });
      reset(); // clear form
      onClose(); 
      if (runMutation) runMutation(); // refresh list
    },
    onError: () => {
      toast.error("Failed to add Transaction ❌", {
        position: "top-center",
      });
    },
  });

  const onSubmit = (data) => {
    data = { ...data, category: data.category.toLowerCase() };
    mutation.mutate(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div
        className="relative w-full sm:w-96 p-5 sm:p-6 rounded-2xl max-h-[90vh] overflow-y-auto
                  bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
                  border border-gray-700 shadow-xl shadow-blue-500/10 
                  animate-slide-up"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 text-white"
        >
          {/* Date */}
          <div className="flex justify-end">
            <input
              type="date"
              {...register("date")}
              disabled={mutation.isLoading}
              className="bg-gray-800 border border-gray-700 rounded-lg px-2 py-1 text-sm 
                     focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Transaction Type */}
          <select
            {...register("type", { required: "Select type" })}
            disabled={mutation.isLoading}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 w-full 
                   focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm">{errors.type.message}</p>
          )}

          {/* Amount */}
          <input
            type="number"
            placeholder="Amount"
            {...register("amount", {
              required: "Amount is required",
              min: { value: 1, message: "Must be greater than 0" },
            })}
            disabled={mutation.isLoading}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 w-full 
                   focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.amount && (
            <p className="text-red-500 text-sm">{errors.amount.message}</p>
          )}

          {/* Category */}
          <input
            type="text"
            placeholder="Category"
            {...register("category", { required: "Category is required" })}
            disabled={mutation.isLoading}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 w-full 
                   focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="w-full py-2 rounded-lg text-white font-medium 
                   bg-gradient-to-r from-blue-500 to-indigo-600 
                   hover:from-blue-600 hover:to-indigo-700 shadow-md transition
                   disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mutation.isLoading ? "Adding..." : "Add Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
}
