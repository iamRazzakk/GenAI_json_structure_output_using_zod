import { ChatOpenAI } from "@langchain/openai";
import { loadEnv } from "./env";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatGroq } from "@langchain/groq";

export type Provider = "openai" | "gemini" | "groq";

const createChatModel = (): { provider: Provider; model: any } => {
  loadEnv();
  const forced = process.env.PROVIDER;
  const hasOpenAi = !!process.env.OPENAI_API_KEY;
  const hasGemini = !!process.env.GOOGLE_API_KEY;
  const hasGroq = !!process.env.GROQ_API_KEY;
  const base = { temperature: 0 as const };

  if (forced === "openai" || (!forced && hasOpenAi)) {
    return {
      provider: "openai",
      model: new ChatOpenAI({
        ...base,
        model: "gpt-4o-mini",
      }),
    };
  }
  if (forced === "gemini" || (!forced && hasGemini)) {
    return {
      provider: "gemini",
      model: new ChatGoogleGenerativeAI({
        ...base,
        model: "gemini-2.5-flash",
      }),
    };
  }
  if (forced === "groq" || (!forced && hasGroq)) {
    return {
      provider: "groq",
      model: new ChatGroq({
        ...base,
        model: "llama-3.1-8b-instant",
      }),
    };
  }
  return {
    provider: "gemini",
    model: new ChatGoogleGenerativeAI({
      ...base,
      model: "gemini-2.5-flash",
    }),
  };
};


export default createChatModel;