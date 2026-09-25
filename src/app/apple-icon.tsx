import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * PLACEHOLDER — typographic "K" until the real logo arrives (see README:
 * "Replacing the logo"). Same mark as src/app/icon.svg, drawn at 180×180.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#080808" }}>
        <svg width="180" height="180" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke="#F5F5F5" strokeWidth="3.4" strokeLinecap="butt">
            <path d="M10.5 7v18" />
            <path d="M10.5 17.5 20.5 7" />
            <path d="M14.5 15 21.5 25" />
          </g>
          <rect x="23.5" y="22" width="3.5" height="3.5" fill="#C8FF3D" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
