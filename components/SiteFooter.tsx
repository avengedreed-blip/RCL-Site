import Link from "next/link";
import { Mail } from "lucide-react";
import { Logo } from "@/components/Logo";
import { studioEmail, studioEmailHref } from "@/content/contact";

const footerLinks = [
  { href: "/projects", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/press", label: "Press" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

const socialLinks = [
  { href: studioEmailHref, label: "Email", icon: Mail },
];

export function SiteFooter() {
  return (
    <footer className="footer-shell border-t border-rcl-copper/20 bg-rcl-black">
      <div className="mx-auto grid max-w-[1240px] gap-8 px-5 py-10 md:grid-cols-[1.15fr_1fr_1fr] md:px-8 xl:px-0">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7">
          <Logo className="w-[150px]" />
          <div className="hidden h-12 w-px bg-gradient-to-b from-transparent via-rcl-copper/55 to-transparent sm:block" />
          <p className="max-w-[260px] text-sm leading-6 text-rcl-dim">
            Independent software studio building products, websites, and custom
            tools.
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-5 md:justify-center" aria-label="Footer">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-10 items-center text-xs font-black uppercase text-rcl-muted transition duration-300 hover:text-rcl-amber focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rcl-copper"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-5 md:items-end">
          <div className="flex gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center text-white transition duration-300 hover:-translate-y-0.5 hover:text-rcl-amber focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rcl-copper"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              );
            })}
          </div>
          <a
            href={studioEmailHref}
            className="inline-flex min-h-10 max-w-full items-center text-xs font-black uppercase text-rcl-muted [overflow-wrap:anywhere] transition duration-300 hover:text-rcl-amber focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rcl-copper"
          >
            {studioEmail}
          </a>
          <p className="text-sm leading-6 text-rcl-dim">
            &copy; 2026 Reed Creative Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
