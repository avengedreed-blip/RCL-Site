import Link from "next/link";
import { Logo } from "@/components/Logo";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/press", label: "Press" },
];

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-50 border-b border-rcl-copper/18 bg-rcl-black/88 backdrop-blur-xl">
      <div className="mx-auto grid max-w-[1240px] grid-cols-[auto_auto] items-center justify-between gap-5 px-5 py-2 md:px-8 lg:grid-cols-[auto_1fr_auto] xl:px-0">
        <Logo priority />
        <nav
          className="hidden items-center justify-center gap-5 lg:flex lg:gap-8"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="site-nav-link relative py-2 text-xs font-black uppercase text-white transition duration-300 ease-out after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-rcl-copper after:transition-transform after:duration-300 after:ease-out hover:text-rcl-amber hover:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rcl-copper"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="site-contact-link inline-flex h-8 items-center justify-center rounded-[3px] border border-rcl-copper px-4 text-[0.68rem] font-black uppercase text-white transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(210,115,59,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rcl-copper sm:px-5 sm:text-xs"
        >
          Contact
        </Link>
      </div>
      <nav
        className="mx-auto flex max-w-[1240px] flex-wrap justify-center gap-x-4 gap-y-3 px-4 pb-4 md:px-8 lg:hidden"
        aria-label="Mobile navigation"
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="mobile-nav-link shrink-0 text-[0.68rem] font-black uppercase text-rcl-muted transition duration-300 hover:text-rcl-amber focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rcl-copper min-[375px]:text-xs"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
