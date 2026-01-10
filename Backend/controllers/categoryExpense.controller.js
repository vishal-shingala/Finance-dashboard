import mongoose from "mongoose";
import asynchandler from "../utils/asynchandler.js";
import Transaction from "../model/transaction.model.js";

const categoryExpense = asynchandler(async (req, res) => {
  const user = new mongoose.Types.ObjectId(req.user);
  const month = req.body.month;
  const year = req.body.year || new Date().getFullYear();
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

  console.log(expense);
  return res.status(200).json({
    message: "Category-wise expense fetched successfully",
    data: expense,
  });
});
export default categoryExpense;
