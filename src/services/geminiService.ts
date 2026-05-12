import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function summarizeArticle(title: string, content: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an expert editor for a high-end blog called "The Long Story Short". 
      Your job is to provide a compelling, concise "Short" summary of the following long-form article.
      The summary should be around 2-3 sentences and capture the main insight or provocative thought of the piece.
      
      Article Title: ${title}
      Article Content: ${content}
      
      Summary:`,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Gemini summarization failed:", error);
    throw new Error("Failed to generate summary. Please try again.");
  }
}
