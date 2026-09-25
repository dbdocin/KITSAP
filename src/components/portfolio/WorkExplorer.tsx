"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { projectCategories } from "@/data/projects";
import { isProjectCategory } from "@/lib/projects";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";
import { ProjectGrid } from "./ProjectGrid";

interface WorkExplorerProps {
  projects: readonly Project[];
}

const ALL = "All";

/** Filterable portfolio. The active filter lives in `?category=` so views are shareable. */
export function WorkExplorer({ projects }: WorkExplorerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const requested = searchParams.get("category");
  const active = isProjectCategory(requested) ? requested : null;

  const visible = active ? projects.filter((project) => project.category === active) : projects;

  function select(category: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (category === ALL) params.delete("category");
    else params.set("category", category);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        {[ALL, ...projectCategories].map((category) => {
          const pressed = category === ALL ? active === null : category === active;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={pressed}
              onClick={() => select(category)}
              className={cn(
                "min-h-11 border px-5 text-sm uppercase tracking-wide transition-colors duration-200",
                pressed
                  ? "border-accent bg-accent text-bg"
                  : "border-border text-text-secondary hover:border-text hover:text-text",
              )}
            >
              {category}
            </button>
          );
        })}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {visible.length === 0
          ? "No projects in this category."
          : `Showing ${visible.length} ${visible.length === 1 ? "project" : "projects"}${active ? ` in ${active}` : ""}.`}
      </p>

      <div className="mt-12 md:mt-16">
        {visible.length > 0 ? (
          <ProjectGrid projects={visible} headingLevel={2} />
        ) : (
          <div className="border border-border px-6 py-16 text-center">
            <p className="text-h3">No projects in this category yet.</p>
            <p className="mx-auto mt-3 max-w-prose text-text-secondary">
              Try another category, or browse everything we&apos;ve made.
            </p>
            <div className="mt-8 flex justify-center">
              <Button variant="secondary" onClick={() => select(ALL)}>
                Show all work
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
