"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthCheck from "@/components/auth/AuthCheck";
import QuestCard from "@/components/projects/QuestCard";
import StreakTracker from "@/components/quests/StreakTracker";
import AnalyticsDashboard from "@/components/quests/AnalyticsDashboard";
import ModernButton from "@/components/ui/ModernButton";

export default function ProjectsPage() {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const response = await fetch("/api/quests");
        if (response.ok) {
          const data = await response.json();
          setQuests(data.quests || []);
        } else {
          console.error("Failed to fetch quests");
        }
      } catch (error) {
        console.error("Error fetching quests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuests();
  }, []);

  if (loading) {
    return (
      <AuthCheck>
        <div className="min-h-screen bg-base-100 flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </AuthCheck>
    );
  }

  return (
    <AuthCheck>
      <div className="min-h-screen bg-base-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-base-content dark:text-white">
              My Projects
            </h1>
            <div className="flex gap-4">
              <ModernButton
                onClick={() => router.push("/achievements")}
                variant="outline"
                size="md"
              >
                🏆 Achievements
              </ModernButton>
              <ModernButton
                onClick={() => setShowAnalytics(!showAnalytics)}
                variant={showAnalytics ? "primary" : "outline"}
                size="md"
              >
                📊 {showAnalytics ? "Projects" : "Analytics"}
              </ModernButton>
              <form action="/api/auth/logout" method="POST">
                <ModernButton type="submit" variant="outline" size="md">
                  Logout
                </ModernButton>
              </form>
              <ModernButton
                onClick={() => router.push("/quests/create")}
                variant="primary"
                size="md"
              >
                Create New Quest
              </ModernButton>
            </div>
          </div>

          {showAnalytics ? (
            <AnalyticsDashboard />
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {quests.length > 0 ? (
                      quests.map((quest) => (
                        <QuestCard key={quest.id} quest={quest} />
                      ))
                    ) : (
                      <div className="col-span-full text-center py-16">
                        <div className="max-w-md mx-auto">
                          <div className="text-6xl mb-4">📋</div>
                          <h3 className="text-2xl font-bold text-base-content dark:text-white mb-2">
                            No Ongoing Projects
                          </h3>
                          <p className="text-base-content/70 dark:text-gray-300 mb-6">
                            You haven't started any quests yet. Go to the quests
                            page and click "Start Quest" to begin your journey!
                          </p>
                          <ModernButton
                            onClick={() => router.push("/quests")}
                            variant="primary"
                            size="lg"
                          >
                            Browse Quests
                          </ModernButton>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <StreakTracker />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </AuthCheck>
  );
}
