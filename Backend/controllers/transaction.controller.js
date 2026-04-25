import Transaction from "../model/transaction.model.js";
import asynchandler from "../utils/asynchandler.js";
import { createLogger } from "../utils/logger.js";

const logger = createLogger("transaction");

const transaction = asynchandler(async (req, res) => {
  const { amount, type, category } = req.body;
  const date = req.body.date || new Date();
  logger.info("Create transaction request received", {
    userId: req.user,
    type,
    category,
  });

  if (!amount || !type || !category) {
    logger.warn("Create transaction failed: missing required fields", {
      userId: req.user,
      type,
      category,
    });
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }
  
  const userId = req.user;
  const newTransaction = await Transaction.create({
    userId,
    amount,
    type,
    category,
    date,
  });

  logger.info("Transaction created successfully", {
    userId,
    transactionDate: newTransaction.date,
    type,
    category,
  });

  res.status(201).json({
    success: true,
    message: "Transaction created successfully",
  });
});

export default transaction;
