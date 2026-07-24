import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { StructuredData } from "@/components/StructuredData";
import { founderStory } from "@/content/founders";
import { buildMetadata } from "@/lib/seo";
import { founderPersonJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "The People Behind Reed Creative Labs",
  description:
    "Meet Aaron and Katy Reed, the husband-and-wife team building Reed Creative Labs: an independent studio focused on privacy-conscious software, creative tools, and small, memorable games.",
  path: "/about/founder",
  image: {
    url: "/social-preview.jpg",
    alt: "Reed Creative Labs dark, silver, and gold studio preview.",
    width: 1200,
    height: 630,
  },
});

export default function FounderPage() {
  return (
    <main id="main-content" tabIndex={-1} className="v2-info-page v2-founder-page">
      <StructuredData data={founderPersonJsonLd()} />
      <PageHeader
        eyebrow="Studio Story"
        title={founderStory.hero.title}
        body={founderStory.hero.subtitle}
      />

      <section className="v2-container v2-founder-profiles">
        <h2 className="sr-only">Founder profiles</h2>
        {founderStory.founders.map((founder, index) => {
          return (
            <Reveal key={founder.name} delay={index * 0.06}>
              <article>
                <div className="v2-founder-profile__identity">
                  <p className="v2-eyebrow">{founder.title}</p>
                  <h3>{founder.name}</h3>
                </div>
                <div className="v2-founder-profile__body">
                  {"intro" in founder ? (
                    <p className="v2-founder-profile__intro">{founder.intro}</p>
                  ) : null}
                  {founder.bio.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {"quote" in founder ? (
                    <blockquote>&quot;{founder.quote}&quot;</blockquote>
                  ) : null}
                </div>
              </article>
            </Reveal>
          );
        })}
      </section>

      <section className="v2-section-band">
        <Reveal className="v2-container v2-family-studio">
          <div>
            <p className="v2-eyebrow">Family-built studio</p>
            <h2>{founderStory.familyBuilt.heading}</h2>
          </div>
          <div className="v2-family-studio__body">
            {founderStory.familyBuilt.body.map((paragraph) => (
              <p
                key={paragraph}
                className={
                  paragraph === "That reality shapes the way we build."
                    ? "v2-family-studio__emphasis"
                    : undefined
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="v2-container v2-founder-support">
        <Reveal>
          <h2>{founderStory.support.heading}</h2>
          <p>{founderStory.support.copy}</p>
          <div className="v2-action-row">
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
        </Reveal>
      </section>
    </main>
  );
}
