import type { Metadata } from "next";
import { CompactProjectCard, FeaturedProjectCard } from "@/components/ProjectCard";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import {
  activeDevelopmentProjects,
  comingSoonProjects,
  featuredProjects,
  includedGames,
  plannedProjects,
  roadmapDisclaimer,
} from "@/content/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Products",
  description:
    "Explore Reed Creative Labs software, games, tools, active development projects, and future roadmap.",
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
        title="Software, games, and tools with a shared standard"
        body="Reed Creative Labs builds products with clear purpose, practical design, and respect for the people using them."
      />

      <section className="mx-auto max-w-[1500px] px-5 py-8 md:px-8">
        <Reveal>
          <SectionHeader title="Featured Products" />
        </Reveal>
        <div className="grid gap-3 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.06}>
              <FeaturedProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 py-10 md:px-8">
        <Reveal>
          <SectionHeader title="Coming Soon" />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {comingSoonProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.04}>
              <CompactProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 py-10 md:px-8">
        <Reveal>
          <SectionHeader title="Phase Arcade Volume 1 Included Games" />
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
            <SectionHeader title="Planned" />
          </Reveal>
          <div className="grid gap-4">
            {plannedProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.06}>
                <CompactProjectCard project={project} emphasis="quiet" />
              </Reveal>
            ))}
          </div>
        </div>
        <p className="text-xs leading-6 text-rcl-dim md:col-span-2">
          {roadmapDisclaimer}
        </p>
      </section>
    </main>
  );
}
