import mongoose from "mongoose";
import Transaction from "../model/transaction.model.js";
import asynchandler from "../utils/asynchandler.js";

const showIncomeExpense = asynchandler(async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user);
  const user = await Transaction.find({ userId });
  console.log("User Data:", user);

  const result = await Transaction.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            { $eq: ["$userId", userId] },
            { $eq: [{ $month: "$date" }, new Date().getMonth() + 1] },
          ],
        },
      },
    },
    {
      $group: {
        _id: null,
        income: {
          $sum: {
            $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
          },
        },
        expense: {
          $sum: {
            $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
          },
        },
        incomeDetail: {
          $push: {
            $cond: [{ $eq: ["$type", "income"] }, "$amount", "$$REMOVE"],
          },
        },
        expenseDetail: {
          $push: {
            $cond: [{ $eq: ["$type", "expense"] }, "$amount", "$$REMOVE"],
          },
        },
      },
    },
    {
      $project: { _id: 0 },
    },
  ]);
  console.log("Income and Expense Data:", result);
  return res.status(200).json({
    success: true,
    message: "Income and Expense data fetched successfully",
    data: result[0] || { income: 0, expense: 0 }, // ensure response structure
  });
});

export default showIncomeExpense;
