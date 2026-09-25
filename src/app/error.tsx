"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Section className="flex min-h-svh items-center pt-32">
      <Container>
        <h1 className="text-h2 uppercase">Something went wrong</h1>
        <p className="mt-6 max-w-prose text-text-secondary">
          The page hit an unexpected error. Try again, or head back to the homepage.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button onClick={reset}>Try again</Button>
          <Button href="/" variant="secondary">
            Back to Home
          </Button>
        </div>
      </Container>
    </Section>
  );
}
