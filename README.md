# KITSAP — kitsap.work

The V1 website for **KITSAP**, a premium video editing and post-production studio.

**Stack:** Next.js (App Router) · TypeScript (strict) · Tailwind CSS v4 · `motion` · `zod` · Resend · deploys to Vercel.

The full specification lives in [`docs/BRIEF.md`](docs/BRIEF.md).

## What V1 is (and isn't)

A marketing site built around one path: **view work → understand services → trust KITSAP → start a project → email.**

**Included:** home, services, filterable portfolio with project pages, about, process, FAQ, a quote form that sends a real email, privacy and terms templates, SEO (metadata, share images, sitemap, robots, structured data), optional cookie-free analytics.

**Not in V1 (deliberately):** online editor, AI tools, accounts or login, client dashboard, payments, file uploads, chat.

## Commands

```bash
npm install
cp .env.example .env.local   # then fill it in (see "Environment variables")
npm run dev                  # http://localhost:3000
npm run build                # production build
npm run start                # serve the production build
npm run lint                 # ESLint
```

Requires Node.js 20.9 or newer.

## Environment variables

Listed in [`.env.example`](.env.example). Locally they go in `.env.local`; on Vercel they go under *Project → Settings → Environment Variables*. `.env*` files are git-ignored (only `.env.example` is committed).

| Variable | What it does |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | The public URL (`https://kitsap.work`). Used for canonical URLs, share images, the sitemap and structured data |
| `CONTACT_EMAIL` | Where quote requests are delivered |
| `EMAIL_FROM` | Sender address, e.g. `KITSAP <hello@kitsap.work>`. Must be on a domain verified in Resend |
| `RESEND_API_KEY` | Resend API key. Server-side only — never give it a `NEXT_PUBLIC_` prefix |
| `SEND_CONFIRMATION_EMAIL` | `true` also emails the visitor a short "we received your request" note (no user-provided text in it). Default `false` |

## Email setup (Resend)

