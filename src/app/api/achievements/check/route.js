import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";

export async function POST(request) {
  try {
    const { userId, action, data } = await request.json();

    if (!userId || !action) {
      return NextResponse.json(
        { error: "userId and action are required" },
        { status: 400 }
      );
    }

    const db = await dbConnect();

    // Get all achievements
    const allAchievements = await db
      .collection("achievements")
      .find({})
      .toArray();

    // Get user's current stats and unlocked achievements
    const [userStats, userAchievements] = await Promise.all([
      db.collection("userStats").findOne({ userId }),
      db.collection("userAchievements").find({ userId }).toArray(),
    ]);

    const unlockedIds = userAchievements.map((ua) => ua.achievementId);
    const newlyUnlocked = [];

    // Check each achievement
    console.log("Total achievements to check:", allAchievements.length);
    for (const achievement of allAchievements) {
      console.log("Processing achievement:", achievement.id);
      if (unlockedIds.includes(achievement.id)) {
        console.log("Skipping already unlocked achievement:", achievement.id);
        continue;
      }

      let shouldUnlock = false;

      console.log(
        "Checking achievement:",
        achievement.id,
        "with condition:",
        achievement.condition
      );

      switch (achievement.condition.type) {
        case "quest_created":
          shouldUnlock = await checkQuestCreated(
            db,
            userId,
            achievement.condition.count
          );
          break;

        case "quest_completed":
          shouldUnlock = await checkQuestCompleted(
            db,
            userId,
            achievement.condition.count
          );
          break;

        case "daily_streak":
          shouldUnlock = await checkDailyStreak(
            db,
            userId,
            achievement.condition.count
          );
          break;

        case "categories_tried":
          shouldUnlock = await checkCategoriesTried(
            db,
            userId,
            achievement.condition.count
          );
          break;

        case "ai_assistant_used":
          shouldUnlock = await checkAIAssistantUsed(
            db,
            userId,
            achievement.condition.count
          );
          break;

        case "early_quest":
          console.log("Checking early_quest with data:", data);
          console.log("data?.createdAt:", data?.createdAt);
          shouldUnlock = checkEarlyQuest(data);
          console.log("early_quest result:", shouldUnlock);
          break;

        case "late_quest":
          shouldUnlock = checkLateQuest(data);
          break;

        case "difficulty_variety":
          shouldUnlock = await checkDifficultyVariety(
            db,
            userId,
            achievement.condition.count
          );
          break;
      }

      console.log("Achievement", achievement.id, "shouldUnlock:", shouldUnlock);

      if (shouldUnlock) {
        // Unlock achievement
        await db.collection("userAchievements").insertOne({
          userId,
          achievementId: achievement.id,
          unlockedAt: new Date(),
          xpAwarded: achievement.xpReward,
        });

        // Update user XP
        await db.collection("userStats").updateOne(
          { userId },
          {
            $inc: { totalXP: achievement.xpReward },
            $set: { lastUpdated: new Date() },
          },
          { upsert: true }
        );

        newlyUnlocked.push(achievement);
      }
    }

    return NextResponse.json({
      newlyUnlocked,
      totalNewlyUnlocked: newlyUnlocked.length,
    });
  } catch (error) {
    console.error("Error checking achievements:", error);
    return NextResponse.json(
      { error: "Failed to check achievements" },
      { status: 500 }
    );
  }
}

// Achievement check functions
async function checkQuestCreated(db, userId, requiredCount) {
  const count = await db.collection("quests").countDocuments({ userId });
  return count >= requiredCount;
}

async function checkQuestCompleted(db, userId, requiredCount) {
  const count = await db.collection("progress").countDocuments({
    userId,
    status: "completed",
  });
  return count >= requiredCount;
}

async function checkDailyStreak(db, userId, requiredDays) {
  // This would need implementation based on your streak tracking
  const userStats = await db.collection("userStats").findOne({ userId });
  return userStats?.currentStreak >= requiredDays || false;
}

async function checkCategoriesTried(db, userId, requiredCount) {
  const quests = await db.collection("quests").find({ userId }).toArray();
  const categories = new Set(quests.map((q) => q.category));
  return categories.size >= requiredCount;
}

async function checkAIAssistantUsed(db, userId, requiredCount) {
  // This would need tracking of AI usage
  const userStats = await db.collection("userStats").findOne({ userId });
  return userStats?.aiUsageCount >= requiredCount || false;
}

function checkEarlyQuest(data) {
  if (!data?.createdAt) return false;
  const hour = new Date(data.createdAt).getHours();
  console.log(
    "checkEarlyQuest: createdAt =",
    data.createdAt,
    "hour =",
    hour,
    "hour < 8 =",
    hour < 8
  );
  return hour < 8;
}

function checkLateQuest(data) {
  if (!data?.createdAt) return false;
  const hour = new Date(data.createdAt).getHours();
  return hour >= 22;
}

async function checkDifficultyVariety(db, userId, requiredCount) {
  const quests = await db.collection("quests").find({ userId }).toArray();
  const difficulties = new Set(quests.map((q) => q.difficulty));
  return difficulties.size >= requiredCount;
}
