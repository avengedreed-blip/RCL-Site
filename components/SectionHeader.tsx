import Link from "next/link";
import { ArrowRight } from "lucide-react";

type SectionHeaderProps = {
  title: string;
  href?: string;
  action?: string;
};

export function SectionHeader({ title, href, action }: SectionHeaderProps) {
  return (
    <div className="mb-7 flex flex-wrap items-center gap-4 sm:gap-5">
      <h2 className="min-w-0 max-w-full text-sm font-black uppercase leading-5 text-white [text-wrap:balance]">
        {title}
      </h2>
      <div className="h-px min-w-12 flex-1 bg-white/25" />
      {href && action ? (
        <Link
          href={href}
          className="group hidden items-center gap-3 text-xs font-black uppercase text-rcl-muted transition duration-300 hover:text-rcl-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rcl-red sm:inline-flex"
        >
          <span>{action}</span>
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition group-hover:translate-x-1"
          />
        </Link>
      ) : null}
    </div>
  );
}
