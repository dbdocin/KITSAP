import type { Metadata } from "next";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHeader } from "@/components/sections/PageHeader";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about working with KITSAP.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader title="FREQUENTLY ASKED QUESTIONS" />

      <Section className="pt-4 md:pt-4 lg:pt-4">
        <Container>
          <Accordion items={faqs} headingLevel={2} className="max-w-4xl" />
        </Container>
      </Section>

      <FinalCTA />
    </>
  );
}
