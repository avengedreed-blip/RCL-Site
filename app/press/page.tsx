import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { studioEmail, studioEmailHref } from "@/content/contact";
import { featuredProjects } from "@/content/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Press",
  description:
    "Press information, studio boilerplate, and product references for Reed Creative Labs.",
  path: "/press",
});

export default function PressPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Press"
        title="Reed Creative Labs press information"
        body="A concise reference for coverage, listings, and product context. For media requests, use the studio contact address."
      />

      <section className="mx-auto grid max-w-[1500px] gap-8 px-5 py-8 md:grid-cols-[0.9fr_1.1fr] md:px-8">
        <Reveal>
          <div className="rounded-[6px] border border-white/14 bg-rcl-surface p-7">
            <Download
              className="mb-8 h-8 w-8 text-rcl-red"
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
              className="mt-6 inline-flex text-sm font-black uppercase text-rcl-red hover:text-white"
            >
              {studioEmail}
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="rounded-[6px] border border-white/14 bg-rcl-elevated p-7">
            <h2 className="text-2xl font-black uppercase text-white">
              Studio Boilerplate
            </h2>
            <p className="mt-5 text-base leading-8 text-rcl-muted">
              Reed Creative Labs is an independent software and game studio
              building offline-first products with a focus on privacy,
              ownership, and lasting value. Its upcoming launches include Echo
              and Phase Arcade Volume 1.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 py-12 md:px-8 md:pb-20">
        <Reveal>
          <SectionHeader title="Featured References" />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.06}>
              <Link
                href={project.route}
                className="group block rounded-[6px] border border-white/12 bg-rcl-surface p-7 transition hover:border-rcl-red/70"
              >
                <p className="text-xs font-black uppercase text-rcl-red">
                  {project.launchDate ? `Launching ${project.launchDate}` : "Featured"}
                </p>
                <div className="mt-4 flex items-start justify-between gap-5">
                  <h3 className="text-2xl font-black uppercase text-white">
                    {project.name}
                  </h3>
                  <ArrowUpRight
                    className="h-5 w-5 text-rcl-muted transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-rcl-red"
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
