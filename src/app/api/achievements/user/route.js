import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const db = await dbConnect();

    // Get user's unlocked achievements
    const userAchievements = await db
      .collection("userAchievements")
      .find({ userId })
      .sort({ unlockedAt: -1 })
      .toArray();

    // Get achievement details for unlocked ones
    const achievementIds = userAchievements.map((ua) => ua.achievementId);

    // First ensure achievements collection exists and is populated
    await db.collection("achievements").countDocuments();

    const achievements = await db
      .collection("achievements")
      .find({ id: { $in: achievementIds } })
      .toArray();

    // Merge data
    const unlockedAchievements = userAchievements.map((ua) => {
      const achievement = achievements.find((a) => a.id === ua.achievementId);
      return {
        ...achievement,
        unlockedAt: ua.unlockedAt,
        xpAwarded: ua.xpAwarded,
      };
    });

    // Get user stats for progress calculation
    const userStats = await db.collection("userStats").findOne({ userId });

    return NextResponse.json({
      unlockedAchievements,
      totalXP: userStats?.totalXP || 0,
      totalUnlocked: unlockedAchievements.length,
    });
  } catch (error) {
    console.error("Error fetching user achievements:", error);
    return NextResponse.json(
      { error: "Failed to fetch user achievements" },
      { status: 500 }
    );
  }
}
