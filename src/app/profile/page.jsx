"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiFolder, FiMap, FiPlus, FiList } from "react-icons/fi";
import AuthCheck from "@/components/auth/AuthCheck";
import AnalyticsDashboard from "@/components/quests/AnalyticsDashboard";
import StreakTracker from "@/components/quests/StreakTracker";
import ProfileHeader from "@/components/profile/ProfileHeader";
import AchievementsGrid from "@/components/profile/AchievementsGrid";
import ProfileTabs from "@/components/profile/ProfileTabs";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("analytics");
  const [userStats, setUserStats] = useState({
    totalQuests: 0,
    completedQuests: 0,
    totalXp: 0,
    totalTimeSpent: 0,
    currentLevel: 1,
    nextLevelXp: 100,
    achievements: [],
    joinDate: null,
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Fetch user stats
        const statsResponse = await fetch(
          `/api/user/stats?userId=default-user`
        );
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setUserStats(statsData.userStats);
        }

        // Fetch achievements
        const achievementsResponse = await fetch(
          `/api/user/achievements?userId=default-user`
        );
        if (achievementsResponse.ok) {
          const achievementsData = await achievementsResponse.json();
          setUserStats((prev) => ({
            ...prev,
            achievements: achievementsData.achievements || [],
          }));
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <AuthCheck>
        <div className="min-h-screen bg-base-100 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <span className="loading loading-spinner loading-lg"></span>
            <p className="mt-4 text-base-content/60">Loading profile...</p>
          </div>
        </div>
      </AuthCheck>
    );
  }

  return (
    <AuthCheck>
      <div className="min-h-screen bg-base-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <ProfileHeader userStats={userStats} />
          <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="bg-base-200 dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            {activeTab === "analytics" && <AnalyticsDashboard />}

            {activeTab === "achievements" && (
              <AchievementsGrid achievements={userStats.achievements} />
            )}

            {activeTab === "streaks" && <StreakTracker />}

            {activeTab === "activity" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-base-content dark:text-white mb-6">
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {/* This would show recent quest activities, completions, milestones */}
                  <div className="text-center py-8 text-base-content/60">
                    <FiList className="w-12 h-12 mx-auto mb-4 text-base-content/40" />
                    <p>Activity feed coming soon!</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => router.push("/projects")}
              className="btn btn-primary"
            >
              <FiFolder className="mr-2" />
              My Projects
            </button>
            <button
              onClick={() => router.push("/quests")}
              className="btn btn-outline"
            >
              <FiMap className="mr-2" />
              Browse Quests
            </button>
            <button
              onClick={() => router.push("/quests/create")}
              className="btn btn-secondary"
            >
              <FiPlus className="mr-2" />
              Create Quest
            </button>
          </div>
        </div>
      </div>
    </AuthCheck>
  );
}
