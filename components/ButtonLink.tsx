import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "contact";
  className?: string;
  prefetch?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  prefetch,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      className={cn(
        "exhibit-button group inline-flex h-12 items-center justify-center gap-3 whitespace-nowrap rounded-[3px] px-7 text-sm font-black uppercase transition duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rcl-copper",
        "relative overflow-hidden",
        variant === "primary" &&
          "exhibit-button--primary bg-rcl-copper text-white shadow-[0_0_22px_rgba(210,115,59,0.18)] hover:text-white hover:shadow-[0_0_32px_rgba(210,115,59,0.25)]",
        variant === "secondary" &&
          "border border-rcl-copper/35 bg-black/20 text-white hover:border-rcl-copper hover:bg-rcl-copper/[0.05] hover:text-rcl-amber hover:shadow-[0_0_22px_rgba(210,115,59,0.11)]",
        variant === "ghost" && "border-0 bg-transparent text-rcl-muted shadow-none hover:translate-y-0 hover:text-white",
        variant === "contact" &&
          "site-contact-link border border-rcl-copper bg-[linear-gradient(135deg,rgba(210,115,59,0.14),rgba(5,7,9,0.2))] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_20px_rgba(210,115,59,0.13)] hover:border-rcl-amber hover:text-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_28px_rgba(210,115,59,0.2)]",
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
