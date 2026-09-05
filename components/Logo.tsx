import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  variant?: "full" | "mark";
};

export function Logo({
  className,
  imageClassName,
  priority = false,
  variant = "full",
}: LogoProps) {
  const isFullLogo = variant === "full";

  return (
    <Link
      href="/"
      className={cn(
        "block shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rcl-gold",
        className,
      )}
      aria-label="Reed Creative Labs home"
    >
      <Image
        src={isFullLogo ? "/images/rcl-logo-full.webp" : "/images/rcl-logo-mark.png"}
        alt="Reed Creative Labs"
        width={720}
        height={isFullLogo ? 350 : 254}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        className={cn(
          "h-auto object-contain",
          isFullLogo ? "w-[138px] md:w-[156px]" : "w-[126px] md:w-[148px]",
          imageClassName,
        )}
      />
    </Link>
  );
}
