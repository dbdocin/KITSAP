# KITSAP.work — Project Brief (Source of Truth)

> Save this file in the repository as `docs/BRIEF.md`. Every build phase reads it first. If a phase prompt and this brief disagree, this brief wins unless the phase prompt says otherwise explicitly.

---

## 1. What we are building

KITSAP is a premium video editing and post-production studio. **kitsap.work** is its V1 website: a marketing site with a portfolio and a working quote form that sends a real email.

**Conversion path — everything is built around this:**

VIEW WORK → UNDERSTAND SERVICES → TRUST KITSAP → START A PROJECT → EMAIL

**Out of scope for V1 (do not build, do not scaffold):** online video editor, timelines, AI editing or generation, user accounts, authentication, client dashboard, payments, subscriptions, marketplace, file upload system, project management, chat. Do not add abstractions "to prepare for" these.

---

## 2. Brand and voice

- **Positioning:** We turn raw footage into content worth watching.
- **Supporting line:** Professional video editing and creative services for creators, brands and businesses.
- **Short line:** You send the footage. We make it worth watching.

KITSAP should feel like an established post-production studio, not a freelancer or a SaaS product.

**Voice:** concise, confident, specific to video, editing and storytelling. Never use generic agency phrases such as "take your business to the next level", "unlock your potential", "passionate about excellence", or "your success is our success".

**CTA labels (use exactly these, everywhere):**

| Purpose | Label | Destination |
|---|---|---|
| Primary CTA | Start a Project → | `/contact` |
| Secondary CTA | View Our Work | `/work` |
| Form submit | Send Project Request → | — |

---

## 3. Design system

**Direction:** cinematic, minimal, dark, editorial. Strong typography does most of the visual work. Generous whitespace. Subtle, purposeful motion.

**Avoid:** template look, heavy gradients, rounded-card overload, glassmorphism, cartoon illustration, neon everywhere, SaaS dashboard styling, animating every element.

### Color tokens

| Token | Hex | Use |
|---|---|---|
| `bg` | #080808 | Page background |
| `bg-elevated` | #101010 | Alternate sections |
| `card` | #161616 | Cards, inputs |
| `border` | #262626 | Borders, dividers |
| `text` | #F5F5F5 | Primary text |
| `text-secondary` | #A1A1A1 | Body copy, descriptions |
| `text-muted` | #737373 | Meta, captions (large text or non-essential only — check contrast) |
| `accent` | #C8FF3D | Primary CTA, hover/active states, small highlights only |

Text on an `accent` background is `#080808`.

### Typography

- One family: **Geist**, loaded with `next/font`. Geist Mono is allowed for small numeric labels (01, 02…) only.
- Hero: very large, bold, tight line-height, fluid size with `clamp()`.
- Section headings: large, bold, uppercase.
- Body: comfortable size (16–18px), line-height ~1.6, max ~65ch.
- Labels: small, uppercase, letter-spaced, `text-secondary` or `accent`.

### Motion

Use the `motion` package (`import { motion } from "motion/react"`) only for: fade/fade-up reveals on scroll, staggered lists, hero text reveal. Use CSS transitions for hovers, buttons and the navbar. Keep durations short (150–600ms). Respect `prefers-reduced-motion` everywhere — reduced motion means no movement, only instant or opacity changes.

---

## 4. Tech stack

- **Next.js** latest stable, App Router, React Server Components by default; `"use client"` only where interaction requires it.
- **TypeScript** in strict mode.
- **Tailwind CSS v4** — CSS-first configuration with `@theme` in `globals.css`. Do not create a v3-style `tailwind.config.js`.
- **motion** for the limited animation listed above.
- **zod** for form validation (one schema shared by client and server).
- **resend** for email.
- No other runtime dependencies without a clear, stated reason.
- Deploy target: **Vercel**. `npm install`, `npm run dev`, `npm run build`, `npm run start` must all work.

---

## 5. Project structure

