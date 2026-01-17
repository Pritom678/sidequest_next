"use client";

import { useAchievements } from "@/hooks/useAchievements";
import AchievementNotification from "./AchievementNotification";

export default function AchievementProvider({ children }) {
  const { notification, isNotificationVisible, closeNotification } =
    useAchievements();

  return (
    <>
      {children}
      <AchievementNotification
        achievement={notification}
        isVisible={isNotificationVisible}
        onClose={closeNotification}
      />
    </>
  );
}
