import Link from "next/link";
import { ArrowRight } from "lucide-react";

type SectionHeaderProps = {
  title: string;
  href?: string;
  action?: string;
};

export function SectionHeader({ title, href, action }: SectionHeaderProps) {
  return (
    <div className="mb-7 flex items-center gap-5">
      <h2 className="shrink-0 text-sm font-black uppercase text-white">{title}</h2>
      <div className="h-px flex-1 bg-white/25" />
      {href && action ? (
        <Link
          href={href}
          className="group hidden items-center gap-3 text-xs font-black uppercase text-rcl-muted transition hover:text-rcl-red sm:inline-flex"
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
