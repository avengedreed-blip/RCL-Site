import { Reveal } from "@/components/Reveal";
import type { LegalSection } from "@/content/legal";

type LegalPageProps = {
  sections: LegalSection[];
};

export function LegalPage({ sections }: LegalPageProps) {
  return (
    <section className="v2-container v2-legal-page">
      {sections.map((section, index) => {
        const sectionId = section.title.toLowerCase().replace(/\W+/g, "-");

        return (
          <Reveal key={section.title} delay={Math.min(index * 0.025, 0.1)}>
            <section aria-labelledby={sectionId}>
              <p aria-hidden="true">{String(index + 1).padStart(2, "0")}</p>
              <div>
                <h2 id={sectionId}>{section.title}</h2>
                <div className="v2-legal-page__body">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </section>
          </Reveal>
        );
      })}
    </section>
  );
}
