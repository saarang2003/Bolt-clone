import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const genAI = new GoogleGenerativeAI('api-key');

async function runTest() {
  try {
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
const result = await model.generateContent("What is the capital of France?");
const response = await result.response;
const text = response.text();

console.log("Gemini response:", text);
  } catch (error : any ) {
    console.error("Failed to call Gemini API:", error.message || error);
  }
}

runTest();
