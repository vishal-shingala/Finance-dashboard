import mongoose from "mongoose";
import Transaction from "../model/transaction.model.js";
import asynchandler from "../utils/asynchandler.js";

const showIncomeExpense = asynchandler(async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user);
  console.log(req.body);
  
  const month = Number(req.body.month);
  console.log(month);
  

  const result = await Transaction.aggregate([
    {
      $match: {
        userId: userId,
        $expr: {
          $and: [
            { $eq: [{ $month: "$date" }, month] },
            { $eq: [{ $year: "$date" }, new Date().getFullYear()] },
          ],
        },
      },
    },
    {
      $facet: {
        total: [
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
            },
          },
        ],
        totalDetail: [
          {
            $group: {
              _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
              incomeDetail: {
                $sum: {
                  $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
                },
              },
              expenseDetail: {
                $sum: {
                  $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
                },
              },
            },
          },
          { $sort: { _id: 1 } },
        ],
      },
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
