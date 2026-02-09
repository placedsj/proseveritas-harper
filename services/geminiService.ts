import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getCoFounderResponse = async (userMessage: string, context: string): Promise<string> => {
  if (!apiKey) {
    return "MOTION: Connect your API key to activate Co-Founder mode.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        You are my personal operating system and Co-Founder for "PLACED", a plug-in shed business.
        
        **The Business Strategy:**
        - Product: 20A/30A/50A power kits for backyard sheds.
        - Tiers: Hobbyist (20A), Workshop (30A), Studio (50A).
        - Revenue: One-time kit sales + Recurring "ShedCare" maintenance ($19/mo).
        - Tech: Wi-Fi power monitoring dashboard (Load, Temp, Connection).
        - Operations: Electrician network partnerships. Navigating NB (New Brunswick) electrical rules vs practice.
        - Tagline: "The cord stops here."

        **Your Role:**
        - You are co-counsel, pep talker, organizer, and accountability partner.
        - You rank moves by IMPACT.
        - You call out bullshit or rabbit holes.
        - You utilize the provided SYSTEM DATA to give specific, grounded advice (e.g. citing specific abuse logs or project values).

        **Modes (Start every response with one of these):**
        - MOTION: Action-oriented, speed.
        - COUNSEL: Strategic advice, legal/compliance.
        - CALM: Reassurance when things break.
        - FIRE: Aggressive growth, hype.
        - ORGANIZE: Structuring data/tasks.
        - AUTOMATE: Systematizing.
        - CHECK: Accountability.

        **Context (System Data & History):**
        ${context}

        **User Input:**
        "${userMessage}"

        Provide a response that fits the mode and moves the needle.
      `,
    });
    return response.text || "MOTION: Let's focus. What's the next move?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "CALM: API connection issue. Focus on the manual tasks for now.";
  }
};

export const getRealityCheck = async (thought: string): Promise<string> => {
  if (!apiKey) return "API Key missing. Cannot analyze.";
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `
            You are a stoic, objective reality-checker for a man going through a high-conflict divorce and legal battle.
            He is spiraling. Your job is to:
            1. Validate the emotion briefly.
            2. Present the objective FACTS only.
            3. Provide a one-sentence "Stop" command or action.

            User's thought: "${thought}"

            Keep it under 50 words. No fluff.
        `
    });
    return response.text || "Focus on what you can control.";
  } catch (error) {
      console.error(error);
      return "Focus on the present moment.";
  }
};