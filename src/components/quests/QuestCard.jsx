import Link from "next/link";

export default function QuestCard({ quest }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-gradient-to-r from-green-500 to-emerald-600";
      case "in-progress":
        return "bg-gradient-to-r from-amber-500 to-orange-600";
      case "completed":
        return "bg-gradient-to-r from-blue-500 to-indigo-600";
      case "locked":
        return "bg-gradient-to-r from-gray-500 to-slate-600";
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-600";
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-linear-to-r from-green-100 to-emerald-100 text-green-800 border-green-300";
      case "Medium":
        return "bg-linear-to-r from-amber-100 to-orange-100 text-amber-800 border-amber-300";
      case "Hard":
        return "bg-linear-to-r from-red-100 to-rose-100 text-red-800 border-red-300";
      default:
        return "bg-linear-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <Link href={`/quests/${quest.id}`} className="block h-full">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] overflow-hidden border border-gray-200 dark:border-gray-700 h-full flex flex-col">
        {/* Quest Image */}
        <div className="relative h-48 overflow-hidden flex-shrink-0">
          <img
            src={quest.image}
            alt={quest.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-4 right-4">
            <span
              className={`px-3 py-1.5 rounded-full text-xs font-semibold text-white ${getStatusColor(
                quest.status
              )} shadow-lg`}
            >
              {quest.status}
            </span>
          </div>
          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Quest Content */}
        <div className="p-6 space-y-4 flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2 min-w-0">
              <h3 className="text-xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 h-14">
                {quest.name}
              </h3>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold ${getDifficultyColor(
                    quest.difficulty
                  )}`}
                >
                  {quest.difficulty}
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-linear-to-r from-violet-100 to-purple-100 text-violet-800 border-violet-300">
                  {quest.category}
                </span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {quest.price === 0 ? "Free" : `${quest.price} coins`}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="line-clamp-3 leading-relaxed flex-1 h-16">
            {quest.description}
          </p>

          {/* Progress */}
          {quest.progress !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Progress
                </span>
                <span className="font-semibold">{quest.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-linear-to-r from-green-500 to-emerald-600 h-2.5 rounded-full transition-all duration-700 ease-out relative"
                  style={{ width: `${quest.progress}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800 mt-auto">
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-1.5">
                <svg
                  className="w-4 h-4 text-amber-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-sm font-semibold">{quest.xp} XP</span>
              </div>
              <div className="flex items-center space-x-1.5">
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
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {quest.duration}h
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-1.5">
              <svg
                className="w-4 h-4 text-red-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {quest.popularity}
              </span>
            </div>
          </div>

          {/* Tags */}
          {quest.tags && quest.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {quest.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800"
                >
                  {tag}
                </span>
              ))}
              {quest.tags.length > 3 && (
                <span className="px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800">
                  +{quest.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
