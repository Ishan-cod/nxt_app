import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const gemini = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  model: "gemini-2.0-flash",
  temperature: 0.7,
});

export { gemini };
