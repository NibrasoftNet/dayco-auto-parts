import FeaturesSection from "@/components/section/features-9";
import FooterSection from "@/components/section/footer";
import HeroSection from "@/components/section/hero-section";
import ProductsSection from "@/components/section/ProductSection";
import ShoppingSection from "@/components/section/ShoppingSection";
import StatsSection from "@/components/section/stats";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProductsSection />
      <FeaturesSection />
      <ShoppingSection />
      <StatsSection />
      <FooterSection />
    </>
  );
}