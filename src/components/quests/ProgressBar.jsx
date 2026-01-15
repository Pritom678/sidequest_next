export default function ProgressBar({
  progress,
  className = "",
  showPercentage = true,
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between text-sm">
        <span className="text-base-content/60">Progress</span>
        {showPercentage && (
          <span className="font-medium text-base-content">{progress}%</span>
        )}
      </div>
      <div className="w-full bg-base-300 rounded-full h-2 overflow-hidden">
        <div
          className="bg-linear-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
}
