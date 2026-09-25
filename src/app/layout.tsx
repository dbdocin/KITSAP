import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { siteConfig } from "@/config/site";
import { HOME_DESCRIPTION, SHARE_DESCRIPTION, SHARE_TITLE, absoluteUrl } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// Used for small numeric labels (01, 02…) only.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: SHARE_TITLE,
    template: `%s — ${siteConfig.name}`,
  },
  description: HOME_DESCRIPTION,
  // Fallbacks for routes that don't set their own (each page sets these in full).
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_US",
    title: SHARE_TITLE,
    description: SHARE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SHARE_TITLE,
    description: SHARE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
};

/** Organization structured data. Social links appear only when set; no address or phone is invented. */
function organizationJsonLd() {
  const sameAs = Object.values(siteConfig.social).filter((url) => url.length > 0);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    // PLACEHOLDER — points at the placeholder icon until the real logo arrives.
    logo: absoluteUrl("/icon.svg"),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // `<` is escaped so the JSON can never close the script tag early.
  const jsonLd = JSON.stringify(organizationJsonLd()).replace(/</g, "\\u003c");

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-accent focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:uppercase focus:tracking-wide focus:text-bg"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
        {/* Off by default. Vercel Analytics sets no cookies and tracks nothing else. */}
        {siteConfig.features.analytics && <Analytics />}
      </body>
    </html>
  );
}
