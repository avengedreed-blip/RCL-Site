import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ButtonLink";
import { ForgeProductPage } from "@/components/product-pages/ForgeProductPage";
import { PhaseArcadeProductPage } from "@/components/product-pages/PhaseArcadeProductPage";
import {
  getProjectScreenshots,
  getProjectSocialImage,
  getProjectVisualImage,
  ProjectMediaImage,
} from "@/components/ProjectMedia";
import { StructuredData } from "@/components/StructuredData";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import {
  getProject,
  getProjectDateLabel,
  getStatusLabel,
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
      url: getProjectSocialImage(project.slug),
      alt: `${project.name} preview image`,
      width: 1200,
      height: 630,
    },
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  if (project.slug === "forge") {
    return <ForgeProductPage project={project} />;
  }

  if (project.slug === "phase-arcade-volume-1") {
    return <PhaseArcadeProductPage project={project} />;
  }

  const parentProject = project.parentProject ? getProject(project.parentProject) : undefined;
  const visualImage = getProjectVisualImage(project.visual);
  const screenshots = getProjectScreenshots(project.visual);

  return (
    <main id="main-content" tabIndex={-1}>
      <StructuredData data={projectJsonLd(project)} />
      <section className="mx-auto grid max-w-[1240px] gap-10 px-5 pb-14 pt-12 md:grid-cols-[minmax(0,1fr)_minmax(460px,1fr)] md:px-8 md:pb-18 md:pt-16 xl:gap-14 xl:px-0">
        <Reveal className="min-w-0 self-center">
          <p className="mb-5 text-sm font-black uppercase text-rcl-amber">
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
            <ButtonLink href="/contact" variant="contact">
              Contact
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="detail-hero-panel relative overflow-hidden rounded-[6px] border border-rcl-copper/24 bg-rcl-elevated shadow-[0_0_68px_rgba(0,0,0,0.44),inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-300 ease-out hover:border-rcl-copper/58 hover:shadow-[0_0_82px_rgba(0,0,0,0.5),0_0_24px_rgba(210,115,59,0.08),inset_0_1px_0_rgba(255,255,255,0.06)]">
            {visualImage ? (
              <div className="project-media-frame relative min-h-[260px] bg-black sm:min-h-[340px] md:min-h-[390px] xl:min-h-[430px]">
                {visualImage.detailFit === "contain" || visualImage.fit === "contain" ? (
                  <ProjectMediaImage
                    visual={project.visual}
                    priority={false}
                    variant="detail"
                    fitOverride="cover"
                    decorative
                    className="scale-110 opacity-28 blur-xl saturate-125"
                  />
                ) : null}
                <ProjectMediaImage visual={project.visual} priority variant="detail" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-white/[0.03]" />
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-black/14 to-transparent" />
              </div>
            ) : (
              <div className="min-h-[260px] bg-rcl-elevated sm:min-h-[340px] md:min-h-[390px] xl:min-h-[430px]" />
            )}
          </div>
        </Reveal>
      </section>

      {screenshots.length > 1 ? (
        <section className="mx-auto max-w-[1240px] px-5 py-10 md:px-8 xl:px-0">
          <Reveal>
            <SectionHeader
              title={project.slug === "rcl-science-lab" ? "Inside RCL Science Lab" : "Product Screenshots"}
            />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {screenshots.map((screenshot, index) => (
              <Reveal
                key={screenshot.src}
                className={screenshots.length === 3 && index === 2 ? "md:col-span-2 xl:col-span-1" : undefined}
              >
                <figure>
                  <div className="screenshot-frame relative aspect-video overflow-hidden rounded-[6px] border border-rcl-copper/22 bg-black shadow-[0_0_54px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-300 ease-out hover:border-rcl-copper/58 hover:shadow-[0_0_64px_rgba(0,0,0,0.44),0_0_18px_rgba(210,115,59,0.08),inset_0_1px_0_rgba(255,255,255,0.06)]">
                    <Image
                      src={screenshot.src}
                      alt={screenshot.alt}
                      fill
                      sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-contain"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-white/[0.03]" />
                  </div>
                  {screenshot.caption ? (
                    <figcaption className="mt-3 text-xs leading-5 text-rcl-dim">
                      {screenshot.caption}
                    </figcaption>
                  ) : null}
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-[1240px] px-5 py-8 md:px-8 xl:px-0">
        <Reveal>
          <div className="grid gap-6 border-y border-rcl-copper/18 py-7 md:grid-cols-3">
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
                    className="platform-chip rounded-[3px] border border-rcl-copper/18 bg-rcl-surface px-2.5 py-1 text-xs font-black uppercase text-white"
                  >
                    {platform}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-8 md:px-8 xl:px-0">
        <div className="grid gap-8 md:grid-cols-2">
          {project.idealFor?.length ? (
            <Reveal>
              <div className="surface-panel rounded-[6px] border border-rcl-copper/18 bg-rcl-surface p-6">
                <h2 className="text-2xl font-black uppercase text-white">
                  Who it is for
                </h2>
                <ul className="mt-5 grid gap-3 text-base leading-7 text-rcl-muted">
                  {project.idealFor.map((item) => (
                    <li key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ) : null}
          {project.usersCan?.length ? (
            <Reveal delay={0.06}>
              <div className="surface-panel rounded-[6px] border border-rcl-copper/18 bg-rcl-surface p-6">
                <h2 className="text-2xl font-black uppercase text-white">
                  What users can do
                </h2>
                <ul className="mt-5 grid gap-3 text-base leading-7 text-rcl-muted">
                  {project.usersCan.map((item) => (
                    <li key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-10 md:px-8 xl:px-0">
        <div className="grid gap-8 md:grid-cols-2">
          {project.pageSections.map((section, index) => (
            <Reveal key={section.title} delay={index * 0.06}>
              <div className="border-t border-rcl-copper/18 pt-6">
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

    </main>
  );
}
