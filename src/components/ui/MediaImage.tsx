"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface MediaImageProps {
  src?: string;
  /** Empty string marks the image as decorative. */
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}

/**
 * Fills its (relatively positioned) parent. If the source is missing or fails
 * to load, a neutral placeholder frame is shown instead of a broken image.
 */
export function MediaImage({ src, alt, sizes, priority, className }: MediaImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src || failedSrc === src) {
    return <FallbackFrame alt={alt} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailedSrc(src)}
      className={cn("object-cover", className)}
    />
  );
}

function FallbackFrame({ alt }: { alt: string }) {
  return (
    <div
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      className="absolute inset-0 flex items-end bg-card"
    >
      <div className="pointer-events-none absolute inset-3 border border-text/10" />
      <span className="relative m-6 text-[0.6875rem] font-bold tracking-[0.3em] text-text/30">
        KITSAP
      </span>
    </div>
  );
}
