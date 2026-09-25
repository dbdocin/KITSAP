import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: ReactNode;
  tone?: "secondary" | "accent";
  className?: string;
}

export function SectionLabel({ children, tone = "secondary", className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "text-label uppercase",
        tone === "accent" ? "text-accent" : "text-text-secondary",
        className,
      )}
    >
      {children}
    </p>
  );
}
