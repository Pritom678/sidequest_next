"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiAward, FiTrendingUp, FiStar } from "react-icons/fi";

const rarityColors = {
  common: "from-gray-500 to-gray-600",
  uncommon: "from-green-500 to-green-600",
  rare: "from-blue-500 to-blue-600",
  epic: "from-purple-500 to-purple-600",
  legendary: "from-yellow-500 to-orange-600",
};

const rarityBorders = {
  common: "border-gray-400",
  uncommon: "border-green-400",
  rare: "border-blue-400",
  epic: "border-purple-400",
  legendary: "border-yellow-400",
};

export default function AchievementBadge({
  achievement,
  isUnlocked = false,
  size = "md",
  showTooltip = true,
  unlockedAt = null,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);

  useEffect(() => {
    if (isUnlocked && !showUnlockAnimation) {
      setShowUnlockAnimation(true);
      const timer = setTimeout(() => setShowUnlockAnimation(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isUnlocked]);

  const sizeClasses = {
    sm: "w-12 h-12 text-sm",
    md: "w-16 h-16 text-lg",
    lg: "w-20 h-20 text-2xl",
    xl: "w-24 h-24 text-3xl",
  };

  const badgeVariants = {
    locked: {
      scale: 1,
      opacity: 0.5,
      filter: "grayscale(1)",
    },
    unlocked: {
      scale: 1,
      opacity: 1,
      filter: "grayscale(0)",
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 },
    },
    unlock: {
      scale: [1, 1.2, 1],
      rotate: [0, 5, -5, 0],
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="relative inline-block">
      <motion.div
        className={`
          relative ${sizeClasses[size]} rounded-full 
          bg-gradient-to-br ${
            isUnlocked
              ? rarityColors[achievement.rarity]
              : "from-gray-400 to-gray-500"
          }
          border-2 ${
            isUnlocked ? rarityBorders[achievement.rarity] : "border-gray-400"
          }
          flex items-center justify-center cursor-pointer
          shadow-lg hover:shadow-xl transition-all duration-300
          ${showUnlockAnimation ? "animate-pulse" : ""}
        `}
        variants={badgeVariants}
        animate={
          showUnlockAnimation ? "unlock" : isUnlocked ? "unlocked" : "locked"
        }
        whileHover={isUnlocked ? "hover" : ""}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <span className="text-white select-none">{achievement.icon}</span>

        {isUnlocked && (
          <motion.div
            className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <FiStar className="w-3 h-3 text-yellow-900" />
          </motion.div>
        )}
      </motion.div>

      {showTooltip && isHovered && (
        <motion.div
          className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white rounded-lg shadow-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          <div className="flex items-start gap-2">
            <span className="text-xl">{achievement.icon}</span>
            <div className="flex-1">
              <h4 className="font-bold text-sm">{achievement.name}</h4>
              <p className="text-xs text-gray-300 mt-1">
                {achievement.description}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${
                    rarityColors[achievement.rarity]
                  }`}
                >
                  {achievement.rarity}
                </span>
                <span className="text-xs flex items-center gap-1">
                  <FiTrendingUp className="w-3 h-3" />
                  {achievement.xpReward} XP
                </span>
              </div>
              {unlockedAt && (
                <p className="text-xs text-gray-400 mt-1">
                  Unlocked {new Date(unlockedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
