import { Logo } from "@/components/Logo";
import { SiteNav } from "@/components/SiteNav";

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-50">
      <div className="v2-container site-header__inner">
        <Logo priority />
        <SiteNav />
      </div>
      <SiteNav mobile />
    </header>
  );
}
