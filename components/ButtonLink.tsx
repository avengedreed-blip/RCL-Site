import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex h-12 items-center justify-center gap-3 whitespace-nowrap rounded-[3px] px-7 text-sm font-black uppercase transition duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rcl-red",
        variant === "primary" &&
          "bg-rcl-red text-white shadow-[0_0_26px_rgba(255,32,32,0.22)] hover:bg-white hover:text-rcl-black hover:shadow-[0_0_34px_rgba(255,32,32,0.28)]",
        variant === "secondary" &&
          "border border-white/35 bg-transparent text-white hover:border-rcl-red hover:bg-rcl-red/[0.04] hover:text-rcl-red hover:shadow-[0_0_24px_rgba(255,32,32,0.1)]",
        variant === "ghost" && "text-rcl-muted hover:text-white hover:translate-y-0",
        className,
      )}
    >
      <span>{children}</span>
      {variant !== "ghost" && (
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 transition duration-300 group-hover:translate-x-1"
          strokeWidth={2}
        />
      )}
    </Link>
  );
}
