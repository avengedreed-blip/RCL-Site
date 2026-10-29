import type { ReactNode } from "react";
import { FrameGlint } from "@/components/FrameGlint";

type ProjectFrameProps = {
  children: ReactNode;
  label: string;
  kind?: "browser" | "application" | "phone";
};

/** Presentational chrome only; the capture inside remains complete and unaltered. */
export function ProjectFrame({ children, label, kind = "browser" }: ProjectFrameProps) {
  return (
    <span className={`project-frame metal-frame project-frame--${kind}`}>
      <FrameGlint />
      <span className="project-frame__bar">
        <span className="project-frame__mark" aria-hidden="true"><i /><i /><i /></span>
        <span className="project-frame__label">{label}</span>
        <span className="project-frame__corner" aria-hidden="true">↗</span>
      </span>
      <span className="project-frame__screen">{children}</span>
    </span>
  );
}
