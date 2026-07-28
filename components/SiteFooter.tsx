import Link from "next/link";
import { Logo } from "@/components/Logo";
import { studioEmail, studioEmailHref } from "@/content/contact";

const studioLinks = [
  { href: "/projects", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/press", label: "Press" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/security", label: "Security" },
];

const disciplines = [
  "Software development",
  "Scientific simulation",
  "AI solutions",
  "Interactive media",
  "Websites",
];

export function SiteFooter() {
  return (
    <footer className="footer-shell material-brushed-metal">
      <div className="v2-container footer-shell__grid">
        <div className="footer-shell__brand">
          <Logo priority />
          <p>
            Reed Creative Labs is a veteran-founded independent software and
            studio.
          </p>
          <p className="footer-shell__location">
            South Carolina · Remote inquiries
          </p>
        </div>
        <div className="footer-shell__column">
          <p className="footer-shell__label">Core disciplines</p>
          <ul className="footer-shell__disciplines">
            {disciplines.map((discipline) => (
              <li key={discipline}>{discipline}</li>
            ))}
          </ul>
        </div>
        <div className="footer-shell__column">
          <p className="footer-shell__label">Studio</p>
          <nav className="footer-shell__nav" aria-label="Studio links">
            {studioLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="footer-shell__link"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="footer-shell__contact">
          <p className="footer-shell__label">Contact</p>
          <a
            href={studioEmailHref}
            className="footer-shell__email"
          >
            {studioEmail}
          </a>
        </div>
      </div>
      <div className="v2-container footer-shell__base">
        <p>&copy; 2026 Reed Creative Labs. All rights reserved.</p>
        <nav className="footer-shell__legal" aria-label="Legal">
          {legalLinks.map((link) => (
            <Link key={link.href} href={link.href} className="footer-shell__link">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
