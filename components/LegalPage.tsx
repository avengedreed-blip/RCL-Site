import { Reveal } from "@/components/Reveal";
import type { LegalSection } from "@/content/legal";

type LegalPageProps = {
  sections: LegalSection[];
};

export function LegalPage({ sections }: LegalPageProps) {
  return (
    <section className="mx-auto max-w-[980px] px-5 pb-20 pt-2 md:px-8 xl:px-0">
      <Reveal>
        <div className="surface-panel rounded-[6px] border border-rcl-copper/22 bg-rcl-surface p-6 shadow-[0_12px_38px_rgba(0,0,0,0.18)] sm:p-8">
          <div className="grid gap-9">
            {sections.map((section) => {
              const sectionId = section.title.toLowerCase().replace(/\W+/g, "-");

              return (
                <section key={section.title} aria-labelledby={sectionId}>
                  <h2
                    id={sectionId}
                    className="text-xl font-black uppercase text-white"
                  >
                    {section.title}
                  </h2>
                  <div className="mt-4 grid gap-4 text-base leading-8 text-rcl-muted">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
