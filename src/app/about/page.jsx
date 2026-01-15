import AboutHero from "@/components/about/AboutHero";
import MissionSection from "@/components/about/MissionSection";
import ValuesSection from "@/components/about/ValuesSection";
import HowSideQuestWorks from "@/components/about/HowSideQuestWorks";
import BuiltForSection from "@/components/about/BuiltForSection";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata = {
  title: "About SideQuest - Our Mission & Values",
  description:
    "Learn about SideQuest's mission to revolutionize productivity through gamification. Discover our values and how we help you achieve your goals.",
  keywords: [
    "about sidequest",
    "mission",
    "values",
    "productivity gamification",
    "company story",
  ],
  openGraph: {
    title: "About SideQuest - Our Story",
    description:
      "Discover the mission and values behind SideQuest's innovative approach to productivity.",
    type: "website",
  },
};

export default function About() {
  return (
    <>
      <AboutHero />
      <MissionSection />
      <ValuesSection />
      <HowSideQuestWorks />
      <BuiltForSection />
      <AboutCTA />
    </>
  );
}
