import type { Metadata } from "next";
import { Mail, MessageSquareText } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { studioEmail, studioEmailHref } from "@/content/contact";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact Reed Creative Labs for product, press, and studio inquiries.",
  path: "/contact",
});

const contacts = [
  {
    label: "Studio Email",
    href: studioEmailHref,
    value: studioEmail,
    body: "Use this address for product questions, press requests, studio inquiries, and general communication until dedicated addresses are configured.",
  },
];

export default function ContactPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Contact"
        title="Reach the studio directly"
        body="No contact form and no account system. Just direct studio contact for the right kind of inquiry."
      />

      <section className="mx-auto max-w-[1500px] px-5 pb-20 pt-8 md:px-8">
        <div className="grid gap-4 md:grid-cols-[minmax(0,0.78fr)]">
          {contacts.map((contact, index) => (
            <Reveal key={contact.label} delay={index * 0.06}>
              <a
                href={contact.href}
                className="group block min-h-[260px] min-w-0 rounded-[6px] border border-white/14 bg-rcl-surface p-6 transition hover:border-rcl-red/70 hover:bg-rcl-elevated sm:p-7"
              >
                <Mail
                  className="mb-8 h-8 w-8 text-rcl-red"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <p className="text-sm font-black uppercase text-rcl-red">
                  {contact.label}
                </p>
                <h2 className="mt-4 max-w-full text-lg font-black text-white [overflow-wrap:anywhere] sm:text-2xl">
                  {contact.value}
                </h2>
                <p className="mt-5 text-base leading-8 text-rcl-muted">
                  {contact.body}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.12}>
          <div className="mt-8 flex items-start gap-5 border-t border-white/10 pt-8 text-rcl-muted">
            <MessageSquareText
              className="mt-1 h-6 w-6 shrink-0 text-rcl-red"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <p className="max-w-[760px] text-sm leading-7">
              Reed Creative Labs does not run a public account system or
              on-site contact form. Direct email keeps communication simple
              while the studio prepares its first public releases.
            </p>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
