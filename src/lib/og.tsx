import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/lib/projects";

/** Share-image dimensions (Open Graph / Twitter large card). */
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

const COLORS = { bg: "#080808", text: "#F5F5F5", muted: "#A1A1A1", accent: "#C8FF3D" };

interface OgImageInput {
  /** Extra line shown above the tagline, e.g. a project's title. Omit for the default card. */
  title?: string;
  /** Small label above the title, e.g. the project category. */
  eyebrow?: string;
}

/**
 * The share image: large KITSAP wordmark, the positioning line and a small accent
 * detail. Text only, so it needs no external fonts or images.
 * PLACEHOLDER — the wordmark is text until the real logo arrives (see README).
 */
export async function renderOgImage({ title, eyebrow }: OgImageInput = {}) {
  // next/og ships Geist Regular only; the wordmark and titles use Geist Bold
  // (SIL OFL — see src/assets/fonts/LICENSE-Geist-OFL.txt).
  const geistBold = await readFile(join(process.cwd(), "src/assets/fonts/Geist-Bold.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: COLORS.bg,
          color: COLORS.text,
          padding: "72px 80px",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 56, height: 8, background: COLORS.accent }} />
          <div
            style={{
              fontSize: 26,
              letterSpacing: "0.3em",
              color: COLORS.muted,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            {eyebrow ?? "Video Editing · Creative Services"}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {title ? (
            <div
              style={{
                display: "flex",
                fontSize: title.length > 40 ? 68 : 84,
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                maxWidth: 1040,
              }}
            >
              {title}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                fontSize: 176,
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "0.14em",
              }}
            >
              KITSAP
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 34, color: COLORS.muted }}>
            We turn raw footage into content worth watching.
          </div>
          {title ? (
            <div
              style={{
                display: "flex",
                fontSize: 30,
                fontWeight: 700,
                letterSpacing: "0.3em",
              }}
            >
              KITSAP
            </div>
          ) : null}
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: [{ name: "Geist", data: geistBold, weight: 700, style: "normal" }] },
  );
}

/** Share card for a project (its title and category), or the default card for an unknown slug. */
export async function renderProjectOgImage(slug: string) {
  const project = getProjectBySlug(slug);
  return project
    ? renderOgImage({ title: project.title, eyebrow: `${project.category} · Selected work` })
    : renderOgImage();
}