The quote form posts to `/api/quote`, which emails the request to you through [Resend](https://resend.com). **Without a verified domain, emails will fail or land in spam**, so don't skip steps 2 and 3.

1. **Create a Resend account** at resend.com.
2. **Add and verify your domain.** In Resend: *Domains → Add Domain* → `kitsap.work`.
3. **Add the DNS records Resend gives you** at your domain registrar or DNS host: the **SPF** and **DKIM** records it lists, plus a **DMARC** record (recommended), e.g. a `TXT` record on `_dmarc.kitsap.work` with the value `v=DMARC1; p=none;`. Wait until Resend shows the domain as *Verified* (minutes to a few hours).
4. **Create an API key** (*API Keys → Create API Key*; "Sending access" is enough). Copy it — it is shown once.
5. **Set the environment variables:** locally in `.env.local`; on Vercel add `CONTACT_EMAIL`, `EMAIL_FROM`, `RESEND_API_KEY` (and optionally `SEND_CONFIRMATION_EMAIL`) for the **Production** environment, then **redeploy** so they take effect.
6. **Send a test request** from `/contact`. Confirm the email arrives at `CONTACT_EMAIL`, then press *Reply* and check it is addressed to the person who filled in the form.

`EMAIL_FROM` must use the verified domain (e.g. `hello@kitsap.work`).

**Developing without a key:** if `RESEND_API_KEY` is not set while running `npm run dev`, the server prints the formatted email to the terminal and the form still reports success. In production, missing configuration returns an error to the visitor and logs which variables are missing in your Vercel function logs.

**How the form is protected:** one shared `zod` schema validates in the browser and again on the server (with a length limit on every field); bodies over ~20 KB and non-JSON requests are rejected; a hidden honeypot field and a 3-second minimum fill time silently drop most bots (they get a normal success response and nothing is sent); every user-provided value is HTML-escaped in the email; provider errors are logged on the server and never shown to visitors.

### Rate limiting (optional, if spam becomes a problem)

The route has **no in-memory rate limiting** on purpose: on Vercel serverless each request may run in a fresh instance, so in-memory counters don't work. If spam appears, add a shared store such as [Upstash Redis](https://upstash.com):

1. Create a free Upstash Redis database and add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to `.env.local` and Vercel.
2. `npm install @upstash/ratelimit @upstash/redis`
3. In `src/app/api/quote/route.ts`, at the spot marked `EXTENSION POINT — rate limiting`, add:

```ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "10 m"), // 5 requests per IP per 10 minutes
});

// inside POST, at the extension point:
const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
const { success } = await ratelimit.limit(ip);
if (!success) return jsonError(429, "Too many requests. Please try again later.");
```

## Content editing guide

Content lives in data and config files. **You should never need to edit a component to change content.**

| To change… | Edit |
|---|---|
| Contact email, WhatsApp, social links, hero video, feature flags | `src/config/site.ts` |
| Portfolio projects | `src/data/projects.ts` |
| Services | `src/data/services.ts` |
| FAQs | `src/data/faqs.ts` |
| Testimonials | `src/data/testimonials.ts` |
| Team members (About page) | `src/data/team.ts` |
| Quote form dropdown options (services, budget, timeline…) | `src/data/form-options.ts` |
| Navigation and footer links | `src/config/navigation.ts` |

### Contact details and social links

In `src/config/site.ts`, fill in `contact.email`, `contact.whatsapp` (digits with country code, e.g. `"91XXXXXXXXXX"`) and any of `social.instagram`, `social.youtube`, `social.linkedin`. **Anything left empty is simply not rendered** — no empty icons or dead links. Social links also feed the `sameAs` field in the site's structured data.

### Feature flags (`siteConfig.features`)

- `testimonials` — set `true` only once `src/data/testimonials.ts` holds **real, permissioned** testimonials. While `false`, the section doesn't render.
- `analytics` — set `true` to render Vercel Analytics (cookie-free, tracks nothing else). Also enable Analytics in your Vercel project. The Privacy Policy text follows this flag.

### Hero video

Put the file in `public/` and set `siteConfig.media.heroVideo` to its path (e.g. `"/hero.mp4"`). It plays muted and looping on tablet and desktop only; phones and reduced-motion users see the poster (`siteConfig.media.heroPoster`). Leave it empty to use the static cinematic background.

### Projects: replacing the placeholders

The eight projects in `src/data/projects.ts` are placeholders (`isPlaceholder: true`, plus a `// PLACEHOLDER` comment).

1. Add your images to `public/` (e.g. `public/work/brand-film.jpg`). Use local files — the site is configured without remote image hosts.
2. Replace an entry's fields: `title`, `slug` (the URL), `category`, `client`, `year`, `description`, `thumbnail` (`"/work/brand-film.jpg"`), `aspect` (`landscape`, `portrait` or `square` — this drives the grid layout), `services`, `deliverables`.
3. Optional: `heroMedia` (larger image), `gallery` (list of images), `videoUrl` (a YouTube or Vimeo **embed** URL, e.g. `https://www.youtube.com/embed/VIDEO_ID` — it loads only when a visitor presses play).
4. Set `featured: true` on the projects to show on the homepage.
5. **Delete `isPlaceholder: true` and the `// PLACEHOLDER` comment** from each entry you've replaced. Remove any placeholder entries you don't need. Slugs must be unique.

If a thumbnail path is wrong, the site shows a neutral frame instead of a broken image.

### Services, FAQs, testimonials, team

Edit the arrays in the matching file. FAQ entries marked `// PLACEHOLDER` contain general wording where a policy (turnaround, revisions, monthly work, bulk packages) hasn't been decided — replace them with your real policy. `src/data/team.ts` is empty; the About page hides the team block in production until you add real people.

## Replacing the logo, favicon and share image

Everything below is currently a **placeholder** (a text wordmark and a typographic "K"):

- **Wordmark (navbar, mobile menu, footer):** the text is `siteConfig.name`, rendered in `src/components/layout/Navbar.tsx`, `MobileMenu.tsx` and `Footer.tsx`. To use a logo image, add it to `public/` and swap the text for a `next/image` `<Image>` with an `alt` of "KITSAP" in those three files.
- **Favicon:** replace `src/app/icon.svg` with your logo (SVG, or `icon.png`/`favicon.ico`). Keep it legible at 16px.
- **Apple touch icon:** `src/app/apple-icon.tsx` draws a 180×180 placeholder. To use your own, delete that file and add `src/app/apple-icon.png` (180×180).
- **Share image (Open Graph / Twitter):** `src/lib/og.tsx` draws the 1200×630 card (bold KITSAP wordmark and the positioning line). Edit that file to change the design, or delete `src/app/opengraph-image.tsx` and `src/app/twitter-image.tsx` and add `opengraph-image.png` / `twitter-image.png` (1200×630) in `src/app/`. Project pages have their own generated cards in `src/app/work/[slug]/`.
- **Structured-data logo:** `organizationJsonLd()` in `src/app/layout.tsx` points at `/icon.svg` — change it to your real logo path in `public/`.

## Deploying to Vercel

1. **Push the repository to GitHub** (already done for this project).
2. In Vercel, **Add New → Project**, import the repository. The framework preset is detected as Next.js; no build settings are needed.
3. Before deploying, open **Environment Variables** and add the five variables from the table above (`NEXT_PUBLIC_SITE_URL=https://kitsap.work`, `CONTACT_EMAIL`, `EMAIL_FROM`, `RESEND_API_KEY`, `SEND_CONFIRMATION_EMAIL`) for **Production**.
4. Click **Deploy**. Open the `*.vercel.app` URL and check the site and the contact form.
5. **Connect the domain:** *Project → Settings → Domains → Add* `kitsap.work`, then add `www.kitsap.work` as well.
6. **Set the redirect:** for `www.kitsap.work`, choose *Redirect to `kitsap.work`* (307/308) so the apex domain is the canonical address. (`NEXT_PUBLIC_SITE_URL` should be the apex URL.)
7. **Add the DNS records** at your registrar. Vercel shows the exact values for your project on the Domains page — use those if they differ. The standard records are:

| Type | Name / Host | Value |
|---|---|---|
| `A` | `@` (apex, `kitsap.work`) | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

   Remove any conflicting existing `A`/`AAAA`/`CNAME` records for `@` and `www`. DNS changes can take from minutes to a few hours; Vercel issues the HTTPS certificate automatically once they resolve. (Alternatively, point your registrar's nameservers at Vercel and it manages the records for you.)
8. The **Resend DNS records** (SPF, DKIM, DMARC) are separate and live alongside these — see "Email setup".
9. After the domain is live, submit `https://kitsap.work/sitemap.xml` in Google Search Console.

## Pre-launch checklist

- [ ] Real **logo** in place (wordmark, favicon, apple icon, share image, structured-data logo)
- [ ] Real **portfolio / showreel** replacing the placeholder projects (and `isPlaceholder` entries removed)
- [ ] **Contact email** (and WhatsApp / social links, if used) set in `src/config/site.ts`
- [ ] **Resend domain verified** and a test quote request received, with working reply-to
- [ ] `NEXT_PUBLIC_SITE_URL` set to `https://kitsap.work` on Vercel
- [ ] **Privacy Policy and Terms** reviewed by a professional (including against India's DPDP Act) and every `[bracketed]` item resolved
- [ ] **Currency decided** for the budget options (`// DECIDE` in `src/data/form-options.ts`)
- [ ] FAQ policies (`// PLACEHOLDER` in `src/data/faqs.ts`) replaced with your real answers
- [ ] **Testimonials flag** on only if real testimonials exist
- [ ] Domain connected with the `www` → apex redirect, HTTPS working

## Project structure

```
docs/BRIEF.md              Project specification
public/placeholders/       Local SVG placeholder images (regenerate: node scripts/generate-placeholders.mjs)
src/app/                   Routes, metadata, sitemap, robots, icons, share images, /api/quote
src/components/            layout · sections · portfolio · contact · ui
src/config/                site.ts (business details, flags) · navigation.ts
src/data/                  All editable content
src/lib/                   validation (zod) · email (Resend) · seo · og · projects · utils
src/assets/fonts/          Geist Bold for share images (SIL OFL licence included)
```
