import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  id?: string;
  label?: string;
  /** Pass an array to force line breaks, e.g. ["GOT FOOTAGE?", "LET'S MAKE …"]. */
  title: string | readonly string[];
  body?: ReactNode;
  className?: string;
}

/** Label + H2 + body, revealed together. Shared by every homepage section. */
export function SectionHeader({ id, label, title, body, className }: SectionHeaderProps) {
  const lines = typeof title === "string" ? [title] : title;

  return (
    <Reveal className={cn("max-w-4xl", className)}>
      {label && <SectionLabel tone="accent">{label}</SectionLabel>}
      <h2 id={id} className={cn("text-h2 uppercase", label && "mt-5")}>
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h2>
      {body && <p className="mt-6 max-w-prose text-text-secondary">{body}</p>}
    </Reveal>
  );
}
