import type { Metadata } from "next";
import { Suspense } from "react";
import { ProjectGrid } from "@/components/portfolio/ProjectGrid";
import { WorkExplorer } from "@/components/portfolio/WorkExplorer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "A selection of video editing projects crafted by KITSAP.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader title="SELECTED WORK" subtitle="A selection of projects crafted by KITSAP." />
      <Section className="pt-4 md:pt-4 lg:pt-4">
        <Container>
          {/* useSearchParams needs a Suspense boundary; the fallback is the full grid. */}
          <Suspense fallback={<ProjectGrid projects={projects} />}>
            <WorkExplorer projects={projects} />
          </Suspense>
        </Container>
      </Section>
      <FinalCTA />
    </>
  );
}
