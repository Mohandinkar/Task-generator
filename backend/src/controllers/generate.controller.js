import { generatePlanText } from "../services/gemini.service.js";
import { parseJsonFromGemini } from "../utils/parseJson.js";

export function healthHandler(req, res) {
  res.json({ status: "ok" });
}

export async function generateHandler(req, res) {
  try {
    const { goal, users, constraints } = req.body;

    // Validate required fields
    if (!goal || !users || !constraints) {
      return res.status(400).json({
        error:
          "Missing required fields: goal, users, and constraints are required",
      });
    }

    const text = await generatePlanText({ goal, users, constraints });

    const { data: parsedResponse, error: parseError } =
      parseJsonFromGemini(text);

    if (parseError || !parsedResponse) {
      console.error("Failed to parse JSON response:", parseError);
      return res.json({
        userStories: [],
        tasks: [],
        risks: [],
        rawResponse: text,
        parseError: "Failed to parse JSON response",
      });
    }

    const formattedResponse = {
      userStories: parsedResponse.userStories || [],
      tasks: parsedResponse.tasks || [],
      risks: parsedResponse.risks || [],
    };

    res.json(formattedResponse);
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({
      error: "Failed to generate content",
      message: error.message,
    });
  }
}

