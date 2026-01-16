"use client";

import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    // Initialize with localStorage value or system preference
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (
        savedTheme === "sidequest-night" ||
        (!savedTheme && systemPrefersDark)
      ) {
        return true;
      }
      return false;
    }
    return false;
  });

  // Apply theme to DOM
  useEffect(() => {
    const theme = isDark ? "sidequest-night" : "sidequest";
    document.documentElement.setAttribute("data-theme", theme);
  }, [isDark]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    // Save preference
    localStorage.setItem("theme", newTheme ? "sidequest-night" : "sidequest");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-105"
      aria-label="Toggle theme"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <FiSun className="w-5 h-5 text-yellow-500 transition-colors duration-200" />
      ) : (
        <FiMoon className="w-5 h-5 text-gray-600 transition-colors duration-200" />
      )}
    </button>
  );
}
