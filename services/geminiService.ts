import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// In a real app, we would handle the missing API key gracefully in the UI.
const ai = new GoogleGenAI({ apiKey });

export const generateVideoIdeas = async (topic: string): Promise<string[]> => {
  if (!apiKey) return ["API Key missing - cannot generate ideas."];

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate 5 catchy, clickbait-style video titles for a developer audience about the topic: "${topic}". 
      Keep them short and exciting. Return only the titles as a JSON array of strings.`,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const jsonStr = response.text || '[]';
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return ["Failed to generate ideas. Try again later."];
  }
};

export const explainCodeTopic = async (title: string): Promise<string> => {
  if (!apiKey) return "API Key missing.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Explain the technical concept behind the video title "${title}" in 2 sentences. Be concise and informative.`,
    });
    return response.text || "No explanation available.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Could not load explanation.";
  }
};