import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "./SectionHeader";

const points = [
  {
    title: "STORY FIRST",
    text: "We focus on narrative, pacing and clarity, not just effects.",
  },
  {
    title: "BUILT FOR ATTENTION",
    text: "Every cut, transition and visual element has a purpose.",
  },
  {
    title: "CONSISTENT QUALITY",
    text: "Professional editing standards across every project.",
  },
  {
    title: "EASY COLLABORATION",
    text: "Clear communication, structured feedback and straightforward revisions.",
  },
] as const;

export function WhyKitsap() {
  return (
    <Section aria-labelledby="why-heading">
      <Container>
        <SectionHeader
          id="why-heading"
          title="MORE THAN JUST EDITING."
          body="Good editing isn't just about cutting clips together. It's about understanding the story, the audience and the purpose behind every frame."
        />

        <ul className="mt-14 grid border-t border-border md:mt-20 md:grid-cols-2">
          {points.map((point, index) => (
            <li
              key={point.title}
              className="border-b border-border py-10 md:px-0 md:py-14 md:odd:border-r md:odd:pr-12 md:even:pl-12"
            >
              <Reveal delay={(index % 2) * 0.1} y={16}>
                <h3 className="text-display uppercase">{point.title}</h3>
                <p className="mt-4 max-w-prose text-text-secondary">{point.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
