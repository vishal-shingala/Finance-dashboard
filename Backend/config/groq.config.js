import { ChatGroq } from "@langchain/groq";

const apiKey = process.env.GROQ_API_KEY;
if (!apiKey) {
  throw new Error('GROQ_API_KEY is not set. Ensure .env is loaded before imports.');
}

const llm = new ChatGroq({
  model: "openai/gpt-oss-120b",
  apiKey,
});

export default llm;
