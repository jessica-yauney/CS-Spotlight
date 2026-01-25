
import { GoogleGenAI } from "@google/genai";
import { SCIENTISTS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function askAboutScientists(query: string, history: { role: 'user' | 'assistant', content: string }[]) {
  const context = SCIENTISTS.map(s => `${s.name}: ${s.shortBio}`).join('\n');
  
  const systemInstruction = `
    You are an expert historian in Computer Science. 
    You have a database of specific scientists:
    ${context}

    Answer user questions about these scientists or computer science history in general. 
    Be inspiring, concise, and highlight the importance of diversity in STEM. 
    If asked about someone not in the list, provide accurate historical information if they are a real computer scientist.
    Keep responses to about 2-3 short paragraphs maximum.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role === 'assistant' ? 'model' : 'user', parts: [{ text: h.content }] })),
        { role: 'user', parts: [{ text: query }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't process that query.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Unable to reach the AI assistant. Please try again later.";
  }
}
