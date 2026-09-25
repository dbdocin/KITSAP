// Generates local SVG placeholders into public/placeholders/.
// Run with: node scripts/generate-placeholders.mjs
// Dark, cinematic and subtle: gradient glow, film grain, frame lines and a
// tiny KITSAP mark. No text other than the mark. No remote assets.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "placeholders");
mkdirSync(outDir, { recursive: true });

function svg({ id, w, h, glowX, glowY, glowR, glowOpacity, tint, grain, seed }) {
  const inset = Math.round(Math.min(w, h) * 0.05);
  const tick = Math.round(Math.min(w, h) * 0.035);
  const markSize = Math.max(11, Math.round(Math.min(w, h) * 0.014));
  const x1 = inset;
  const y1 = inset;
  const x2 = w - inset;
  const y2 = h - inset;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="Placeholder frame">
  <defs>
    <radialGradient id="glow-${id}" cx="${glowX}" cy="${glowY}" r="${glowR}" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="${tint}" stop-opacity="${glowOpacity}"/>
      <stop offset="1" stop-color="${tint}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="fade-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#080808" stop-opacity="0"/>
      <stop offset="1" stop-color="#080808" stop-opacity="0.75"/>
    </linearGradient>
    <filter id="grain-${id}" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${seed}" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
  </defs>
  <rect width="${w}" height="${h}" fill="#0d0d0d"/>
  <rect width="${w}" height="${h}" fill="url(#glow-${id})"/>
  <rect width="${w}" height="${h}" fill="url(#fade-${id})"/>
  <rect width="${w}" height="${h}" filter="url(#grain-${id})" opacity="${grain}"/>
  <g fill="none" stroke="#f5f5f5" stroke-opacity="0.12" stroke-width="1">
    <rect x="${x1}" y="${y1}" width="${x2 - x1}" height="${y2 - y1}"/>
    <line x1="${w / 3}" y1="${y1}" x2="${w / 3}" y2="${y2}" stroke-opacity="0.05"/>
    <line x1="${(w * 2) / 3}" y1="${y1}" x2="${(w * 2) / 3}" y2="${y2}" stroke-opacity="0.05"/>
    <line x1="${x1}" y1="${h / 3}" x2="${x2}" y2="${h / 3}" stroke-opacity="0.05"/>
    <line x1="${x1}" y1="${(h * 2) / 3}" x2="${x2}" y2="${(h * 2) / 3}" stroke-opacity="0.05"/>
  </g>
  <g stroke="#f5f5f5" stroke-opacity="0.35" stroke-width="1.5" fill="none">
    <path d="M${x1} ${y1 + tick}V${y1}H${x1 + tick}"/>
    <path d="M${x2 - tick} ${y1}H${x2}V${y1 + tick}"/>
    <path d="M${x1} ${y2 - tick}V${y2}H${x1 + tick}"/>
    <path d="M${x2 - tick} ${y2}H${x2}V${y2 - tick}"/>
  </g>
  <text x="${x1 + tick + 10}" y="${y2 - 6}" fill="#f5f5f5" fill-opacity="0.3" font-family="Arial, Helvetica, sans-serif" font-size="${markSize}" font-weight="700" letter-spacing="${(markSize * 0.35).toFixed(1)}">KITSAP</text>
</svg>
`;
}

const tints = ["#c8ff3d", "#8a8a8a", "#b9d6ff", "#ffffff"];

const files = [
  { name: "hero", w: 1920, h: 1080, glowX: 0.72, glowY: 0.3, glowR: 0.7, glowOpacity: 0.16, tint: tints[0], grain: 0.1, seed: 3 },

  { name: "service-video-editing", w: 1200, h: 900, glowX: 0.3, glowY: 0.35, glowR: 0.75, glowOpacity: 0.14, tint: tints[0], grain: 0.1, seed: 11 },
  { name: "service-short-form", w: 1200, h: 900, glowX: 0.7, glowY: 0.4, glowR: 0.7, glowOpacity: 0.12, tint: tints[2], grain: 0.1, seed: 12 },
  { name: "service-podcast-editing", w: 1200, h: 900, glowX: 0.5, glowY: 0.65, glowR: 0.8, glowOpacity: 0.11, tint: tints[1], grain: 0.1, seed: 13 },
  { name: "service-creative-motion", w: 1200, h: 900, glowX: 0.25, glowY: 0.7, glowR: 0.7, glowOpacity: 0.14, tint: tints[0], grain: 0.1, seed: 14 },

  { name: "project-landscape-1", w: 1600, h: 900, glowX: 0.3, glowY: 0.4, glowR: 0.75, glowOpacity: 0.15, tint: tints[0], grain: 0.11, seed: 21 },
  { name: "project-landscape-2", w: 1600, h: 900, glowX: 0.75, glowY: 0.35, glowR: 0.7, glowOpacity: 0.12, tint: tints[2], grain: 0.11, seed: 22 },
  { name: "project-landscape-3", w: 1600, h: 900, glowX: 0.5, glowY: 0.7, glowR: 0.8, glowOpacity: 0.11, tint: tints[1], grain: 0.11, seed: 23 },

  { name: "project-portrait-1", w: 900, h: 1600, glowX: 0.5, glowY: 0.3, glowR: 0.8, glowOpacity: 0.15, tint: tints[0], grain: 0.11, seed: 31 },
  { name: "project-portrait-2", w: 900, h: 1600, glowX: 0.3, glowY: 0.6, glowR: 0.75, glowOpacity: 0.12, tint: tints[2], grain: 0.11, seed: 32 },
  { name: "project-portrait-3", w: 900, h: 1600, glowX: 0.7, glowY: 0.45, glowR: 0.8, glowOpacity: 0.11, tint: tints[3], grain: 0.11, seed: 33 },

  { name: "project-square-1", w: 1200, h: 1200, glowX: 0.6, glowY: 0.35, glowR: 0.75, glowOpacity: 0.14, tint: tints[0], grain: 0.11, seed: 41 },
  { name: "project-square-2", w: 1200, h: 1200, glowX: 0.35, glowY: 0.6, glowR: 0.75, glowOpacity: 0.12, tint: tints[1], grain: 0.11, seed: 42 },
];

for (const { name, ...rest } of files) {
  writeFileSync(join(outDir, `${name}.svg`), svg({ id: name.replace(/[^a-z0-9]/gi, ""), ...rest }));
}

console.log(`Wrote ${files.length} placeholders to ${outDir}`);
