import { cn } from "@/lib/utils";

type RclTechnicalMotifProps = {
  className?: string;
  variant?: "hero" | "panel" | "compact";
};

export function RclTechnicalMotif({
  className,
  variant = "hero",
}: RclTechnicalMotifProps) {
  return (
    <div
      className={cn("rcl-motif", `rcl-motif--${variant}`, className)}
      aria-hidden="true"
    >
      <div className="rcl-motif__glow" />
      <div className="rcl-motif__grid" />
      <div className="rcl-motif__ring rcl-motif__ring--outer" />
      <div className="rcl-motif__ring rcl-motif__ring--inner" />
      <div className="rcl-motif__axis rcl-motif__axis--vertical" />
      <div className="rcl-motif__axis rcl-motif__axis--horizontal" />
      <div className="rcl-motif__guide rcl-motif__guide--top" />
      <div className="rcl-motif__guide rcl-motif__guide--bottom" />
      <div className="rcl-motif__guide rcl-motif__guide--left" />
      <div className="rcl-motif__guide rcl-motif__guide--right" />
    </div>
  );
}
