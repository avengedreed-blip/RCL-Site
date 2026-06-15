import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getProjectVisualImage, ProjectMediaImage } from "@/components/ProjectMedia";
import type { Project } from "@/content/projects";
import { getProjectDateLabel } from "@/content/projects";
import { cn } from "@/lib/utils";

function PlatformList({ platforms, className }: { platforms: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)} aria-label="Platforms">
      {platforms.map((platform) => (
        <li
          key={platform}
          className="rounded-[3px] border border-white/12 bg-black/30 px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-normal text-white/78"
        >
          {platform}
        </li>
      ))}
    </ul>
  );
}

type FeaturedProjectCardProps = {
  project: Project;
  className?: string;
  priority?: boolean;
};

export function FeaturedProjectCard({
  project,
  className,
  priority = false,
}: FeaturedProjectCardProps) {
  const visualImage = getProjectVisualImage(project.visual);

  return (
    <Link
      href={project.route}
      className={cn(
        "group relative block min-h-[420px] overflow-hidden rounded-[6px] border border-white/16 bg-rcl-elevated transition duration-300 ease-out hover:-translate-y-1 hover:border-rcl-red/70 hover:shadow-[0_18px_70px_rgba(0,0,0,0.34),0_0_64px_rgba(255,32,32,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rcl-red",
        className,
      )}
    >
      <div className="relative h-[420px] overflow-hidden xl:h-[500px]">
        {visualImage ? (
          <ProjectMediaImage
            visual={project.visual}
            priority={priority}
            className="transition duration-700 ease-out group-hover:scale-[1.035]"
          />
        ) : (
          <div className="h-full bg-rcl-elevated" />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/96 via-black/36 to-black/10" />
      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black/62 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-7 md:p-10 xl:p-12">
        <p className="mb-3 max-w-[520px] text-xs font-black uppercase leading-5 text-rcl-red">
          <span className="block text-white/75">{project.categoryLabel}</span>
          <span className="block">{getProjectDateLabel(project)}</span>
        </p>
        <h3 className="max-w-[600px] text-4xl font-black leading-[0.95] text-white md:text-5xl xl:text-6xl">
          {project.name}
        </h3>
        <p className="mt-5 max-w-[430px] text-base leading-7 text-white xl:text-lg xl:leading-8">
          {project.shortDescription}
        </p>
        <PlatformList platforms={project.platforms} className="mt-5 max-w-[520px]" />
        <span className="absolute bottom-7 right-7 flex h-10 w-10 items-center justify-center text-white transition duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-rcl-red">
          <ArrowUpRight className="h-6 w-6" aria-hidden="true" />
        </span>
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
  const visualImage = getProjectVisualImage(project.visual);
  const isIncludedGame = project.category === "included-game";

  return (
    <Link
      href={project.route}
      className={cn(
        "group grid overflow-hidden rounded-[6px] border border-white/12 bg-rcl-surface transition duration-300 ease-out hover:-translate-y-0.5 hover:border-rcl-red/70 hover:bg-rcl-elevated hover:shadow-[0_14px_44px_rgba(0,0,0,0.28),0_0_42px_rgba(255,32,32,0.1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rcl-red",
        isIncludedGame ? "min-h-[350px]" : "min-h-[230px]",
        emphasis === "quiet" && "opacity-85 hover:opacity-100",
      )}
    >
      {visualImage ? (
        <div
          className={cn(
            "relative overflow-hidden bg-black",
            isIncludedGame ? "min-h-[150px] md:min-h-[170px]" : "min-h-[112px]",
          )}
        >
          <ProjectMediaImage
            visual={project.visual}
            className="transition duration-700 ease-out group-hover:scale-[1.045]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/78 via-black/18 to-black/14" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/88 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black/38 to-transparent" />
        </div>
      ) : (
        <div className="min-h-[112px] bg-rcl-elevated" />
      )}
      <div className="p-5">
        <p className="text-xs font-black uppercase text-rcl-red">
          {getProjectDateLabel(project)}
        </p>
        <p className="mt-2 text-[0.68rem] font-black uppercase leading-5 text-white/62">
          {project.categoryLabel}
        </p>
        <div className="mt-3 flex items-start justify-between gap-4">
          <h3 className="text-xl font-black text-white">{project.name}</h3>
          <ArrowUpRight
            className="mt-1 h-5 w-5 shrink-0 text-rcl-muted transition duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-rcl-red"
            aria-hidden="true"
          />
        </div>
        <p className="mt-3 text-sm leading-6 text-rcl-muted">{project.shortDescription}</p>
        <PlatformList platforms={project.platforms} className="mt-4" />
      </div>
    </Link>
  );
}
