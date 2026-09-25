import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SocialIcon, type SocialNetwork } from "@/components/ui/SocialIcon";
import { footerLinks, legalLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";

const socialLabels: Record<SocialNetwork, string> = {
  instagram: "Instagram",
  youtube: "YouTube",
  linkedin: "LinkedIn",
};

const linkClass = "inline-flex min-h-11 items-center transition-colors duration-200 hover:text-accent";

export function Footer() {
  const { contact, social } = siteConfig;

  const socialLinks = (Object.keys(socialLabels) as SocialNetwork[])
    .map((network) => ({ network, href: social[network] as string }))
    .filter((item) => item.href);

  const whatsappDigits = contact.whatsapp.replace(/\D/g, "");
  const hasContact = Boolean(contact.email || whatsappDigits);

  return (
    <footer className="border-t border-border bg-bg">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="text-lg font-bold tracking-[0.2em] text-text">{siteConfig.name}</p>
            <p className="mt-3 max-w-xs text-text-secondary">{siteConfig.tagline}</p>

            {socialLinks.length > 0 && (
              <ul className="mt-6 flex items-center gap-1">
                {socialLinks.map(({ network, href }) => (
                  <li key={network}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={socialLabels[network]}
                      className="flex h-11 w-11 items-center justify-center text-text-secondary transition-colors duration-200 hover:text-accent"
                    >
                      <SocialIcon network={network} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Footer">
            <p className="text-label uppercase text-text-secondary">Explore</p>
            <ul className="mt-4 text-text-secondary">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {hasContact && (
            <div>
              <p className="text-label uppercase text-text-secondary">Contact</p>
              <ul className="mt-4 text-text-secondary">
                {contact.email && (
                  <li>
                    <a href={`mailto:${contact.email}`} className={linkClass}>
                      {contact.email}
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
                      WhatsApp
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-sm text-text-secondary md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
