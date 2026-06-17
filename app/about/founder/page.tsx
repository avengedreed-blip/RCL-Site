import type { Metadata } from "next";
import { Compass, Hammer, HeartHandshake, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHeader } from "@/components/PageHeader";
import { RclTechnicalMotif } from "@/components/RclTechnicalMotif";
import { Reveal } from "@/components/Reveal";
import { founderStory } from "@/content/founders";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "The People Behind Reed Creative Labs",
  description:
    "Meet Aaron and Katy Reed, the husband-and-wife team building Reed Creative Labs: an independent studio focused on privacy-conscious software, creative tools, and small, memorable games.",
  path: "/about/founder",
  image: {
    url: "/images/home/rcl-technical-orb.jpg",
    alt: "Red technical circular graphic representing the Reed Creative Labs studio story.",
  },
});

const founderIcons = [Hammer, Sparkles] as const;

export default function FounderPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHeader
        eyebrow="Studio Story"
        title={founderStory.hero.title}
        body={founderStory.hero.subtitle}
      />

      <section className="mx-auto max-w-[1240px] px-5 py-8 md:px-8 xl:px-0">
        <h2 className="sr-only">Founder profiles</h2>
        <div className="grid gap-5 lg:grid-cols-2">
          {founderStory.founders.map((founder, index) => {
            const Icon = founderIcons[index] ?? Compass;
            return (
              <Reveal key={founder.name} delay={index * 0.06}>
                <article className="surface-panel relative min-h-full overflow-hidden rounded-[6px] border border-rcl-copper/18 bg-rcl-surface p-6 transition duration-300 ease-out hover:-translate-y-0.5 hover:border-rcl-copper/55 hover:bg-rcl-elevated hover:shadow-[0_14px_42px_rgba(0,0,0,0.24)] sm:p-8">
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(132deg,rgba(255,255,255,0.03),transparent_38%),linear-gradient(28deg,transparent_0_72%,rgba(238,154,82,0.05)_73%,transparent_74.2%)]" />
                  <div className="relative">
                    <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-[4px] border border-rcl-copper/40 bg-rcl-copper/8 text-rcl-amber shadow-[0_0_20px_rgba(210,115,59,0.1)]">
                      <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                    </div>
                      <p className="text-sm font-black uppercase text-rcl-amber">
                      {founder.title}
                    </p>
                    <h3 className="brand-heading mt-4 text-4xl leading-none text-white sm:text-5xl">
                      {founder.name}
                    </h3>
                    {"intro" in founder ? (
                      <p className="mt-7 text-xl font-black text-white">
                        {founder.intro}
                      </p>
                    ) : null}
                    <div className="mt-5 space-y-5 text-base leading-8 text-rcl-muted">
                      {founder.bio.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    {"quote" in founder ? (
                      <blockquote className="mt-7 border-l-2 border-rcl-copper pl-5 text-xl font-black leading-8 text-white">
                        &quot;{founder.quote}&quot;
                      </blockquote>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-10 md:px-8 md:py-14 xl:px-0">
        <Reveal>
          <div className="surface-panel relative overflow-hidden rounded-[6px] border border-rcl-copper/18 bg-rcl-surface p-6 shadow-[0_12px_38px_rgba(0,0,0,0.18)] transition duration-300 ease-out hover:border-rcl-copper/50 hover:shadow-[0_16px_48px_rgba(0,0,0,0.24)] sm:p-8 lg:grid lg:grid-cols-[0.78fr_1.22fr] lg:gap-12 lg:p-10">
            <RclTechnicalMotif
              className="right-[-18%] top-[-24%] h-[460px] w-[460px] opacity-35"
              variant="panel"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.94),rgba(5,5,5,0.78)_52%,rgba(8,10,12,0.62)),linear-gradient(132deg,transparent_0_76%,rgba(238,154,82,0.052)_77%,transparent_78.5%)]" />
            <div className="relative">
              <p className="text-sm font-black uppercase text-rcl-amber">
                Family-Built Studio
              </p>
              <h2 className="brand-heading mt-5 text-4xl leading-none text-white sm:text-5xl md:text-6xl">
                {founderStory.familyBuilt.heading}
              </h2>
            </div>
            <div className="relative mt-8 space-y-5 text-base leading-8 text-rcl-muted lg:mt-0">
              {founderStory.familyBuilt.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className={
                    paragraph === "That reality shapes the way we build."
                      ? "font-black uppercase text-white"
                      : undefined
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 pb-20 pt-8 md:px-8 xl:px-0">
        <Reveal>
          <div className="grid gap-8 border-t border-rcl-copper/18 pt-10 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div>
              <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-[4px] border border-rcl-copper/45 bg-rcl-copper/10 text-rcl-amber">
                <HeartHandshake
                  className="h-6 w-6"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>
              <h2 className="brand-heading text-4xl leading-none text-white sm:text-5xl">
                {founderStory.support.heading}
              </h2>
            </div>
            <div>
              <p className="max-w-[760px] text-base leading-8 text-rcl-muted">
                {founderStory.support.copy}
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                {founderStory.support.ctas.map((cta) => (
                  <ButtonLink
                    key={cta.href}
                    href={cta.href}
                    variant={cta.href === "/contact" ? "contact" : cta.variant}
                  >
                    {cta.label}
                  </ButtonLink>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
