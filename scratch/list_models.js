import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.NUXT_GEMINI_API_KEY);
  try {
    // The current SDK doesn't have a direct listModels on the main class easily,
    // but we can try to fetch the models endpoint.
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.NUXT_GEMINI_API_KEY}`);
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
  }
}

listModels();
