import mongoose from "mongoose";
import asynchandler from "../utils/asynchandler.js";
import Transaction from "../model/transaction.model.js";
import { createLogger } from "../utils/logger.js";

const logger = createLogger("category-expense");

const categoryExpense = asynchandler(async (req, res) => {
  const user = new mongoose.Types.ObjectId(req.user);
  const month = req.body.month;
  const year = req.body.year || new Date().getFullYear();
  logger.info("Category expense request received", {
    userId: req.user,
    month,
    year,
  });
  const expense = await Transaction.aggregate([
    {
      $match: {
        userId: user,
        type: "expense",
        $expr: {
          $and: [
            { $eq: [{ $month: "$date" }, month] },
            { $eq: [{ $year: "$date" }, year] },
          ],
        },
      },
    },
    {
      $group: {
        _id: "$category",
        totalExpense: { $sum: "$amount" },
      },
    },
    {
      $sort: {
        totalExpense: -1,
      },
    },
    {
      $project: {
        _id: 0,
        categoryName: "$_id",
        totalExpense: 1,
      },
    },
  ]);

  logger.info("Category expense fetched", {
    userId: req.user,
    month,
    year,
    categories: expense.length,
  });
  return res.status(200).json({
    message: "Category-wise expense fetched successfully",
    data: expense,
  });
});

const getAllCategories = asynchandler(async (req, res) => {
  const user = new mongoose.Types.ObjectId(req.user);
  logger.info("All categories request received", { userId: req.user });
  
  const categories = await Transaction.aggregate([
    {
      $match: {
        userId: user,
      },
    },
    {
      $group: {
        _id: "$category",
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
      },
    },
  ]);

  const categoryNames = categories.map((item) => item.category);

  logger.info("All categories fetched", {
    userId: req.user,
    categories: categoryNames.length,
  });

  return res.status(200).json({
    message: "All categories fetched successfully",
    data: categoryNames,
  });
});

export { categoryExpense, getAllCategories };
