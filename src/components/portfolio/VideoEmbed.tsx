"use client";

import { useState } from "react";
import { MediaImage } from "@/components/ui/MediaImage";

interface VideoEmbedProps {
  /** Validated YouTube/Vimeo embed URL (see getEmbedUrl). */
  src: string;
  title: string;
  /** Poster shown until the visitor presses play. */
  poster?: string;
}

/**
 * Click-to-play facade: no third-party video code loads until the visitor asks
 * for it, which keeps pages light and stops anything autoplaying on mobile.
 */
export function VideoEmbed({ src, title, poster }: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    const url = new URL(src);
    url.searchParams.set("autoplay", "1");

    return (
      <iframe
        src={url.toString()}
        title={`${title} — video`}
        allow="autoplay; accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 h-full w-full border-0"
      />
    );
  }

  return (
    <>
      <MediaImage src={poster} alt="" sizes="(min-width: 1024px) 55vw, 100vw" />
      <div aria-hidden="true" className="absolute inset-0 bg-bg/40" />
      <button
        type="button"
        onClick={() => setPlaying(true)}
        aria-label={`Play video: ${title}`}
        className="group absolute inset-0 flex items-center justify-center"
      >
        <span className="flex h-20 w-20 items-center justify-center bg-accent text-bg transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
          <svg aria-hidden="true" viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </button>
    </>
  );
}
