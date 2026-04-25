import mongoose from "mongoose";
import Transaction from "../model/transaction.model.js";
import asynchandler from "../utils/asynchandler.js";
import { createLogger } from "../utils/logger.js";

const logger = createLogger("income-expense");

const showIncomeExpense = asynchandler(async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user);
  
  const month = Number(req.body.month);
  const year = req.body.year || new Date().getFullYear();
  logger.info("Income/expense summary request received", {
    userId: req.user,
    month,
    year,
  });
  

  const result = await Transaction.aggregate([
    {
      $match: {
        userId: userId,
        $expr: {
          $and: [
            { $eq: [{ $month: "$date" }, month] },
            { $eq: [{ $year: "$date" }, year] },
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

  logger.info("Income/expense summary fetched", {
    userId: req.user,
    month,
    year,
    records: result?.length || 0,
  });
  return res.status(200).json({
    success: true,
    message: "Income and Expense data fetched successfully",
    data: result[0] || { income: 0, expense: 0 }, // ensure response structure
  });
});

export default showIncomeExpense;
