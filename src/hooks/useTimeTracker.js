import { useState, useEffect, useRef, useCallback } from "react";

export function useTimeTracker(questId, userId = "default-user") {
  const [isTracking, setIsTracking] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [sessionStart, setSessionStart] = useState(null);
  const intervalRef = useRef(null);
  const lastSaveRef = useRef(0);

  // Load existing time spent from localStorage or API
  useEffect(() => {
    const loadTimeSpent = async () => {
      try {
        const response = await fetch(`/api/progress?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          const questProgress = data.progress?.find(
            (p) => p.questId === questId
          );
          if (questProgress) {
            setTimeSpent(questProgress.timeSpent || 0);
            lastSaveRef.current = questProgress.timeSpent || 0;
          }
        }
      } catch (error) {
        console.error("Error loading time spent:", error);
      }
    };

    if (questId) {
      loadTimeSpent();
    }
  }, [questId, userId]);

  // Save progress periodically
  const saveProgress = useCallback(
    async (additionalTime = 0) => {
      try {
        const totalTime = lastSaveRef.current + additionalTime;

        await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            questId,
            userId,
            progress: 0, // This would be updated separately
            timeSpent: totalTime,
            milestones: [],
          }),
        });

        lastSaveRef.current = totalTime;
      } catch (error) {
        console.error("Error saving progress:", error);
      }
    },
    [questId, userId]
  );

  // Start tracking
  const startTracking = useCallback(() => {
    if (!isTracking) {
      setIsTracking(true);
      setSessionStart(Date.now());

      // Start interval to update time every second
      intervalRef.current = setInterval(() => {
        setTimeSpent((prev) => prev + 1);
      }, 1000);

      // Record daily activity for streaks
      fetch("/api/streaks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
    }
  }, [isTracking, userId]);

  // Stop tracking
  const stopTracking = useCallback(() => {
    if (isTracking) {
      setIsTracking(false);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      if (sessionStart) {
        const sessionTime = Math.floor((Date.now() - sessionStart) / 1000);
        saveProgress(sessionTime);
      }

      setSessionStart(null);
    }
  }, [isTracking, sessionStart, saveProgress]);

  // Pause tracking (without stopping session)
  const pauseTracking = useCallback(() => {
    if (isTracking && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsTracking(false);

      if (sessionStart) {
        const sessionTime = Math.floor((Date.now() - sessionStart) / 1000);
        saveProgress(sessionTime);
      }
    }
  }, [isTracking, sessionStart, saveProgress]);

  // Resume tracking
  const resumeTracking = useCallback(() => {
    if (!isTracking && questId) {
      setIsTracking(true);
      setSessionStart(Date.now());

      intervalRef.current = setInterval(() => {
        setTimeSpent((prev) => prev + 1);
      }, 1000);
    }
  }, [isTracking, questId]);

  // Auto-save every 30 seconds
  useEffect(() => {
    if (isTracking) {
      const autoSaveInterval = setInterval(() => {
        if (sessionStart) {
          const sessionTime = Math.floor((Date.now() - sessionStart) / 1000);
          saveProgress(sessionTime);
        }
      }, 30000); // Save every 30 seconds

      return () => clearInterval(autoSaveInterval);
    }
  }, [isTracking, sessionStart, saveProgress]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      stopTracking();
    };
  }, [stopTracking]);

  // Format time for display
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  return {
    isTracking,
    timeSpent,
    formattedTime: formatTime(timeSpent),
    startTracking,
    stopTracking,
    pauseTracking,
    resumeTracking,
    saveProgress,
  };
}
