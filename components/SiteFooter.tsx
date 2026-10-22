import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ButtonLink } from "@/components/ButtonLink";
import { studioEmail, studioEmailHref } from "@/content/contact";

const hireLinks = [
  { href: "/services", label: "Services" },
  { href: "/agency-partners", label: "Agency Partnerships" },
  { href: "/work", label: "Work / Portfolio" },
  { href: "/contact", label: "Start a Project" },
];

const studioLinks = [
  { href: "/products", label: "Games & Products" },
  { href: "/science-lab", label: "Science Lab" },
  { href: "/about", label: "About" },
  { href: "/press", label: "Press" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/security", label: "Security" },
];

export function SiteFooter() {
  return (
    <footer className="footer-shell material-brushed-metal">
      <div className="v2-container footer-shell__grid">
        <div className="footer-shell__brand">
          <Logo priority />
          <p>
            Reed Creative Labs is a veteran-founded independent software and
            engineering studio.
          </p>
          <p className="footer-shell__location">
            South Carolina · Remote-first · US nationwide
          </p>
        </div>
        <div className="footer-shell__column">
          <p className="footer-shell__label">Hire RCL</p>
          <nav className="footer-shell__nav" aria-label="Hire RCL links">
            {hireLinks.map((link) => (
              <Link key={link.href} href={link.href} className="footer-shell__link">{link.label}</Link>
            ))}
          </nav>
        </div>
        <div className="footer-shell__column">
          <p className="footer-shell__label">Explore RCL</p>
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
          <nav className="footer-shell__social" aria-label="Follow Reed Creative Labs">
            <ButtonLink href="https://www.tiktok.com/@reedcreativelabs" variant="secondary">
              TikTok
            </ButtonLink>
            <ButtonLink href="https://www.facebook.com/profile.php?id=61593075719365" variant="secondary">
              Facebook
            </ButtonLink>
            <ButtonLink href="https://www.youtube.com/@ReedCreativeLabs" variant="secondary" aria-label="Reed Creative Labs YouTube channel">
              YouTube
            </ButtonLink>
          </nav>
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
