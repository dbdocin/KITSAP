import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { PageHeader } from "./PageHeader";

interface LegalPageProps {
  title: string;
  children: ReactNode;
}

export function LegalPage({ title, children }: LegalPageProps) {
  return (
    <>
      <PageHeader title={title} />
      <div className="bg-bg pb-24 md:pb-32">
        <Container>
          <div className="max-w-3xl">
            <div
              role="note"
              className="border border-accent/40 bg-card p-5 text-sm md:p-6"
            >
              <p className="font-medium text-accent">Template — to be reviewed before launch.</p>
              <p className="mt-2 text-text-secondary">
                This page is a starting template, not legal advice. Have it reviewed against
                India&apos;s Digital Personal Data Protection Act, 2023 (DPDP Act) and any other law
                that applies to you before the site goes live. Text in [square brackets] still
                needs a decision.
              </p>
            </div>
            <div className="mt-12 space-y-12">{children}</div>
          </div>
        </Container>
      </div>
    </>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-h3 uppercase">{title}</h2>
      <div className="mt-4 space-y-4 text-text-secondary [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_ul]:space-y-2">
        {children}
      </div>
    </section>
  );
}

/** The configured contact email as a link, or a visible placeholder while unset. */
export function ContactEmail() {
  const email = siteConfig.contact.email;

  if (!email) {
    return <span className="text-text">[contact email — to be added before launch]</span>;
  }

  return (
    <a
      href={`mailto:${email}`}
      className="text-text underline decoration-text-muted underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent"
    >
      {email}
    </a>
  );
}
