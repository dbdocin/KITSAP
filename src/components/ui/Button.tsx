import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "link";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  /** Appends an animated → glyph. Hidden from assistive tech. */
  arrow?: boolean;
  className?: string;
}

type ButtonAsLink = BaseProps & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof BaseProps | "href"
  >;

type ButtonAsButton = BaseProps & { href?: undefined } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    keyof BaseProps
  >;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

const base =
  "group inline-flex min-h-11 items-center justify-center gap-2 text-sm font-medium uppercase tracking-wide transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-accent px-6 py-3 text-bg hover:bg-text",
  secondary: "border border-text/30 px-6 py-3 text-text hover:border-accent hover:text-accent",
  link: "text-text hover:text-accent",
};

function isExternal(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

export function Button({
  variant = "primary",
  arrow = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  const content = (
    <>
      {children}
      {arrow && (
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
        >
          →
        </span>
      )}
    </>
  );

  if (props.href !== undefined) {
    const { href, ...anchorProps } = props;

    if (isExternal(href)) {
      const opensNewTab = href.startsWith("http");
      return (
        <a
          href={href}
          className={classes}
          {...(opensNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...anchorProps}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...anchorProps}>
        {content}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = props;

  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
