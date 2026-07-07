import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AiAdvantageSection } from "@/components/marketing/ai-advantage-section";
import { ArtistBenefits } from "@/components/marketing/artist-benefits";
import { CustomerBenefits } from "@/components/marketing/customer-benefits";
import { FinalCta } from "@/components/marketing/final-cta";
import { HeroSection } from "@/components/marketing/hero-section";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { ProblemSection } from "@/components/marketing/problem-section";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";
import { TrustedArtistsSection } from "@/components/marketing/trusted-artists-section";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ProblemSection />
        <CustomerBenefits />
        <AiAdvantageSection />
        <ArtistBenefits />
        <HowItWorks />
        <TrustedArtistsSection />
        <TestimonialsSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
