"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiAward, FiX } from "react-icons/fi";
import AchievementBadge from "./AchievementBadge";

export default function AchievementNotification({
  achievement,
  onClose,
  isVisible,
}) {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (isVisible && achievement) {
      setShouldShow(true);
      const timer = setTimeout(() => {
        setShouldShow(false);
        setTimeout(() => onClose(), 300);
      }, 5000);
      return () => clearTimeout(timer);
    } else if (!isVisible) {
      setShouldShow(false);
    }
  }, [isVisible, achievement, onClose]);

  return (
    <AnimatePresence>
      {shouldShow && achievement && (
        <motion.div
          className="fixed top-4 right-4 z-50 max-w-sm"
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-2xl p-4 text-white">
            <div className="flex items-start gap-3">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
              >
                <AchievementBadge
                  achievement={achievement}
                  isUnlocked={true}
                  size="md"
                  showTooltip={false}
                />
              </motion.div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <FiAward className="w-5 h-5 text-yellow-300" />
                  <span className="font-bold text-sm">
                    Achievement Unlocked!
                  </span>
                </div>
                <h3 className="font-bold text-base">{achievement.name}</h3>
                <p className="text-sm text-gray-200 mt-1">
                  {achievement.description}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-yellow-400 text-gray-900 px-2 py-1 rounded-full font-semibold">
                    +{achievement.xpReward} XP
                  </span>
                  <span className="text-xs text-gray-300">
                    {achievement.rarity}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setShouldShow(false);
                  setTimeout(() => onClose(), 300);
                }}
                className="text-white/70 hover:text-white transition-colors"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            {/* Progress bar animation */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-yellow-400 rounded-full"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
