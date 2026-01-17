"use client";

import { SessionProvider } from "next-auth/react";
import AchievementProvider from "@/components/achievements/AchievementProvider";

export default function AppProviders({ children }) {
  return (
    <SessionProvider>
      <AchievementProvider>{children}</AchievementProvider>
    </SessionProvider>
  );
}
