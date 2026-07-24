import Image from "next/image";

export function HeroSystemField() {
  return (
    <div className="hero-system-field" aria-hidden="true">
      <Image
        className="hero-system-field__image"
        src="/images/home/forgefield-eventide-static.webp"
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="(min-width: 820px) 50vw, 100vw"
      />
    </div>
  );
}
