"use client";

import { useSyncExternalStore } from "react";

interface HeroVideoProps {
  src: string;
  poster: string;
}

// Video only loads on md+ screens and never for reduced-motion users.
const QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;
const getServerSnapshot = () => false;

export function HeroVideo({ src, poster }: HeroVideoProps) {
  const canPlay = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!canPlay) return null;

  return (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}
