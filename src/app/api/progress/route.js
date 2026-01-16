import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

// GET user's progress for all quests
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "default-user";

    const db = await dbConnect();
    const userProgress = await db
      .collection("progress")
      .find({ userId })
      .sort({ updatedAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      progress: JSON.parse(JSON.stringify(userProgress)),
    });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch progress" },
      { status: 500 }
    );
  }
}

// POST - Update or create progress for a quest
export async function POST(request) {
  try {
    const progressData = await request.json();

    const requiredFields = ["questId", "userId", "progress"];
    const missingFields = requiredFields.filter(
      (field) => !progressData[field]
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    const db = await dbConnect();

    // Check if progress already exists
    const existingProgress = await db.collection("progress").findOne({
      questId: progressData.questId,
      userId: progressData.userId,
    });

    const now = new Date();

    if (existingProgress) {
      // Update existing progress
      await db.collection("progress").updateOne(
        { _id: existingProgress._id },
        {
          $set: {
            progress: progressData.progress,
            timeSpent:
              progressData.timeSpent || existingProgress.timeSpent || 0,
            milestones:
              progressData.milestones || existingProgress.milestones || [],
            lastActiveAt: now,
            updatedAt: now,
          },
        }
      );
    } else {
      // Create new progress record
      await db.collection("progress").insertOne({
        questId: progressData.questId,
        userId: progressData.userId,
        progress: progressData.progress,
        timeSpent: progressData.timeSpent || 0,
        milestones: progressData.milestones || [],
        startedAt: now,
        lastActiveAt: now,
        createdAt: now,
        updatedAt: now,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Progress updated successfully",
    });
  } catch (error) {
    console.error("Error updating progress:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update progress" },
      { status: 500 }
    );
  }
}

// PUT - Complete a quest
export async function PUT(request) {
  try {
    const { questId, userId, timeSpent, milestones } = await request.json();

    if (!questId || !userId) {
      return NextResponse.json(
        { error: "Quest ID and User ID are required" },
        { status: 400 }
      );
    }

    const db = await dbConnect();
    const completedAt = new Date();

    // Update progress to 100% and mark as completed
    const result = await db.collection("progress").updateOne(
      { questId, userId },
      {
        $set: {
          progress: 100,
          completed: true,
          completedAt,
          timeSpent: timeSpent || 0,
          milestones: milestones || [],
          updatedAt: completedAt,
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Progress record not found" },
        { status: 404 }
      );
    }

    // Update user stats
    await db.collection("userStats").updateOne(
      { userId },
      {
        $inc: {
          questsCompleted: 1,
          totalXp: milestones?.xp || 0,
          totalTimeSpent: timeSpent || 0,
        },
        $set: { lastQuestCompleted: completedAt },
        $setOnInsert: {
          userId,
          questsCompleted: 0,
          totalXp: 0,
          totalTimeSpent: 0,
          currentStreak: 0,
          longestStreak: 0,
          createdAt: completedAt,
        },
      },
      { upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: "Quest completed successfully!",
      completedAt,
    });
  } catch (error) {
    console.error("Error completing quest:", error);
    return NextResponse.json(
      { success: false, message: "Failed to complete quest" },
      { status: 500 }
    );
  }
}
