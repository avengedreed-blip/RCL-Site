"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/press", label: "Press" },
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
          ? "mx-auto flex max-w-[1240px] flex-wrap justify-center gap-x-1 gap-y-1 px-3 pb-3 md:px-8 lg:hidden"
          : "hidden items-center justify-center gap-5 lg:flex lg:gap-8"
      }
      aria-label={mobile ? "Mobile navigation" : "Primary navigation"}
    >
      {navItems.map((item) => {
        const current = isCurrentPath(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={current ? "page" : undefined}
            className={cn(
              mobile
                ? "mobile-nav-link inline-flex min-h-10 shrink-0 items-center px-0.5 text-[0.62rem] font-black uppercase text-rcl-muted transition duration-300 hover:text-rcl-amber focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rcl-copper min-[375px]:text-[0.68rem]"
                : "site-nav-link relative inline-flex min-h-10 items-center py-2 text-xs font-black uppercase text-white transition duration-300 ease-out after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-rcl-copper after:transition-transform after:duration-300 after:ease-out hover:text-rcl-amber hover:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rcl-copper",
              current && "text-rcl-amber after:scale-x-100",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function SiteContactLink() {
  const pathname = usePathname();
  const current = pathname === "/contact";

  return (
    <Link
      href="/contact"
      aria-current={current ? "page" : undefined}
      className={cn(
        "site-contact-link inline-flex min-h-10 items-center justify-center rounded-[3px] border border-rcl-copper px-4 text-[0.68rem] font-black uppercase text-white transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(210,115,59,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rcl-copper sm:px-5 sm:text-xs",
        current && "bg-rcl-copper/12 text-rcl-amber shadow-[0_0_20px_rgba(210,115,59,0.12)]",
      )}
    >
      Contact
    </Link>
  );
}
