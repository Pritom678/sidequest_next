"use client";

import { useState } from "react";
import {
  FiPlus,
  FiFolder,
  FiEdit2,
  FiTrash2,
  FiCalendar,
  FiClock,
} from "react-icons/fi";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DashboardProjectsPage() {
  const [projects] = useState([
    {
      id: 1,
      name: "Web Development Portfolio",
      description:
        "Personal portfolio website built with Next.js and Tailwind CSS",
      createdAt: "2024-01-15",
      lastUpdated: "2024-01-20",
      status: "active",
      questCount: 5,
    },
    {
      id: 2,
      name: "Mobile App Design",
      description: "React Native mobile application for task management",
      createdAt: "2024-01-10",
      lastUpdated: "2024-01-18",
      status: "completed",
      questCount: 8,
    },
    {
      id: 3,
      name: "Data Analysis Dashboard",
      description: "Analytics dashboard for business intelligence",
      createdAt: "2024-01-05",
      lastUpdated: "2024-01-12",
      status: "active",
      questCount: 3,
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "archived":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                My Projects
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage your projects and track progress
              </p>
            </div>
            <Link
              href="/dashboard/projects/create"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <FiPlus className="w-4 h-4" />
              New Project
            </Link>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="p-6">
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                >
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <FiFolder className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {project.name}
                        </h3>
                        <span
                          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}
                        >
                          {project.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Project Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Project Stats */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                        <FiCalendar className="w-4 h-4" />
                        <span>Created</span>
                      </div>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {project.createdAt}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                        <FiClock className="w-4 h-4" />
                        <span>Updated</span>
                      </div>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {project.lastUpdated}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        Quests
                      </span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {project.questCount}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <Link
                      href={`/dashboard/projects/${project.id}`}
                      className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      View Project
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FiFolder className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No projects yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Create your first project to start organizing your quests
              </p>
              <Link
                href="/dashboard/projects/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <FiPlus className="w-4 h-4" />
                Create Your First Project
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
