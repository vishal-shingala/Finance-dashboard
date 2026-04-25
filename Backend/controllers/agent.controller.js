import { AgentExecutor, createToolCallingAgent } from "langchain/agents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { DynamicTool } from "@langchain/core/tools";
import llm from "../config/groq.config.js";
import asynchandler from "../utils/asynchandler.js";
import { ObjectId } from "mongodb";
import z from "zod";
import mongoose from "mongoose";

/* ---------------------- DB CONNECTION ---------------------- */
const getDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.db;
  }

  return new Promise((resolve, reject) => {
    mongoose.connection.once("connected", () => {
      resolve(mongoose.connection.db);
    });
    mongoose.connection.once("error", reject);
  });
};

/* ---------------------- VALIDATION ---------------------- */
const allowedStages = ["$match", "$group", "$project", "$sort", "$limit"];

const validatePipeline = (pipeline) => {
  if (!Array.isArray(pipeline)) {
    throw new Error("Pipeline must be an array");
  }

  for (const stage of pipeline) {
    const key = Object.keys(stage)[0];

    if (!allowedStages.includes(key)) {
      throw new Error(`Disallowed stage: ${key}`);
    }
  }
};

/* ---------------------- AGENT CONTROLLER ---------------------- */
const Agent = asynchandler(async (req, res) => {
  const userId = req.user;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const currentYear = new Date().getFullYear();

  /* ---------------------- TOOL ---------------------- */
  const userTransactionsQueryTool = new DynamicTool({
    name: "query_user_transactions",
    description: `
Query user's financial transactions using MongoDB aggregation pipeline.

Rules:
- Input MUST be valid JSON array string
- Allowed stages: $match, $group, $project, $sort, $limit
- ALWAYS filter by type when needed (expense/income)
- Use ₹ symbol for currency

Date Rules:
- For month queries: use $expr with $month and $year (${currentYear})
- For day queries: use $gte and $lt with ISO dates

Example:
[
  {
    "$match": {
      "type": "expense",
      "$expr": {
        "$and": [
          { "$eq": [{ "$month": "$date" }, 8] },
          { "$eq": [{ "$year": "$date" }, ${currentYear}] }
        ]
      }
    }
  },
  {
    "$group": {
      "_id": "$category",
      "total": { "$sum": "$amount" }
    }
  }
]
`,
    schema: z.string(),

    func: async (pipelineString) => {
      try {
        if (!pipelineString || typeof pipelineString !== "string") {
          throw new Error("Invalid pipeline input");
        }

        // Strict JSON parse
        let pipeline = JSON.parse(pipelineString);

        // Validate structure
        validatePipeline(pipeline);

        // Secure pipeline (force user isolation)
        const securePipeline = [
          { $match: { userId: new ObjectId(userId) } },
          ...pipeline,
        ];

        const db = await getDB();

        const results = await db
          .collection("transactions")
          .aggregate(securePipeline)
          .toArray();

        return JSON.stringify(results);
      } catch (error) {
        console.error("Tool error:", error.message);
        return `Error: ${error.message}`;
      }
    },
  });

  const tools = [userTransactionsQueryTool];

  /* ---------------------- PROMPT ---------------------- */
  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `
You are a MongoDB aggregation expert.

STRICT RULES:
- ALWAYS call the tool
- NEVER answer without tool
- Output must be a valid JSON pipeline string
- NO explanations
- ONLY allowed stages: $match, $group, $project, $sort, $limit
- NEVER generate invalid JSON

Final response must be a clean human-readable answer.
`,
    ],
    ["human", "{input}"],
    ["placeholder", "{agent_scratchpad}"],
  ]);

  /* ---------------------- AGENT ---------------------- */
  const agent = await createToolCallingAgent({
    llm,
    tools,
    prompt,
  });

  const executor = new AgentExecutor({
    agent,
    tools,
  });

  const userInput = req.body.question;

  const result = await executor.invoke({ input: userInput });

  /* ---------------------- RESPONSE CLEANING ---------------------- */
  let finalAnswer = result.output;

  try {
    const parsed = JSON.parse(result.output);

    if (Array.isArray(parsed)) {
      finalAnswer =
        parsed.length === 0
          ? "No transactions found."
          : JSON.stringify(parsed, null, 2);
    }
  } catch {
    // keep original output
  }

  res.status(200).json({
    question: userInput,
    answer: finalAnswer,
  });
});

export default Agent;
