import { useState, useEffect, useCallback } from "react";
import ModernButton from "@/components/ui/ModernButton";

export default function AnalyticsDashboard({
  userId = "default-user",
  className = "",
}) {
  const [analytics, setAnalytics] = useState({
    totalQuests: 0,
    completedQuests: 0,
    totalXp: 0,
    totalTimeSpent: 0,
    averageCompletionTime: 0,
    categoryBreakdown: {},
    difficultyBreakdown: {},
    weeklyProgress: [],
    monthlyProgress: [],
    dailyActivity: [],
    streakData: { current: 0, longest: 0 },
    achievements: [],
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("week"); // week, month, year
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchAnalytics = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/analytics?userId=${userId}&range=${timeRange}`
      );
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data.analytics);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  }, [userId, timeRange]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(fetchAnalytics, 30000);
    return () => clearInterval(interval);
  }, [autoRefresh, fetchAnalytics]);

  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getCompletionRate = () => {
    if (analytics.totalQuests === 0) return 0;
    return Math.round(
      (analytics.completedQuests / analytics.totalQuests) * 100
    );
  };

  const getCategoryData = () => {
    return Object.entries(analytics.categoryBreakdown || {}).map(
      ([category, count]) => ({
        name: category,
        count,
        percentage:
          analytics.totalQuests > 0
            ? Math.round((count / analytics.totalQuests) * 100)
            : 0,
      })
    );
  };

  const getDifficultyData = () => {
    return Object.entries(analytics.difficultyBreakdown || {}).map(
      ([difficulty, count]) => ({
        name: difficulty,
        count,
        percentage:
          analytics.totalQuests > 0
            ? Math.round((count / analytics.totalQuests) * 100)
            : 0,
      })
    );
  };

  if (loading) {
    return (
      <div className={`bg-base-200 rounded-lg p-6 ${className}`}>
        <div className="space-y-4">
          <div className="h-8 bg-base-300 rounded w-32 animate-pulse"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-base-300 rounded animate-pulse"></div>
                <div className="h-8 bg-base-300 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-base-200 rounded-lg p-6 space-y-6 ${className}`}>
      {/* Dynamic Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-base-content">
            Progress Analytics
          </h2>
          <div className="flex items-center gap-2 text-sm opacity-60">
            <div
              className={`w-2 h-2 rounded-full ${
                autoRefresh ? "bg-green-500 animate-pulse" : "bg-gray-400"
              }`}
            ></div>
            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ModernButton
            onClick={() => setAutoRefresh(!autoRefresh)}
            variant={autoRefresh ? "success" : "outline"}
            size="md"
            className="px-3"
          >
            {autoRefresh ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </ModernButton>

          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="select select-bordered select-sm"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>

          <ModernButton
            onClick={fetchAnalytics}
            variant="primary"
            size="md"
            loading={loading}
            className="px-4"
          >
            {loading ? "" : "Refresh"}
          </ModernButton>
        </div>
      </div>

      {/* Dynamic Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-base-300 rounded-lg p-4 text-center hover:scale-105 transition-transform duration-200 cursor-pointer">
          <div className="text-2xl font-bold text-blue-600">
            {analytics.totalQuests}
          </div>
          <div className="text-sm text-base-content/60">Total Quests</div>
        </div>
        <div className="bg-base-300 rounded-lg p-4 text-center hover:scale-105 transition-transform duration-200 cursor-pointer">
          <div className="text-2xl font-bold text-green-600">
            {analytics.completedQuests}
          </div>
          <div className="text-sm text-base-content/60">Completed</div>
        </div>
        <div className="bg-base-300 rounded-lg p-4 text-center hover:scale-105 transition-transform duration-200 cursor-pointer">
          <div className="text-2xl font-bold text-purple-600">
            {getCompletionRate()}%
          </div>
          <div className="text-sm text-base-content/60">Success Rate</div>
        </div>
        <div className="bg-base-300 rounded-lg p-4 text-center hover:scale-105 transition-transform duration-200 cursor-pointer">
          <div className="text-2xl font-bold text-yellow-600">
            {analytics.totalXp.toLocaleString()}
          </div>
          <div className="text-sm text-base-content/60">Total XP</div>
        </div>
      </div>

      {/* Streak & Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-base-300 rounded-lg p-4">
          <h3 className="font-semibold text-base-content mb-3 flex items-center gap-2">
            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 18.657A8 8 0 0 1 6.343 7.343S7 9 9 10c0-2 .5-5 2.5-5 2.5s-5-2.5-5-2.5c0-2-1-3-1-3s2-1 3-1 3 1 3 5-2.5 5-2.5z"
                />
              </svg>
            </div>
            Current Streak
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-orange-600">
                {analytics.streakData?.current || 0}
              </div>
              <div className="text-sm text-base-content/60">days</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-base-content/60">Longest</div>
              <div className="text-xl font-semibold text-orange-400">
                {analytics.streakData?.longest || 0} days
              </div>
            </div>
          </div>
        </div>

        <div className="bg-base-300 rounded-lg p-4">
          <h3 className="font-semibold text-base-content mb-3 flex items-center gap-2">
            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857z"
                />
              </svg>
            </div>
            Recent Achievements
          </h3>
          <div className="space-y-2">
            {analytics.achievements?.slice(0, 3).map((achievement, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 bg-base-200 rounded"
              >
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">{achievement.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{achievement.title}</div>
                  <div className="text-xs text-base-content/60">
                    {achievement.description}
                  </div>
                </div>
              </div>
            )) || (
              <div className="text-center text-base-content/60 py-4">
                No achievements yet. Keep completing quests!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Time Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-base-300 rounded-lg p-4">
          <h3 className="font-semibold text-base-content mb-3">
            Time Invested
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-base-content/60">Total Time:</span>
              <span className="font-medium">
                {formatTime(analytics.totalTimeSpent)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/60">Average per Quest:</span>
              <span className="font-medium">
                {formatTime(analytics.averageCompletionTime)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-base-300 rounded-lg p-4">
          <h3 className="font-semibold text-base-content mb-3">XP Analytics</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-base-content/60">Total XP Earned:</span>
              <span className="font-medium text-yellow-600">
                {analytics.totalXp.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/60">XP per Hour:</span>
              <span className="font-medium">
                {analytics.totalTimeSpent > 0
                  ? Math.round(
                      analytics.totalXp / (analytics.totalTimeSpent / 60)
                    )
                  : 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-base-300 rounded-lg p-4">
        <h3 className="font-semibold text-base-content mb-3">
          Quest Categories
        </h3>
        <div className="space-y-2">
          {getCategoryData().map((category, index) => (
            <div
              key={category.name}
              className="flex items-center justify-between"
            >
              <span className="text-sm text-base-content/80">
                {category.name}
              </span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-base-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
                <span className="text-sm font-medium w-12 text-right">
                  {category.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Difficulty Breakdown */}
      <div className="bg-base-300 rounded-lg p-4">
        <h3 className="font-semibold text-base-content mb-3">
          Difficulty Distribution
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {getDifficultyData().map((difficulty) => (
            <div
              key={difficulty.name}
              className="text-center p-3 bg-base-200 rounded"
            >
              <div className="font-semibold text-base-content">
                {difficulty.name}
              </div>
              <div className="text-2xl font-bold text-base-content/80">
                {difficulty.count}
              </div>
              <div className="text-xs text-base-content/60">
                {difficulty.percentage}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Progress Chart */}
      <div className="bg-base-300 rounded-lg p-4">
        <h3 className="font-semibold text-base-content mb-3 flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          Progress Trend
        </h3>
        <div className="h-40 flex items-end justify-between gap-1">
          {analytics.weeklyProgress?.map((week, index) => {
            const maxValue = Math.max(
              ...analytics.weeklyProgress.map((w) => w.questsCompleted)
            );
            const heightPercentage =
              maxValue > 0 ? (week.questsCompleted / maxValue) * 100 : 0;

            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center group cursor-pointer"
                title={`Week ${week.week}: ${week.questsCompleted} quests completed`}
              >
                <div className="relative w-full flex-1 flex items-end">
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-purple-600 rounded-t transition-all duration-300 group-hover:from-blue-400 group-hover:to-purple-500"
                    style={{
                      height: `${Math.max(5, heightPercentage)}%`,
                    }}
                  />
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    {week.questsCompleted} quests
                  </div>
                </div>
                <div className="text-xs text-base-content/60 mt-1 group-hover:text-base-content transition-colors duration-200">
                  {week.week}
                </div>
              </div>
            );
          })}
        </div>

        {/* Daily Activity Heatmap */}
        <div className="mt-4">
          <h4 className="text-sm font-medium text-base-content mb-2">
            Daily Activity
          </h4>
          <div className="grid grid-cols-7 gap-1">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
              (day, dayIndex) => (
                <div key={day} className="text-center">
                  <div className="text-xs text-base-content/60 mb-1">{day}</div>
                  <div className="grid grid-rows-7 gap-1">
                    {analytics.dailyActivity
                      ?.slice(dayIndex * 7, (dayIndex + 1) * 7)
                      .map((activity, actIndex) => (
                        <div
                          key={actIndex}
                          className={`w-3 h-3 rounded-sm transition-all duration-200 hover:scale-110 cursor-pointer ${
                            activity > 0
                              ? activity > 5
                                ? "bg-green-500"
                                : activity > 2
                                ? "bg-green-400"
                                : "bg-green-300"
                              : "bg-gray-200"
                          }`}
                          title={`${activity} quests completed`}
                        />
                      ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
