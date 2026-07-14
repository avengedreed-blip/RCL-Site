import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { FeaturedProjectCard } from "@/components/ProjectCard";
import { RclTechnicalMotif } from "@/components/RclTechnicalMotif";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { featuredProjects } from "@/content/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Reed Creative Labs",
  description:
    "Independent software, games, and tools built for ownership, privacy, and lasting value.",
  path: "/",
  image: {
    url: "/og-image.jpg",
    alt: "Reed Creative Labs social preview with dark, silver, and gold branding.",
    width: 1200,
    height: 630,
  },
});

const philosophy = [
  {
    title: "Privacy By Default",
    body: "Your data stays on your device whenever possible.",
  },
  {
    title: "Offline First",
    body: "Core functionality should work without internet dependence.",
  },
  {
    title: "Ownership Matters",
    body: "Software should feel owned, not rented.",
  },
  {
    title: "Built With Care",
    body: "Thoughtful design. Human-focused experiences.",
  },
];

function HeroOrbitalGraphic() {
  return (
    <div className="hero-orbital" aria-hidden="true">
      <span className="hero-orbital__grid" />
      <span className="hero-orbital__ring hero-orbital__ring--outer" />
      <span className="hero-orbital__ring hero-orbital__ring--mid" />
      <span className="hero-orbital__ring hero-orbital__ring--inner" />
      <span className="hero-orbital__arc hero-orbital__arc--primary" />
      <span className="hero-orbital__arc hero-orbital__arc--secondary" />
    </div>
  );
}

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="hero-section">
        <Reveal className="hero-copy relative z-10">
          <p className="mb-4 text-xs font-black uppercase text-rcl-amber">
            Offline-first software, games, and tools
          </p>
          <h1
            aria-label="Reed Creative Labs"
            className="brand-heading hero-title max-w-[920px] text-6xl leading-[0.92] text-white md:text-7xl lg:text-8xl"
          >
            <span className="block">Reed Creative</span>
            {" "}
            <span className="block">Labs</span>
          </h1>
          <p className="mt-5 max-w-[690px] text-sm leading-7 text-rcl-muted">
            Independent software, games, and tools built for ownership,
            privacy, and lasting value.
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
            <ButtonLink href="/projects">Explore Products</ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              Services
            </ButtonLink>
          </div>
        </Reveal>
        <HeroOrbitalGraphic />
      </section>

      <section
        id="featured"
        className="home-featured-section mx-auto max-w-[1240px] px-5 pb-7 pt-2 md:px-8 md:pb-8 md:pt-3 xl:px-0"
      >
        <Reveal>
          <SectionHeader
            title="Featured Products"
            href="/projects"
            action="View all products"
          />
        </Reveal>
        <div className="grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.06}>
              <FeaturedProjectCard
                project={project}
                variant="gallery"
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 pb-10 pt-0 md:px-8 md:pt-1 xl:px-0">
        <Reveal>
          <div className="surface-panel relative overflow-hidden rounded-[6px] border border-rcl-copper/25 bg-rcl-surface/95 p-6 shadow-[0_0_48px_rgba(0,0,0,0.46)] sm:p-7 md:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.026),transparent_48%),linear-gradient(135deg,transparent_0_76%,rgba(210,115,59,0.06)_78%,transparent_82%)]" />
            <div className="relative z-10 grid gap-7 lg:grid-cols-[0.9fr_auto_1.25fr] lg:items-stretch">
              <div>
                <p className="mb-4 text-xs font-black uppercase text-rcl-amber">
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
                <ButtonLink href="/services" variant="secondary" className="mt-6">
                  Learn More
                </ButtonLink>
              </div>
              <div className="hidden w-px bg-gradient-to-b from-transparent via-rcl-copper/55 to-transparent lg:block" />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="surface-panel rounded-[4px] border border-rcl-copper/16 bg-black/24 p-5">
                  <h3 className="text-sm font-black uppercase text-white">
                    Websites
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-rcl-muted">
                    Polished, mobile-friendly sites for small businesses and creators.
                  </p>
                </div>
                <div className="surface-panel rounded-[4px] border border-rcl-copper/16 bg-black/24 p-5">
                  <h3 className="text-sm font-black uppercase text-white">
                    Custom Software
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-rcl-muted">
                    Focused tools, utilities, simulations, and practical applications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-11 md:px-8 md:py-14 xl:px-0">
        <Reveal>
          <div className="surface-panel philosophy-panel relative overflow-hidden rounded-[6px] border border-rcl-copper/25 bg-rcl-surface/95 p-7 shadow-[0_0_78px_rgba(0,0,0,0.5)] md:p-9">
            <RclTechnicalMotif
              variant="panel"
              className="absolute -right-24 top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 opacity-35 lg:block"
            />
            <div className="relative z-10 grid gap-9 xl:grid-cols-[minmax(0,520px)_minmax(0,1fr)] xl:items-center xl:gap-16">
              <div className="min-w-0 max-w-[520px]">
                <div className="mb-5 flex items-center">
                  <p className="text-sm font-black uppercase text-rcl-amber">
                    Studio Philosophy
                  </p>
                </div>
                <h2 className="brand-heading philosophy-heading text-white">
                  Built Different
                </h2>
                <p className="mt-5 max-w-[500px] text-base leading-8 text-rcl-muted">
                  Local-first thinking, private-by-default design, ownership,
                  and practical craftsmanship guide the work.
                </p>
              </div>
              <div className="grid min-w-0 gap-3 sm:grid-cols-2">
                {philosophy.map((item) => {
                  return (
                    <div
                      key={item.title}
                      className="surface-panel rounded-[6px] border border-rcl-copper/18 bg-rcl-elevated/80 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                    >
                      <h3 className="text-sm font-black uppercase text-white">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-rcl-muted">
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

      <section className="mx-auto max-w-[900px] px-5 pb-16 pt-6 md:px-0 md:pb-24">
        <Reveal>
          <div className="surface-panel final-cta-panel relative overflow-hidden rounded-[6px] border border-rcl-copper/25 bg-rcl-elevated px-6 py-10 md:px-9 md:py-11">
            <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[linear-gradient(128deg,transparent_0_62%,rgba(238,154,82,0.085)_63%,transparent_64%),linear-gradient(90deg,transparent,rgba(255,255,255,0.026),transparent)] md:block" />
            <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="mb-5 text-sm font-black uppercase text-rcl-amber">
                  Reed Creative Labs
                </p>
                <h2 className="brand-heading max-w-[620px] text-4xl leading-none md:text-5xl">
                  Contact the Studio
                </h2>
                <p className="mt-5 max-w-[540px] text-base leading-8 text-rcl-muted">
                  Reach out about products, services, press, or project
                  inquiries.
                </p>
              </div>
              <ButtonLink href="/contact" variant="contact">
                Contact
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
