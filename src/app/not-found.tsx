import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <Section className="flex min-h-svh items-center pt-32">
      <Container>
        <h1 className="text-h2 uppercase">PAGE NOT FOUND</h1>
        <p className="mt-6 max-w-prose text-text-secondary">Looks like this frame got lost.</p>
        <div className="mt-10">
          <Button href="/" arrow>
            Back to Home
          </Button>
        </div>
      </Container>
    </Section>
  );
}
