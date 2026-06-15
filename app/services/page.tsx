import type { Metadata } from "next";
import {
  BadgeCheck,
  CircleSlash,
  Code2,
  Laptop,
  Mail,
  MonitorSmartphone,
  ShieldCheck,
} from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHeader } from "@/components/PageHeader";
import { RclTechnicalMotif } from "@/components/RclTechnicalMotif";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Professional websites and custom software for small businesses, organizations, professionals, and independent creators.",
  path: "/services",
  image: {
    url: "/images/home/red-grid-tech.jpg",
    alt: "Dark red technical grid artwork representing Reed Creative Labs services.",
  },
});

const websiteServices = [
  "Responsive design",
  "Mobile-friendly layouts",
  "Contact links and inquiry paths",
  "Content pages and galleries",
  "Performance-focused development",
  "Accessibility-conscious design",
  "Domain and hosting guidance",
];

const softwareServices = [
  "Internal business tools",
  "Workflow systems",
  "Data management applications",
  "Educational software",
  "Tracking and reporting tools",
  "Specialized tools tailored to unique requirements",
];

const focusAreas = [
  "Informational business websites",
  "Portfolio and professional sites",
  "Landing pages",
  "Standalone desktop applications",
  "Local-first tools",
  "Small custom software utilities",
];

const outOfScope = [
  "Large-scale cloud platforms",
  "Enterprise infrastructure",
  "Custom e-commerce systems",
  "Medical record systems",
  "Financial services software",
  "Social networks or multi-user platforms",
];

const processSteps = [
  {
    title: "Discovery",
    body: "Tell us about your project, goals, and requirements.",
  },
  {
    title: "Planning & Quote",
    body: "The scope is reviewed and a custom quote is provided.",
  },
  {
    title: "Development",
    body: "Your project is designed and built with regular communication throughout the process.",
  },
  {
    title: "Delivery",
    body: "Launch your website or receive your completed software solution.",
  },
];

