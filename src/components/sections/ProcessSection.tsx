import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "./SectionHeader";

const steps = [
  {
    number: "01",
    title: "BRIEF",
    text: "Tell us about your project, goals, style and requirements.",
  },
  {
    number: "02",
    title: "SEND",
    text: "After you submit your project request, we'll share the next steps for sending your footage, references and brand assets.",
  },
  {
    number: "03",
    title: "EDIT",
    text: "We transform your footage into polished content.",
  },
  {
    number: "04",
    title: "DELIVER",
    text: "Review the work, request revisions if needed, and receive your final files.",
  },
] as const;

export function ProcessSection() {
  return (
    <Section variant="elevated" aria-labelledby="process-heading">
      <Container>
        <SectionHeader
          id="process-heading"
          title="FROM FOOTAGE TO FINAL CUT."
          body="A simple process designed to keep your project moving."
        />

        {/* Vertical line on mobile, one continuous horizontal line on desktop. */}
        <ol className="mt-14 grid gap-10 md:mt-20 md:grid-cols-4 md:gap-0">
          {steps.map((step, index) => (
            <li
              key={step.number}
              className="relative border-l border-border pl-8 md:border-l-0 md:border-t md:pl-0 md:pr-8 md:pt-8"
            >
              <span
                aria-hidden="true"
                className="absolute -left-[3px] top-1 h-1.5 w-1.5 bg-accent md:left-0 md:top-[-3px]"
              />
              <Reveal delay={index * 0.1} y={16}>
                <p className="font-mono text-sm text-accent">{step.number}</p>
                <h3 className="mt-4 text-h3 uppercase">{step.title}</h3>
                <p className="mt-3 text-text-secondary">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
