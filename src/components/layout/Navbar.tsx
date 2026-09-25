"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useRef, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/Button";
import { cta, navLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

const SCROLL_THRESHOLD = 8;

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

const getScrolled = () => window.scrollY > SCROLL_THRESHOLD;
const getServerScrolled = () => false;

export function Navbar() {
  const pathname = usePathname();
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // The menu is "open" only for the pathname it was opened on, so navigating
  // anywhere closes it without needing an effect.
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const menuOpen = openOnPath === pathname;

  const scrolled = useSyncExternalStore(subscribeToScroll, getScrolled, getServerScrolled);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled
            ? "border-border bg-bg/80 backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-page items-center justify-between px-gutter md:h-20">
          <Link
            href="/"
            aria-label={`${siteConfig.name} — home`}
            className="text-lg font-bold tracking-[0.2em] text-text"
          >
            {siteConfig.name}
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => {
                const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-11 items-center text-sm uppercase tracking-wide transition-colors duration-200 hover:text-accent",
                        active ? "text-accent" : "text-text-secondary",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <Button href={cta.primary.href} arrow>
                {cta.primary.label}
              </Button>
            </div>
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              onClick={() => setOpenOnPath(pathname)}
              className="flex min-h-11 items-center px-2 text-sm font-medium uppercase tracking-wide text-text transition-colors duration-200 hover:text-accent md:hidden"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        id={menuId}
        open={menuOpen}
        onClose={() => setOpenOnPath(null)}
        returnFocusTo={menuButtonRef}
      />
    </>
  );
}
