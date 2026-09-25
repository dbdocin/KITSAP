"use client";

import { MotionConfig, motion } from "motion/react";

interface HeroHeadingProps {
  id?: string;
  lines: readonly string[];
}

/** The page H1 with a staggered line reveal. Reduced motion skips the movement. */
export function HeroHeading({ id, lines }: HeroHeadingProps) {
  return (
    <MotionConfig reducedMotion="user">
      <h1 id={id} className="mt-6 text-hero uppercase">
        {lines.map((line, index) => (
          <span key={line} className="block overflow-hidden pb-[0.06em]">
            <motion.span
              className="block"
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>
    </MotionConfig>
  );
}
