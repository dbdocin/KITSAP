import { FaqPreview } from "@/components/sections/FaqPreview";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhoWeWorkWith } from "@/components/sections/WhoWeWorkWith";
import { WhyKitsap } from "@/components/sections/WhyKitsap";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <ServicesSection />
      <WhyKitsap />
      <ProcessSection />
      <Testimonials />
      <WhoWeWorkWith />
      <FaqPreview />
      <FinalCTA />
    </>
  );
}
