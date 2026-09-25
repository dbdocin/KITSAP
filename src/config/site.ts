export const siteConfig = {
  name: "KITSAP",
  domain: "kitsap.work",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kitsap.work",
  tagline: "Video Editing & Creative Services",
  contact: {
    email: "", // PLACEHOLDER — public contact email, hidden if empty
    whatsapp: "", // PLACEHOLDER — digits with country code, e.g. "91XXXXXXXXXX"; hidden if empty
  },
  social: {
    instagram: "", // hidden if empty — never invent URLs
    youtube: "",
    linkedin: "",
  },
  media: {
    heroVideo: "", // path under /public; if empty, hero uses the static cinematic background
    heroPoster: "/placeholders/hero.svg",
  },
  features: {
    testimonials: false, // turn on only when real testimonials exist
    analytics: false, // Vercel Analytics
  },
} as const;
