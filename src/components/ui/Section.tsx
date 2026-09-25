import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  id?: string;
  variant?: "default" | "elevated";
  className?: string;
  "aria-labelledby"?: string;
}

export function Section({
  children,
  id,
  variant = "default",
  className,
  "aria-labelledby": labelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "py-20 md:py-28 lg:py-36",
        variant === "elevated" ? "bg-bg-elevated" : "bg-bg",
        className,
      )}
    >
      {children}
    </section>
  );
}
