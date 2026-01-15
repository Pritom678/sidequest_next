import { useState, useEffect } from "react";

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
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("week"); // week, month, year

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(
          `/api/analytics?userId=${userId}&range=${timeRange}`
        );
        if (response.ok) {
          const data = await response.json();
          setAnalytics(data.analytics);
        }
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [userId, timeRange]);

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
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-base-content">
          Progress Analytics
        </h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="select select-bordered select-sm"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-base-300 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {analytics.totalQuests}
          </div>
          <div className="text-sm text-base-content/60">Total Quests</div>
        </div>
        <div className="bg-base-300 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {analytics.completedQuests}
          </div>
          <div className="text-sm text-base-content/60">Completed</div>
        </div>
        <div className="bg-base-300 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {getCompletionRate()}%
          </div>
          <div className="text-sm text-base-content/60">Success Rate</div>
        </div>
        <div className="bg-base-300 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {analytics.totalXp.toLocaleString()}
          </div>
          <div className="text-sm text-base-content/60">Total XP</div>
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

      {/* Progress Chart */}
      <div className="bg-base-300 rounded-lg p-4">
        <h3 className="font-semibold text-base-content mb-3">Progress Trend</h3>
        <div className="h-32 flex items-end justify-between gap-1">
          {analytics.weeklyProgress?.map((week, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-gradient-to-t from-blue-500 to-purple-600 rounded-t"
                style={{
                  height: `${Math.max(
                    5,
                    (week.questsCompleted /
                      Math.max(
                        ...analytics.weeklyProgress.map(
                          (w) => w.questsCompleted
                        )
                      )) *
                      100
                  )}%`,
                }}
              />
              <div className="text-xs text-base-content/60 mt-1">
                {week.week}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
