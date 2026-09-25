import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { faqs } from "@/data/faqs";
import { SectionHeader } from "./SectionHeader";

const PREVIEW_COUNT = 5;

export function FaqPreview() {
  return (
    <Section variant="elevated" aria-labelledby="faq-preview-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <SectionHeader id="faq-preview-heading" title="FREQUENTLY ASKED QUESTIONS" />
            <Reveal className="mt-8">
              <Button href="/faq" variant="link" arrow>
                See all questions
              </Button>
            </Reveal>
          </div>
          <Reveal>
            <Accordion items={faqs.slice(0, PREVIEW_COUNT)} />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
