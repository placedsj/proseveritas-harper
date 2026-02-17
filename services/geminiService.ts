
import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getCoFounderResponse = async (userMessage: string, context: string): Promise<string> => {
  if (!apiKey) return "MOTION: Connect your API key to activate Co-Founder mode.";

  // Truncate context to save data/bandwidth
  const compressedContext = context.length > 1000 ? context.substring(0, 1000) + "..." : context;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        You are my personal operating system and Co-Founder for "PLACED" (Litigation & Defense).
        
        **Strategy Summary:** Custody Victory, SRL Legal Strategy, Sentencing Mitigation.
        **Focus:** Harper's Best Interest, Scott Schedule accuracy, Education Build, and Health Rehab tracking.
        **Role:** Co-counsel, accountability partner. Mode: MOTION, COUNSEL, CALM, FIRE, ORGANIZE, AUTOMATE, CHECK.

        **Context:** ${compressedContext}
        **User:** "${userMessage}"

        Provide a needle-moving response. Start with mode prefix.
      `,
    });
    return response.text || "MOTION: Focus established. Next move?";
  } catch {
    return "CALM: Connection latency detected. Continue manual logging.";
  }
};

export const getRealityCheck = async (thought: string): Promise<string> => {
  if (!apiKey) return "API Key missing.";
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Stoic reality-checker. Facts only. User: "${thought}". One sentence STOP command. Max 30 words.`
    });
    return response.text || "Focus on what you can control.";
  } catch {
      return "Focus on the present moment.";
  }
};
