import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";

// Predefined achievements
const DEFAULT_ACHIEVEMENTS = [
  {
    id: "first_quest",
    name: "Quest Beginner",
    description: "Create your first quest",
    icon: "🎯",
    category: "milestone",
    rarity: "common",
    xpReward: 50,
    condition: { type: "quest_created", count: 1 },
  },
  {
    id: "quest_master",
    name: "Quest Master",
    description: "Create 10 quests",
    icon: "⚔️",
    category: "milestone",
    rarity: "rare",
    xpReward: 200,
    condition: { type: "quest_created", count: 10 },
  },
  {
    id: "first_completion",
    name: "Task Achiever",
    description: "Complete your first quest",
    icon: "✅",
    category: "milestone",
    rarity: "common",
    xpReward: 100,
    condition: { type: "quest_completed", count: 1 },
  },
  {
    id: "streak_warrior",
    name: "Streak Warrior",
    description: "Maintain a 7-day quest streak",
    icon: "🔥",
    category: "streak",
    rarity: "rare",
    xpReward: 300,
    condition: { type: "daily_streak", count: 7 },
  },
  {
    id: "explorer",
    name: "Explorer",
    description: "Try all quest categories",
    icon: "🗺️",
    category: "discovery",
    rarity: "epic",
    xpReward: 500,
    condition: { type: "categories_tried", count: 5 },
  },
  {
    id: "ai_enthusiast",
    name: "AI Enthusiast",
    description: "Use AI quest assistant 5 times",
    icon: "🤖",
    category: "ai",
    rarity: "uncommon",
    xpReward: 150,
    condition: { type: "ai_assistant_used", count: 5 },
  },
  {
    id: "productivity_guru",
    name: "Productivity Guru",
    description: "Complete 20 quests",
    icon: "📈",
    category: "milestone",
    rarity: "epic",
    xpReward: 1000,
    condition: { type: "quest_completed", count: 20 },
  },
  {
    id: "early_bird",
    name: "Early Bird",
    description: "Create a quest before 8 AM",
    icon: "🌅",
    category: "time",
    rarity: "uncommon",
    xpReward: 100,
    condition: { type: "early_quest", count: 1 },
  },
  {
    id: "night_owl",
    name: "Night Owl",
    description: "Create a quest after 10 PM",
    icon: "🦉",
    category: "time",
    rarity: "uncommon",
    xpReward: 100,
    condition: { type: "late_quest", count: 1 },
  },
  {
    id: "variety_seeker",
    name: "Variety Seeker",
    description: "Create quests in 3 different difficulty levels",
    icon: "🎨",
    category: "discovery",
    rarity: "rare",
    xpReward: 250,
    condition: { type: "difficulty_variety", count: 3 },
  },
];

export async function GET() {
  try {
    const db = await dbConnect();

    // Initialize achievements if they don't exist
    const existingAchievements = await db
      .collection("achievements")
      .countDocuments();

    if (existingAchievements === 0) {
      await db.collection("achievements").insertMany(DEFAULT_ACHIEVEMENTS);
    }

    const achievements = await db.collection("achievements").find({}).toArray();

    return NextResponse.json({ achievements });
  } catch (error) {
    console.error("Error fetching achievements:", error);
    return NextResponse.json(
      { error: "Failed to fetch achievements" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { userId, achievementId } = await request.json();

    if (!userId || !achievementId) {
      return NextResponse.json(
        { error: "userId and achievementId are required" },
        { status: 400 }
      );
    }

    const db = await dbConnect();

    // Check if achievement is already unlocked
    const existingUnlock = await db.collection("userAchievements").findOne({
      userId,
      achievementId,
    });

    if (existingUnlock) {
      return NextResponse.json({
        message: "Achievement already unlocked",
        alreadyUnlocked: true,
      });
    }

    // Get achievement details
    const achievement = await db.collection("achievements").findOne({
      id: achievementId,
    });

    if (!achievement) {
      return NextResponse.json(
        { error: "Achievement not found" },
        { status: 404 }
      );
    }

    // Unlock achievement
    await db.collection("userAchievements").insertOne({
      userId,
      achievementId,
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

    return NextResponse.json({
      message: "Achievement unlocked!",
      achievement,
      xpAwarded: achievement.xpReward,
    });
  } catch (error) {
    console.error("Error unlocking achievement:", error);
    return NextResponse.json(
      { error: "Failed to unlock achievement" },
      { status: 500 }
    );
  }
}
