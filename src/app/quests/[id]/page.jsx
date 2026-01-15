"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProgressBar from "@/components/quests/ProgressBar";
import QuestBadge from "@/components/quests/QuestBadge";

export default function QuestDetailsPage({ params }) {
  const [quest, setQuest] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isPageLoading, setIsPageLoading] = useState(true);
  const router = useRouter();
  const [id, setId] = useState(null);

  // Extract id from params
  useEffect(() => {
    const getId = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };
    getId();
  }, [params]);

  // Fetch quest on mount
  useEffect(() => {
    if (!id) return;

    const fetchQuest = async () => {
      setIsPageLoading(true);
      try {
        const response = await fetch(`/api/quests/${id}`);
        const data = await response.json();

        if (data.success) {
          setQuest(data.quest);
        } else {
          notFound();
        }
      } catch (error) {
        console.error("Error fetching quest:", error);
        notFound();
      } finally {
        setIsPageLoading(false);
      }
    };
    fetchQuest();
  }, [id]);

  // Show loading state while fetching
  if (isPageLoading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="mt-4 text-base-content/60">Loading quest details...</p>
        </div>
      </div>
    );
  }

  // Show 404 if no quest found
  if (!quest) {
    notFound();
  }

  const handleStartQuest = async () => {
    if (!quest || isLoading) return;

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch(`/api/quests/${id}/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        // Update local state
        setQuest((prev) => ({
          ...prev,
          selected: true,
          progress: 0,
          startedAt: new Date(),
        }));

        setMessage("Quest started successfully! 🎯");

        // Redirect to projects page after 2 seconds
        setTimeout(() => {
          router.push("/projects");
        }, 2000);
      } else {
        setMessage(data.message || "Failed to start quest");
      }
    } catch (error) {
      console.error("Error starting quest:", error);
      setMessage("Failed to start quest");
    } finally {
      setIsLoading(false);
    }
  };

  const getActionButton = () => {
    switch (quest.status) {
      case "available":
        return {
          text: "Start Quest",
          className:
            "btn bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white btn-lg",
          disabled: isLoading,
        };
      case "selected":
      case "in-progress":
        return {
          text: "Continue Quest",
          className: "btn btn-warning btn-lg",
          disabled: isLoading,
        };
      case "completed":
        return {
          text: "Completed",
          className: "btn btn-neutral btn-lg cursor-not-allowed opacity-50",
          disabled: true,
        };
      case "locked":
        return {
          text: "Locked",
          className: "btn btn-neutral btn-lg cursor-not-allowed opacity-50",
          disabled: true,
        };
      default:
        return {
          text: "Start Quest",
          className:
            "btn bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white btn-lg",
          disabled: isLoading,
        };
    }
  };

  const actionButton = getActionButton();

  return (
    <section className="py-20 bg-base-100 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          {/* Banner Image */}
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden">
            <img
              src={quest.image}
              alt={quest.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

            {/* Status Badge */}
            <div className="absolute top-4 right-4">
              <QuestBadge type="status" className="badge-lg">
                {quest.status}
              </QuestBadge>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Quest Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title and Basic Info */}
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl font-bold text-base-content dark:text-white">
                  {quest.name}
                </h1>

                <div className="flex items-center gap-3">
                  <QuestBadge type="difficulty">{quest.difficulty}</QuestBadge>
                  <QuestBadge type="category">{quest.category}</QuestBadge>
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="font-medium text-base-content dark:text-white">
                      {quest.xp} XP
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-base-content/60 dark:text-gray-300">
                      {quest.duration}h
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-base-content dark:text-white">
                  Description
                </h2>
                <p className="text-base-content/80 dark:text-gray-300 leading-relaxed">
                  {quest.description}
                </p>
              </div>

              {/* Progress */}
              {quest.progress !== undefined && (
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-base-content dark:text-white">
                    Your Progress
                  </h2>
                  <ProgressBar progress={quest.progress} />
                </div>
              )}

              {/* Tags */}
              {quest.tags && quest.tags.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-base-content dark:text-white">
                    Tags
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {quest.tags.map((tag, index) => (
                      <QuestBadge key={index} type="tag">
                        {tag}
                      </QuestBadge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Rewards & Actions */}
            <div className="space-y-6">
              {/* Reward Card */}
              <div className="card bg-base-200 dark:bg-gray-800 p-6 space-y-4">
                <h3 className="text-lg font-semibold text-base-content dark:text-white">
                  Rewards
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-base-content/60 dark:text-gray-300">
                      Price:
                    </span>
                    <span className="text-xl font-bold text-primary">
                      {quest.price === 0 ? "Free" : `${quest.price} coins`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-base-content/60 dark:text-gray-300">
                      XP:
                    </span>
                    <span className="text-xl font-bold text-yellow-500">
                      {quest.xp}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-base-content/60 dark:text-gray-300">
                      Reward:
                    </span>
                    <span className="text-sm text-base-content dark:text-gray-300">
                      {quest.reward}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="card bg-base-200 dark:bg-gray-800 p-6 space-y-3">
                <h3 className="text-lg font-semibold text-base-content dark:text-white">
                  Quest Stats
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-base-content/60 dark:text-gray-300">
                      Difficulty:
                    </span>
                    <QuestBadge type="difficulty">
                      {quest.difficulty}
                    </QuestBadge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-base-content/60 dark:text-gray-300">
                      Duration:
                    </span>
                    <span className="text-base-content dark:text-white">
                      {quest.duration}h
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-base-content/60 dark:text-gray-300">
                      Popularity:
                    </span>
                    <div className="flex items-center space-x-1">
                      <svg
                        className="w-4 h-4 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span className="text-base-content dark:text-white">
                        {quest.popularity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="space-y-4">
                <button
                  onClick={handleStartQuest}
                  disabled={isLoading || !actionButton.disabled}
                  className={`w-full btn ${actionButton.className} ${
                    isLoading ? "loading" : ""
                  }`}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    actionButton.text
                  )}
                </button>

                {message && (
                  <div
                    className={`alert ${
                      message.includes("successfully")
                        ? "alert-success"
                        : "alert-error"
                    }`}
                  >
                    {message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
