import { siteConfig } from "@/config/site";

const steps = [
  {
    number: "01",
    title: "We review your request",
    text: "We read your project details and reference links.",
  },
  {
    number: "02",
    title: "We reply with next steps",
    text: "You'll hear back with next steps and how to send your footage.",
  },
] as const;

const linkClass =
  "inline-flex min-h-11 items-center text-text underline decoration-text-muted underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent";

export function ContactSidePanel() {
  const { email, whatsapp } = siteConfig.contact;
  const whatsappDigits = whatsapp.replace(/\D/g, "");

  return (
    <aside aria-labelledby="next-heading" className="lg:sticky lg:top-28 lg:self-start">
      <h2 id="next-heading" className="text-label uppercase text-accent">
        What happens next
      </h2>

      <ol className="mt-6 border-t border-border">
        {steps.map((step) => (
          <li key={step.number} className="border-b border-border py-6">
            <p className="font-mono text-sm text-accent">{step.number}</p>
            <p className="mt-2 text-h3">{step.title}</p>
            <p className="mt-2 text-text-secondary">{step.text}</p>
          </li>
        ))}
      </ol>

      {(email || whatsappDigits) && (
        <div className="mt-10">
          <h2 className="text-label uppercase text-text-secondary">Prefer to reach out directly?</h2>
          <ul className="mt-3">
            {email && (
              <li>
                <a href={`mailto:${email}`} className={linkClass}>
                  {email}
                </a>
              </li>
            )}
            {whatsappDigits && (
              <li>
                <a
                  href={`https://wa.me/${whatsappDigits}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Message us on WhatsApp
                </a>
              </li>
            )}
          </ul>
        </div>
      )}
    </aside>
  );
}
