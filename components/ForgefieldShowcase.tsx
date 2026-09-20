import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import {
  getProjectScreenshots,
  type ProjectScreenshot,
} from "@/lib/project-media";

export function ForgefieldCapture({
  image,
  priority = false,
  sizes = "(min-width: 1600px) 1500px, 94vw",
}: {
  image: ProjectScreenshot;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <figure className="forgefield-capture">
      <a href={image.src} aria-label={`View full size: ${image.alt}`}>
        <picture>
          <source
            srcSet={`${image.src.replace(".webp", "-960.webp")} 960w, ${image.src.replace(".webp", "-1600.webp")} 1600w, ${image.src} 2560w`}
            sizes={sizes}
          />
          <Image
            src={image.src}
            alt={image.alt}
            width={2560}
            height={1421}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
            sizes={sizes}
          />
        </picture>
        <span className="forgefield-capture__open" aria-hidden="true">
          View full size ↗
        </span>
      </a>
      <figcaption>{image.caption}</figcaption>
    </figure>
  );
}

export function ForgefieldShowcase({
  includeWorldStudy = true,
}: {
  includeWorldStudy?: boolean;
}) {
  const [eventide, polarNight] = getProjectScreenshots("forgefield");
  return (
    <article
      className="forgefield-showcase"
      data-product-slug="forgefield"
      data-treatment="lead"
    >
      <div className="v2-container forgefield-showcase__intro">
        <div>
          <p className="v2-eyebrow">
            From the studio · Windows · Launching Soon
          </p>
          <h2 id="featured-products-title">Forgefield</h2>
        </div>
        <div className="forgefield-showcase__thesis">
          <p className="forgefield-deck">A desktop with a life of its own.</p>
          <p>
            Nine procedural worlds, evolving in real time. Live wallpapers and
            screensavers shaped by simulation, light, and motion.
          </p>
        </div>
      </div>
      <div className="forgefield-wide">
        <ForgefieldCapture image={eventide} />
      </div>
      <div className="v2-container forgefield-showcase__details">
        <p>
          Modern Fortran drives the simulation. OpenGL compute and rendering
          shaders bring each world to the screen. Every frame is generated live.
        </p>
        <dl className="forgefield-facts">
          <div>
            <dt>Worlds</dt>
            <dd>Nine distinct systems</dd>
          </div>
          <div>
            <dt>Platform</dt>
            <dd>Windows 10/11 x64</dd>
          </div>
          <div>
            <dt>Playback</dt>
            <dd>Wallpaper & screensaver</dd>
          </div>
        </dl>
        <ButtonLink href="/projects/forgefield">Explore Forgefield</ButtonLink>
      </div>
      {includeWorldStudy ? (
        <div className="v2-container forgefield-world-study">
          <ForgefieldCapture
            image={polarNight}
            sizes="(min-width: 1440px) 760px, (min-width: 768px) 58vw, 94vw"
          />
          <div>
            <p className="v2-eyebrow">Another world. The same desktop.</p>
            <h3>From accretion rings to arctic light.</h3>
            <p>
              Polar Night trades Eventide’s copper currents for aurora, snow,
              and reflections. Each world has its own visual character.
            </p>
            <Link
              className="text-link"
              href="/projects/forgefield#gallery-title"
            >
              See the world collection <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      ) : null}
    </article>
  );
}
