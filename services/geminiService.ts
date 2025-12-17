
import { GoogleGenAI, Type } from "@google/genai";
import { Recommendation } from "../types";

const THINKING_STEPS = [
  "Analyzing context...",
  "Scanning global AI database...",
  "Evaluating tool capabilities...",
  "Formulating personalized suggestions...",
  "Finalizing recommendations..."
];

export const getRecommendations = async (
  query: string,
  apiKey: string,
  onStepChange: (step: string) => void
): Promise<Recommendation[]> => {
  const ai = new GoogleGenAI({ apiKey });

  // Simulate internal "thinking" progress for UX
  let currentStep = 0;
  const interval = setInterval(() => {
    if (currentStep < THINKING_STEPS.length - 1) {
      currentStep++;
      onStepChange(THINKING_STEPS[currentStep]);
    }
  }, 1200);

  try {
    const systemInstruction = `You are an advanced AI Tool Consultant. Your output must be strictly JSON. Do not output markdown. 
    Task: Recommend the top 3-5 specific AI tools that best solve the user's specific problem. 
    Rules: Be accurate with URLs. Prioritize popular and reliable tools (e.g., ChatGPT, Midjourney, Claude, RunwayML, GitHub Copilot). 
    If the user input is nonsense, return an empty array.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User goal: "${query}"`,
      config: {
        systemInstruction,
        temperature: 0.4,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              category: { type: Type.STRING },
              reason: { type: Type.STRING },
              url: { type: Type.STRING },
              pricing: { type: Type.STRING },
            },
            required: ["name", "category", "reason", "url", "pricing"],
          },
        },
      },
    });

    clearInterval(interval);
    const text = response.text || "[]";
    return JSON.parse(text);
  } catch (error) {
    clearInterval(interval);
    console.error("Gemini API Error:", error);
    throw new Error("Failed to connect to the AI brain. Please check your API key or connection.");
  }
};
