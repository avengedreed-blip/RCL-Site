import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  compact?: boolean;
  className?: string;
  priority?: boolean;
};

export function Logo({ compact = false, className, priority = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "block shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rcl-red",
        className,
      )}
      aria-label="Reed Creative Labs home"
    >
      <Image
        src={compact ? "/images/rcl-logo-wordmark.png" : "/images/rcl-logo-cropped.png"}
        alt="Reed Creative Labs"
        width={compact ? 260 : 360}
        height={compact ? 91 : 174}
        priority={priority}
        className={cn("h-auto w-[132px] object-contain md:w-[156px]", compact && "md:w-[148px]")}
      />
    </Link>
  );
}
