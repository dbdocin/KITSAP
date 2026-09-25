# KITSAP — kitsap.work

Website for KITSAP, a premium video editing and post-production studio: a marketing site with a portfolio and a quote form that sends a real email.

**Stack:** Next.js (App Router) · TypeScript (strict) · Tailwind CSS v4 · `motion` · `zod` · Resend. Deploys to Vercel.

The full specification is in [`docs/BRIEF.md`](docs/BRIEF.md).

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev                  # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## Editing content

Content lives in data and config files, never in components:

| To change… | Edit |
|---|---|
| Contact email, WhatsApp, social links, feature flags, hero video | `src/config/site.ts` |
| Projects (portfolio) | `src/data/projects.ts` |
| Services | `src/data/services.ts` |
| FAQs | `src/data/faqs.ts` |
| Testimonials (shown only when `features.testimonials` is `true`) | `src/data/testimonials.ts` |
| Team members (About page, hidden in production while empty) | `src/data/team.ts` |
| Quote form dropdown options | `src/data/form-options.ts` |

Anything left empty in `siteConfig` is simply not rendered. Placeholder images are local SVGs in `public/placeholders/` (regenerate with `node scripts/generate-placeholders.mjs`).

## Environment variables

Defined in [`.env.example`](.env.example). Copy it to `.env.local` locally, and set the same variables in Vercel.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public URL of the site |
| `CONTACT_EMAIL` | Where quote requests are delivered |
| `EMAIL_FROM` | Sender address, e.g. `KITSAP <hello@kitsap.work>` — must be on a domain verified in Resend |
| `RESEND_API_KEY` | Resend API key. Server-side only — never give it a `NEXT_PUBLIC_` prefix |
| `SEND_CONFIRMATION_EMAIL` | `true` to also send the visitor a short "we received your request" email (default `false`) |

## Email setup (Resend)

The quote form posts to `/api/quote`, which sends the request to you by email using [Resend](https://resend.com). **Without a verified domain, emails will fail or land in spam**, so don't skip steps 2 and 3.

1. **Create a Resend account** at resend.com.
2. **Add and verify your domain.** In Resend go to *Domains → Add Domain* and enter `kitsap.work`.
3. **Add the DNS records Resend gives you** at your domain registrar (or DNS host): the **SPF** and **DKIM** records it lists, plus a **DMARC** record (recommended), for example a `TXT` record on `_dmarc.kitsap.work` with the value `v=DMARC1; p=none;`. Wait for Resend to show the domain as *Verified* (this can take from a few minutes to a few hours).
4. **Create an API key** in Resend (*API Keys → Create API Key*, "Sending access" is enough). Copy it — it is shown once.
5. **Set the environment variables**:
   - Locally: put them in `.env.local`.
   - On Vercel: *Project → Settings → Environment Variables*, add `CONTACT_EMAIL`, `EMAIL_FROM`, `RESEND_API_KEY` (and optionally `SEND_CONFIRMATION_EMAIL`) for the Production environment, then **redeploy** so they take effect.
6. **Send a test request.** Open `/contact`, fill in the form, submit it, and confirm the email arrives at `CONTACT_EMAIL`. Hit *Reply* and check it is addressed to the person who filled in the form.

`EMAIL_FROM` must use the verified domain (e.g. `hello@kitsap.work`).

### Working without a key in development

If `RESEND_API_KEY` is not set while running `npm run dev`, the server prints the formatted email to the terminal and the form still reports success, so you can build and test without sending anything. In production, missing configuration returns an error to the visitor and logs a clear message naming the missing variables in your Vercel function logs.

### How the form is protected

- One shared `zod` schema (`src/lib/validation.ts`) validates on the client and again on the server, with a length limit on every field.
- Request bodies over ~20 KB are rejected, and only `application/json` is accepted.
- A hidden **honeypot** field and a **minimum fill time** (3 seconds) silently drop most bots: they receive a normal success response and nothing is sent.
- Every user-provided value is HTML-escaped in the email, and links are shown as plain text.
- The optional confirmation email contains no user-provided text.
- Provider errors are logged on the server and never returned to the browser.

### Rate limiting (optional, if spam becomes a problem)

The API route deliberately has **no in-memory rate limiting**: on Vercel serverless every request may run in a fresh instance, so counters in memory don't work. If you start getting spam, add a shared store such as [Upstash Redis](https://upstash.com):

1. Create a free Upstash Redis database and add its `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to `.env.local` and Vercel.
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

## Deploying to Vercel

1. Import the repository in Vercel (framework preset: Next.js — no build settings needed).
2. Add the environment variables above.
3. Deploy, then add `kitsap.work` under *Project → Settings → Domains*.

## Before launch

- Fill in the contact details and social links in `src/config/site.ts`.
- Replace the placeholder projects, and add real testimonials before turning that flag on.
- Have the Privacy Policy and Terms of Service templates reviewed by a professional (including against India's DPDP Act).
- Resolve the `// PLACEHOLDER` and `// DECIDE` comments in `src/data/`.