```
docs/
  BRIEF.md
public/
  placeholders/          # locally generated SVG placeholders only
src/
  app/
    layout.tsx
    page.tsx
    services/page.tsx
    work/page.tsx
    work/[slug]/page.tsx
    about/page.tsx
    process/page.tsx
    faq/page.tsx
    contact/page.tsx
    privacy/page.tsx
    terms/page.tsx
    api/quote/route.ts
    not-found.tsx
    error.tsx
    sitemap.ts
    robots.ts
    icon.svg
    opengraph-image.tsx
  components/
    layout/              # Navbar, MobileMenu, Footer
    sections/            # homepage and shared page sections
    portfolio/
    contact/
    ui/                  # Button, Container, Section, SectionLabel, Reveal, Accordion, etc.
  config/
    site.ts
  data/
    services.ts
    projects.ts
    testimonials.ts
    faqs.ts
    form-options.ts
  lib/
    email.ts
    validation.ts
    utils.ts
  types/
    index.ts
```

Keep components small and reusable. No page should be one giant component.

---

## 6. Site config and content flags

All business details and on/off switches live in `src/config/site.ts`. Components read from here — never hardcode contact details, social links or feature toggles.

```ts
export const siteConfig = {
  name: "KITSAP",
  domain: "kitsap.work",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kitsap.work",
  tagline: "Video Editing & Creative Services",
  contact: {
    email: "",        // PLACEHOLDER — public contact email, hidden if empty
    whatsapp: "",     // PLACEHOLDER — digits with country code, e.g. "91XXXXXXXXXX"; hidden if empty
  },
  social: {
    instagram: "",    // hidden if empty — never invent URLs
    youtube: "",
    linkedin: "",
  },
  media: {
    heroVideo: "",    // path under /public; if empty, hero uses the static cinematic background
    heroPoster: "/placeholders/hero.svg",
  },
  features: {
    testimonials: false,   // turn on only when real testimonials exist
    analytics: false,      // Vercel Analytics
  },
} as const;
```

Anything empty is **not rendered** — no empty icons, no `href="#"`.

---

## 7. Content and placeholder rules

- Never invent clients, testimonials, team names, awards, statistics, partnerships or social URLs.
- Placeholder projects are allowed but must be obviously generic (e.g. "Brand Film — Placeholder") and marked in code with `// PLACEHOLDER` plus `isPlaceholder: true`.
- **All placeholder media is local.** Generate simple SVG placeholders in `public/placeholders/` (dark frames, subtle grain or gradients, aspect-ratio variety, optional small "KITSAP" monogram). Do not use Unsplash, Pexels, picsum or any remote image host. Do not configure `remotePatterns`.
- Hero video renders only when `siteConfig.media.heroVideo` is set. Never autoplay video on mobile; always use a poster; lazy-load non-hero video.
- Replacing any content (projects, services, testimonials, FAQs, contact details) must require editing data/config files only, never component code.

---

## 8. Pages

| Route | Purpose |
|---|---|
| `/` | Main conversion page |
| `/services` | Detailed services |
| `/work` | Filterable portfolio |
| `/work/[slug]` | Project detail (statically generated) |
| `/about` | Studio philosophy |
| `/process` | Client journey |
| `/faq` | Full FAQ |
| `/contact` | Quote form |
| `/privacy`, `/terms` | Legal templates |
| 404, error | Branded fallbacks |

Every major page ends with the Final CTA section.

---

## 9. Copy deck

This is the only place copy is defined. Use it verbatim.

### Navbar
- Left: KITSAP wordmark (text-based until a real logo is supplied), links home.
- Links: Services · Work · About · Process · FAQ
- Right: **Start a Project →** (accent button)
- Behavior: transparent at top; on scroll adds `bg` at ~80% opacity, backdrop blur and a bottom `border`.
- Mobile: wordmark + menu button → full-screen overlay menu with large links and the primary CTA. Closes on link click and Escape, traps focus, locks body scroll.

### Homepage (in this order)

