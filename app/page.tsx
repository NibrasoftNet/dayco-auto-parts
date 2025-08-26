import Image from "next/image";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-9";
import StatsSection from "@/components/stats";
import FooterSection from "@/components/footer";

export default function Home() {
  return (
    <>
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <FooterSection />
    </>
  );
}
