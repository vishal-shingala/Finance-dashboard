import { AgentExecutor, createToolCallingAgent } from "langchain/agents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { DynamicTool } from "@langchain/core/tools"; 
import llm from "../config/groq.config.js";
import asynchandler from "../utils/asynchandler.js";
import { MongoClient, ObjectId } from "mongodb";
import z from "zod";



const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a helpful AI assistant that answers questions about a user's financial transactions. You must use the provided tool to query the database. only give me answer without any explanation.",
  ],
  ["human", "{input}"],
  ["placeholder", "{agent_scratchpad}"],
]);

const Agent = asynchandler(async (req, res) => {
  const userId = req.user;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userTransactionsQueryTool = new DynamicTool({
    name: "query_user_transactions",
    description: `
    Use this tool to query the user's financial transactions from a MongoDB database.
    The input MUST be a valid MongoDB aggregate pipeline passed as a single JSON string.
    use only ruppe sybmol to display amount and unneccsary symbols.
    Available fields are: 'amount' (number), 'category' (string), 'type' (string), and 'date' (a BSON Date object).

    **CRITICAL**: For queries about a specific month, you MUST use the '$expr' operator with '$month' and '$year'. The current year is 2025.
    For example, to get total expenses by category for August 2025, the pipeline should be a JSON string like this:
    '[{"$match":{"type":"expense","$expr":{"$and":[{"$eq":[{"$month":"$date"},8]},{"$eq":[{"$year":"$date"},2025]}]}}},{"$group":{"_id":"$category","total":{"$sum":"$amount"}}}]'
    
    For queries about a specific day, you can use '$gte' and '$lt' with full ISO date strings.
    `,
    schema: z
      .string()
      .describe("A valid MongoDB aggregate pipeline as a JSON string."),

    func: async (pipelineString) => {
      console.log("Received pipeline string from LLM:", pipelineString);

      if (typeof pipelineString !== "string" || pipelineString.trim() === "") {
        return "Error: Received an empty or invalid pipeline string.";
      }

      try {
        const correctedJsonString = pipelineString.replace(/\}\s*\{/g, "}, {");

        let pipeline = JSON.parse(correctedJsonString);

        for (const stage of pipeline) {
          if (stage.$match && stage.$match.date) {
            const dateFilter = stage.$match.date;
            for (const op of ["$gte", "$lt", "$eq"]) {
              if (dateFilter[op]) {
                if (
                  typeof dateFilter[op] === "object" &&
                  dateFilter[op].$date
                ) {
                  dateFilter[op] = new Date(dateFilter[op].$date);
                }
                else if (typeof dateFilter[op] === "string") {
                  dateFilter[op] = new Date(dateFilter[op]);
                }
              }
            }
          }
        }

        const securePipeline = [{ $match: { userId: new ObjectId(userId) } }, ...pipeline];

        console.log(
          "Executing secure pipeline with correct Date objects:",
          JSON.stringify(securePipeline, null, 2)
        );

        const results = await db
          .collection("transactions")
          .aggregate(securePipeline)
          .toArray();
        return JSON.stringify(results);
      } catch (error) {
        console.error("Error executing tool:", error);
        return `Error executing query: ${error.message}`;
      }
    },
  });

  const tools = [userTransactionsQueryTool];

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are an expert at creating MongoDB aggregation pipelines based on user questions about their finances. You must use the provided tool. Return only the final answer in a clear, complete sentence.",
    ],
    ["human", "{input}"],
    ["placeholder", "{agent_scratchpad}"],
  ]);

  const agent = await createToolCallingAgent({ llm, tools, prompt });

  const executor = new AgentExecutor({ agent, tools });

  const userInput = req.body.question || "give me the income of 31 august 2025";

  const result = await executor.invoke({ input: userInput });

  res.status(200).json({
    question: userInput,
    answer: result.output,
  });
});

export default Agent;
