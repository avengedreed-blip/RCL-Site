import type { Metadata } from "next";
import { CompactProjectCard, FeaturedProjectCard } from "@/components/ProjectCard";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import {
  activeDevelopmentProjects,
  featuredProjects,
  futureProjects,
  includedGames,
} from "@/content/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Products",
  description:
    "Explore Reed Creative Labs software, games, active development projects, and future roadmap.",
  path: "/projects",
  image: {
    url: "/images/home/phase-arcade-card.jpg",
    alt: "Phase Arcade cabinet artwork representing Reed Creative Labs featured releases.",
  },
});

export default function ProjectsPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Products"
        title="Software and games with a shared standard"
        body="Reed Creative Labs builds across software, games, and creative tools with one point of view: private by default, offline first, owned by the person using it."
      />

      <section className="mx-auto max-w-[1500px] px-5 py-8 md:px-8">
        <Reveal>
          <SectionHeader title="Featured Launches" />
        </Reveal>
        <div className="grid gap-2 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.06}>
              <FeaturedProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 py-10 md:px-8">
        <Reveal>
          <SectionHeader title="Phase Arcade Included Games" />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {includedGames.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.06}>
              <CompactProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-10 px-5 py-10 md:grid-cols-2 md:px-8 md:pb-20">
        <div>
          <Reveal>
            <SectionHeader title="Active Development" />
          </Reveal>
          <div className="grid gap-4">
            {activeDevelopmentProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.06}>
                <CompactProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
        <div>
          <Reveal>
            <SectionHeader title="Coming Next" />
          </Reveal>
          <div className="grid gap-4">
            {futureProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.06}>
                <CompactProjectCard project={project} emphasis="quiet" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
