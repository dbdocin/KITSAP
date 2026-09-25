import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "KITSAP — We turn raw footage into content worth watching.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function TwitterImage() {
  return renderOgImage();
}
