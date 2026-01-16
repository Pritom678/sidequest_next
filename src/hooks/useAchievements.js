import { useState, useCallback } from "react";

export function useAchievements(userId = "default-user") {
  const [notification, setNotification] = useState(null);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  const checkAchievements = useCallback(
    async (action, data = null) => {
      try {
        const response = await fetch("/api/achievements/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            action,
            data,
          }),
        });

        const result = await response.json();

        if (result.newlyUnlocked && result.newlyUnlocked.length > 0) {
          // Show notification for first newly unlocked achievement
          setNotification(result.newlyUnlocked[0]);
          setIsNotificationVisible(true);
        }

        return result;
      } catch (error) {
        console.error("Error checking achievements:", error);
        return { newlyUnlocked: [], totalNewlyUnlocked: 0 };
      }
    },
    [userId]
  );

  const closeNotification = useCallback(() => {
    setIsNotificationVisible(false);
    setNotification(null);
  }, []);

  const triggerAchievementCheck = useCallback(
    (action, data) => {
      // Delay to ensure database operations complete
      setTimeout(() => {
        checkAchievements(action, data);
      }, 500);
    },
    [checkAchievements]
  );

  return {
    notification,
    isNotificationVisible,
    closeNotification,
    triggerAchievementCheck,
    checkAchievements,
  };
}
