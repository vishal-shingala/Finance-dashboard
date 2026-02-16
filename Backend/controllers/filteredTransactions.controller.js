import mongoose from "mongoose";
import Transaction from "../model/transaction.model.js";
import asynchandler from "../utils/asynchandler.js";

const getFilteredTransactions = asynchandler(async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user);
  const { startDate, endDate, month, year, category, type } = req.body;

  let matchConditions = { userId };

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setDate(end.getDate() + 1); // Include the end date
    matchConditions.date = { $gte: start, $lt: end };
  } else if (startDate) {
    const start = new Date(startDate);
    const end = new Date().getDate() + 1;
    matchConditions.date = { $gte: start, $lt: end };
  }

  if (month && year) {
    const startMonth = new Date(year, month - 1, 1);
    const endMonth = new Date(year, month, 1);
    matchConditions.date = { $gte: startMonth, $lt: endMonth };
  } else if (year) {
    const startYear = new Date(year, 0, 1);
    const endYear = new Date(year + 1, 0, 1);
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

  return res.status(200).json({
    message: "Transactions fetched successfully",
    data: transactions,
  });
});

export default getFilteredTransactions;
