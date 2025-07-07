import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIMessage } from "../types";

import dotenv from 'dotenv'

dotenv.config();



console.log("gemini" ,process.env.GEMINI_API_KEY )
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function callGemini(messages: AIMessage[], maxTokens: number): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite'});

  const chat = model.startChat({
    history: messages.slice(0, -1).map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    })),
  });

  const userMessage = messages[messages.length - 1].content;
  const result = await chat.sendMessage(userMessage);
  const response = await result.response;
  return response.text();
} 

