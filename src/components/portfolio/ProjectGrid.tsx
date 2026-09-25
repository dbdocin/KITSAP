import type { Project } from "@/types";
import { ProjectCard } from "./ProjectCard";

interface ProjectGridProps {
  projects: readonly Project[];
  /** Heading level for card titles. */
  headingLevel?: 2 | 3;
}

/** Masonry-style columns keep each thumbnail at its own aspect ratio. */
export function ProjectGrid({ projects, headingLevel = 3 }: ProjectGridProps) {
  return (
    <ul className="columns-1 gap-6 sm:columns-2 lg:columns-3">
      {projects.map((project) => (
        <li key={project.slug} className="mb-6 break-inside-avoid">
          <ProjectCard
            project={project}
            headingLevel={headingLevel}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </li>
      ))}
    </ul>
  );
}
