import Link from "next/link";
import { MediaImage } from "@/components/ui/MediaImage";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  /** `sizes` hint for next/image, matching the card's rendered width. */
  sizes?: string;
  /** Heading level for the title, so it fits the page outline. */
  headingLevel?: 2 | 3;
  className?: string;
}

const aspectClasses: Record<Project["aspect"], string> = {
  landscape: "aspect-video",
  portrait: "aspect-[4/5]",
  square: "aspect-square",
};

export function ProjectCard({
  project,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  headingLevel = 3,
  className,
}: ProjectCardProps) {
  const Heading = `h${headingLevel}` as const;

  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn("group relative block overflow-hidden border border-border bg-card", className)}
    >
      <div className={cn("relative w-full", aspectClasses[project.aspect])}>
        {/* Decorative: the title and category below carry the link's name. */}
        <MediaImage
          src={project.thumbnail}
          alt=""
          sizes={sizes}
          className="transition-transform duration-[900ms] ease-out can-hover:group-hover:scale-105 can-hover:group-focus-visible:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-focus-visible:scale-100"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/10 to-transparent"
        />
        {/* Always visible on touch devices; revealed on hover or keyboard focus otherwise. */}
        <div className="absolute inset-x-0 bottom-0 p-5 transition-[opacity,transform] duration-300 can-hover:translate-y-2 can-hover:opacity-0 can-hover:group-hover:translate-y-0 can-hover:group-hover:opacity-100 can-hover:group-focus-visible:translate-y-0 can-hover:group-focus-visible:opacity-100 motion-reduce:transition-none motion-reduce:can-hover:translate-y-0 md:p-6">
          <p className="text-label uppercase text-accent">{project.category}</p>
          <Heading className="mt-2 text-h3">{project.title}</Heading>
        </div>
      </div>
    </Link>
  );
}
