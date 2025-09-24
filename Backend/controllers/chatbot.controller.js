// import llm from "../config/openaiConfig.js";
// import Transaction from "../model/transaction.model.js";
// import asynchandler from "../utils/asynchandler.js";
// import mongoose from "mongoose";

// // Normalize Query
// function normalizeQuery(query) {
//   const q = { ...query };

//   if (q.userId) {
//     if (q.userId instanceof mongoose.Types.ObjectId) {
//       // already ObjectId, leave it
//     } else if (typeof q.userId === "object" && q.userId.$oid) {
//       q.userId = new mongoose.Types.ObjectId(q.userId.$oid);
//     } else if (
//       typeof q.userId === "string" &&
//       /^[a-fA-F0-9]{24}$/.test(q.userId)
//     ) {
//       q.userId = new mongoose.Types.ObjectId(q.userId);
//     }
//   }
//   // Normalize date → Date
//   if (q.date) {
//     const dateQuery = {};
//     if (q.date.$gte) {
//       const start = new Date(q.date.$gte);
//       if (!isNaN(start)) dateQuery.$gte = start;
//     }
//     if (q.date.$lt) {
//       const end = new Date(q.date.$lt);
//       if (!isNaN(end)) dateQuery.$lt = end;
//     }
//     if (Object.keys(dateQuery).length > 0) q.date = dateQuery;
//     else delete q.date;
//   }

//   return q;
// }

// function normalizePipeline(pipeline = []) {
//   return pipeline.map((stage) => {
//     if (stage.$match) {
//       stage.$match = normalizeQuery(stage.$match);
//     }
//     return stage;
//   });
// }

// const chatBot = asynchandler(async (req, res) => {
//   const userId = new mongoose.Types.ObjectId(req.user);
//   const { messages } = req.body;

//   const prompt = `
// You are a financial assistant.  
// The MongoDB schema for "Transaction" is:
// {
//   userId: ObjectId,
//   amount: Number,
//   type: "income" | "expense",
//   category: String,
//   date: Date
// }

// User question: "${messages}"

// 👉 Output format (JSON only, no comments):
// {
//   "operation": "find" | "aggregate" | "findOne",
//   "query": { ... }   // if aggregate, return an array of stages
// }

// Rules:
// - Always include "userId": "${userId}" in the query in type of mongoose.Types.ObjectId.
// - If the user asks for total/sum/average, return "operation": "aggregate".
// - If the user asks for list/records, return "operation": "find".
// - If the user asks for a single value, return "operation": "findOne".
// - Dates must be ISO format (YYYY-MM-DDTHH:mm:ss.sssZ).
// `;

//   // Call LLM
//   const response = await llm.predict(prompt);

//   let parsed;
//   try {
//     parsed = JSON.parse(response);
//   } catch {
//     return res.status(400).json({
//       success: false,
//       error: "Invalid JSON from LLM",
//       raw: response,
//     });
//   }

//   const { operation, query } = parsed;
//   let result;

//   if (operation === "aggregate") {
//     result = await Transaction.aggregate(normalizePipeline(query));
//   } else if (operation === "findOne") {
//     result = await Transaction.findOne(normalizeQuery(query));
//   } else {
//     result = await Transaction.find(normalizeQuery(query));
//   }

//   console.log("✅ Operation:", operation);
//   console.log("✅ Query:", JSON.stringify(query, null, 2));

//   res.status(200).json({ success: true, operation, query, result });
// });

// export default chatBot;
