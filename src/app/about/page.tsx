import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { team } from "@/data/team";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "KITSAP is a creative post-production studio focused on turning ideas and raw footage into content people want to watch.",
  path: "/about",
});

const principles = [
  {
    title: "PHILOSOPHY",
    text: "Editing is storytelling. Every project starts with a simple question: what should the viewer understand, feel or do? We build the cut around the answer and let everything else serve it.",
  },
  {
    title: "APPROACH",
    text: "We watch everything before we cut anything. Structure and pacing come first, polish comes after. Graphics, effects and sound design are added when they help the story, never before.",
  },
  {
    title: "QUALITY",
    text: "The same standards apply to a thirty-second Reel and a long-form episode. Clean audio, considered color and a final check on every file before it reaches you.",
  },
  {
    title: "COLLABORATION",
    text: "Clear communication, structured feedback and straightforward revisions. You always know where your project stands and what happens next.",
  },
] as const;

export default function AboutPage() {
  // The team block only shows in production once it has real entries.
  const showTeam = team.length > 0 || process.env.NODE_ENV !== "production";

  return (
    <>
      <PageHeader
        title="WE'RE KITSAP."
        subtitle="KITSAP is a creative post-production studio focused on turning ideas and raw footage into content people want to watch. We combine thoughtful storytelling, precise editing and modern visual design to help creators and businesses communicate better through video."
      />

      <Section className="pt-8 md:pt-8 lg:pt-8">
        <Container>
          <ul className="border-t border-border">
            {principles.map((item, index) => (
              <li key={item.title} className="border-b border-border">
                <Reveal
                  delay={index * 0.05}
                  y={16}
                  className="grid gap-4 py-10 md:grid-cols-[1fr_1.4fr] md:gap-12 md:py-14"
                >
                  <h2 className="text-display uppercase">{item.title}</h2>
                  <p className="max-w-prose text-text-secondary">{item.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {showTeam && (
        <Section variant="elevated" aria-labelledby="team-heading">
          <Container>
            <h2 id="team-heading" className="text-h2 uppercase">
              TEAM
            </h2>
            {team.length > 0 ? (
              <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {team.map((member) => (
                  <li key={member.name} className="border-t border-border pt-6">
                    <p className="text-h3">{member.name}</p>
                    <p className="mt-1 text-text-secondary">{member.role}</p>
                    {member.bio && <p className="mt-4 max-w-prose text-text-secondary">{member.bio}</p>}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-12 border border-dashed border-text-muted p-8 text-text-secondary">
                PLACEHOLDER — team members go in <code>src/data/team.ts</code>. This block is hidden
                in production until it has entries.
              </p>
            )}
          </Container>
        </Section>
      )}

      <FinalCTA />
    </>
  );
}
