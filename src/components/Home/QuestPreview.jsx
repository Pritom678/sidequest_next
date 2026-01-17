"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

export default function QuestPreview() {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSelectedQuests = async () => {
      try {
        setError(null);
        const response = await fetch("/api/quests");
        if (response.ok) {
          const data = await response.json();
          setQuests(data.quests || []);
        } else {
          throw new Error("Failed to fetch quests");
        }
      } catch (error) {
        console.error("Error fetching selected quests:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSelectedQuests();
  }, []);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 border-green-300";
      case "Medium":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "Hard":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case "career":
        return (
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
              d="M21 13.255A23.918 23.918 0 0111.78 8.984 23.918 23.918 0 018.016 3.27 21.255 13.255zM12 4.454a8.545 8.545 0 00-8.545 8.545 8.545 8.545 0 008.545-8.545zM12 19a1 1 0 102 0 1 1 0 00-2 0zm6-6a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        );
      case "health":
        return (
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
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        );
      case "productivity":
        return (
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
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2H9z"
            />
          </svg>
        );
      default:
        return (
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
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-base-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-base-content">
              Your Active Quests
            </h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Track your progress and stay motivated with your ongoing quests.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkeletonLoader type="quest" count={3} />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-base-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-6">⚠️</div>
              <h3 className="text-2xl font-bold text-base-content mb-4">
                Unable to Load Quests
              </h3>
              <p className="text-base-content/70 mb-8">
                {error}. Please try again later.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="btn btn-primary btn-lg"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <ErrorBoundary>
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-base-content">
              Your Active Quests
            </h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Track your progress and stay motivated with your ongoing quests.
            </p>
          </div>

          {/* Quest Cards */}
          {quests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {quests.map((quest) => (
                <div
                  key={quest.id}
                  className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] overflow-hidden border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                  role="article"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      router.push(`/quests/${quest.id}`);
                    }
                  }}
                >
                  {/* Quest Header */}
                  <div className="relative h-48 overflow-hidden">
                    {quest.image && (
                      <img
                        src={quest.image}
                        alt={quest.name || quest.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                    {/* Category Icon */}
                    <div className="absolute top-4 left-4">
                      <div className="w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                        {getCategoryIcon(quest.category)}
                      </div>
                    </div>

                    {/* Progress Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg">
                        {quest.progress || 0}%
                      </div>
                    </div>
                  </div>

                  {/* Quest Content */}
                  <div className="p-6 space-y-4">
                    {/* Title and Meta */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {quest.name || quest.title}
                      </h3>

                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${getDifficultyColor(
                            quest.difficulty,
                          )}`}
                        >
                          {quest.difficulty}
                        </span>
                        <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-violet-100 text-violet-800 border-violet-300">
                          {quest.category}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 text-sm">
                      {quest.description}
                    </p>

                    {/* Progress Section */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Progress
                        </span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {quest.progress || 0}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-700 ease-out relative"
                          style={{ width: `${quest.progress || 0}%` }}
                          role="progressbar"
                          aria-valuenow={quest.progress || 0}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {quest.xp || 0} XP
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-blue-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-gray-500 dark:text-gray-400">
                          {quest.duration || 0}h
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => router.push(`/quests/${quest.id}`)}
                      className="w-full btn btn-primary text-sm font-medium transition-all duration-200 hover:scale-105 focus:scale-95"
                      aria-label={`Continue quest: ${
                        quest.name || quest.title
                      }`}
                    >
                      Continue Quest
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-6">🎯</div>
                <h3 className="text-2xl font-bold text-base-content mb-4">
                  No Active Quests Yet
                </h3>
                <p className="text-base-content/70 mb-8">
                  You haven't started any quests yet. Browse available quests
                  and begin your journey!
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <button
                    onClick={() => router.push("/quests")}
                    className="btn btn-primary btn-lg transition-all duration-200 hover:scale-105 focus:scale-95"
                  >
                    Browse Quests
                  </button>
                  <button
                    onClick={() => router.push("/quests/create")}
                    className="btn btn-outline btn-lg transition-all duration-200 hover:scale-105 focus:scale-95"
                  >
                    Create Quest
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Section */}
          <div className="mt-16 text-center space-y-4">
            <p className="text-base-content/70">
              Ready for more challenges? Explore new quests or create your own.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => router.push("/quests")}
                className="btn bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white btn-lg transition-all duration-200 hover:scale-105 focus:scale-95"
              >
                Explore All Quests
              </button>
              <button
                onClick={() => router.push("/projects")}
                className="btn btn-outline btn-lg transition-all duration-200 hover:scale-105 focus:scale-95"
              >
                View All Projects
              </button>
            </div>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
}
