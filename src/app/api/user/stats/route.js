import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "default-user";

    // Get user stats from database
    const db = await dbConnect();
    let userStats = await db.collection("userStats").findOne({ userId });

    // If no stats exist, create initial stats
    if (!userStats) {
      const initialStats = {
        userId,
        questsCompleted: 0,
        totalXp: 0,
        totalTimeSpent: 0,
        currentStreak: 0,
        longestStreak: 0,
        totalActiveDays: 0,
        joinDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await db.collection("userStats").insertOne(initialStats);
      userStats = initialStats;
    }

    // Get total quests count for level calculation
    const totalQuests = await db.collection("quests").countDocuments();

    // Get progress data for additional stats
    const userProgress = await db
      .collection("progress")
      .find({ userId })
      .toArray();

    // Calculate additional stats
    const completedQuests = userProgress.filter((p) => p.completed).length;
    const averageCompletionTime =
      completedQuests > 0
        ? userProgress.reduce((sum, p) => sum + (p.timeSpent || 0), 0) /
          completedQuests
        : 0;

    // Get most active category
    const categoryStats = {};
    userProgress.forEach((progress) => {
      const quest = questsCollection.findOne({ id: progress.questId });
      if (quest) {
        categoryStats[quest.category] =
          (categoryStats[quest.category] || 0) + 1;
      }
    });

    const mostActiveCategory = Object.keys(categoryStats).reduce(
      (a, b) => (categoryStats[a] > categoryStats[b] ? a : b),
      Object.keys(categoryStats)[0] || "None"
    );

    // Enhanced stats object
    const enhancedStats = {
      ...userStats,
      totalQuests,
      completedQuests,
      averageCompletionTime: Math.round(averageCompletionTime),
      mostActiveCategory,
      completionRate:
        totalQuests > 0 ? Math.round((completedQuests / totalQuests) * 100) : 0,
      questsPerDay:
        userStats.totalActiveDays > 0
          ? Math.round((completedQuests / userStats.totalActiveDays) * 10) / 10
          : 0,
      xpPerHour:
        userStats.totalTimeSpent > 0
          ? Math.round(userStats.totalXp / (userStats.totalTimeSpent / 60))
          : 0,
      lastActiveDate: userStats.lastActiveDate || userStats.lastQuestCompleted,
    };

    return NextResponse.json({
      success: true,
      userStats: enhancedStats,
    });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch user stats" },
      { status: 500 }
    );
  }
}
