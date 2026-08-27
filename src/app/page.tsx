import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import IntroQuote from "@/components/IntroQuote";
import ServicesSection from "@/components/ServicesSection";
import OroSection from "@/components/OroSection";
import WorkSection from "@/components/WorkSection";
import CraftSection from "@/components/CraftSection";
import StudioSection from "@/components/StudioSection";
import SocialSection from "@/components/SocialSection";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Header />
      <Hero />
      <IntroQuote />
      <ServicesSection />
      <OroSection />
      <WorkSection />
      <CraftSection />
      <StudioSection />
      <SocialSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </>
  );
}
