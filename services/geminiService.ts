
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedSystem, AutomationCategory } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateAutomation(prompt: string, category: AutomationCategory = AutomationCategory.CUSTOM): Promise<GeneratedSystem> {
  const systemInstruction = `You are a world-class Python automation architect. 
  Your goal is to create production-ready, highly efficient, and well-documented Python automation scripts.
  Ensure the code follows PEP 8 standards, includes error handling, and uses modern libraries.
  Provide clear setup instructions and a deployment guide.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Generate a Python automation system for the following request: "${prompt}". 
    The category is ${category}.`,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "A catchy title for the automation system" },
          description: { type: Type.STRING, description: "A brief summary of what the system does" },
          category: { type: Type.STRING, description: "The category of automation" },
          dependencies: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "List of pip packages required" 
          },
          pythonCode: { type: Type.STRING, description: "The full Python script" },
          setupInstructions: { type: Type.STRING, description: "Step-by-step instructions to get it running locally" },
          deploymentGuide: { type: Type.STRING, description: "How to deploy this for 24/7 or scheduled execution" }
        },
        required: ["title", "description", "category", "dependencies", "pythonCode", "setupInstructions", "deploymentGuide"],
      },
    },
  });

  try {
    const data = JSON.parse(response.text || "{}");
    return data as GeneratedSystem;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Failed to generate a valid automation system. Please try again.");
  }
}
