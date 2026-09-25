import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHeader } from "@/components/sections/PageHeader";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MediaImage } from "@/components/ui/MediaImage";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { cta } from "@/config/navigation";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Video editing, Reels and short-form, podcast editing, and creative and motion work from KITSAP.",
  path: "/services",
});

function DetailList({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <h3 className="text-label uppercase text-accent">{title}</h3>
      <ul className="mt-4 space-y-2 text-text-secondary">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-text-muted" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHeader title="CREATIVE SERVICES BUILT AROUND YOUR CONTENT." />

      {services.map((service, index) => {
        const imageFirst = index % 2 === 0;

        return (
          <Section
            key={service.slug}
            id={service.slug}
            variant={index % 2 === 0 ? "default" : "elevated"}
            aria-labelledby={`${service.slug}-heading`}
            className="scroll-mt-16 py-16 md:scroll-mt-20 md:py-24 lg:py-28"
          >
            <Container>
              <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-20">
                <Reveal className={cn(!imageFirst && "lg:order-2")}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-card">
                    {/* Decorative visual; the section heading names the service. */}
                    <MediaImage
                      src={service.image}
                      alt=""
                      sizes="(min-width: 1024px) 45vw, 100vw"
                    />
                  </div>
                </Reveal>

                <div>
                  <Reveal>
                    <p className="font-mono text-sm text-accent">{service.number}</p>
                    <h2
                      id={`${service.slug}-heading`}
                      className="mt-4 text-[clamp(1.75rem,1rem+3vw,3.5rem)] font-bold uppercase leading-none tracking-tight"
                    >
                      {service.title}
                    </h2>
                    <p className="mt-6 max-w-prose text-text-secondary">{service.description}</p>
                  </Reveal>

                  <div className="mt-10 grid gap-8 sm:grid-cols-2">
                    <DetailList title="Includes" items={service.includes} />
                    <DetailList title="Deliverables" items={service.deliverables} />
                    <div className="sm:col-span-2">
                      <DetailList title="Typical use cases" items={service.useCases} />
                    </div>
                  </div>

                  <div className="mt-10">
                    <Button href={cta.primary.href} arrow>
                      {cta.primary.label}
                    </Button>
                  </div>
                </div>
              </div>
            </Container>
          </Section>
        );
      })}

      <FinalCTA />
    </>
  );
}
