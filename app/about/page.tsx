import type { Metadata } from "next";
import { Archive, LockKeyhole, ScanLine, UsersRound, WifiOff } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHeader } from "@/components/PageHeader";
import { RclTechnicalMotif } from "@/components/RclTechnicalMotif";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Reed Creative Labs is an independent creative technology studio building privacy-conscious software, games, educational tools, websites, and custom software.",
  path: "/about",
  image: {
    url: "/images/home/rcl-technical-orb.jpg",
    alt: "Red technical circular graphic representing the Reed Creative Labs operating philosophy.",
  },
});

const principles = [
  {
    title: "Offline First",
    body: "The best tools should keep working when the network does not.",
    icon: WifiOff,
  },
  {
    title: "Privacy By Default",
    body: "Products should not require surrendering personal data to become useful.",
    icon: LockKeyhole,
  },
  {
    title: "Ownership Matters",
    body: "People should own the things they buy and keep access to their work.",
    icon: Archive,
  },
  {
    title: "Focused Design",
    body: "The interface should support the work, not compete with it.",
    icon: ScanLine,
  },
];

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHeader
        eyebrow="About"
        title="A creative technology studio with one standard"
        body="Reed Creative Labs builds software, games, and tools that respect time, privacy, and ownership. The products are different on purpose. The principles are shared."
      />

      <section className="mx-auto max-w-[1240px] px-5 py-8 md:px-8 xl:px-0">
        <Reveal>
          <div className="grid gap-8 border-y border-rcl-copper/18 py-10 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-black uppercase text-rcl-amber">
                Studio identity
              </p>
              <h2 className="mt-5 text-3xl font-black uppercase text-white md:text-4xl">
                Software company. Game studio. Creative technology lab.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-8 text-rcl-muted">
              <p>
                Reed Creative Labs is built as a long-term brand, not a hobby
                page or portfolio wrapper. The studio makes serious products
                with a consistent point of view.
              </p>
              <p>
                The work ranges from private software like Echo to arcade
                collections like Phase Arcade, but the same principles guide the
                whole catalog: local control, clean interaction, durable value,
                and restrained presentation.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-8 md:px-8 xl:px-0">
        <Reveal>
          <div className="surface-panel relative overflow-hidden rounded-[6px] border border-rcl-copper/18 bg-rcl-surface p-6 shadow-[0_12px_38px_rgba(0,0,0,0.18)] transition duration-300 ease-out hover:border-rcl-copper/50 hover:shadow-[0_16px_48px_rgba(0,0,0,0.24)] sm:p-8 md:grid md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-10">
            <RclTechnicalMotif
              className="right-[-20%] top-[-38%] h-[380px] w-[380px] opacity-30"
              variant="compact"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(132deg,transparent_0_76%,rgba(238,154,82,0.055)_77%,transparent_78.2%),linear-gradient(90deg,rgba(255,255,255,0.024),transparent_45%)]" />
            <div className="relative">
              <UsersRound
                className="mb-7 h-8 w-8 text-rcl-amber"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <p className="text-sm font-black uppercase text-rcl-amber">
                Founder story
              </p>
              <h2 className="brand-heading mt-4 text-3xl leading-none text-white sm:text-4xl">
                The People Behind Reed Creative Labs
              </h2>
            </div>
            <div className="relative mt-6 md:mt-0">
              <p className="max-w-[760px] text-base leading-8 text-rcl-muted">
                Meet Aaron and Katy Reed, the husband-and-wife team building
                Reed Creative Labs around real life, full-time work, and a
                belief that small teams can still build meaningful things.
              </p>
              <ButtonLink href="/about/founder" variant="secondary" className="mt-7">
                Read the Story
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-12 md:px-8 md:pb-20 xl:px-0">
        <Reveal>
          <SectionHeader title="Principles" />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-4">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <Reveal key={principle.title} delay={index * 0.06}>
                <div className="surface-panel min-h-[240px] rounded-[6px] border border-rcl-copper/18 bg-rcl-surface p-6 transition duration-300 ease-out hover:-translate-y-0.5 hover:border-rcl-copper/45 hover:bg-rcl-elevated hover:shadow-[0_12px_36px_rgba(0,0,0,0.22)]">
                  <Icon
                    className="mb-8 h-8 w-8 text-rcl-amber"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <h3 className="font-black uppercase text-white">
                    {principle.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-rcl-muted">
                    {principle.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </main>
  );
}
