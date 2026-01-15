import { FiCheckSquare, FiBarChart2, FiUsers, FiZap } from "react-icons/fi";

export default function FeaturesSection() {
  const features = [
    {
      icon: FiCheckSquare,
      title: "Smart Task Management",
      description:
        "Break down complex goals into simple, actionable tasks with intelligent prioritization and deadline tracking.",
    },
    {
      icon: FiBarChart2,
      title: "Progress Analytics",
      description:
        "Visualize your productivity patterns with detailed charts, insights, and performance metrics to optimize your workflow.",
    },
    {
      icon: FiUsers,
      title: "Team Collaboration",
      description:
        "Work together on shared quests, assign tasks, and celebrate collective achievements with your team.",
    },
    {
      icon: FiZap,
      title: "Gamified Experience",
      description:
        "Stay motivated with achievements, streaks, and rewards that make completing tasks feel like winning.",
    },
  ];

  return (
    <section className="py-20 bg-base-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-base-content">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Powerful features designed to help you achieve more, stay organized,
            and maintain momentum toward your goals.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 space-y-4"
            >
              <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-purple-600/20 rounded-lg flex items-center justify-center text-blue-600">
                <feature.icon className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-base-content">
                  {feature.title}
                </h3>
                <p className="text-base-content/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
