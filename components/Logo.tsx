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
        "block shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rcl-copper",
        className,
      )}
      aria-label="Reed Creative Labs home"
    >
      <Image
        src={compact ? "/images/rcl-logo-full.png" : "/images/rcl-logo-mark.png"}
        alt="Reed Creative Labs"
        width={720}
        height={compact ? 350 : 254}
        priority={priority}
        className={cn("h-auto w-[126px] object-contain md:w-[148px]", compact && "md:w-[156px]")}
      />
    </Link>
  );
}
