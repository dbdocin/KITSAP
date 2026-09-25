import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  /** The page's single H1. */
  title: string | readonly string[];
  subtitle?: ReactNode;
  children?: ReactNode;
  className?: string;
}

/** Opening block for every inner page. Clears the fixed navbar. */
export function PageHeader({ title, subtitle, children, className }: PageHeaderProps) {
  const lines = typeof title === "string" ? [title] : title;

  return (
    <header className={cn("bg-bg pb-12 pt-32 md:pb-16 md:pt-40 lg:pt-44", className)}>
      <Container>
        <h1 className="max-w-5xl text-h2 uppercase">
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        {subtitle && <p className="mt-6 max-w-prose text-text-secondary">{subtitle}</p>}
        {children}
      </Container>
    </header>
  );
}
