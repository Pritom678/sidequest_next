import { useState, useEffect } from "react";
import {
  FiCalendar,
  FiTarget,
  FiClock,
  FiAward,
  FiTrendingUp,
} from "react-icons/fi";

export default function ProfileHeader({ userStats }) {
  // Provide default values to prevent undefined errors
  const stats = {
    totalXp: 0,
    totalQuests: 0,
    completedQuests: 0,
    totalTimeSpent: 0,
    joinDate: new Date(),
    ...userStats,
  };

  const calculateLevel = (totalXp) => {
    let level = 1;
    let xpForNextLevel = 100;
    let xpNeeded = 100;

    while (totalXp >= xpNeeded) {
      level++;
      xpForNextLevel = Math.floor(100 * Math.pow(1.5, level - 1));
      xpNeeded += xpForNextLevel;
    }

    return {
      currentLevel: level,
      currentLevelXp: xpNeeded - xpForNextLevel,
      nextLevelXp: xpNeeded,
      progressToNext:
        ((totalXp - (xpNeeded - xpForNextLevel)) / xpForNextLevel) * 100,
    };
  };

  const levelInfo = calculateLevel(stats.totalXp || 0);

  return (
    <div className="bg-base-200 dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-lg">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Avatar */}
        <div className="w-24 h-24 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
          {stats.totalQuests > 0 ? (
            <FiAward className="w-12 h-12" />
          ) : (
            <FiTrendingUp className="w-12 h-12" />
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-base-content dark:text-white mb-2">
            SideQuest Adventurer
          </h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-base-content/60">
            <span className="flex items-center gap-1">
              <FiCalendar className="w-4 h-4" />
              Joined{" "}
              {stats.joinDate
                ? new Date(stats.joinDate).toLocaleDateString()
                : "Today"}
            </span>
            <span className="flex items-center gap-1">
              <FiTarget className="w-4 h-4" />
              {stats.completedQuests || 0} Quests Completed
            </span>
            <span className="flex items-center gap-1">
              <FiClock className="w-4 h-4" />
              {Math.floor((stats.totalTimeSpent || 0) / 60)}h Invested
            </span>
          </div>
        </div>

        {/* Level Progress */}
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600 mb-1">
            Level {levelInfo.currentLevel}
          </div>
          <div className="w-32 bg-base-300 rounded-full h-3 mb-2">
            <div
              className="bg-linear-to-r from-purple-500 to-pink-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, levelInfo.progressToNext)}%` }}
            />
          </div>
          <div className="text-xs text-base-content/60">
            {levelInfo.nextLevelXp - levelInfo.currentLevelXp} XP to Level{" "}
            {levelInfo.currentLevel + 1}
          </div>
        </div>
      </div>
    </div>
  );
}
