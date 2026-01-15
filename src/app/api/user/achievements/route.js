import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "default-user";

    // Get user stats to determine achievements
    const statsCollection = await dbConnect("userStats");
    const userStats = await statsCollection.findOne({ userId });

    // Get user progress for achievement calculations
    const progressCollection = await dbConnect("progress");
    const userProgress = await progressCollection.find({ userId }).toArray();

    const achievements = [];

    // First Quest Achievement
    if (userProgress.length > 0) {
      achievements.push({
        id: "first_quest",
        name: "First Steps",
        description: "Complete your first quest",
        type: "first_quest",
        rarity: "common",
        unlockedAt: userProgress[0]?.startedAt || new Date(),
      });
    }

    // Week Streak Achievement
    if (userStats?.currentStreak >= 7) {
      achievements.push({
        id: "week_streak",
        name: "Week Warrior",
        description: "Maintain a 7-day quest streak",
        type: "week_streak",
        rarity: "uncommon",
        unlockedAt: userStats.lastActiveDate,
      });
    }

    // Month Streak Achievement
    if (userStats?.currentStreak >= 30) {
      achievements.push({
        id: "month_streak",
        name: "Monthly Master",
        description: "Maintain a 30-day quest streak",
        type: "month_streak",
        rarity: "rare",
        unlockedAt: userStats.lastActiveDate,
      });
    }

    // Speed Demon (Complete quest in under 30 minutes)
    const fastCompletions = userProgress.filter(
      (p) => p.completed && (p.timeSpent || 0) < 30
    );
    if (fastCompletions.length >= 5) {
      achievements.push({
        id: "speed_demon",
        name: "Speed Demon",
        description: "Complete 5 quests in under 30 minutes each",
        type: "speed_demon",
        rarity: "rare",
        unlockedAt: fastCompletions[fastCompletions.length - 1]?.completedAt,
      });
    }

    // Completionist (Complete 10+ quests)
    if (userStats?.questsCompleted >= 10) {
      achievements.push({
        id: "completionist",
        name: "Completionist",
        description: "Complete 10 quests",
        type: "completionist",
        rarity: "uncommon",
        unlockedAt: userStats.lastQuestCompleted,
      });
    }

    // Explorer (Try quests from 5+ different categories)
    const progressCollectionWithQuests = await dbConnect("progress");
    const questsCollection = await dbConnect("quests");
    const allQuests = await questsCollection.find({}).toArray();

    const userCategories = new Set();
    userProgress.forEach((progress) => {
      const quest = allQuests.find((q) => q.id === progress.questId);
      if (quest) {
        userCategories.add(quest.category);
      }
    });

    if (userCategories.size >= 5) {
      achievements.push({
        id: "explorer",
        name: "Explorer",
        description: "Try quests from 5 different categories",
        type: "explorer",
        rarity: "epic",
        unlockedAt: userStats.lastActiveDate,
      });
    }

    // Time Master (Spend 100+ hours on quests)
    if (userStats?.totalTimeSpent >= 6000) {
      // 100 hours = 6000 minutes
      achievements.push({
        id: "time_master",
        name: "Time Master",
        description: "Spend 100+ hours on quests",
        type: "time_master",
        rarity: "epic",
        unlockedAt: userStats.lastActiveDate,
      });
    }

    // XP Collector (Earn 1000+ XP)
    if (userStats?.totalXp >= 1000) {
      achievements.push({
        id: "xp_collector",
        name: "XP Collector",
        description: "Earn 1000+ total XP",
        type: "xp_collector",
        rarity: "rare",
        unlockedAt: userStats.lastActiveDate,
      });
    }

    // Legendary (Complete 50+ quests with 90%+ success rate)
    const successRate =
      userStats?.questsCompleted > 0
        ? (userStats.questsCompleted / Math.max(userStats.questsCompleted, 1)) *
          100
        : 0;

    if (userStats?.questsCompleted >= 50 && successRate >= 90) {
      achievements.push({
        id: "legendary",
        name: "Legendary Adventurer",
        description: "Complete 50+ quests with 90%+ success rate",
        type: "legendary",
        rarity: "legendary",
        unlockedAt: userStats.lastActiveDate,
      });
    }

    // Sort achievements by unlock date, then by rarity
    const sortedAchievements = achievements.sort((a, b) => {
      const rarityOrder = {
        common: 1,
        uncommon: 2,
        rare: 3,
        epic: 4,
        legendary: 5,
      };

      if (a.unlockedAt && b.unlockedAt) {
        return new Date(b.unlockedAt) - new Date(a.unlockedAt);
      }

      return rarityOrder[b.rarity] - rarityOrder[a.rarity];
    });

    return NextResponse.json({
      success: true,
      achievements: sortedAchievements,
      totalAchievements: achievements.length,
      stats: {
        totalPossible: 8,
        unlocked: achievements.length,
        completionRate: Math.round((achievements.length / 8) * 100),
      },
    });
  } catch (error) {
    console.error("Error fetching achievements:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch achievements" },
      { status: 500 }
    );
  }
}
