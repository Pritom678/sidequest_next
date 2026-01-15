import { FiBookOpen, FiMonitor, FiEdit3, FiBriefcase } from "react-icons/fi";

export default function BuiltForSection() {
  const audiences = [
    {
      title: "Students",
      description:
        "Track study goals, manage assignments, and build consistent learning habits with gamified motivation.",
      icon: FiBookOpen,
    },
    {
      title: "Developers",
      description:
        "Break down complex projects into manageable tasks and maintain steady progress on coding goals.",
      icon: FiMonitor,
    },
    {
      title: "Creators",
      description:
        "Transform creative projects into achievable quests and maintain momentum on content creation.",
      icon: FiEdit3,
    },
    {
      title: "Professionals",
      description:
        "Set and achieve career goals, develop new skills, and maintain work-life balance through structured planning.",
      icon: FiBriefcase,
    },
  ];

  return (
    <section className="py-16 bg-base-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-4">
            Built For
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((audience, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-base-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-purple-600/20 rounded-lg flex items-center justify-center text-blue-600 mb-4 mx-auto">
                <audience.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-base-content mb-3 text-center">
                {audience.title}
              </h3>
              <p className="text-base-content/70 leading-relaxed text-center">
                {audience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