**1. Hero**
- Label: VIDEO EDITING · CREATIVE SERVICES
- H1: WE TURN RAW FOOTAGE / INTO CONTENT / WORTH WATCHING.
- Body: Professional video editing and creative services for creators, brands and businesses.
- Buttons: Start a Project → · View Our Work
- Background: `heroVideo` if configured, otherwise a static cinematic treatment (dark gradient, grain, subtle frame lines). Dark overlay for legibility. Subtle scroll indicator.

**2. Featured Work**
- Label: SELECTED WORK
- H2: WORK THAT SPEAKS.
- Body: From short-form social content to long-form productions, we turn raw footage into polished visual stories.
- Editorial grid of projects where `featured: true`, mixed aspect ratios on desktop, single column on mobile. Hover: image zoom, title/category reveal. Link: View all work → `/work`.

**3. Services**
- Label: SERVICES
- H2: WHAT WE DO
- Body: From a single video to ongoing content production, KITSAP provides professional post-production and creative services.
- Four numbered service rows or cards from `services.ts` (01–04), each linking to `/services#slug`.

**4. Why KITSAP**
- H2: MORE THAN JUST EDITING.
- Body: Good editing isn't just about cutting clips together. It's about understanding the story, the audience and the purpose behind every frame.
- Four points, typography-led, no icon grid:
  - **STORY FIRST** — We focus on narrative, pacing and clarity, not just effects.
  - **BUILT FOR ATTENTION** — Every cut, transition and visual element has a purpose.
  - **CONSISTENT QUALITY** — Professional editing standards across every project.
  - **EASY COLLABORATION** — Clear communication, structured feedback and straightforward revisions.

**5. Process**
- H2: FROM FOOTAGE TO FINAL CUT.
- Body: A simple process designed to keep your project moving.
- **01 BRIEF** — Tell us about your project, goals, style and requirements.
- **02 SEND** — After you submit your project request, we'll share the next steps for sending your footage, references and brand assets.
- **03 EDIT** — We transform your footage into polished content.
- **04 DELIVER** — Review the work, request revisions if needed, and receive your final files.

**6. Testimonials** — render only if `features.testimonials` is true.
- H2: WHAT CLIENTS SAY
- Quote, name, role/company from `testimonials.ts`.

**7. Who We Work With**
- H2: BUILT FOR PEOPLE WHO CREATE.
- Large typographic list with hover state:
  - CREATORS — YouTubers, influencers and content creators.
  - BRANDS — Companies building their online presence.
  - AGENCIES — White-label editing and post-production support.
  - BUSINESSES — Corporate and promotional video content.
  - PODCASTS — Video podcasts and short-form clips.
  - EVENTS — Event coverage and highlight films.

**8. FAQ preview** — first 5 FAQs, accordion, link: See all questions → `/faq`.

**9. Final CTA**
- H2: GOT FOOTAGE? / LET'S MAKE SOMETHING GREAT.
- Body: Send us your project and let's turn your raw footage into content worth watching.
- Buttons: Start a Project → · View Our Work

### Services (`services.ts` and `/services`)

`/services` H1: CREATIVE SERVICES BUILT AROUND YOUR CONTENT.
Each service section: visual, description, deliverables, typical use cases, **Start a Project →**. No pricing.

1. **VIDEO EDITING** (`video-editing`) — Turn raw footage into polished, engaging videos with professional pacing, transitions, sound design and color treatment. Includes: YouTube videos, long-form content, corporate videos, promotional videos, event videos.
2. **REELS & SHORT-FORM** (`short-form`) — Short-form content designed to capture attention quickly and keep viewers watching. Includes: Instagram Reels, YouTube Shorts, vertical videos, social clips, repurposed content.
3. **PODCAST EDITING** (`podcast-editing`) — Turn long conversations into polished episodes and engaging short-form clips. Includes: video podcast editing, audio cleanup, multi-camera editing, captions, social clips.
4. **CREATIVE & MOTION** (`creative-motion`) — The visual details that make your content feel professional and memorable. Includes: motion graphics, text animation, captions, color correction, sound design, intros/outros, thumbnail design.

