import {
  FiClock,
  FiTarget,
  FiCheck,
  FiZap,
  FiStar,
  FiActivity,
} from "react-icons/fi";
import toast from "react-hot-toast";

export default function ProgressBar({
  progress,
  className = "",
  showPercentage = true,
  milestones = [],
  timeSpent = 0,
  estimatedTime = 0,
  showTime = false,
  size = "medium", // small, medium, large
}) {
  // Calculate progress value
  const progressValue = Math.min(100, Math.max(0, progress || 0));

  // Calculate milestone stats
  const totalMilestones = milestones.length;
  const completedMilestones = milestones.filter((m) => m.completed).length;

  // Size classes for different progress bar heights
  const sizeClasses = {
    small: "h-2",
    medium: "h-3",
    large: "h-4",
  };

  // Format time helper function
  const formatTime = (minutes) => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  // Handle milestone click
  const handleMilestoneClick = (milestone, index) => {
    if (milestone.completed) {
      toast.success(
        `Milestone "${
          milestone.label || `Milestone ${index + 1}`
        }" already completed!`
      );
    } else {
      toast(
        `Milestone "${milestone.label || `Milestone ${index + 1}`}" in progress`
      );
    }
  };

  // Handle progress bar click for progress updates
  const handleProgressClick = () => {
    if (progressValue === 100) {
      toast.success("Congratulations! Quest completed! 🎉");
    } else if (progressValue >= 75) {
      toast("Almost there! Keep going! 💪");
    } else if (progressValue >= 50) {
      toast("Halfway there! Good progress! 🎯");
    } else {
      toast("Just getting started! You got this! 🚀");
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Header with progress and time */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-base-content/60">Progress</span>
          {showTime && timeSpent > 0 && (
            <span className="text-xs text-base-content/50">
              <FiClock size={16} className="mr-1" />
              {formatTime(timeSpent)}
              {estimatedTime > 0 && ` / ${formatTime(estimatedTime)}`}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {totalMilestones > 0 && (
            <span className="text-xs text-base-content/50">
              <FiTarget size={16} className="mr-1" />
              {completedMilestones}/{totalMilestones}
            </span>
          )}
          {showPercentage && (
            <span className="font-medium text-base-content">
              {progressValue}%
            </span>
          )}
        </div>
      </div>

      {/* Main progress bar */}
      <div
        className={`relative w-full bg-base-300 rounded-full overflow-hidden ${sizeClasses[size]} cursor-pointer`}
        onClick={handleProgressClick}
      >
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-500 ease-out relative"
          style={{ width: `${progressValue}%` }}
        >
          {/* Animated shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        </div>

        {/* Milestone markers */}
        {milestones.map((milestone, index) => {
          const position = (milestone.position / 100) * 100;
          const isCompleted = milestone.completed;

          return (
            <div
              key={index}
              className="absolute top-0 bottom-0 w-1 flex items-center justify-center"
              style={{ left: `${position}%` }}
            >
              <div
                className={`w-3 h-3 rounded-full border-2 border-base-100 transition-all duration-300 cursor-pointer hover:scale-125 ${
                  isCompleted
                    ? "bg-green-500 scale-110"
                    : "bg-base-400 hover:scale-110"
                }`}
                title={milestone.label || `Milestone ${index + 1}`}
                onClick={() => handleMilestoneClick(milestone, index)}
              >
                {isCompleted && (
                  <svg
                    className="w-2 h-2 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Milestone labels */}
      {milestones.length > 0 && (
        <div className="flex justify-between text-xs text-base-content/50 mt-1">
          {milestones.map((milestone, index) => (
            <span
              key={index}
              className={`text-center ${
                milestone.completed ? "text-green-600 font-medium" : ""
              }`}
            >
              {milestone.label || `${index + 1}`}
            </span>
          ))}
        </div>
      )}

      {/* Progress status indicator */}
      <div className="flex items-center justify-between text-xs mt-2">
        <span
          className={`px-2 py-1 rounded-full ${
            progressValue === 100
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : progressValue >= 75
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              : progressValue >= 50
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          {progressValue === 100 ? (
            <span className="flex items-center">
              <FiCheck size={16} className="mr-1" />
              Completed
            </span>
          ) : progressValue >= 75 ? (
            <span className="flex items-center">
              <FiActivity size={16} className="mr-1" />
              Almost There
            </span>
          ) : progressValue >= 50 ? (
            <span className="flex items-center">
              <FiZap size={16} className="mr-1" />
              Halfway
            </span>
          ) : (
            <span className="flex items-center">
              <FiStar size={16} className="mr-1" />
              Just Started
            </span>
          )}
        </span>

        {showTime && estimatedTime > 0 && (
          <span className="text-base-content/50">
            {timeSpent > 0 && `ETA: ${formatTime(estimatedTime - timeSpent)}`}
          </span>
        )}
      </div>
    </div>
  );
}
