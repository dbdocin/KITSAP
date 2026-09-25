import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Container } from "@/components/ui/Container";
import { MediaImage } from "@/components/ui/MediaImage";
import { Section } from "@/components/ui/Section";
import { projects } from "@/data/projects";
import { getEmbedUrl, getProjectBySlug, getRelatedProjects } from "@/lib/projects";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

// Hero frame keeps the project's own shape without getting taller than a screen.
const heroFrame: Record<Project["aspect"], string> = {
  landscape: "aspect-video w-full",
  square: "aspect-square w-full max-w-2xl mx-auto",
  portrait: "aspect-[9/16] w-full max-w-sm mx-auto",
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };

  return { title: project.title, description: project.description };
}

function TextList({ title, items }: { title: string; items: readonly string[] }) {
  if (items.length === 0) return null;

  return (
    <div>
      <h2 className="text-label uppercase text-accent">{title}</h2>
      <ul className="mt-4 space-y-2 text-text-secondary">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-text-muted" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const embedUrl = getEmbedUrl(project.videoUrl);
  const related = getRelatedProjects(project, 3);
  const heroImage = project.heroMedia ?? project.thumbnail;
  const meta = [
    { label: "Category", value: project.category },
    ...(project.client ? [{ label: "Client", value: project.client }] : []),
    ...(project.year ? [{ label: "Year", value: project.year }] : []),
  ];

  return (
    <>
      <header className="bg-bg pb-10 pt-32 md:pb-14 md:pt-40 lg:pt-44">
        <Container>
          <Link
            href="/work"
            className="inline-flex min-h-11 items-center text-label uppercase text-text-secondary transition-colors duration-200 hover:text-accent"
          >
            <span aria-hidden="true" className="mr-2">
              ←
            </span>
            All work
          </Link>
          <h1 className="mt-4 max-w-5xl text-h2 uppercase">{project.title}</h1>
        </Container>
      </header>

      <Section className="pb-0 pt-0 md:pb-0 md:pt-0 lg:pb-0 lg:pt-0">
        <Container>
          <div className={cn("relative overflow-hidden bg-card", heroFrame[project.aspect])}>
            <MediaImage
              src={heroImage}
              alt={`${project.title} — ${project.category} project`}
              sizes="(min-width: 1280px) 1184px, 100vw"
              priority
            />
          </div>
        </Container>
      </Section>

      <Section className="pb-16 md:pb-20 lg:pb-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
            <div>
              <p className="max-w-prose text-text-secondary">{project.description}</p>

              {embedUrl && (
                <div className="relative mt-12 aspect-video w-full overflow-hidden bg-card">
                  <iframe
                    src={embedUrl}
                    title={`${project.title} — video`}
                    loading="lazy"
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>
              )}
            </div>

            <aside className="space-y-10" aria-label="Project details">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-border pt-6">
                {meta.map((item) => (
                  <div key={item.label}>
                    <dt className="text-label uppercase text-text-secondary">{item.label}</dt>
                    <dd className="mt-2 text-text">{item.value}</dd>
                  </div>
                ))}
              </dl>
              <TextList title="Services provided" items={project.services} />
              <TextList title="Deliverables" items={project.deliverables} />
            </aside>
          </div>

          {project.gallery && project.gallery.length > 0 && (
            <div className="mt-16 md:mt-24">
              <h2 className="sr-only">Gallery</h2>
              <ul className="grid gap-4 sm:grid-cols-2">
                {project.gallery.map((image, index) => (
                  <li key={image} className="relative aspect-video overflow-hidden bg-card">
                    <MediaImage
                      src={image}
                      alt={`${project.title} — gallery image ${index + 1}`}
                      sizes="(min-width: 640px) 50vw, 100vw"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </Section>

      {related.length > 0 && (
        <Section aria-labelledby="related-heading">
          <Container>
            <h2 id="related-heading" className="text-h2 uppercase">
              MORE WORK
            </h2>
            <ul className="mt-12 grid items-start gap-6 md:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <ProjectCard project={item} sizes="(min-width: 768px) 33vw, 100vw" />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <FinalCTA />
    </>
  );
}
