import { AgentExecutor, createToolCallingAgent } from "langchain/agents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { DynamicTool } from "@langchain/core/tools";
import llm from "../config/groq.config.js";
import asynchandler from "../utils/asynchandler.js";
import { ObjectId } from "mongodb";
import z from "zod";
import mongoose from "mongoose";
import { createLogger } from "../utils/logger.js";

const logger = createLogger("agent");

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
- Input must be JSON with key "pipeline"
- Allowed stages: $match, $group, $project, $sort, $limit
- Always filter by type when needed (expense/income)

Date Rules:
- For month queries: use $expr with $month and $year (${currentYear})
- For day queries: use $gte and $lt with ISO dates
`,
    schema: z.object({
      pipeline: z.array(z.record(z.any())),
    }),

    func: async ({ pipeline }) => {
      try {
        // Validate pipeline
        validatePipeline(pipeline);

        // Secure pipeline (user isolation)
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
- NEVER answer directly
- Tool input must be JSON with key "pipeline"
- Pipeline must use only: $match, $group, $project, $sort, $limit
- NO explanations

AFTER receiving tool result:
- Format output as array of strings like:
["Food - ₹500", "Transport - ₹200"]
- Do NOT return raw JSON
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
          : parsed.join("\n"); // 🔥 KEY FIX
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