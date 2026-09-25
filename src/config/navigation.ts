export const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "FAQ", href: "/faq" },
] as const;

export const footerLinks = [...navLinks, { label: "Contact", href: "/contact" }] as const;

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
] as const;

// Brief §2 — CTA labels and destinations, used everywhere.
export const cta = {
  primary: { label: "Start a Project", href: "/contact" },
  secondary: { label: "View Our Work", href: "/work" },
} as const;
