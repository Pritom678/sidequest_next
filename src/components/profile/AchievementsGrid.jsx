export default function AchievementsGrid({ achievements }) {
  const getAchievementIcon = (type) => {
    const icons = {
      first_quest: "🌟",
      week_streak: "🔥",
      month_streak: "💪",
      speed_demon: "⚡",
      completionist: "🏆",
      explorer: "🗺️",
      time_master: "⏰",
      xp_collector: "💎",
      legendary: "👑",
    };
    return icons[type] || "🏅";
  };

  const getAchievementColor = (rarity) => {
    const colors = {
      common: "border-gray-300 bg-gray-100",
      uncommon: "border-green-300 bg-green-100",
      rare: "border-blue-300 bg-blue-100",
      epic: "border-purple-300 bg-purple-100",
      legendary: "border-yellow-300 bg-yellow-100",
    };
    return colors[rarity] || "border-gray-300 bg-gray-100";
  };

  const getRarityLabel = (rarity) => {
    return rarity.charAt(0).toUpperCase() + rarity.slice(1);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-base-content dark:text-white mb-6">
        Achievement Collection
      </h2>

      {achievements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 ${getAchievementColor(
                achievement.rarity
              )} 
                         hover:scale-105 transition-all duration-300 cursor-pointer`}
              title={achievement.description}
            >
              <div className="text-center">
                <div className="text-4xl mb-2">
                  {getAchievementIcon(achievement.type)}
                </div>
                <div className="font-semibold text-base-content dark:text-white">
                  {achievement.name}
                </div>
                <div className="text-xs text-base-content/60 mt-1">
                  {getRarityLabel(achievement.rarity)}
                </div>
                {achievement.unlockedAt && (
                  <div className="text-xs text-green-600 mt-2">
                    📅 {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-xl font-semibold text-base-content dark:text-white mb-2">
            No Achievements Yet
          </h3>
          <p className="text-base-content/60 max-w-md mx-auto">
            Complete quests and maintain streaks to unlock achievements and
            showcase your accomplishments!
          </p>
        </div>
      )}
    </div>
  );
}
