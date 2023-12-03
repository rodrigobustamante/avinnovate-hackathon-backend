import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateCompletion = async(prompt) => {
  try {
    const completion = await openai.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      prompt,
    });
    
    return completion;
  } catch (error) {
    console.error("Error in generateCompletion: ", error);
    throw error;
  }
}
