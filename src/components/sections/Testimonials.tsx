import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";
import { testimonials } from "@/data/testimonials";
import { SectionHeader } from "./SectionHeader";

/** Renders nothing unless `features.testimonials` is on. */
export function Testimonials() {
  const enabled: boolean = siteConfig.features.testimonials;
  if (!enabled || testimonials.length === 0) return null;

  return (
    <Section aria-labelledby="testimonials-heading">
      <Container>
        <SectionHeader id="testimonials-heading" title="WHAT CLIENTS SAY" />

        <ul className="mt-14 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-8">
          {testimonials.map((item, index) => {
            const byline = [item.role, item.company].filter(Boolean).join(", ");
            return (
              <li key={`${item.name}-${index}`}>
                <Reveal delay={index * 0.1} y={16}>
                  <figure className="border-t border-border pt-8">
                    <blockquote className="text-h3 font-medium normal-case">
                      “{item.quote}”
                    </blockquote>
                    <figcaption className="mt-6 text-sm">
                      <span className="block font-medium text-text">{item.name}</span>
                      {byline && <span className="block text-text-secondary">{byline}</span>}
                    </figcaption>
                  </figure>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
