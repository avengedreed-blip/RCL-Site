import type { Metadata } from "next";
import Image from "next/image";
import {
  Archive,
  ArrowRight,
  Heart,
  LockKeyhole,
  WifiOff,
} from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { CompactProjectCard, FeaturedProjectCard } from "@/components/ProjectCard";
import { RclTechnicalMotif } from "@/components/RclTechnicalMotif";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import {
  activeDevelopmentProjects,
  comingSoonProjects,
  featuredProjects,
  plannedProjects,
  roadmapDisclaimer,
} from "@/content/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Reed Creative Labs",
  description:
    "Independent software, games, and tools built for ownership, privacy, and lasting value.",
  path: "/",
  image: {
    url: "/og-image.jpg",
    alt: "Reed Creative Labs social preview with black, white, and red branding.",
    width: 1200,
    height: 630,
  },
});

const philosophy = [
  {
    title: "Privacy By Default",
    body: "Your data stays on your device whenever possible.",
    icon: LockKeyhole,
  },
  {
    title: "Offline First",
    body: "Core functionality should work without internet dependence.",
    icon: WifiOff,
  },
  {
    title: "Ownership Matters",
    body: "Software should feel owned, not rented.",
    icon: Archive,
  },
  {
    title: "Built With Care",
    body: "Thoughtful design. Human-focused experiences.",
    icon: Heart,
  },
];

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="hero-section" style={{ alignItems: "start", minHeight: "80vh" }}>
        <Reveal className="hero-copy relative z-10">
          <p className="mb-6 text-sm font-black uppercase text-rcl-red">
            Offline-first software, games, and tools
          </p>
          <h1 className="brand-heading hero-title max-w-[780px] text-6xl leading-[0.92] text-white md:text-7xl lg:text-8xl">
            <span className="block">Reed</span>
            <span className="block">Creative</span>
            <span className="block">Labs</span>
          </h1>
          <p className="mt-5 max-w-[440px] text-lg leading-8 text-rcl-muted">
            Independent software, games, and tools built for ownership,
            privacy, and lasting value.
          </p>
          <div className="mt-7 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="#featured">Explore Products</ButtonLink>
            <ButtonLink href="#philosophy" variant="secondary">
              Our Philosophy
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="hero-mark">
          <Image
            src="/images/home/rcl-hero-cinematic.jpg"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="hero-cinematic-image"
          />
          <div className="hero-cinematic-vignette" />
        </Reveal>
      </section>

      <section
        id="featured"
        className="mx-auto max-w-[1500px] px-5 py-8 md:px-8 md:py-10"
      >
        <Reveal>
          <SectionHeader
            title="Featured Products"
            href="/projects"
            action="View all products"
          />
        </Reveal>
        <div className="grid gap-3 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.06}>
              <FeaturedProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 py-8 md:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[6px] border border-white/12 bg-rcl-surface p-6 shadow-[0_0_54px_rgba(0,0,0,0.34)] sm:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_86%_24%,rgba(255,32,32,0.16),transparent_34%),linear-gradient(90deg,rgba(255,255,255,0.04),transparent_55%)]" />
            <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="mb-4 text-xs font-black uppercase text-rcl-red">
                  Studio Services
                </p>
                <h2 className="text-3xl font-black uppercase text-white md:text-4xl">
                  Websites &amp; Custom Software
                </h2>
                <p className="mt-4 max-w-[820px] text-base leading-8 text-rcl-muted">
                  Reed Creative Labs builds professional websites and practical
                  custom software for small businesses, organizations,
                  professionals, and independent creators.
                </p>
              </div>
              <ButtonLink href="/services" variant="secondary">
                Explore Services
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 py-12 md:px-8 md:py-16">
        <Reveal>
          <div className="mb-7 grid gap-3 md:grid-cols-[auto_1fr] md:items-end md:gap-5">
            <div>
              <h2 className="text-sm font-black uppercase text-white">
                Coming Soon
              </h2>
              <p className="mt-3 text-sm leading-6 text-rcl-muted">
                Products currently being prepared for public release.
              </p>
            </div>
            <div className="hidden h-px bg-white/25 md:block" />
          </div>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {comingSoonProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.04}>
              <CompactProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 py-12 md:px-8 md:py-16">
        <Reveal>
          <div className="mb-7 grid gap-3 md:grid-cols-[auto_1fr] md:items-end md:gap-5">
            <div>
              <h2 className="text-sm font-black uppercase text-white">
                Active Development
              </h2>
              <p className="mt-3 text-sm leading-6 text-rcl-muted">
                Projects currently being built.
              </p>
            </div>
            <div className="hidden h-px bg-white/25 md:block" />
          </div>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          {activeDevelopmentProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.04}>
              <CompactProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 py-12 md:px-8 md:py-16">
        <Reveal>
          <div className="mb-7 grid gap-3 md:grid-cols-[auto_1fr] md:items-end md:gap-5">
            <div>
              <h2 className="text-sm font-black uppercase text-white">Planned</h2>
              <p className="mt-3 text-sm leading-6 text-rcl-muted">
                Projects planned for future development.
              </p>
            </div>
            <div className="hidden h-px bg-white/25 md:block" />
          </div>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          {plannedProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.04}>
              <CompactProjectCard project={project} emphasis="quiet" />
            </Reveal>
          ))}
        </div>
        <p className="mt-7 max-w-[760px] text-xs leading-6 text-rcl-dim">
          {roadmapDisclaimer}
        </p>
      </section>

      <section
        id="philosophy"
        className="mx-auto max-w-[1500px] px-5 py-14 md:px-8 md:py-20"
      >
        <Reveal>
          <div className="philosophy-panel relative overflow-hidden rounded-[6px] border border-white/16 bg-rcl-surface/95 p-7 shadow-[0_0_90px_rgba(0,0,0,0.48)] md:p-10 xl:p-12">
            <div className="absolute inset-y-0 left-0 w-1 bg-rcl-red shadow-[0_0_32px_rgba(255,32,32,0.75)]" />
            <div className="absolute -right-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-rcl-red/10 blur-3xl" />
            <RclTechnicalMotif
              variant="panel"
              className="absolute -right-20 top-1/2 hidden h-[520px] w-[520px] -translate-y-1/2 opacity-55 lg:block"
            />
            <div className="relative z-10 grid gap-10 2xl:grid-cols-[minmax(0,720px)_minmax(0,1fr)] 2xl:items-center 2xl:gap-16">
              <div className="min-w-0 max-w-[760px]">
                <div className="mb-7 flex items-center gap-4">
                  <span className="h-3 w-3 bg-rcl-red shadow-[0_0_20px_rgba(255,32,32,0.8)]" />
                  <p className="text-sm font-black uppercase text-rcl-red">
                    Studio Philosophy
                  </p>
                </div>
                <h2 className="brand-heading philosophy-heading text-white">
                  Built Different
                </h2>
                <p className="mt-7 max-w-[520px] text-base leading-8 text-rcl-muted md:text-lg md:leading-9">
                  We build software, games, and tools that respect your time,
                  your privacy, and your ownership.
                </p>
              </div>
              <div className="grid min-w-0 gap-4 sm:grid-cols-2">
                {philosophy.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="group min-h-[230px] rounded-[6px] border border-white/12 bg-rcl-elevated/80 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition duration-300 hover:border-rcl-red/60 hover:bg-rcl-elevated hover:shadow-[0_0_36px_rgba(255,32,32,0.12)]"
                    >
                      <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-[4px] border border-white/14 bg-black/35 text-white transition duration-300 group-hover:border-rcl-red/70 group-hover:text-rcl-red group-hover:shadow-[0_0_24px_rgba(255,32,32,0.18)]">
                        <Icon
                          className="h-7 w-7"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="text-lg font-black uppercase text-white">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-rcl-muted">
                        {item.body}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 pb-16 pt-6 md:px-8 md:pb-24">
        <Reveal>
          <div className="final-cta-panel relative overflow-hidden rounded-[6px] border border-white/14 bg-rcl-elevated px-6 py-10 md:px-10 md:py-12">
            <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_70%_50%,rgba(255,32,32,0.22),transparent_34%)] md:block" />
            <RclTechnicalMotif
              variant="panel"
              className="absolute -right-24 top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 opacity-35 md:block"
            />
            <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="mb-5 flex items-center gap-3 text-rcl-red">
                  <Heart className="h-5 w-5" aria-hidden="true" />
                  <p className="text-sm font-black uppercase">Reed Creative Labs</p>
                </div>
                <h2 className="brand-heading max-w-[740px] text-4xl leading-none md:text-6xl">
                  Explore the Lab
                </h2>
                <p className="mt-5 max-w-[540px] text-base leading-8 text-rcl-muted">
                  See the software, games, and tools Reed Creative Labs is
                  releasing, building, and planning next.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row lg:self-end">
                <ButtonLink href="/projects">View Products</ButtonLink>
                <ButtonLink href="/contact" variant="secondary">
                  Contact
                </ButtonLink>
              </div>
            </div>
            <ArrowRight
              className="absolute bottom-6 right-6 h-8 w-8 text-rcl-red/60"
              aria-hidden="true"
            />
          </div>
        </Reveal>
      </section>
    </main>
  );
}
