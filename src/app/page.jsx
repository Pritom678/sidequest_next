import HeroSection from "@/components/Home/HeroSection";
import FeaturesSection from "@/components/Home/FeaturesSection";
import HowItWorks from "@/components/Home/HowItWorks";
import BenefitsSection from "@/components/Home/BenefitsSection";
import CallToAction from "@/components/Home/CallToAction";
import Testimonials from "@/components/Home/Testimonials";
import QuestPreview from "@/components/Home/QuestPreview";

export const metadata = {
  title: "SideQuest - Project & Quest Management Platform",
  description:
    "Transform your productivity with SideQuest. Manage projects, complete quests, earn rewards, and level up your personal and professional goals.",
  keywords: [
    "project management",
    "quest system",
    "productivity",
    "gamification",
    "task management",
    "goals",
  ],
  openGraph: {
    title: "SideQuest - Gamify Your Productivity",
    description:
      "Manage projects and quests in a fun, engaging way. Earn rewards and track your progress.",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <QuestPreview />
      <BenefitsSection />
      <Testimonials />
      <CallToAction />
    </>
  );
}
