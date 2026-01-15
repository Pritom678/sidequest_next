import AboutHero from "@/components/about/AboutHero";
import MissionSection from "@/components/about/MissionSection";
import ValuesSection from "@/components/about/ValuesSection";
import HowSideQuestWorks from "@/components/about/HowSideQuestWorks";
import BuiltForSection from "@/components/about/BuiltForSection";
import AboutCTA from "@/components/about/AboutCTA";

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
