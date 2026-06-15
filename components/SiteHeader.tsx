import Link from "next/link";
import { Logo } from "@/components/Logo";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Products" },
  { href: "/services", label: "Services" },
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
          className="hidden items-center gap-5 lg:gap-9 md:flex"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative py-2 text-xs font-black uppercase text-white transition duration-300 ease-out after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-rcl-red after:transition-transform after:duration-300 after:ease-out hover:text-rcl-red hover:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rcl-red"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="hidden h-11 items-center justify-center rounded-[3px] border border-rcl-red px-6 text-xs font-black uppercase text-white transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-rcl-red hover:shadow-[0_0_24px_rgba(255,32,32,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rcl-red md:inline-flex lg:px-8"
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
            className="shrink-0 text-[0.68rem] font-black uppercase text-rcl-muted transition duration-300 hover:text-rcl-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rcl-red min-[375px]:text-xs"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
