import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = { title: "Privacy Policy" };

// Stub — replaced in a later phase.
export default function Page() {
  return (
    <Section className="pt-32 md:pt-40 lg:pt-44">
      <Container>
        <h1 className="text-h2 uppercase">Privacy policy</h1>
      </Container>
    </Section>
  );
}
