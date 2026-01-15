import { useState, useEffect } from "react";
import { FireIcon, LightningIcon, TrophyIcon } from "@/components/ui/Icons";

export default function StreakTracker({
  userId = "default-user",
  className = "",
}) {
  const [streaks, setStreaks] = useState({
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: null,
    totalActiveDays: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStreaks = async () => {
      try {
        const response = await fetch(`/api/streaks?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setStreaks(data.streaks);
        }
      } catch (error) {
        console.error("Error fetching streaks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStreaks();
  }, [userId]);

  const getStreakColor = (streak) => {
    if (streak === 0) return "text-gray-500";
    if (streak >= 30) return "text-purple-600";
    if (streak >= 14) return "text-red-600";
    if (streak >= 7) return "text-orange-600";
    if (streak >= 3) return "text-yellow-600";
    return "text-green-600";
  };

  const getStreakEmoji = (streak) => {
    if (streak === 0) return "💤";
    if (streak >= 30) return "🔥🔥🔥";
    if (streak >= 14) return "🔥🔥";
    if (streak >= 7) return "🔥";
    if (streak >= 3) return "⚡";
    return "✨";
  };

  const getStreakMessage = (streak) => {
    if (streak === 0) return "Start your journey!";
    if (streak === 1) return "Great start!";
    if (streak === 2) return "Keep it going!";
    if (streak === 3) return "On fire! 🔥";
    if (streak >= 7) return "Unstoppable!";
    if (streak >= 14) return "Legendary!";
    if (streak >= 30) return "God tier! 👑";
    return "Amazing!";
  };

  if (loading) {
    return (
      <div className={`bg-base-200 rounded-lg p-4 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-base-300 rounded w-20 mb-2"></div>
          <div className="h-3 bg-base-300 rounded w-16"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-base-200 rounded-lg p-4 space-y-3 ${className}`}>
      {/* Current Streak */}
      <div className="text-center">
        <div
          className={`text-4xl font-bold ${getStreakColor(
            streaks.currentStreak
          )}`}
        >
          {getStreakEmoji(streaks.currentStreak)} {streaks.currentStreak}
        </div>
        <div className="text-sm text-base-content/60">
          Day{streaks.currentStreak !== 1 ? "s" : ""} Streak
        </div>
        <div className="text-xs text-base-content/50 mt-1">
          {getStreakMessage(streaks.currentStreak)}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="text-center p-2 bg-base-300 rounded">
          <div className="font-semibold text-base-content">
            {streaks.longestStreak}
          </div>
          <div className="text-xs text-base-content/60">Longest</div>
        </div>
        <div className="text-center p-2 bg-base-300 rounded">
          <div className="font-semibold text-base-content">
            {streaks.totalActiveDays}
          </div>
          <div className="text-xs text-base-content/60">Total Days</div>
        </div>
      </div>

      {/* Progress to next milestone */}
      {streaks.currentStreak < 7 && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-base-content/60">
            <span>Next Milestone</span>
            <span>{7 - streaks.currentStreak} days</span>
          </div>
          <div className="w-full bg-base-300 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(streaks.currentStreak / 7) * 100}%` }}
            />
          </div>
          <div className="text-xs text-center text-base-content/50">
            🎯 Week Warrior in {7 - streaks.currentStreak} days!
          </div>
        </div>
      )}

      {/* Achievement badges */}
      <div className="flex flex-wrap gap-2 justify-center">
        {streaks.currentStreak >= 1 && (
          <div className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs font-medium">
            <FireIcon size={16} className="mr-1" />
            Early Bird
          </div>
        )}
        {streaks.currentStreak >= 3 && (
          <div className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full text-xs font-medium">
            <LightningIcon size={16} className="mr-1" />
            On Fire
          </div>
        )}
        {streaks.currentStreak >= 7 && (
          <div className="px-2 py-1 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 rounded-full text-xs font-medium">
            <LightningIcon size={16} className="mr-1" />
            Week Warrior
          </div>
        )}
        {streaks.currentStreak >= 14 && (
          <div className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-full text-xs font-medium">
            <TrophyIcon size={16} className="mr-1" />
            Fortnight Fighter
          </div>
        )}
        {streaks.currentStreak >= 30 && (
          <div className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full text-xs font-medium">
            <FireIcon size={16} className="mr-1" />
            Monthly Master
          </div>
        )}
      </div>

      {/* Last active date */}
      {streaks.lastActiveDate && (
        <div className="text-xs text-center text-base-content/50 pt-2 border-t border-base-300">
          Last active: {new Date(streaks.lastActiveDate).toLocaleDateString()}
        </div>
      )}
    </div>
  );
}
