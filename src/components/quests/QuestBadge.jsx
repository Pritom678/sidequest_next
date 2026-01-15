export default function QuestBadge({ type, children, className = "" }) {
  const getBadgeStyles = (type) => {
    switch (type) {
      case "difficulty":
        return "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-800 dark:from-emerald-900/20 dark:to-teal-900/20 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700 shadow-sm";
      case "status":
        return "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 dark:from-blue-900/20 dark:to-indigo-900/20 dark:text-blue-300 border border-blue-200 dark:border-blue-700 shadow-sm";
      case "category":
        return "bg-gradient-to-r from-violet-50 to-purple-50 text-violet-800 dark:from-violet-900/20 dark:to-purple-900/20 dark:text-violet-300 border border-violet-200 dark:border-violet-700 shadow-sm";
      case "tag":
        return "bg-gradient-to-r from-gray-50 to-slate-50 text-gray-700 dark:from-gray-900/20 dark:to-slate-900/20 dark:text-gray-300 border border-gray-200 dark:border-gray-600 shadow-sm";
      default:
        return "bg-gradient-to-r from-gray-50 to-slate-50 text-gray-700 dark:from-gray-900/20 dark:to-slate-900/20 dark:text-gray-300 border border-gray-200 dark:border-gray-600 shadow-sm";
    }
  };

  const getDifficultyStyles = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 text-green-700 dark:from-green-900/30 dark:via-emerald-900/30 dark:to-teal-900/30 dark:text-green-300 border-green-300 dark:border-green-600";
      case "medium":
        return "bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 text-yellow-700 dark:from-yellow-900/30 dark:via-amber-900/30 dark:to-orange-900/30 dark:text-yellow-300 border-yellow-300 dark:border-yellow-600";
      case "hard":
        return "bg-gradient-to-r from-red-50 via-rose-50 to-pink-50 text-red-700 dark:from-red-900/30 dark:via-rose-900/30 dark:to-pink-900/30 dark:text-red-300 border-red-300 dark:border-red-600";
      default:
        return getBadgeStyles("difficulty");
    }
  };

  const getFinalStyles = () => {
    if (type === "difficulty" && typeof children === "string") {
      return getDifficultyStyles(children);
    }
    return getBadgeStyles(type);
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-300 hover:shadow-md transform hover:scale-105 ${getFinalStyles()} ${className}`}
    >
      {children}
    </span>
  );
}
