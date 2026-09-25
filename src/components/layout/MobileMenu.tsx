"use client";

import Link from "next/link";
import { useEffect, useRef, type KeyboardEvent, type RefObject } from "react";
import { Button } from "@/components/ui/Button";
import { cta, navLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  id: string;
  open: boolean;
  onClose: () => void;
  /** Element that opened the menu — focus returns here on close. */
  returnFocusTo: RefObject<HTMLElement | null>;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu({ id, open, onClose, returnFocusTo }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll and move focus while open; restore both on close.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const trigger = returnFocusTo.current;

    return () => {
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [open, returnFocusTo]);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
      return;
    }

    if (event.key !== "Tab" || !panelRef.current) return;

    const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div
      id={id}
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      onKeyDown={onKeyDown}
      className={cn(
        "fixed inset-0 z-[60] flex flex-col bg-bg transition-[opacity,visibility] duration-300 md:hidden",
        open ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <div className="flex h-16 shrink-0 items-center justify-between px-gutter">
        <Link
          href="/"
          onClick={onClose}
          className="inline-flex min-h-11 items-center text-lg font-bold tracking-[0.2em] text-text"
        >
          {siteConfig.name}
        </Link>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="flex min-h-11 items-center px-2 text-sm font-medium uppercase tracking-wide text-text transition-colors duration-200 hover:text-accent"
        >
          Close
        </button>
      </div>

      <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center px-gutter">
        <ul className="flex flex-col">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="block py-3 text-5xl font-bold uppercase tracking-tight text-text transition-colors duration-200 hover:text-accent"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="shrink-0 px-gutter pb-10">
        <Button href={cta.primary.href} arrow onClick={onClose} className="w-full">
          {cta.primary.label}
        </Button>
      </div>
    </div>
  );
}
