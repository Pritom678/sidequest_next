// Simple script to initialize achievements in the database
// Run this with: node init-achievements.js

const { MongoClient } = require("mongodb");

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

async function initAchievements() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/sidequest";
  const dbName = process.env.DB_NAME || "sidequest";

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);

    // Check if achievements already exist
    const existingCount = await db.collection("achievements").countDocuments();

    if (existingCount === 0) {
      // Insert default achievements
      await db.collection("achievements").insertMany(DEFAULT_ACHIEVEMENTS);
      console.log(
        `Successfully initialized ${DEFAULT_ACHIEVEMENTS.length} achievements`
      );
    } else {
      console.log(`Achievements already exist (${existingCount} found)`);
    }
  } catch (error) {
    console.error("Error initializing achievements:", error);
  } finally {
    await client.close();
  }
}

initAchievements();
