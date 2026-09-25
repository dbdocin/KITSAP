import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { getFeaturedProjects } from "@/lib/projects";
import type { Project } from "@/types";
import { SectionHeader } from "./SectionHeader";

// Card width follows aspect on desktop so the grid rhythm varies.
const spanClasses: Record<Project["aspect"], string> = {
  landscape: "md:col-span-7",
  portrait: "md:col-span-5",
  square: "md:col-span-5",
};

const sizeHints: Record<Project["aspect"], string> = {
  landscape: "(min-width: 768px) 58vw, 100vw",
  portrait: "(min-width: 768px) 42vw, 100vw",
  square: "(min-width: 768px) 42vw, 100vw",
};

export function FeaturedWork() {
  const featured = getFeaturedProjects();

  return (
    <Section aria-labelledby="featured-heading">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader
            id="featured-heading"
            label="SELECTED WORK"
            title="WORK THAT SPEAKS."
            body="From short-form social content to long-form productions, we turn raw footage into polished visual stories."
          />
          <Reveal>
            <Button href="/work" variant="link" arrow>
              View all work
            </Button>
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-x-6 gap-y-10 md:mt-20 md:grid-cols-12 md:items-start md:gap-y-16">
          {featured.map((project, index) => (
            <li
              key={project.slug}
              className={cn(spanClasses[project.aspect], index % 2 === 1 && "md:mt-12")}
            >
              <Reveal delay={(index % 2) * 0.1}>
                <ProjectCard project={project} sizes={sizeHints[project.aspect]} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
