export default function HowSideQuestWorks() {
  const steps = [
    {
      step: "01",
      title: "Define Your Quest",
      description:
        "Start by creating a quest for your goal. Break it down into manageable tasks and set clear milestones.",
    },
    {
      step: "02",
      title: "Track Progress Daily",
      description:
        "Update your progress regularly. Watch your completion percentage grow and celebrate each milestone achieved.",
    },
    {
      step: "03",
      title: "Achieve and Grow",
      description:
        "Complete quests, earn rewards, and build momentum. Use your achievements to tackle even bigger challenges.",
    },
  ];

  return (
    <section className="py-16 bg-base-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-4">
            How SideQuest Works
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative p-8 rounded-lg bg-base-100 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary  rounded-full flex items-center justify-center font-bold text-lg text-white">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-base-content mb-3">
                    {step.title}
                  </h3>
                  <p className="text-base-content/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-primary"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
