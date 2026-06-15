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
  image: {
    url: "/images/home/red-floor-glow.jpg",
    alt: "Dark Reed Creative Labs red floor glow visual used for studio contact pages.",
  },
});

const contacts = [
  {
    label: "Studio Email",
    href: studioEmailHref,
    value: studioEmail,
    body: "Use this address for press, support, business, product, and general studio inquiries.",
  },
];

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHeader
        eyebrow="Contact"
        title="Reach the studio directly"
        body="For press, support, business, and general inquiries, contact Reed Creative Labs directly by email."
      />

      <section className="mx-auto max-w-[1500px] px-5 pb-20 pt-8 md:px-8">
        <div className="grid gap-4 md:grid-cols-[minmax(0,0.78fr)]">
          {contacts.map((contact, index) => (
            <Reveal key={contact.label} delay={index * 0.06}>
              <div className="block min-h-[260px] min-w-0 rounded-[6px] border border-white/14 bg-rcl-surface p-6 transition duration-300 ease-out hover:-translate-y-0.5 hover:border-rcl-red/70 hover:bg-rcl-elevated hover:shadow-[0_14px_44px_rgba(0,0,0,0.24)] sm:p-7">
                <Mail
                  className="mb-8 h-8 w-8 text-rcl-red"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <p className="text-sm font-black uppercase text-rcl-red">
                  {contact.label}
                </p>
                <a
                  href={contact.href}
                  className="mt-4 inline-flex max-w-full text-lg font-black text-white [overflow-wrap:anywhere] transition duration-300 hover:text-rcl-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rcl-red sm:text-2xl"
                >
                  {contact.value}
                </a>
                <div className="mt-5 rounded-[4px] border border-white/10 bg-black/25 p-4">
                  <p className="text-xs font-black uppercase text-rcl-dim">
                    Plain-text email
                  </p>
                  <code className="mt-2 block text-sm font-bold text-white [overflow-wrap:anywhere]">
                    {contact.value}
                  </code>
                </div>
                <p className="mt-5 text-base leading-8 text-rcl-muted">
                  {contact.body}
                </p>
              </div>
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
              on-site contact form. Direct email keeps communication simple and
              avoids unnecessary data collection.
            </p>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
