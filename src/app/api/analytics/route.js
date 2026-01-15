import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "default-user";
    const range = searchParams.get("range") || "week";

    // Calculate date range
    const now = new Date();
    let startDate;

    switch (range) {
      case "week":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "year":
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    // Get user stats
    const statsCollection = await dbConnect("userStats");
    const userStats = await statsCollection.findOne({ userId });

    // Get all quests for analysis
    const questsCollection = await dbConnect("quests");
    const allQuests = await questsCollection.find({}).toArray();

    // Get progress data
    const progressCollection = await dbConnect("progress");
    const userProgress = await progressCollection
      .find({
        userId,
        updatedAt: { $gte: startDate },
      })
      .toArray();

    // Calculate basic metrics
    const totalQuests = allQuests.length;
    const completedQuests = userProgress.filter((p) => p.completed).length;
    const totalXp = userStats?.totalXp || 0;
    const totalTimeSpent = userStats?.totalTimeSpent || 0;
    const averageCompletionTime =
      completedQuests > 0 ? totalTimeSpent / completedQuests : 0;

    // Category breakdown
    const categoryBreakdown = {};
    userProgress.forEach((progress) => {
      const quest = allQuests.find((q) => q.id === progress.questId);
      if (quest) {
        categoryBreakdown[quest.category] =
          (categoryBreakdown[quest.category] || 0) + 1;
      }
    });

    // Difficulty breakdown
    const difficultyBreakdown = {};
    userProgress.forEach((progress) => {
      const quest = allQuests.find((q) => q.id === progress.questId);
      if (quest) {
        difficultyBreakdown[quest.difficulty] =
          (difficultyBreakdown[quest.difficulty] || 0) + 1;
      }
    });

    // Weekly progress data
    const weeklyProgress = [];
    for (let i = 6; i >= 0; i--) {
      const weekStart = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
      const weekEnd = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);

      const weekCompletions = userProgress.filter(
        (p) =>
          p.completed && p.completedAt >= weekStart && p.completedAt < weekEnd
      ).length;

      weeklyProgress.push({
        week: `W${7 - i}`,
        questsCompleted: weekCompletions,
        xpEarned: weekCompletions * 100, // Average XP per quest
      });
    }

    // Monthly progress data
    const monthlyProgress = [];
    for (let i = 11; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);

      const monthCompletions = userProgress.filter(
        (p) =>
          p.completed && p.completedAt >= monthStart && p.completedAt < monthEnd
      ).length;

      monthlyProgress.push({
        month: monthStart.toLocaleDateString("en", { month: "short" }),
        questsCompleted: monthCompletions,
        xpEarned: monthCompletions * 100,
      });
    }

    return NextResponse.json({
      success: true,
      analytics: {
        totalQuests,
        completedQuests,
        totalXp,
        totalTimeSpent,
        averageCompletionTime,
        categoryBreakdown,
        difficultyBreakdown,
        weeklyProgress,
        monthlyProgress,
        dateRange: {
          start: startDate,
          end: now,
          range,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
