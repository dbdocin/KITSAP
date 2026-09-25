import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cta } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { HeroHeading } from "./HeroHeading";
import { HeroVideo } from "./HeroVideo";

const headingLines = ["WE TURN RAW FOOTAGE", "INTO CONTENT", "WORTH WATCHING."] as const;

export function Hero() {
  const { heroVideo, heroPoster } = siteConfig.media;
  const videoSrc: string = heroVideo;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh items-end overflow-hidden bg-bg pb-24 pt-32 md:items-center md:pb-28"
    >
      {/* Static cinematic treatment — always rendered, video (if any) sits on top. */}
      <Image src={heroPoster} alt="" fill priority sizes="100vw" className="object-cover" />
      {videoSrc && <HeroVideo src={videoSrc} poster={heroPoster} />}

      {/* Legibility overlays + subtle frame lines. */}
      <div aria-hidden="true" className="absolute inset-0 bg-bg/60" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-bg/50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-4 bottom-4 top-20 border border-text/10 md:inset-x-8 md:bottom-8 md:top-24"
      />

      <Container className="relative z-10">
        <SectionLabel tone="accent">VIDEO EDITING · CREATIVE SERVICES</SectionLabel>
        <HeroHeading id="hero-heading" lines={headingLines} />
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

      <div
        aria-hidden="true"
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
      >
        <span className="text-label uppercase text-text-secondary">Scroll</span>
        <span className="relative block h-10 w-px overflow-hidden bg-text/15">
          <span className="absolute inset-0 bg-accent motion-safe:animate-scroll-cue" />
        </span>
      </div>
    </section>
  );
}
