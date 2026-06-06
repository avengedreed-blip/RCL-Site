import type { Metadata } from "next";
import { Archive, LockKeyhole, ScanLine, WifiOff } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Reed Creative Labs is an independent software and game studio building offline-first products with privacy and ownership at the center.",
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
    <main>
      <PageHeader
        eyebrow="About"
        title="A creative technology studio with one standard"
        body="Reed Creative Labs builds software, games, and tools that respect time, privacy, and ownership. The products are different on purpose. The principles are shared."
      />

      <section className="mx-auto max-w-[1500px] px-5 py-8 md:px-8">
        <Reveal>
          <div className="grid gap-8 border-y border-white/10 py-10 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-black uppercase text-rcl-red">
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

      <section className="mx-auto max-w-[1500px] px-5 py-12 md:px-8 md:pb-20">
        <Reveal>
          <SectionHeader title="Principles" />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-4">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <Reveal key={principle.title} delay={index * 0.06}>
                <div className="min-h-[240px] rounded-[6px] border border-white/12 bg-rcl-surface p-6">
                  <Icon
                    className="mb-8 h-8 w-8 text-rcl-red"
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
