import type { Metadata } from "next";
import { CompactProjectCard, FeaturedProjectCard } from "@/components/ProjectCard";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import {
  activeDevelopmentRoadmapProjects,
  comingSoonRoadmapProjects,
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
    url: "/images/social/phase-arcade-volume-1.jpg",
    alt: "Reed Creative Labs products, including Forge, Phase Arcade Volume I, and RCL Science Lab.",
    width: 1200,
    height: 630,
  },
});

export default function ProjectsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHeader
        eyebrow="Products"
        title="Products and Roadmap"
        body="Explore Reed Creative Labs software, games, tools, active development projects, and future roadmap."
      />

      <section className="mx-auto max-w-[1240px] px-5 py-8 md:px-8 xl:px-0">
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

      <section className="mx-auto max-w-[1240px] px-5 py-10 md:px-8 xl:px-0">
        <Reveal>
          <SectionHeader title="Coming Soon" />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {comingSoonRoadmapProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.04}>
              <CompactProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-10 md:px-8 xl:px-0">
        <Reveal>
          <SectionHeader title="Phase Arcade Volume I Included Games" />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {includedGames.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.06}>
              <CompactProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1240px] gap-10 px-5 py-10 md:grid-cols-2 md:px-8 md:pb-20 xl:px-0">
        <div>
          <Reveal>
            <SectionHeader title="Active Development" />
          </Reveal>
          <div className="grid gap-4">
            {activeDevelopmentRoadmapProjects.map((project, index) => (
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
