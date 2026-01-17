"use client";

import { useState, useEffect } from "react";
import { FiTrendingUp, FiTarget, FiAward, FiZap, FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";
import Link from "next/link";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import AnalyticsDashboard from "@/components/quests/AnalyticsDashboard";
import { toast } from "react-hot-toast";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [userStats, setUserStats] = useState({
    totalQuests: 0,
    completedQuests: 0,
    totalXP: 0,
    currentStreak: 0,
    longestStreak: 0,
    averageCompletionTime: 0,
  });
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const [statsResponse, achievementsResponse] = await Promise.all([
        fetch("/api/user/stats"),
        fetch("/api/user/achievements"),
      ]);

      const statsData = await statsResponse.json();
      const achievementsData = await achievementsResponse.json();

      if (statsResponse.ok) {
        setUserStats(statsData.stats || statsData);
      }

      if (achievementsResponse.ok) {
        setAchievements(achievementsData.achievements || []);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const quickStats = [
    {
      label: "Total Quests",
      value: userStats.totalQuests || 0,
      icon: FiTarget,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Completed",
      value: userStats.completedQuests || 0,
      icon: FiAward,
      color: "from-green-500 to-green-600",
    },
    {
      label: "Total XP",
      value: userStats.totalXP || 0,
      icon: FiZap,
      color: "from-purple-500 to-purple-600",
    },
    {
      label: "Current Streak",
      value: userStats.currentStreak || 0,
      icon: FiTrendingUp,
      color: "from-orange-500 to-orange-600",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded-lg mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
            <div className="h-96 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <ProfileHeader stats={userStats} />

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Create Quest Button */}
        <div className="mb-6">
          <Link
            href="/dashboard/create-quest"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200"
          >
            <FiPlus className="w-4 h-4" />
            Create New Quest
          </Link>
        </div>

        {/* Tabs */}
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <AnalyticsDashboard />
            </motion.div>
          )}

          {activeTab === "achievements" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <h3 className="text-lg font-semibold mb-4">Achievements</h3>
              {achievements.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                          <FiAward className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{achievement.title}</h4>
                          <p className="text-sm text-gray-600">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No achievements yet. Complete quests to earn achievements!
                </p>
              )}
            </motion.div>
          )}

          {activeTab === "streaks" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <h3 className="text-lg font-semibold mb-4">Streak Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600">Current Streak</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {userStats.currentStreak || 0} days
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Longest Streak</p>
                  <p className="text-3xl font-bold text-green-600">
                    {userStats.longestStreak || 0} days
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "activity" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <p className="text-gray-500 text-center py-8">
                Activity tracking coming soon!
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