### Work
- `/work` H1: SELECTED WORK — Sub: A selection of projects crafted by KITSAP.
- Filters: All · YouTube · Reels · Commercial · Corporate · Podcast · Events (accessible buttons with `aria-pressed`; filter state reflected in URL `?category=`).
- `/work/[slug]`: hero media, title, category, client (if set), year (if set), description, services provided, deliverables, gallery, video embed if set, 2–3 related projects (same category first), Final CTA. Unknown slug → 404.

### About (`/about`)
- H1: WE'RE KITSAP.
- Intro: KITSAP is a creative post-production studio focused on turning ideas and raw footage into content people want to watch. We combine thoughtful storytelling, precise editing and modern visual design to help creators and businesses communicate better through video.
- Short sections: Philosophy · Approach · Quality · Collaboration (write 2–3 sentences each in the brand voice; no invented facts or numbers).
- Team: a clearly marked placeholder block, hidden in production unless populated.

### Process (`/process`)
- H1: HOW WE WORK
- 01 Tell us what you're making. · 02 Share your footage and references. · 03 We edit and refine. · 04 You review. · 05 We finalize and deliver. (One or two supporting sentences each.)
- CTA: Start a Project →

### FAQ (`/faq`)
H1: FREQUENTLY ASKED QUESTIONS. Questions (write concise, honest answers; where a policy isn't decided — turnaround, revision count — give a general answer and mark the entry `// PLACEHOLDER`):
1. What types of videos do you edit?
2. Can you edit both short-form and long-form videos?
3. How do I send my footage?
4. How long does an edit take?
5. How many revisions are included?
6. Can you follow a specific editing style?
7. Can you work with my brand guidelines?
8. Do you offer ongoing monthly editing?
9. Do you offer bulk content packages?
10. Can you turn podcasts into short clips?

### Contact (`/contact`)
- H1: START A PROJECT
- Body: Tell us what you're creating, what you need and when you need it. We'll get back to you with the next steps.
- Form spec is in Phase 3.

### 404
- H1: PAGE NOT FOUND — Body: Looks like this frame got lost. — Button: Back to Home →

### Footer
- KITSAP · Video Editing & Creative Services
- Links: Services · Work · About · Process · FAQ · Contact
- Social icons and contact details only if set in `siteConfig`.
- Legal: Privacy Policy · Terms of Service
- © {current year} KITSAP. All rights reserved.

---

## 10. Data types

```ts
export type ProjectCategory =
  | "YouTube" | "Reels" | "Commercial" | "Corporate" | "Podcast" | "Events";

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  client?: string;
  year?: string;
  description: string;
  thumbnail: string;
  aspect: "landscape" | "portrait" | "square"; // drives grid rhythm
  heroMedia?: string;
  videoUrl?: string;     // YouTube/Vimeo embed URL
  gallery?: string[];
  services: string[];
  deliverables: string[];
  featured: boolean;
  isPlaceholder?: boolean;
}

export interface Service {
  slug: string;
  number: string;        // "01"
  title: string;
  shortDescription: string;
  description: string;
  includes: string[];
  deliverables: string[];
  useCases: string[];
  image: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  isPlaceholder?: boolean;
}

export interface Faq {
  question: string;
  answer: string;
}
```

---

## 11. Quality bar (applies to every phase)

- **Accessibility:** semantic HTML, one `<h1>` per page, visible focus rings (accent outline), keyboard-operable everything, labelled form fields, `aria-live` for form status, accessible accordion (button + `aria-expanded` + region), alt text on all meaningful images, never rely on color alone. Check contrast of `text-muted` — use it only where it passes.
- **Responsive:** flawless at 375, 390, 430, 768, 1024, 1280, 1440, 1920px. No horizontal scroll. Tap targets ≥ 44px.
- **Performance:** server components by default, `next/image` for images, `next/font` for fonts, lazy-loaded media, no large autoplay video on mobile, minimal client JS.
- **Security:** no secrets in client code, server-side validation and sanitization, HTML-escape all user input placed in emails.
- **Code:** strict TypeScript, no `any`, no unused imports, no console errors, no dead links, no fake functionality.
