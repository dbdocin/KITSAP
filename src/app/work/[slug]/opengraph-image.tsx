import { projects } from "@/data/projects";
import { OG_CONTENT_TYPE, OG_SIZE, renderProjectOgImage } from "@/lib/og";

export const alt = "KITSAP project";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectOpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return renderProjectOgImage(slug);
}
