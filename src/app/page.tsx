
import BenefitsSection from "@/components/homePage/BenefitsSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/homePage/HeroSection";
import TestimonialsSection from "@/components/homePage/TestimonialsSection";
import DemoSection from "@/components/homePage/demoSection";
import PriceSection from "@/components/homePage/PriceSection";

export default function Home() {
  return (
    <>
      <HeroSection/>
      <BenefitsSection/>
      <PriceSection/>
      <DemoSection/>
      <TestimonialsSection/>
      <Footer/>
    </>
  );
}
