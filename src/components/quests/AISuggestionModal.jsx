"use client";

import { useState } from "react";
import { FiZap, FiEdit3, FiCheck, FiX, FiLoader } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function AISuggestionModal({
  isOpen,
  onClose,
  onAcceptSuggestion,
  userHistory = null,
}) {
  const [goal, setGoal] = useState("");
  const [suggestion, setSuggestion] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSuggestion, setEditedSuggestion] = useState(null);

  const analyzeGoal = async () => {
    if (!goal.trim()) return;

    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/ai/suggest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          goal,
          userHistory,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI suggestion");
      }

      const data = await response.json();
      const aiSuggestion = data.suggestion;
      setSuggestion(aiSuggestion);
      setEditedSuggestion(aiSuggestion);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAcceptSuggestion = () => {
    const finalSuggestion = isEditing ? editedSuggestion : suggestion;
    onAcceptSuggestion(finalSuggestion);
    handleClose();
  };

  const handleClose = () => {
    setGoal("");
    setSuggestion(null);
    setEditedSuggestion(null);
    setIsEditing(false);
    onClose();
  };

  const updateTask = (taskIndex, field, value) => {
    const updatedTasks = [...editedSuggestion.tasks];
    updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], [field]: value };
    setEditedSuggestion({ ...editedSuggestion, tasks: updatedTasks });
  };

  const updateMilestone = (milestoneIndex, field, value) => {
    const updatedMilestones = [...editedSuggestion.milestones];
    updatedMilestones[milestoneIndex] = {
      ...updatedMilestones[milestoneIndex],
      [field]: value,
    };
    setEditedSuggestion({ ...editedSuggestion, milestones: updatedMilestones });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          exit={{ y: 20 }}
          className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <FiZap className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                AI Quest Assistant
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FiX className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Goal Input */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                What&apos;s your goal?
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="e.g., Learn React in 2 months, Run a 5k, Build a portfolio..."
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  onKeyPress={(e) => e.key === "Enter" && analyzeGoal()}
                />
                <button
                  onClick={analyzeGoal}
                  disabled={!goal.trim() || isAnalyzing}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <FiLoader className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <FiZap className="w-4 h-4" />
                      Generate Quest
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* AI Suggestion */}
            {suggestion && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Quest Overview */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {isEditing ? editedSuggestion.title : suggestion.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {isEditing
                          ? editedSuggestion.description
                          : suggestion.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded">
                        {isEditing
                          ? editedSuggestion.category
                          : suggestion.category}
                      </span>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 rounded">
                        {isEditing
                          ? editedSuggestion.difficulty
                          : suggestion.difficulty}
                      </span>
                      <span className="px-2 py-1 bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 rounded">
                        {isEditing
                          ? editedSuggestion.estimatedDays
                          : suggestion.estimatedDays}{" "}
                        days
                      </span>
                    </div>
                  </div>

                  {/* Edit Toggle */}
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                  >
                    {isEditing ? (
                      <>
                        <FiCheck className="w-4 h-4" />
                        Done Editing
                      </>
                    ) : (
                      <>
                        <FiEdit3 className="w-4 h-4" />
                        Customize Quest
                      </>
                    )}
                  </button>
                </div>

                {/* Tasks */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Quest Tasks (
                    {isEditing
                      ? editedSuggestion.tasks.length
                      : suggestion.tasks.length}
                    )
                  </h4>
                  <div className="space-y-3">
                    {(isEditing
                      ? editedSuggestion.tasks
                      : suggestion.tasks
                    ).map((task, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                      >
                        {isEditing ? (
                          <div className="space-y-3">
                            <input
                              type="text"
                              value={task.title}
                              onChange={(e) =>
                                updateTask(index, "title", e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                            />
                            <textarea
                              value={task.description}
                              onChange={(e) =>
                                updateTask(index, "description", e.target.value)
                              }
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                            />
                            <input
                              type="number"
                              value={task.estimatedHours}
                              onChange={(e) =>
                                updateTask(
                                  index,
                                  "estimatedHours",
                                  parseInt(e.target.value)
                                )
                              }
                              placeholder="Estimated hours"
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                            />
                          </div>
                        ) : (
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-900 dark:text-white">
                                {index + 1}. {task.title}
                              </h5>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {task.description}
                              </p>
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 ml-4">
                              {task.estimatedHours}h
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Milestones */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Milestones (
                    {isEditing
                      ? editedSuggestion.milestones.length
                      : suggestion.milestones.length}
                    )
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(isEditing
                      ? editedSuggestion.milestones
                      : suggestion.milestones
                    ).map((milestone, index) => (
                      <div
                        key={index}
                        className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800"
                      >
                        {isEditing ? (
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={milestone.title}
                              onChange={(e) =>
                                updateMilestone(index, "title", e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white text-sm"
                            />
                            <input
                              type="number"
                              value={milestone.position}
                              onChange={(e) =>
                                updateMilestone(
                                  index,
                                  "position",
                                  parseInt(e.target.value)
                                )
                              }
                              min="0"
                              max="100"
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white text-sm"
                            />
                            <textarea
                              value={milestone.description}
                              onChange={(e) =>
                                updateMilestone(
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white text-sm"
                            />
                          </div>
                        ) : (
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white">
                              {milestone.title}
                            </h5>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                <div
                                  className="bg-yellow-500 h-2 rounded-full"
                                  style={{ width: `${milestone.position}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {milestone.position}%
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                              {milestone.description}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Actions */}
            {suggestion && (
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleClose}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAcceptSuggestion}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <FiCheck className="w-4 h-4" />
                  Create Quest
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
