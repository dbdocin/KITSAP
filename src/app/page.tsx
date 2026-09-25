import type { Metadata } from "next";
import { FaqPreview } from "@/components/sections/FaqPreview";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhoWeWorkWith } from "@/components/sections/WhoWeWorkWith";
import { WhyKitsap } from "@/components/sections/WhyKitsap";
import { HOME_DESCRIPTION, HOME_TITLE, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Home",
  absoluteTitle: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
});

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
