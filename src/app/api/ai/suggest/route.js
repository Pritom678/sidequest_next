import { QuestAIService } from "@/lib/questAI";

const questAI = new QuestAIService();

export async function POST(request) {
  try {
    const { goal, userHistory } = await request.json();

    if (!goal) {
      return Response.json({ error: "Goal is required" }, { status: 400 });
    }

    const suggestion = await questAI.analyzeGoal(goal, userHistory);

    return Response.json({ suggestion });
  } catch (error) {
    console.error("AI API Error:", error);
    return Response.json(
      { error: "Failed to generate AI suggestion" },
      { status: 500 }
    );
  }
}
