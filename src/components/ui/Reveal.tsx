"use client";

import { MotionConfig, motion } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Seconds to wait before the reveal starts — use for staggered lists. */
  delay?: number;
  /** Vertical travel in px. */
  y?: number;
  className?: string;
}

/**
 * Fade-up on scroll. Under `prefers-reduced-motion` the transform is skipped
 * and only the opacity changes. The same markup renders on server and client,
 * so there is no hydration mismatch for reduced-motion users.
 */
export function Reveal({ children, delay = 0, y = 24, className }: RevealProps) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
