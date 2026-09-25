import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/** Default share copy (Brief / Phase 4). Pages without their own copy fall back to this. */
export const SHARE_TITLE = "KITSAP.work — Video Editing & Creative Services";
export const SHARE_DESCRIPTION = "We turn raw footage into content worth watching.";

/** Homepage search-result copy. */
export const HOME_TITLE = "KITSAP.work — Professional Video Editing & Creative Services";
export const HOME_DESCRIPTION =
  "KITSAP provides professional video editing, short-form content, podcast editing, motion graphics and creative services for creators, brands and businesses.";

interface PageMetadataInput {
  /** Shown as "<title> — KITSAP" via the root title template. */
  title: string;
  /** Use instead of `title` to bypass the template (homepage). */
  absoluteTitle?: string;
  description: string;
  /** Path of the page, starting with "/". Drives the canonical URL and og:url. */
  path: string;
  /** Share-image routes for this page. Defaults to the site-wide card. */
  image?: { openGraph: string; twitter: string };
}

const DEFAULT_IMAGE = { openGraph: "/opengraph-image", twitter: "/twitter-image" };
const IMAGE_SIZE = { width: 1200, height: 630 };

/**
 * Metadata for one page: title, description, canonical, Open Graph and Twitter.
 *
 * Next.js replaces (does not merge) the `openGraph` and `twitter` objects, and a
 * child page that sets them loses its parent's file-based share image. So the
 * image routes are referenced explicitly here.
 */
export function pageMetadata({
  title,
  absoluteTitle,
  description,
  path,
  image = DEFAULT_IMAGE,
}: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ?? `${title} — ${siteConfig.name}`;

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: "en_US",
      url: path,
      title: fullTitle,
      description,
      images: [{ url: image.openGraph, ...IMAGE_SIZE, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.twitter],
    },
  };
}

/** Absolute URL for a site path. */
export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
}
