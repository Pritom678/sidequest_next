import Link from "next/link";
import ModernButton from "@/components/ui/ModernButton";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-linear-to-br from-base-100 to-base-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-base-content leading-tight">
            Transform Your Goals Into
            <span className="block bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Achievable Quests
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed">
            SideQuest helps you break down big ambitions into manageable daily
            tasks. Track progress, build momentum, and conquer your personal and
            professional goals one step at a time.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/signup">
            <ModernButton variant="primary" size="lg" className="px-8">
              Start Your First Quest
            </ModernButton>
          </Link>
        </div>

        {/* Visual Elements */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              10K+
            </div>
            <div className="text-sm text-base-content/60">Active Users</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              50K+
            </div>
            <div className="text-sm text-base-content/60">Quests Completed</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              95%
            </div>
            <div className="text-sm text-base-content/60">Success Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}
