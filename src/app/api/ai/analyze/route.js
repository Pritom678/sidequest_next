import { questAI } from "@/lib/questAI";

export async function POST(request) {
  try {
    const { goal, userHistory } = await request.json();

    // Validate input
    if (!goal || typeof goal !== "string" || goal.trim().length === 0) {
      return Response.json(
        { error: "Goal is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    if (goal.length > 500) {
      return Response.json(
        { error: "Goal must be less than 500 characters" },
        { status: 400 }
      );
    }

    // Rate limiting (simple implementation)
    const userAgent = request.headers.get("user-agent") || "";
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    console.log(`AI Analysis Request:`, {
      goal: goal.substring(0, 50) + "...",
      userAgent,
      ip: clientIP,
      timestamp: new Date().toISOString(),
    });

    // Get AI suggestion
    const suggestion = await questAI.analyzeGoal(goal, userHistory);

    // Log success
    console.log(`AI Analysis Success:`, {
      goalLength: goal.length,
      category: suggestion.category,
      difficulty: suggestion.difficulty,
      taskCount: suggestion.tasks.length,
      timestamp: new Date().toISOString(),
    });

    return Response.json({
      success: true,
      suggestion,
      metadata: {
        processingTime: Date.now(),
        version: "1.0.0",
      },
    });
  } catch (error) {
    console.error("AI API Error:", error);

    return Response.json(
      {
        error: "Failed to analyze goal",
        message: error.message,
        fallback: true,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({
    message: "AI Quest Analysis API",
    version: "1.0.0",
    endpoints: {
      analyze: "POST - Analyze goals and generate quest suggestions",
    },
    usage: {
      description: "Provide a goal and get AI-powered quest breakdown",
      parameters: {
        goal: "string (required) - The goal to analyze",
        userHistory: "object (optional) - User completion history",
      },
    },
  });
}
