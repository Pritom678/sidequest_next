"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiAward, FiTrendingUp, FiGrid, FiList } from "react-icons/fi";
import AchievementBadge from "@/components/achievements/AchievementBadge";
import ModernButton from "@/components/ui/ModernButton";

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState([]);
  const [userAchievements, setUserAchievements] = useState([]);
  const [totalXP, setTotalXP] = useState(0);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    fetchAchievements();
    fetchUserAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await fetch("/api/achievements");
      const data = await response.json();
      setAchievements(data.achievements || []);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    }
  };

  const fetchUserAchievements = async () => {
    try {
      const userId = "default-user"; // Get from auth context
      const response = await fetch(`/api/achievements/user?userId=${userId}`);
      const data = await response.json();
      setUserAchievements(data.unlockedAchievements || []);
      setTotalXP(data.totalXP || 0);
    } catch (error) {
      console.error("Error fetching user achievements:", error);
    } finally {
      setLoading(false);
    }
  };

  const unlockedIds = new Set(userAchievements.map((ua) => ua.id));
  const categories = ["all", ...new Set(achievements.map((a) => a.category))];

  const filteredAchievements = achievements.filter((achievement) => {
    if (filterCategory === "all") return true;
    return achievement.category === filterCategory;
  });

  const stats = {
    total: achievements.length,
    unlocked: userAchievements.length,
    completionRate:
      achievements.length > 0
        ? Math.round((userAchievements.length / achievements.length) * 100)
        : 0,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Achievements
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Unlock achievements and earn XP rewards
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Total XP
                </p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {totalXP}
                </p>
              </div>
              <FiTrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Unlocked
                </p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {stats.unlocked}/{stats.total}
                </p>
              </div>
              <FiAward className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Completion
                </p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {stats.completionRate}%
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400 font-bold text-sm">
                  {stats.completionRate}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters and View Mode */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2">
              {categories.map((category) => (
                <ModernButton
                  key={category}
                  onClick={() => setFilterCategory(category)}
                  variant={filterCategory === category ? "primary" : "outline"}
                  size="sm"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </ModernButton>
              ))}
            </div>

            <div className="flex gap-2">
              <ModernButton
                onClick={() => setViewMode("grid")}
                variant={viewMode === "grid" ? "primary" : "outline"}
                size="sm"
              >
                <FiGrid className="w-4 h-4" />
              </ModernButton>
              <ModernButton
                onClick={() => setViewMode("list")}
                variant={viewMode === "list" ? "primary" : "outline"}
                size="sm"
              >
                <FiList className="w-4 h-4" />
              </ModernButton>
            </div>
          </div>
        </motion.div>

        {/* Achievements Grid/List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredAchievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="text-center"
                >
                  <AchievementBadge
                    achievement={achievement}
                    isUnlocked={unlockedIds.has(achievement.id)}
                    size="lg"
                    unlockedAt={
                      userAchievements.find((ua) => ua.id === achievement.id)
                        ?.unlockedAt
                    }
                  />
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                    {achievement.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {achievement.xpReward} XP
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAchievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <AchievementBadge
                      achievement={achievement}
                      isUnlocked={unlockedIds.has(achievement.id)}
                      size="md"
                      showTooltip={false}
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {achievement.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {achievement.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                          {achievement.category}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                          {achievement.rarity}
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          +{achievement.xpReward} XP
                        </span>
                      </div>
                    </div>
                    {unlockedIds.has(achievement.id) && (
                      <div className="text-green-600 dark:text-green-400">
                        <FiAward className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
