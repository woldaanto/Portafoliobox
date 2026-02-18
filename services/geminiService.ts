
import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const refineContent = async (text: string, tone: 'artistic' | 'professional' | 'minimalist'): Promise<string> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Refine the following portfolio text to sound more ${tone} and evocative. Keep it concise but impactful. Text: "${text}"`,
    });
    return response.text || text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return text;
  }
};

export const generateBio = async (name: string, expertise: string): Promise<string> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Create a one-paragraph artistic bio for ${name} who is an expert in ${expertise}. The tone should be sophisticated, like an entry in a high-end art gallery dossier.`,
    });
    return response.text || "";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "";
  }
};
