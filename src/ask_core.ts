import createChatModel from "./mc_model";
import { askResult, askResultSchema } from "./schema";

const askStructured = async (query: string): Promise<askResult> => {
  const { model } = createChatModel();

  const system = "You'r a concise assistant. Return only the requested JSON";
  const user =
    `Summarize for a beginner:\n` +
    `"${query}"\n` +
    `Return fields: summary (short paragraph, confidence (0..1))`;
  const structured = model.withStructuredOutput(askResultSchema);
  const result = await structured.invoke([
    {
      role: "system",
      content: system,
    },
    {
      role: "user",
      content: user,
    },
  ]);
  return result;
};

export default askStructured;
