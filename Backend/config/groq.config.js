import { ChatGroq } from "@langchain/groq";

const llm = new ChatGroq({
  model: "openai/gpt-oss-120b",
  apiKey: "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",
});

export default llm;
