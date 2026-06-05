import Link from "next/link";
import { Logo } from "@/components/Logo";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/press", label: "Press" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-rcl-black/88 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-5 px-5 py-5 md:px-8">
        <Logo priority />
        <nav
          className="hidden items-center gap-9 md:flex"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative py-2 text-xs font-black uppercase text-white transition hover:text-rcl-red"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="hidden h-11 items-center justify-center rounded-[3px] border border-rcl-red px-8 text-xs font-black uppercase text-white transition hover:bg-rcl-red md:inline-flex"
        >
          Contact
        </Link>
      </div>
      <nav
        className="mx-auto flex max-w-[1500px] justify-between gap-3 overflow-x-auto px-4 pb-4 md:hidden"
        aria-label="Mobile navigation"
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 text-[0.68rem] font-black uppercase text-rcl-muted min-[375px]:text-xs"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
