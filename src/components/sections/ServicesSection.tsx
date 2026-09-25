import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { services } from "@/data/services";
import { SectionHeader } from "./SectionHeader";

export function ServicesSection() {
  return (
    <Section variant="elevated" aria-labelledby="services-heading">
      <Container>
        <SectionHeader
          id="services-heading"
          label="SERVICES"
          title="WHAT WE DO"
          body="From a single video to ongoing content production, KITSAP provides professional post-production and creative services."
        />

        <ol className="mt-14 border-t border-border md:mt-20">
          {services.map((service, index) => (
            <li key={service.slug} className="border-b border-border">
              <Reveal delay={index * 0.08} y={16}>
                <Link
                  href={`/services#${service.slug}`}
                  className="group grid items-baseline gap-x-8 gap-y-3 py-8 transition-colors duration-300 md:grid-cols-[4rem_minmax(0,1.5fr)_minmax(0,1fr)_2rem] md:py-10"
                >
                  <span className="font-mono text-sm text-text-secondary transition-colors duration-300 group-hover:text-accent group-focus-visible:text-accent">
                    {service.number}
                  </span>
                  <h3 className="text-display uppercase transition-colors duration-300 group-hover:text-accent group-focus-visible:text-accent">
                    {service.title}
                  </h3>
                  <p className="max-w-prose text-text-secondary">{service.shortDescription}</p>
                  <span
                    aria-hidden="true"
                    className="hidden text-2xl text-text-secondary transition-[transform,color] duration-300 group-hover:translate-x-2 group-hover:text-accent motion-reduce:group-hover:translate-x-0 md:block"
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
