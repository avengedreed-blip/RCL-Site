"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

export const primaryNavItems = [
  { href: "/", label: "Home" }, { href: "/services", label: "Services" },
  { href: "/agency-partners", label: "Agency Partners" }, { href: "/work", label: "Work / Portfolio" },
  { href: "/about", label: "About" }, { href: "/products", label: "Games & Products" },
  { href: "/science-lab", label: "Science Lab" }, { href: "/contact", label: "Start a Project" },
];

export function SiteNav({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  const nav = useRef<HTMLElement>(null);
  const items = (paths: string[]) => primaryNavItems.filter(x => paths.includes(x.href)).map(item => {
    const current = item.href === pathname || (item.href === "/products" && pathname.startsWith("/projects/")) || (item.href === "/about" && pathname.startsWith("/about/"));
    return <Link href={item.href} key={item.href} aria-current={current ? "page" : undefined} onClick={() => nav.current?.querySelectorAll("details").forEach(x => { x.open = false; })}>{item.label}</Link>;
  });
  return <nav ref={nav} className={`commercial-nav ${mobile ? "commercial-nav--mobile" : "commercial-nav--desktop"}`} aria-label={mobile ? "Mobile navigation" : "Primary navigation"} onKeyDown={event => {
    if (event.key === "Escape") { const details = (event.target as HTMLElement).closest("details"); if (details) { details.open = false; details.querySelector("summary")?.focus(); } }
  }}>
    {items(["/"])}
    <details name={`navigation-${mobile ? "mobile" : "desktop"}`}><summary>Hire RCL</summary><div className="commercial-nav-panel">{items(["/services", "/agency-partners", "/work"])}</div></details>
    <details name={`navigation-${mobile ? "mobile" : "desktop"}`}><summary>Explore RCL</summary><div className="commercial-nav-panel">{items(["/about", "/products", "/science-lab"])}</div></details>
    <span className="commercial-nav-cta">{items(["/contact"])}</span>
  </nav>;
}
