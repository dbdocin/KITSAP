"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: readonly AccordionItem[];
  /** Index of the item open on first render. */
  defaultOpen?: number;
  /** Heading level for each question, so it fits the page outline. */
  headingLevel?: 2 | 3;
  className?: string;
}

export function Accordion({ items, defaultOpen, headingLevel = 3, className }: AccordionProps) {
  const Heading = `h${headingLevel}` as const;
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen ?? null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = items.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowDown") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowUp") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;

    if (next !== null) {
      event.preventDefault();
      triggers.current[next]?.focus();
    }
  }

  return (
    <div className={cn("border-t border-border", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.question} className="border-b border-border">
            <Heading>
              <button
                ref={(node) => {
                  triggers.current[index] = node;
                }}
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className="group flex min-h-11 w-full items-center justify-between gap-6 py-6 text-left text-lg font-semibold text-text transition-colors duration-200 hover:text-accent md:text-xl"
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className="relative h-4 w-4 shrink-0 text-accent"
                >
                  <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                  <span
                    className={cn(
                      "absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current transition-transform duration-300",
                      isOpen && "scale-y-0",
                    )}
                  />
                </span>
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows,visibility] duration-300",
                isOpen ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-prose pb-6 text-text-secondary">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
