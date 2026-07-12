import { Logo } from "@/components/Logo";
import { SiteContactLink, SiteNav } from "@/components/SiteNav";

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-50 border-b border-rcl-copper/18 bg-rcl-black/88 backdrop-blur-xl">
      <div className="mx-auto grid max-w-[1240px] grid-cols-[auto_auto] items-center justify-between gap-5 px-5 py-2 md:px-8 lg:grid-cols-[auto_1fr_auto] xl:px-0">
        <Logo priority />
        <SiteNav />
        <SiteContactLink />
      </div>
      <SiteNav mobile />
    </header>
  );
}
