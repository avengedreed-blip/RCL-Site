import Link from "next/link";
import {
  ArrowUpRight,
  Atom,
  Code2,
  Gamepad2,
  LayoutGrid,
} from "lucide-react";
import type { Project } from "@/content/projects";
import { getProjectDateLabel } from "@/content/projects";
import { cn } from "@/lib/utils";

function PlatformList({ platforms, className }: { platforms: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)} aria-label="Platforms">
      {platforms.map((platform) => (
        <li
          key={platform}
          className="platform-chip rounded-[3px] border border-rcl-copper/18 bg-black/30 px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-normal text-white/78"
        >
          {platform}
        </li>
      ))}
    </ul>
  );
}

function ProductCardMotif({
  visual,
}: {
  visual: Project["visual"];
}) {
  return (
    <div
      data-visual={visual}
      className="product-card-motif"
      aria-hidden="true"
    >
      <span className="product-card-motif__grid" />
      <span className="product-card-motif__rail product-card-motif__rail--a" />
      <span className="product-card-motif__rail product-card-motif__rail--b" />
    </div>
  );
}

function ProductCardIcon({ visual }: { visual: Project["visual"] }) {
  const Icon =
    visual === "forge"
      ? Code2
      : visual === "science-lab"
        ? Atom
        : visual === "phase-arcade" ||
            visual === "phase-arcade-2" ||
            visual === "phase-shift" ||
            visual === "phase-breaker" ||
            visual === "phase-court" ||
            visual === "pigs-can-fly"
          ? Gamepad2
          : LayoutGrid;

  return (
    <span className="product-card-icon" aria-hidden="true">
      <Icon className="h-5 w-5" strokeWidth={1.7} />
    </span>
  );
}

type FeaturedProjectCardProps = {
  project: Project;
  className?: string;
  variant?: "showcase" | "gallery";
};

export function FeaturedProjectCard({
  project,
  className,
  variant = "showcase",
}: FeaturedProjectCardProps) {
  const isGallery = variant === "gallery";

  return (
    <Link
      href={project.route}
      data-product-slug={project.slug}
      data-card-kind="hardware"
      className={cn(
        "featured-exhibit-card group relative flex h-full flex-col overflow-hidden rounded-[4px] border border-rcl-copper/25 bg-rcl-elevated p-5 transition duration-300 ease-out hover:-translate-y-1 hover:border-rcl-copper/70 hover:shadow-[0_20px_72px_rgba(0,0,0,0.42),0_0_42px_rgba(210,115,59,0.11)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rcl-amber",
        isGallery ? "min-h-[310px]" : "min-h-[420px] p-6 md:p-8",
        className,
      )}
    >
      <ProductCardMotif visual={project.visual} />
      <ProductCardIcon visual={project.visual} />
      <div className="relative z-10 flex flex-1 flex-col pr-8">
        <p
          className={cn(
            "mb-3 max-w-[520px] font-black uppercase leading-5 text-rcl-amber",
            isGallery ? "text-[0.61rem] leading-4" : "text-xs",
          )}
        >
          <span className="block text-white/75">{project.categoryLabel}</span>
          <span className="block">{getProjectDateLabel(project)}</span>
        </p>
        <h3
          className={cn(
            "max-w-[600px] font-black leading-[0.95] text-white",
            isGallery ? "text-[1.52rem]" : "text-4xl md:text-[2.8rem] xl:text-[3.15rem]",
          )}
        >
          {project.name}
        </h3>
        <p
          className={cn(
            "max-w-[430px] text-rcl-muted",
            isGallery ? "mt-3 text-xs leading-5" : "mt-5 text-base leading-7 xl:text-lg xl:leading-8",
          )}
        >
          {project.shortDescription}
        </p>
        <div className={cn("mt-auto flex items-end justify-between gap-4", isGallery ? "pt-4" : "pt-7")}>
          <PlatformList
            platforms={project.platforms}
            className="max-w-[520px]"
          />
          <span className="flex h-8 w-8 shrink-0 items-center justify-center text-white transition duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-rcl-amber">
            <ArrowUpRight className={cn(isGallery ? "h-4 w-4" : "h-5 w-5")} aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}

type CompactProjectCardProps = {
  project: Project;
  emphasis?: "standard" | "quiet";
};

export function CompactProjectCard({
  project,
  emphasis = "standard",
}: CompactProjectCardProps) {
  const isIncludedGame = project.category === "included-game";

  return (
    <Link
      href={project.route}
      data-product-slug={project.slug}
      data-card-kind="hardware"
      className={cn(
        "compact-exhibit-card group flex h-full flex-col overflow-hidden rounded-[6px] border border-rcl-copper/20 bg-rcl-surface p-4 transition duration-300 ease-out hover:-translate-y-0.5 hover:border-rcl-copper/65 hover:bg-rcl-elevated hover:shadow-[0_16px_46px_rgba(0,0,0,0.32),0_0_30px_rgba(210,115,59,0.085)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rcl-amber",
        isIncludedGame ? "min-h-[350px]" : "min-h-[250px]",
        emphasis === "quiet" && "opacity-85 hover:opacity-100",
      )}
    >
      <ProductCardMotif visual={project.visual} />
      <ProductCardIcon visual={project.visual} />
      <div className="relative z-10 flex flex-1 flex-col pr-8">
        <p className="text-xs font-black uppercase text-rcl-amber">
          {getProjectDateLabel(project)}
        </p>
        <p className="mt-2 text-[0.68rem] font-black uppercase leading-5 text-white/62">
          {project.categoryLabel}
        </p>
        <div className="mt-3 flex items-start justify-between gap-4">
          <h3 className="text-xl font-black text-white">{project.name}</h3>
          <ArrowUpRight
            className="mt-1 h-5 w-5 shrink-0 text-rcl-muted transition duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-rcl-amber"
            aria-hidden="true"
          />
        </div>
        <p className="mt-3 text-sm leading-6 text-rcl-muted">{project.shortDescription}</p>
        <PlatformList platforms={project.platforms} className="mt-auto pt-5" />
      </div>
    </Link>
  );
}
