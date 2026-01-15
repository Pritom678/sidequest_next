import HeroSection from "@/components/Home/HeroSection";
import FeaturesSection from "@/components/Home/FeaturesSection";
import HowItWorks from "@/components/Home/HowItWorks";
import BenefitsSection from "@/components/Home/BenefitsSection";
import CallToAction from "@/components/Home/CallToAction";
import Testimonials from "@/components/Home/Testimonials";
import QuestPreview from "@/components/Home/QuestPreview";

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
