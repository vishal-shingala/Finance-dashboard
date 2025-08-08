import Transaction from "../model/transaction.model.js";
import asynchandler from "../utils/asynchandler.js";
const transaction = asynchandler(async (req, res) => {
  const { amount, type, category } = req.body;
  const date = req.body.date || new Date();

  if (!amount || !type || !category) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }
  
  const userId = req.user.id;
  const newTransaction = await Transaction.create({
    userId,
    amount,
    type,
    category,
    date,
  });

  res.status(201).json({
    success: true,
    message: "Transaction created successfully",
  });
});

export default transaction;
