import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "../config/env.js";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function generatePlanText({ goal, users, constraints }) {
  const prompt = `You are a senior product manager. Based on this feature idea, generate user stories, engineering tasks, and risks or unknowns.

Feature Goal: ${goal}
Target Users: ${users}
Constraints: ${constraints}

Please return a JSON object with the following structure:
{
  "userStories": ["story1", "story2", ...],
  "tasks": ["task1", "task2", ...],
  "risks": ["risk1", "risk2", ...]
}

Return ONLY valid JSON, no additional text or markdown formatting.`;

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  return text;
}

