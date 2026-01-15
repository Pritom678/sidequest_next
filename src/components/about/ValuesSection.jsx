import { FiTarget, FiTrendingUp, FiStar, FiGitBranch } from "react-icons/fi";

export default function ValuesSection() {
  const values = [
    {
      icon: FiTarget,
      title: "Focused Productivity",
      description:
        "We eliminate distractions and help you concentrate on what truly matters—achieving your goals one step at a time.",
    },
    {
      icon: FiTrendingUp,
      title: "Progress Over Perfection",
      description:
        "Every step forward counts. We celebrate small wins and consistent effort over waiting for the perfect moment.",
    },
    {
      icon: FiStar,
      title: "Simplicity by Design",
      description:
        "Complex goals deserve simple tools. Our platform is intuitive, clean, and free from unnecessary features.",
    },
    {
      icon: FiGitBranch,
      title: "Growth Through Consistency",
      description:
        "Build lasting habits and achieve meaningful growth through daily, consistent actions and regular progress tracking.",
    },
  ];

  return (
    <section className="py-16 bg-base-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-4">
            Our Values
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg bg-base-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-purple-600/20 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                <value.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-base-content mb-3">
                {value.title}
              </h3>
              <p className="text-base-content/70 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
