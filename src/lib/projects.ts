import { projectCategories, projects } from "@/data/projects";
import type { Project, ProjectCategory } from "@/types";

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function isProjectCategory(value: string | null | undefined): value is ProjectCategory {
  return projectCategories.some((category) => category === value);
}

/** Same-category projects first, then the rest, excluding the project itself. */
export function getRelatedProjects(project: Project, limit = 3): Project[] {
  const others = projects.filter((item) => item.slug !== project.slug);
  const sameCategory = others.filter((item) => item.category === project.category);
  const rest = others.filter((item) => item.category !== project.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

/** Only YouTube and Vimeo embeds are rendered; anything else is ignored. */
const EMBED_HOSTS = new Set(["www.youtube.com", "www.youtube-nocookie.com", "player.vimeo.com"]);

export function getEmbedUrl(videoUrl: string | undefined): string | null {
  if (!videoUrl) return null;
  try {
    const url = new URL(videoUrl);
    return url.protocol === "https:" && EMBED_HOSTS.has(url.hostname) ? url.toString() : null;
  } catch {
    return null;
  }
}
