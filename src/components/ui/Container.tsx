import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  size?: "page" | "narrow";
  className?: string;
}

export function Container({ children, size = "page", className }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-gutter",
        size === "page" ? "max-w-page" : "max-w-narrow",
        className,
      )}
    >
      {children}
    </div>
  );
}
