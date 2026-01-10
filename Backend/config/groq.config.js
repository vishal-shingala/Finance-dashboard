import { ChatGroq } from "@langchain/groq";

const llm = new ChatGroq({
  model: "openai/gpt-oss-120b",
  apiKey: "groq_api_key",
});

export default llm;
