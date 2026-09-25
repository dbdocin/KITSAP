import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactSidePanel } from "@/components/contact/ContactSidePanel";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Tell KITSAP what you're creating, what you need and when you need it. We'll get back to you with the next steps.",
};

export default function ContactPage() {
  const contactEmail = siteConfig.contact.email || undefined;

  return (
    <>
      <PageHeader
        title="START A PROJECT"
        subtitle="Tell us what you're creating, what you need and when you need it. We'll get back to you with the next steps."
      />

      <Section className="pt-4 md:pt-4 lg:pt-4">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-20">
            <ContactForm contactEmail={contactEmail} />
            <ContactSidePanel />
          </div>
        </Container>
      </Section>
    </>
  );
}
