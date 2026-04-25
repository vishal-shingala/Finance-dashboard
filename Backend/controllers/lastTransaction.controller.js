import mongoose from "mongoose";
import Transaction from "../model/transaction.model.js";
import asynchandler from "../utils/asynchandler.js";
import { createLogger } from "../utils/logger.js";

const logger = createLogger("last-transaction");

const lastTransaction = asynchandler(async (req, res) => {
  const userId =new mongoose.Types.ObjectId(req.user);
  logger.info("Last transactions request received", { userId: req.user });
  const transactions = await Transaction.aggregate([
    {
      $match: {
        userId: userId,
      },
    },
    {
          $sort: { date: -1 }
    },
    {
      $limit: 5,
    },
    {
      $project: {
        _id: 0,
        userId: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0
      }
    }
  ]);

  logger.info("Last transactions fetched", {
    userId: req.user,
    count: transactions.length,
  });
  return res.status(200).json({
    message: "Previous transactions fetched successfully",
    data: transactions
  });
});
export default lastTransaction;
