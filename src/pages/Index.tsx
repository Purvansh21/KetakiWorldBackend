import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { PartnerBenefitsSection } from "@/components/sections/PartnerBenefitsSection";
import { AdvantagesSection } from "@/components/sections/AdvantagesSection";
import { PartnerHeroSection } from "@/components/sections/PartnerHeroSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { PartnerTestimonialsSection } from "@/components/sections/PartnerTestimonialsSection";
import { SignUpPromotionSection } from "@/components/sections/SignUpPromotionSection";
import { TravelPortalInfoSection } from "@/components/sections/TravelPortalInfoSection";
import { CtaSection } from "@/components/sections/CtaSection";
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <PartnerHeroSection />
        <PartnerBenefitsSection />
        <AdvantagesSection />
        <PartnerTestimonialsSection />
        <SignUpPromotionSection />
        <TravelPortalInfoSection />
        <PartnersSection />
        <CtaSection />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Index;
