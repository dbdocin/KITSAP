import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cta } from "@/config/navigation";
import { siteConfig } from "@/config/site";

// Temporary hero for design-system checks. Phase 2 replaces this page.
export default function HomePage() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden pb-24 pt-32">
      <Image
        src={siteConfig.media.heroPoster}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-bg/60" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/40"
      />

      <Container className="relative">
        <SectionLabel tone="accent">VIDEO EDITING · CREATIVE SERVICES</SectionLabel>
        <h1 className="mt-6 text-hero uppercase">
          <span className="block">We turn raw footage</span>
          <span className="block">into content</span>
          <span className="block">worth watching.</span>
        </h1>
        <p className="mt-8 max-w-prose text-text-secondary">
          Professional video editing and creative services for creators, brands and businesses.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href={cta.primary.href} arrow>
            {cta.primary.label}
          </Button>
          <Button href={cta.secondary.href} variant="secondary">
            {cta.secondary.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
