
import { GoogleGenAI } from "@google/genai";
import type { CodeGenerationParams } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateCode = async ({ githubUrl, editInstructions }: CodeGenerationParams): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }

  const prompt = `
    You are an expert software engineer specializing in web development. Your task is to act as an intelligent code editor.
    A user will provide you with a GitHub repository URL and instructions to edit a file within it.
    You must first conceptually "read" the relevant file from the repository, then apply the edits as described.

    **GitHub Repository URL:**
    ${githubUrl}

    **Edit Instructions:**
    ${editInstructions}

    **Your Task:**
    1.  Based on the URL and instructions, infer the most likely file the user wants to edit (e.g., a main component like App.tsx, a specific page, a utility function).
    2.  Apply the requested changes meticulously to the code.
    3.  Return ONLY the complete, edited code for the file. 
    4.  Do not add any commentary, explanations, apologies, or markdown code fences like \`\`\`tsx. The output must be raw code, ready to be copied and pasted directly into a file.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate code. The model may be unavailable or the request could be invalid.");
  }
};
