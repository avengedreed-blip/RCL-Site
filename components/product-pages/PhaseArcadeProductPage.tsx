import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { Reveal } from "@/components/Reveal";
import { StructuredData } from "@/components/StructuredData";
import { phaseArcadeGames } from "@/content/phase-arcade";
import type { Project } from "@/content/projects";
import { projectJsonLd } from "@/lib/structured-data";

export function PhaseArcadeProductPage({ project }: { project: Project }) {
  return (
    <main id="main-content" tabIndex={-1}>
      <StructuredData data={projectJsonLd(project)} />

      <section className="mx-auto grid max-w-[1240px] gap-10 px-5 pb-16 pt-12 md:px-8 md:pt-16 lg:grid-cols-[0.86fr_1.14fr] lg:items-center xl:gap-14 xl:px-0">
        <Reveal className="min-w-0">
          <p className="mb-5 text-sm font-black uppercase text-rcl-amber">Coming Soon · Desktop + VR</p>
          <h1 className="brand-heading product-page-title text-white">Phase Arcade Volume I</h1>
          <p className="mt-6 max-w-[720px] text-xl leading-8 text-white">Three focused arcade games in one collection.</p>
          <p className="mt-5 max-w-[740px] text-base leading-8 text-rcl-muted">
            Phase Shift, Phase Breaker, and Phase Court share a fast-session arcade philosophy while keeping distinct movement, survival, and competitive identities.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href="/projects" variant="secondary">All Products</ButtonLink>
            <ButtonLink href="/contact" variant="contact">Contact</ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <figure className="surface-panel overflow-hidden rounded-[6px] border border-rcl-copper/26 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.44)]">
            <div className="relative aspect-[1200/630]">
              <Image src="/images/social/phase-arcade-volume-1.jpg" alt="Phase Arcade Volume I collage showing real Phase Shift, Phase Breaker, and Phase Court gameplay." fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
            </div>
            <figcaption className="border-t border-rcl-copper/18 px-5 py-3 text-xs leading-5 text-rcl-dim">Real desktop captures from the current builds. VR support is represented through product information rather than a simulated headset view.</figcaption>
          </figure>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-8 md:px-8 xl:px-0">
        <Reveal>
          <div className="grid gap-6 border-y border-rcl-copper/20 py-7 sm:grid-cols-3">
            <div><p className="text-xs font-black uppercase text-rcl-dim">Collection</p><p className="mt-2 font-black uppercase text-white">Three Games</p></div>
            <div><p className="text-xs font-black uppercase text-rcl-dim">Play Modes</p><p className="mt-2 font-black uppercase text-white">Desktop + VR</p></div>
            <div><p className="text-xs font-black uppercase text-rcl-dim">Status</p><p className="mt-2 font-black uppercase text-white">Coming Soon</p></div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-12 md:px-8 xl:px-0">
        <Reveal>
          <p className="text-xs font-black uppercase text-rcl-amber">The collection</p>
          <h2 className="mt-4 max-w-[900px] text-3xl font-black uppercase text-white md:text-5xl">One arcade standard, three distinct forms of play</h2>
          <p className="mt-5 max-w-[820px] text-base leading-8 text-rcl-muted">Volume I is built around readable mechanics, short sessions, and the pull of one more run. Each game uses the same broader visual identity without collapsing into the same challenge.</p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 pb-10 md:px-8 xl:px-0">
        <div className="grid gap-14 md:gap-18">
          {phaseArcadeGames.map((game, index) => (
            <Reveal key={game.slug}>
              <article className="grid items-center gap-7 border-t border-rcl-copper/22 pt-8 lg:grid-cols-2 lg:gap-12">
                <figure className={index % 2 ? "lg:order-2" : undefined}>
                  <div className="screenshot-frame relative aspect-video overflow-hidden rounded-[6px] border border-rcl-copper/25 bg-black shadow-[0_20px_68px_rgba(0,0,0,0.38)]">
                    <Image src={game.image} alt={game.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-contain" />
                  </div>
                  <figcaption className="mt-3 text-xs leading-5 text-rcl-dim">Real desktop gameplay capture from the current build.</figcaption>
                </figure>
                <div className={index % 2 ? "lg:order-1" : undefined}>
                  <p className="text-xs font-black uppercase text-rcl-amber">{game.status} · Included Game 0{index + 1}</p>
                  <h2 className="mt-4 text-4xl font-black uppercase text-white md:text-5xl">{game.name}</h2>
                  <p className="mt-5 text-base leading-8 text-white">{game.description}</p>
                  <p className="mt-4 text-sm leading-7 text-rcl-muted">{game.identity}</p>
                  <ButtonLink href={`/projects/${game.slug}`} variant="secondary" className="mt-6">View {game.name}</ButtonLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1240px] gap-8 px-5 py-14 md:px-8 lg:grid-cols-2 xl:px-0">
        <Reveal>
          <div className="surface-panel h-full rounded-[6px] border border-rcl-copper/20 bg-rcl-surface p-7">
            <p className="text-xs font-black uppercase text-rcl-amber">Desktop play</p>
            <h2 className="mt-4 text-3xl font-black uppercase text-white">Traditional arcade sessions</h2>
            <p className="mt-4 text-base leading-8 text-rcl-muted">The collection supports traditional desktop play across all three included games.</p>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="surface-panel h-full rounded-[6px] border border-rcl-copper/20 bg-rcl-surface p-7">
            <p className="text-xs font-black uppercase text-rcl-amber">VR support</p>
            <h2 className="mt-4 text-3xl font-black uppercase text-white">The collection also supports VR</h2>
            <p className="mt-4 text-base leading-8 text-rcl-muted">VR is supported through the collection&apos;s current OpenXR implementation. Specific headset support, certification, and release details have not been announced.</p>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
