import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ButtonLink";
import { ForgeProductPage } from "@/components/product-pages/ForgeProductPage";
import { FlagshipProductPage } from "@/components/product-pages/FlagshipProductPage";
import { PhaseArcadeProductPage } from "@/components/product-pages/PhaseArcadeProductPage";
import { ProductMediaSurface } from "@/components/ProductMediaSurface";
import { StructuredData } from "@/components/StructuredData";
import { Reveal } from "@/components/Reveal";
import {
  getProject,
  getProjectDateLabel,
  getStatusLabel,
  projects,
} from "@/content/projects";
import { getProjectSocialImage } from "@/lib/project-media";
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

  if (
    project.slug === "forgefield" ||
    project.slug === "rcl-science-lab" ||
    project.slug === "storm-lab"
  ) {
    return <FlagshipProductPage project={project} />;
  }

  const parentProject = project.parentProject ? getProject(project.parentProject) : undefined;
  return (
    <main id="main-content" tabIndex={-1}>
      <StructuredData data={projectJsonLd(project)} />
      <section className="mx-auto grid max-w-[1240px] gap-10 px-5 pb-14 pt-12 md:px-8 md:pb-18 md:pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(460px,1fr)] xl:gap-14 xl:px-0">
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
          <ProductMediaSurface
            project={project}
            variant="detail"
            priority
            className="min-h-[260px] sm:min-h-[340px] md:min-h-[390px] xl:min-h-[430px]"
          />
        </Reveal>
      </section>

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
