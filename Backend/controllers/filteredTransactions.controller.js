import mongoose from "mongoose";
import Transaction from "../model/transaction.model.js";
import asynchandler from "../utils/asynchandler.js";
import { createLogger } from "../utils/logger.js";

const logger = createLogger("filtered-transactions");

const getFilteredTransactions = asynchandler(async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user);
  const { startDate, endDate, month, year, category, type } = req.body;
  logger.info("Filtered transactions request received", {
    userId: req.user,
    startDate,
    endDate,
    month,
    year,
    category,
    type,
  });
  const parsedMonth = Number(month);
  const parsedYear = Number(year);

  let matchConditions = { userId };

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setDate(end.getDate() + 1); // Include the end date
    matchConditions.date = { $gte: start, $lt: end };
  } else if (startDate) {
    const start = new Date(startDate);
    const end = new Date();
    end.setDate(end.getDate() + 1);
    matchConditions.date = { $gte: start, $lt: end };
  }

  if (parsedMonth && parsedYear) {
    const startMonth = new Date(parsedYear, parsedMonth - 1, 1);
    const endMonth = new Date(parsedYear, parsedMonth, 1);
    matchConditions.date = { $gte: startMonth, $lt: endMonth };
  } else if (parsedYear) {
    const startYear = new Date(parsedYear, 0, 1);
    const endYear = new Date(parsedYear + 1, 0, 1);
    matchConditions.date = { $gte: startYear, $lt: endYear };
  }
  if (category) {
    matchConditions.category = category;
  }

  if (type) {
    matchConditions.type = type;
  }

  const transactions = await Transaction.aggregate([
    { $match: matchConditions },
    { $sort: { date: -1 } },
    {
      $project: {
        _id: 0,
        userId: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      },
    },
  ]);

  logger.info("Filtered transactions fetched", {
    userId: req.user,
    count: transactions.length,
  });

  return res.status(200).json({
    message: "Transactions fetched successfully",
    data: transactions,
  });
});

export default getFilteredTransactions;
