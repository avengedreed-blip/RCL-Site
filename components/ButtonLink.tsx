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
        "exhibit-button material-control group inline-flex h-12 items-center justify-center gap-3 whitespace-nowrap rounded-[3px] px-7 text-sm font-black uppercase transition duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rcl-gold",
        "relative overflow-hidden",
        variant === "primary" &&
          "exhibit-button--primary text-white hover:text-white",
        variant === "secondary" &&
          "exhibit-button--secondary border bg-black/20 text-white hover:text-rcl-gold",
        variant === "ghost" &&
          "exhibit-button--ghost border-0 bg-transparent text-rcl-muted shadow-none hover:translate-y-0 hover:text-white",
        variant === "contact" &&
          "exhibit-button--contact site-contact-link border text-white hover:text-white",
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
