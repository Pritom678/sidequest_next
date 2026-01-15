import { useState } from "react";
import { FiBarChart2, FiAward, FiZap, FiActivity } from "react-icons/fi";

export default function ProfileTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "analytics", label: "Analytics", icon: FiBarChart2 },
    { id: "achievements", label: "Achievements", icon: FiAward },
    { id: "streaks", label: "Streaks", icon: FiZap },
    { id: "activity", label: "Activity", icon: FiActivity },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-8 border-b border-base-300">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 font-medium transition-colors duration-200 border-b-2 ${
            activeTab === tab.id
              ? "text-blue-600 border-blue-600 bg-blue-50 dark:bg-blue-900/20"
              : "text-base-content/60 border-transparent hover:text-base-content hover:bg-base-200"
          }`}
        >
          <tab.icon className="mr-2 w-4 h-4" />
          {tab.label}
        </button>
      ))}
    </div>
  );
}
