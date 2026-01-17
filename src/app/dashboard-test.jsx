"use client";

import { useSession } from "next-auth/react";

export default function DashboardTest() {
  const { data: session } = useSession();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Dashboard Test (Outside Route Group)
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Session Status</h2>
        <div className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Status: {session ? "Authenticated" : "Not Authenticated"}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            User: {session?.user?.email || "No user"}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Name: {session?.user?.name || "No name"}
          </p>
        </div>
      </div>
    </div>
  );
}
