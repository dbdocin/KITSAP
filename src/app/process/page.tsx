import type { Metadata } from "next";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Process",
  description: "How a KITSAP project works, from your first brief to the final delivered files.",
};

const steps = [
  {
    number: "01",
    title: "Tell us what you're making.",
    text: "Send a project request with your goals, audience, style and any deadlines. The more context you share, the closer the first cut lands.",
  },
  {
    number: "02",
    title: "Share your footage and references.",
    text: "We'll share the next steps for sending your footage, references and brand assets, so everything we need is in one place before we start.",
  },
  {
    number: "03",
    title: "We edit and refine.",
    text: "We shape story and pacing first, then refine sound, color and graphics until the edit is ready for your review.",
  },
  {
    number: "04",
    title: "You review.",
    text: "Watch the edit and send your feedback. Clear notes help us make the right changes quickly.",
  },
  {
    number: "05",
    title: "We finalize and deliver.",
    text: "We apply your revisions and export the final files in the formats you need.",
  },
] as const;

export default function ProcessPage() {
  return (
    <>
      <PageHeader title="HOW WE WORK" />

      <Section className="pt-4 md:pt-4 lg:pt-4">
        <Container>
          <ol>
            {steps.map((step, index) => (
              <li key={step.number} className="border-t border-border">
                <Reveal
                  delay={index * 0.04}
                  y={16}
                  className="grid gap-4 py-10 md:grid-cols-[8rem_1fr_1.2fr] md:gap-10 md:py-14"
                >
                  <p className="font-mono text-sm text-accent md:pt-2">{step.number}</p>
                  <h2 className="text-display">{step.title}</h2>
                  <p className="max-w-prose text-text-secondary md:pt-1">{step.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
          <div className="border-t border-border" />
        </Container>
      </Section>

      <FinalCTA />
    </>
  );
}