const faqs = [
  {
    question: "How much does a project cost?",
    answer:
      "Every project is different. Pricing is based on scope, complexity, and requirements.",
  },
  {
    question: "Do you offer maintenance and updates?",
    answer:
      "Yes. Ongoing support and future enhancements can be quoted separately after launch if needed.",
  },
  {
    question: "Do I own the final product?",
    answer:
      "Yes. Clients retain ownership of their website, domain, hosting, and delivered software unless otherwise agreed upon.",
  },
  {
    question: "Do you work remotely?",
    answer: "Yes. Projects can be completed for clients anywhere.",
  },
  {
    question: "Do you build cloud platforms or enterprise systems?",
    answer:
      "Not currently. Reed Creative Labs focuses on websites, standalone applications, and practical software solutions.",
  },
];

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-rcl-muted">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-rcl-red shadow-[0_0_14px_rgba(255,32,32,0.75)]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ServicesPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHeader
        eyebrow="Studio Services"
        title="Services"
        body="Professional websites and custom software for small businesses, organizations, professionals, and independent creators."
      />

      <section className="mx-auto max-w-[1500px] px-5 pb-8 md:px-8 md:pb-12">
        <Reveal>
          <div className="relative overflow-hidden rounded-[6px] border border-white/14 bg-rcl-surface p-6 shadow-[0_0_72px_rgba(0,0,0,0.38)] transition duration-300 ease-out hover:shadow-[0_0_84px_rgba(0,0,0,0.44),0_0_28px_rgba(255,32,32,0.08)] sm:p-8 md:p-10">
            <RclTechnicalMotif
              className="absolute -right-24 top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 opacity-30 md:block"
              variant="panel"
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(255,32,32,0.16),transparent_34%),linear-gradient(90deg,rgba(255,255,255,0.04),transparent_52%)]" />
            <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="max-w-[800px] text-base leading-8 text-rcl-muted md:text-lg md:leading-9">
                  Reed Creative Labs builds practical digital tools with a
                  focus on quality, usability, ownership, and long-term
                  maintainability.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <ButtonLink href="/contact">Request a Quote</ButtonLink>
                <ButtonLink href="/projects" variant="secondary">
                  View Products
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 py-10 md:px-8">
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="min-h-full rounded-[6px] border border-white/12 bg-rcl-surface p-6 transition duration-300 ease-out hover:-translate-y-0.5 hover:border-rcl-red/45 hover:bg-rcl-elevated hover:shadow-[0_14px_44px_rgba(0,0,0,0.24)] sm:p-8">
              <MonitorSmartphone
                className="mb-8 h-8 w-8 text-rcl-red"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h2 className="text-3xl font-black uppercase text-white">
                Websites for Small Businesses
              </h2>
              <p className="mt-5 text-base leading-8 text-rcl-muted">
                Whether you are launching something new, refreshing an outdated
                website, or establishing an online presence for the first time,
                Reed Creative Labs can help bring your vision to life.
              </p>
              <div className="mt-7">
                <FeatureList items={websiteServices} />
              </div>
              <div className="mt-8 rounded-[4px] border border-rcl-red/35 bg-rcl-red/[0.08] p-5">
                <ShieldCheck
                  className="mb-4 h-6 w-6 text-rcl-red"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <p className="text-sm font-black uppercase text-white">
                  You own your website, domain, and hosting.
                </p>
                <p className="mt-2 text-sm leading-6 text-rcl-muted">
                  No subscriptions. No vendor lock-in.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="min-h-full rounded-[6px] border border-white/12 bg-rcl-surface p-6 transition duration-300 ease-out hover:-translate-y-0.5 hover:border-rcl-red/45 hover:bg-rcl-elevated hover:shadow-[0_14px_44px_rgba(0,0,0,0.24)] sm:p-8">
              <Code2
                className="mb-8 h-8 w-8 text-rcl-red"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h2 className="text-3xl font-black uppercase text-white">
                Custom Software
              </h2>
              <p className="mt-5 text-base leading-8 text-rcl-muted">
                Purpose-built software designed around your unique needs. From
                internal business tools to standalone desktop applications, Reed
                Creative Labs develops software that prioritizes usability,
                maintainability, and long-term value.
              </p>
              <div className="mt-7">
                <FeatureList items={softwareServices} />
              </div>
              <div className="mt-8 rounded-[4px] border border-white/12 bg-black/25 p-5">
                <Laptop
                  className="mb-4 h-6 w-6 text-rcl-red"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <p className="text-sm font-black uppercase text-white">
                  Local-first when practical
                </p>
                <p className="mt-2 text-sm leading-6 text-rcl-muted">
                  Whenever practical, software is built with a local-first
                  approach that reduces unnecessary complexity and keeps you in
                  control of your data.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 py-10 md:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Reveal>
              <SectionHeader title="What We Focus On" />
              <p className="mb-7 max-w-[720px] text-base leading-8 text-rcl-muted">
                Reed Creative Labs focuses on practical, maintainable projects
                that can be delivered responsibly.
              </p>
            </Reveal>
            <div className="grid gap-3">
              {focusAreas.map((item, index) => (
                <Reveal key={item} delay={index * 0.035}>
                  <div className="flex items-center gap-4 rounded-[6px] border border-white/10 bg-rcl-surface px-5 py-4">
                    <BadgeCheck
                      className="h-5 w-5 shrink-0 text-rcl-red"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <p className="text-sm font-bold text-white">{item}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <Reveal>
              <SectionHeader title="What We Do Not Currently Offer" />
              <p className="mb-7 max-w-[720px] text-base leading-8 text-rcl-muted">
                Some projects require infrastructure, compliance, or security
                support beyond the current scope of Reed Creative Labs.
              </p>
            </Reveal>
            <div className="grid gap-3">
              {outOfScope.map((item, index) => (
                <Reveal key={item} delay={index * 0.035}>
                  <div className="flex items-center gap-4 rounded-[6px] border border-white/10 bg-rcl-surface px-5 py-4">
                    <CircleSlash
                      className="h-5 w-5 shrink-0 text-rcl-dim"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <p className="text-sm font-bold text-rcl-muted">{item}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.18}>
              <p className="mt-6 border-l border-rcl-red/70 pl-5 text-sm leading-7 text-rcl-muted">
                If a project falls outside the current scope, Reed Creative Labs
                will be honest about it.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 py-10 md:px-8">
        <Reveal>
          <SectionHeader title="Project Process" />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.05}>
              <div className="min-h-[230px] rounded-[6px] border border-white/12 bg-rcl-surface p-6 transition duration-300 ease-out hover:-translate-y-0.5 hover:border-white/20 hover:shadow-[0_12px_34px_rgba(0,0,0,0.22)]">
                <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-[4px] border border-white/12 bg-black/30 text-sm font-black text-rcl-red">
                  {index + 1}
                </div>
                <h3 className="text-lg font-black uppercase text-white">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-rcl-muted">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 py-10 md:px-8">
        <Reveal>
          <SectionHeader title="Frequently Asked Questions" />
        </Reveal>
        <div className="grid gap-4 lg:grid-cols-2">
          {faqs.map((faq, index) => (
            <Reveal key={faq.question} delay={index * 0.04}>
              <div className="min-h-full rounded-[6px] border border-white/12 bg-rcl-surface p-6 transition duration-300 ease-out hover:border-white/20 hover:shadow-[0_12px_34px_rgba(0,0,0,0.2)]">
                <h3 className="text-base font-black uppercase text-white">
                  {faq.question}
                </h3>
                <p className="mt-4 text-sm leading-7 text-rcl-muted">
                  {faq.answer}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 pb-20 pt-10 md:px-8 md:pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[6px] border border-white/14 bg-rcl-elevated p-6 shadow-[0_0_72px_rgba(0,0,0,0.42)] transition duration-300 ease-out hover:shadow-[0_0_86px_rgba(0,0,0,0.48),0_0_30px_rgba(255,32,32,0.1)] sm:p-8 md:p-10">
            <RclTechnicalMotif
              className="absolute -right-24 top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 opacity-30 md:block"
              variant="panel"
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_45%,rgba(255,32,32,0.2),transparent_34%)]" />
            <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <Mail
                  className="mb-7 h-8 w-8 text-rcl-red"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h2 className="brand-heading max-w-[760px] text-4xl leading-none text-white md:text-6xl">
                  Have a project in mind?
                </h2>
                <p className="mt-5 max-w-[720px] text-base leading-8 text-rcl-muted">
                  Whether you need a professional website, a custom application,
                  or a unique software solution, Reed Creative Labs would be
                  happy to hear about it.
                </p>
              </div>
              <ButtonLink href="/contact">Request a Quote</ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
