export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechCorp",
      content:
        "SideQuest completely transformed how I approach my goals. I've accomplished more in the last 3 months than I did in the entire year before.",
      initials: "SC",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "Freelance Developer",
      company: "Self-Employed",
      content:
        "The gamification aspect keeps me motivated. I love seeing my progress bars fill up and unlocking achievements. It's made productivity fun again.",
      initials: "MJ",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      company: "StartupHub",
      content:
        "Finally, a tool that understands how real people work. The ability to break down huge projects into manageable quests is exactly what I needed.",
      initials: "ER",
      rating: 5,
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ));
  };

  return (
    <section className="py-20 bg-base-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-base-content">
            Loved by High-Achievers
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            See what people are saying about their experience with SideQuest.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300 p-6 space-y-4"
            >
              {/* Rating */}
              <div className="flex space-x-1">
                {renderStars(testimonial.rating)}
              </div>

              {/* Content */}
              <blockquote className="text-base-content/80 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center space-x-3 pt-4">
                <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center font-semibold">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-semibold text-base-content">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-base-content/60">
                    {testimonial.role}
                    {testimonial.company && (
                      <span> • {testimonial.company}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 text-center space-y-6">
          <div className="bg-base-200 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-base-content mb-4">
              Join 10,000+ People Achieving More
            </h3>
            <p className="text-base-content/70 mb-6">
              Start your journey today and see why SideQuest is the top choice
              for goal-oriented individuals.
            </p>
            <button className="btn bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white btn-lg">
              Get Started Free
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
