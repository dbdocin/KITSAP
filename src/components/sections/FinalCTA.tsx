import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { cta } from "@/config/navigation";

/** Closes every major page. Copy is fixed by the brief. */
export function FinalCTA() {
  return (
    <Section variant="elevated" aria-labelledby="final-cta-heading">
      <Container>
        <Reveal>
          <h2 id="final-cta-heading" className="max-w-5xl text-h2 uppercase">
            <span className="block">GOT FOOTAGE?</span>
            <span className="block">LET&apos;S MAKE SOMETHING GREAT.</span>
          </h2>
          <p className="mt-6 max-w-prose text-text-secondary">
            Send us your project and let&apos;s turn your raw footage into content worth watching.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href={cta.primary.href} arrow>
              {cta.primary.label}
            </Button>
            <Button href={cta.secondary.href} variant="secondary">
              {cta.secondary.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
