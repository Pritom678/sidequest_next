import { FiPlus, FiCheck, FiStar } from "react-icons/fi";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Create Your Quest",
      description:
        "Define your big goal and break it down into smaller, manageable tasks that you can tackle daily.",
      icon: FiPlus,
    },
    {
      number: "2",
      title: "Track Daily Progress",
      description:
        "Complete tasks, check off milestones, and watch your progress bar grow as you move closer to your goal.",
      icon: FiCheck,
    },
    {
      number: "3",
      title: "Achieve & Celebrate",
      description:
        "Complete your quest, unlock achievements, and start your next adventure with newfound confidence.",
      icon: FiStar,
    },
  ];

  return (
    <section className="py-20 bg-base-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-base-content">
            How SideQuest Works
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Three simple steps to transform your goals into achievements. No
            complex setup required.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative space-y-6">
              {/* Step Number & Connector */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  {step.number}
                </div>
                <div className="hidden lg:block absolute left-6 top-12 w-0.5 h-24 bg-linear-to-b from-blue-500 to-purple-600" />
              </div>

              {/* Step Content */}
              <div className="space-y-3 pl-16 lg:pl-0">
                <h3 className="text-2xl font-semibold text-base-content">
                  {step.title}
                </h3>
                <p className="text-base-content/70 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Visual Icon */}
              <div className="pl-16 lg:pl-0">
                <div className="w-full h-32 bg-base-100 rounded-lg flex items-center justify-center">
                  <step.icon className="w-16 h-16 text-primary/30" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="btn bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white btn-lg">
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
}
