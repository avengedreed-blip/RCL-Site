import { CheckCircle2, CircleDashed } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { Reveal } from "@/components/Reveal";
import { StructuredData } from "@/components/StructuredData";
import type { Project } from "@/content/projects";
import {
  forgeAudience,
  forgeColleagues,
  forgeDevelopmentState,
  forgeWorkflow,
} from "@/content/forge";
import { projectJsonLd } from "@/lib/structured-data";

export function ForgeProductPage({ project }: { project: Project }) {
  return (
    <main id="main-content" tabIndex={-1}>
      <StructuredData data={projectJsonLd(project)} />

      <section className="mx-auto grid max-w-[1240px] gap-10 px-5 pb-16 pt-12 md:px-8 md:pt-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,1.08fr)] lg:items-center xl:gap-16 xl:px-0">
        <Reveal className="min-w-0">
          <p className="mb-5 text-sm font-black uppercase text-rcl-amber">
            Active Development · Flagship Software
          </p>
          <h1 className="brand-heading product-page-title text-white">Forge</h1>
          <p className="mt-6 max-w-[700px] text-xl leading-8 text-white">
            Serious engineering work, kept in context.
          </p>
          <p className="mt-5 max-w-[720px] text-base leading-8 text-rcl-muted">
            Forge is a software-engineering environment for sustained work on real
            repositories. It brings project understanding, planning, implementation,
            review, and validation into one continuous working thread.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href="/projects" variant="secondary">All Products</ButtonLink>
            <ButtonLink href="/contact" variant="contact">Follow Development</ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="surface-panel relative min-h-[360px] overflow-hidden rounded-[6px] border border-rcl-copper/28 bg-rcl-elevated p-7 shadow-[0_24px_80px_rgba(0,0,0,0.42)] sm:min-h-[430px] sm:p-10">
            <div className="abstract-product-visual absolute inset-0 opacity-70" data-abstract-visual="forge" aria-hidden="true" />
            <div className="relative z-10 flex min-h-[300px] flex-col justify-between sm:min-h-[350px]">
              <div className="flex justify-end">
                <span className="rounded-[3px] border border-rcl-copper/28 bg-black/30 px-3 py-2 text-xs font-black uppercase text-rcl-amber">
                  Active Development
                </span>
              </div>
              <div className="max-w-[560px] border-t border-rcl-copper/24 pt-7">
                <p className="text-xs font-black uppercase text-rcl-amber">Product media</p>
                <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
                  Interface preview coming soon
                </h2>
                <p className="mt-4 max-w-[500px] text-sm leading-7 text-rcl-muted">
                  Forge is in active development. Approved interface captures will be
                  added as the product approaches its public preview.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-10 md:px-8 xl:px-0">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <p className="text-xs font-black uppercase text-rcl-amber">What Forge is</p>
            <h2 className="mt-4 text-3xl font-black uppercase text-white md:text-4xl">
              A workspace for the whole engineering thread
            </h2>
            <p className="mt-5 text-base leading-8 text-rcl-muted">
              Forge is not positioned as a disposable prompt window or a model picker.
              The product is organized around one continuing project conversation where
              plans, evidence, files, proposed changes, approvals, and results remain
              connected.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="text-xs font-black uppercase text-rcl-amber">Why it exists</p>
            <h2 className="mt-4 text-3xl font-black uppercase text-white md:text-4xl">
              Keep context attached to the work
            </h2>
            <p className="mt-5 text-base leading-8 text-rcl-muted">
              Software work stretches across architecture decisions, defects, diffs,
              tests, and repeated review. Forge is being built to preserve that history,
              reduce repeated setup, and make consequential actions visible before they
              are applied.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-12 md:px-8 xl:px-0">
        <Reveal>
          <p className="text-xs font-black uppercase text-rcl-amber">Core workflow</p>
          <h2 className="mt-4 max-w-[850px] text-3xl font-black uppercase text-white md:text-5xl">
            From understanding to verified change
          </h2>
        </Reveal>
        <ol className="mt-8 grid gap-3 md:grid-cols-5">
          {forgeWorkflow.map((stage, index) => (
            <li key={stage.title} className="surface-panel rounded-[6px] border border-rcl-copper/18 bg-rcl-surface p-5">
              <span className="text-xs font-black text-rcl-amber">0{index + 1}</span>
              <h3 className="mt-4 text-lg font-black uppercase text-white">{stage.title}</h3>
              <p className="mt-3 text-sm leading-6 text-rcl-muted">{stage.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto grid max-w-[1240px] gap-8 px-5 py-12 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 xl:px-0">
        <Reveal>
          <div className="border-t border-rcl-copper/26 pt-6">
            <h2 className="text-3xl font-black uppercase text-white">Repository and project work</h2>
            <p className="mt-5 text-base leading-8 text-rcl-muted">
              Forge can discover a local project, inspect files, preserve per-project
              context, and present proposed changes through review and approval surfaces.
              The design favors cited files and visible diffs over unsupported summaries.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="border-t border-rcl-copper/26 pt-6">
            <h2 className="text-3xl font-black uppercase text-white">Models, tools, and user control</h2>
            <p className="mt-5 text-base leading-8 text-rcl-muted">
              Forge coordinates supported reasoning engines and tools inside a consistent
              project workspace. Third-party models remain third-party services, and data
              sent to a configured cloud provider is governed by that provider. Local
              project state and credentials are handled on the device; consequential file
              changes remain subject to the user&apos;s approval and configured autonomy.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-12 md:px-8 xl:px-0">
        <Reveal>
          <p className="text-xs font-black uppercase text-rcl-amber">Engineering colleagues</p>
          <h2 className="mt-4 max-w-[900px] text-3xl font-black uppercase text-white md:text-5xl">
            One workspace, three working approaches
          </h2>
          <p className="mt-5 max-w-[820px] text-base leading-8 text-rcl-muted">
            Dale, Iris, and Victor are selectable engineering personalities applied
            across supported models. They shape communication and working approach;
            they are not separate foundational models. Dale is the default.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {forgeColleagues.map((colleague) => (
            <Reveal key={colleague.name}>
              <article className="surface-panel h-full rounded-[6px] border border-rcl-copper/20 bg-rcl-surface p-6">
                <p className="text-xs font-black uppercase text-rcl-amber">{colleague.role}</p>
                <h3 className="mt-4 text-2xl font-black uppercase text-white">{colleague.name}</h3>
                <p className="mt-4 text-sm leading-7 text-rcl-muted">{colleague.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1240px] gap-10 px-5 py-12 md:px-8 lg:grid-cols-[1fr_0.9fr] xl:px-0">
        <Reveal>
          <p className="text-xs font-black uppercase text-rcl-amber">Current development state</p>
          <h2 className="mt-4 text-3xl font-black uppercase text-white md:text-5xl">Built in public terms, without pretending it is finished</h2>
          <div className="mt-7 grid gap-4">
            {forgeDevelopmentState.map((item, index) => (
              <div key={item.label} className="flex gap-4 border-t border-rcl-copper/20 pt-5">
                {index === 0 ? <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-rcl-amber" aria-hidden="true" /> : <CircleDashed className="mt-1 h-5 w-5 shrink-0 text-rcl-amber" aria-hidden="true" />}
                <div>
                  <h3 className="font-black uppercase text-white">{item.label}</h3>
                  <p className="mt-2 text-sm leading-7 text-rcl-muted">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="surface-panel rounded-[6px] border border-rcl-copper/22 bg-rcl-elevated p-7">
            <p className="text-xs font-black uppercase text-rcl-amber">Intended audience</p>
            <h2 className="mt-4 text-3xl font-black uppercase text-white">For engineers with real code to maintain</h2>
            <ul className="mt-6 grid gap-4 text-sm leading-7 text-rcl-muted">
              {forgeAudience.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[900px] px-5 pb-20 pt-10 md:px-8 md:pb-24">
        <Reveal>
          <div className="surface-panel rounded-[6px] border border-rcl-copper/26 bg-rcl-elevated p-7 text-center md:p-10">
            <p className="text-xs font-black uppercase text-rcl-amber">Development inquiry</p>
            <h2 className="mt-4 text-3xl font-black uppercase text-white md:text-4xl">See what Reed Creative Labs is building</h2>
            <p className="mx-auto mt-4 max-w-[620px] text-base leading-8 text-rcl-muted">
              Forge remains in active development. Contact the studio for product or press inquiries.
            </p>
            <ButtonLink href="/contact" variant="contact" className="mt-7">Contact the Studio</ButtonLink>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
