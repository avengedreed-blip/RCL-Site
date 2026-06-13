import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ButtonLink";
import { CompactProjectCard } from "@/components/ProjectCard";
import { getProjectVisualImage, ProjectMediaImage } from "@/components/ProjectMedia";
import { StructuredData } from "@/components/StructuredData";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import {
  getProject,
  getProjectDateLabel,
  getStatusLabel,
  includedGames,
  projects,
} from "@/content/projects";
import { buildMetadata } from "@/lib/seo";
import { projectJsonLd } from "@/lib/structured-data";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: "Project",
    };
  }

  return buildMetadata({
    title: project.name,
    description: project.shortDescription,
    path: project.route,
    image: {
      url: getProjectVisualImage(project.visual)?.src ?? "/og-image.jpg",
      alt: `${project.name} preview image`,
    },
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const relatedIncludedGames =
    project.slug === "phase-arcade-volume-1" ? includedGames : [];
  const parentProject = project.parentProject ? getProject(project.parentProject) : undefined;
  const visualImage = getProjectVisualImage(project.visual);

  return (
    <main>
      <StructuredData data={projectJsonLd(project)} />
      <section className="mx-auto grid max-w-[1500px] gap-10 px-5 pb-14 pt-12 md:grid-cols-[minmax(0,1fr)_minmax(460px,1fr)] md:px-8 md:pb-18 md:pt-16 xl:gap-14">
        <Reveal className="min-w-0 self-center">
          <p className="mb-5 text-sm font-black uppercase text-rcl-red">
            {getProjectDateLabel(project)}
          </p>
          <h1 className="brand-heading product-page-title max-w-[920px] text-white">
            {project.name}
          </h1>
          <p className="mt-6 max-w-[780px] text-xl leading-8 text-white">
            {project.tagline}
          </p>
          <p className="mt-5 max-w-[780px] text-base leading-8 text-rcl-muted">
            {project.longDescription}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {parentProject ? (
              <ButtonLink href={parentProject.route} variant="secondary">
                View Collection
              </ButtonLink>
            ) : null}
            <ButtonLink href="/projects" variant="secondary">
              All Products
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="relative overflow-hidden rounded-[6px] border border-white/14 bg-rcl-elevated">
            {visualImage ? (
              <div className="relative min-h-[430px] xl:min-h-[560px]">
                <ProjectMediaImage visual={project.visual} priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/74 via-black/16 to-transparent" />
                <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black/45 to-transparent" />
              </div>
            ) : (
              <div className="min-h-[430px] bg-rcl-elevated xl:min-h-[560px]" />
            )}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 py-8 md:px-8">
        <Reveal>
          <div className="grid gap-6 border-y border-white/10 py-7 md:grid-cols-3">
            <div>
              <p className="text-xs font-black uppercase text-rcl-dim">Category</p>
              <p className="mt-2 font-black uppercase text-white">
                {project.categoryLabel}
              </p>
            </div>
            <div>
              <p className="text-xs font-black uppercase text-rcl-dim">Status</p>
              <p className="mt-2 font-black uppercase text-white">
                {getStatusLabel(project.status)}
              </p>
            </div>
            <div>
              <p className="text-xs font-black uppercase text-rcl-dim">Platforms</p>
              <ul className="mt-2 flex flex-wrap gap-2" aria-label="Platforms">
                {project.platforms.map((platform) => (
                  <li
                    key={platform}
                    className="rounded-[3px] border border-white/12 bg-rcl-surface px-2.5 py-1 text-xs font-black uppercase text-white"
                  >
                    {platform}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 py-8 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {project.idealFor?.length ? (
            <Reveal>
              <div className="rounded-[6px] border border-white/12 bg-rcl-surface p-6">
                <h2 className="text-2xl font-black uppercase text-white">
                  Who it is for
                </h2>
                <ul className="mt-5 grid gap-3 text-base leading-7 text-rcl-muted">
                  {project.idealFor.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 bg-rcl-red" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ) : null}
          {project.usersCan?.length ? (
            <Reveal delay={0.06}>
              <div className="rounded-[6px] border border-white/12 bg-rcl-surface p-6">
                <h2 className="text-2xl font-black uppercase text-white">
                  What users can do
                </h2>
                <ul className="mt-5 grid gap-3 text-base leading-7 text-rcl-muted">
                  {project.usersCan.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 bg-rcl-red" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 py-10 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {project.pageSections.map((section, index) => (
            <Reveal key={section.title} delay={index * 0.06}>
              <div className="border-t border-white/12 pt-6">
                <h2 className="text-2xl font-black uppercase text-white">
                  {section.title}
                </h2>
                <p className="mt-4 text-base leading-8 text-rcl-muted">
                  {section.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {relatedIncludedGames.length > 0 ? (
        <section className="mx-auto max-w-[1500px] px-5 pb-20 pt-8 md:px-8">
          <Reveal>
            <SectionHeader title="Included Games" />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {relatedIncludedGames.map((includedProject, index) => (
              <Reveal key={includedProject.slug} delay={index * 0.06}>
                <CompactProjectCard project={includedProject} />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
