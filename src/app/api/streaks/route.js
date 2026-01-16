import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

// GET user's streak information
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "default-user";

    const db = await dbConnect();
    const userStats = await db.collection("userStats").findOne({ userId });

    if (!userStats) {
      return NextResponse.json({
        success: true,
        streaks: {
          currentStreak: 0,
          longestStreak: 0,
          lastActiveDate: null,
          totalActiveDays: 0,
        },
      });
    }

    // Calculate current streak
    const today = new Date();
    const lastActive = userStats.lastQuestCompleted || userStats.lastActiveDate;
    let currentStreak = userStats.currentStreak || 0;

    if (lastActive) {
      const daysDiff = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24));

      // If more than 1 day since last activity, reset streak
      if (daysDiff > 1) {
        currentStreak = 0;
      } else if (daysDiff === 1) {
        // Increment streak for consecutive day
        currentStreak++;
      }
    }

    return NextResponse.json({
      success: true,
      streaks: {
        currentStreak,
        longestStreak: userStats.longestStreak || 0,
        lastActiveDate: userStats.lastActiveDate,
        totalActiveDays: userStats.totalActiveDays || 0,
      },
    });
  } catch (error) {
    console.error("Error fetching streaks:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch streaks" },
      { status: 500 }
    );
  }
}

// POST - Update daily activity for streak tracking
export async function POST(request) {
  try {
    const { userId } = await request.json();

    const db = await dbConnect();
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of day

    // Check if already active today
    const existingActivity = await db.collection("userStats").findOne({
      userId,
      lastActiveDate: { $gte: today },
    });

    if (!existingActivity) {
      // New day activity - update streaks
      const userStats = await db.collection("userStats").findOne({ userId });
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const wasActiveYesterday = await db.collection("userStats").findOne({
        userId,
        lastActiveDate: {
          $gte: yesterday,
          $lt: today,
        },
      });

      let currentStreak = 1;
      let longestStreak = 1;

      if (userStats) {
        if (wasActiveYesterday) {
          currentStreak = (userStats.currentStreak || 0) + 1;
        } else {
          currentStreak = 1;
        }
        longestStreak = Math.max(currentStreak, userStats.longestStreak || 0);
      }

      await db.collection("userStats").updateOne(
        { userId },
        {
          $set: {
            currentStreak,
            longestStreak,
            lastActiveDate: today,
            updatedAt: new Date(),
          },
          $inc: { totalActiveDays: 1 },
          $setOnInsert: {
            userId,
            questsCompleted: 0,
            totalXp: 0,
            totalTimeSpent: 0,
            createdAt: new Date(),
          },
        },
        { upsert: true }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Daily activity recorded",
    });
  } catch (error) {
    console.error("Error updating streaks:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update streaks" },
      { status: 500 }
    );
  }
}
