import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  body: ReactNode;
};

export function PageHeader({ eyebrow, title, body }: PageHeaderProps) {
  return (
    <section className="v2-page-hero">
      <Reveal className="v2-container v2-page-hero__inner">
        <p className="v2-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{body}</p>
      </Reveal>
    </section>
  );
}
