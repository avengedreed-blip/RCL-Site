import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  body: ReactNode;
};

export function PageHeader({ eyebrow, title, body }: PageHeaderProps) {
  return (
    <section className="page-header mx-auto max-w-[1240px] px-5 pb-10 pt-12 md:px-8 md:pb-14 md:pt-16 xl:px-0">
      <Reveal>
        <p className="mb-5 text-sm font-black uppercase text-rcl-amber">{eyebrow}</p>
        <h1 className="brand-heading info-page-title section-title max-w-[1100px] text-white">
          {title}
        </h1>
        <p className="mt-7 max-w-[820px] text-lg leading-8 text-rcl-muted">
          {body}
        </p>
      </Reveal>
    </section>
  );
}
