"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const primaryNavItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function isCurrentPath(pathname: string, href: string) {
  return href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();

  return (
    <nav
      className={
        mobile
          ? "site-nav site-nav--mobile v2-container"
          : "site-nav site-nav--desktop"
      }
      aria-label={mobile ? "Mobile navigation" : "Primary navigation"}
    >
      {primaryNavItems.map((item) => {
        const current = isCurrentPath(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={current ? "page" : undefined}
            className={cn(
              mobile
                ? "site-nav__link mobile-nav-link"
                : "site-nav__link site-nav-link",
              !mobile && item.href === "/contact" && "site-nav__link--contact",
              current && "site-nav__link--current",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
