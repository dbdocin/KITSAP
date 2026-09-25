import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "./SectionHeader";

const audiences = [
  { name: "CREATORS", text: "YouTubers, influencers and content creators." },
  { name: "BRANDS", text: "Companies building their online presence." },
  { name: "AGENCIES", text: "White-label editing and post-production support." },
  { name: "BUSINESSES", text: "Corporate and promotional video content." },
  { name: "PODCASTS", text: "Video podcasts and short-form clips." },
  { name: "EVENTS", text: "Event coverage and highlight films." },
] as const;

export function WhoWeWorkWith() {
  return (
    <Section aria-labelledby="who-heading">
      <Container>
        <SectionHeader id="who-heading" title="BUILT FOR PEOPLE WHO CREATE." />

        <ul className="mt-14 border-t border-border md:mt-20">
          {audiences.map((item, index) => (
            <li key={item.name} className="border-b border-border">
              <Reveal delay={index * 0.05} y={12}>
                <div className="group grid gap-2 py-6 transition-[padding,color] duration-300 hover:text-accent md:grid-cols-[1fr_1fr] md:items-baseline md:py-8 md:hover:pl-4 motion-reduce:md:hover:pl-0">
                  <p className="text-display uppercase">{item.name}</p>
                  <p className="text-text-secondary transition-colors duration-300 group-hover:text-text">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
