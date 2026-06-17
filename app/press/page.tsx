import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { studioEmail, studioEmailHref } from "@/content/contact";
import { featuredProjects, getProjectDateLabel } from "@/content/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Press",
  description:
    "Press information, studio boilerplate, and product references for Reed Creative Labs.",
  path: "/press",
  image: {
    url: "/social-preview.jpg",
    alt: "Reed Creative Labs social preview artwork for press references.",
  },
});

export default function PressPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHeader
        eyebrow="Press"
        title="Reed Creative Labs press information"
        body="A concise reference for coverage, listings, and product context. For media requests, use the studio contact address."
      />

      <section className="mx-auto grid max-w-[1240px] min-w-0 gap-8 px-5 py-8 md:grid-cols-[0.9fr_1.1fr] md:px-8 xl:px-0">
        <Reveal className="min-w-0">
          <div className="surface-panel min-w-0 rounded-[6px] border border-rcl-copper/22 bg-rcl-surface p-7 shadow-[0_12px_38px_rgba(0,0,0,0.18)] transition duration-300 ease-out hover:border-rcl-copper/55 hover:shadow-[0_16px_48px_rgba(0,0,0,0.24)]">
            <Download
              className="mb-8 h-8 w-8 text-rcl-amber"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <h2 className="text-2xl font-black uppercase text-white">
              Press Contact
            </h2>
            <p className="mt-4 text-base leading-8 text-rcl-muted">
              For review requests, interviews, and product coverage:
            </p>
            <a
              href={studioEmailHref}
              className="mt-6 inline-flex max-w-full text-sm font-black uppercase text-rcl-amber [overflow-wrap:anywhere] transition duration-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rcl-copper"
            >
              {studioEmail}
            </a>
          </div>
        </Reveal>
        <Reveal className="min-w-0" delay={0.08}>
          <div className="surface-panel min-w-0 rounded-[6px] border border-rcl-copper/22 bg-rcl-elevated p-7 shadow-[0_12px_38px_rgba(0,0,0,0.18)] transition duration-300 ease-out hover:border-rcl-copper/55 hover:shadow-[0_16px_48px_rgba(0,0,0,0.24)]">
            <h2 className="text-2xl font-black uppercase text-white">
              Studio Boilerplate
            </h2>
            <p className="mt-5 text-base leading-8 text-rcl-muted">
              Reed Creative Labs is an independent software studio building
              software products, games, educational tools, websites, and custom
              software with a focus on privacy, ownership, and lasting value.
              Current featured products include Echo, Phase Arcade Volume 1,
              RCL Workspace, and RCL Science Lab.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-12 md:px-8 md:pb-20 xl:px-0">
        <Reveal>
          <SectionHeader title="Featured References" />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.06}>
              <Link
                href={project.route}
                className="surface-panel group block rounded-[6px] border border-rcl-copper/18 bg-rcl-surface p-7 transition duration-300 ease-out hover:-translate-y-0.5 hover:border-rcl-copper/70 hover:shadow-[0_12px_36px_rgba(0,0,0,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rcl-copper"
              >
                <p className="text-xs font-black uppercase text-rcl-amber">
                  {getProjectDateLabel(project)}
                </p>
                <div className="mt-4 flex items-start justify-between gap-5">
                  <h3 className="text-2xl font-black uppercase text-white">
                    {project.name}
                  </h3>
                  <ArrowUpRight
                    className="h-5 w-5 text-rcl-muted transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-rcl-amber"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-4 text-sm leading-7 text-rcl-muted">
                  {project.shortDescription}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
