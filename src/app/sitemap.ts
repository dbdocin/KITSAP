import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/seo";

const staticRoutes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/services", priority: 0.9 },
  { path: "/work", priority: 0.9 },
  { path: "/contact", priority: 0.9 },
  { path: "/about", priority: 0.7 },
  { path: "/process", priority: 0.7 },
  { path: "/faq", priority: 0.6 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...staticRoutes.map(({ path, priority }) => ({
      url: absoluteUrl(path),
      lastModified,
      priority,
    })),
    ...projects.map((project) => ({
      url: absoluteUrl(`/work/${project.slug}`),
      lastModified,
      priority: 0.6,
    })),
  ];
}
