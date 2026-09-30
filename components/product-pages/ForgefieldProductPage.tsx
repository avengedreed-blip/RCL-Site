import { ForgefieldLaunch } from "@/components/ForgefieldLaunch";
import {
  forgefieldLaunch,
  forgefieldReleaseDate,
  forgefieldPrice,
  forgefieldWorlds,
  getSteamStoreUrl,
} from "@/content/forgefield";
import { ButtonLink } from "@/components/ButtonLink";
import { ForgefieldCapture } from "@/components/ForgefieldShowcase";
import { StructuredData } from "@/components/StructuredData";
import { TechnicalProfile } from "@/components/TechnicalProfile";
import type { Project } from "@/content/projects";
import { getProjectScreenshots } from "@/lib/project-media";
import { projectJsonLd } from "@/lib/structured-data";

export function ForgefieldProductPage({ project }: { project: Project }) {
  const [eventide, polarNight, ...worlds] = getProjectScreenshots("forgefield");
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="forgefield-page"
      data-product={project.slug}
    >
      <StructuredData data={projectJsonLd(project)} />
      <header className="v2-container forgefield-opening">
        <p className="v2-eyebrow">RCL flagship · Windows 11</p>
        <h1>Forgefield</h1>
        <div className="forgefield-opening__summary">
          <p className="forgefield-deck">
            Real-time generative particle worlds.
          </p>
          <p>
            Millions of particles form a living universe on your desktop. Nine
            procedural worlds, generated live on your GPU, for wallpaper and
            screensaver playback.
          </p>
        </div>
        <ForgefieldLaunch productPage />
      </header>
      <div className="forgefield-wide">
        <ForgefieldCapture image={eventide} priority />
      </div>
      <div className="v2-container forgefield-opening__actions">
        <p>A desktop simulation and screensaver. Launching on Steam.</p>
        <div className="v2-action-row">
          <ButtonLink href="#availability-title" variant="secondary">
            Release Status
          </ButtonLink>
        </div>
      </div>
      <section
        className="v2-container forgefield-world-study"
        aria-labelledby="playback-title"
      >
        <ForgefieldCapture
          image={polarNight}
          sizes="(min-width: 1440px) 760px, (min-width: 768px) 58vw, 94vw"
        />
        <div>
          <p className="v2-eyebrow">Polar Night</p>
          <h2 id="playback-title">A world, not a loop.</h2>
          <p>
            Aurora curtains drift over snow-covered mountains. Across the
            collection, particle, field, surface, and lighting behavior evolves
            during playback.
          </p>
          <p>
            The Windows launcher brings world selection, live preview, wallpaper
            and screensaver modes, and quality presets together.
          </p>
        </div>
      </section>
      <section
        className="v2-container forgefield-gallery"
        aria-labelledby="gallery-title"
      >
        <div className="forgefield-section-heading">
          <div>
            <p className="v2-eyebrow">The world collection</p>
            <h2 id="gallery-title">
              Different worlds.
              <br />
              Distinct character.
            </h2>
          </div>
          <p>
            Six of the nine worlds, captured from the September 20, 2026
            pre-release Windows build. Eventide and Polar Night appear above;
            explore four more below. Every image opens at full size.
          </p>
        </div>
        <div className="forgefield-gallery__grid" data-gallery-layout="worlds">
          {worlds.map((image) => (
            <ForgefieldCapture
              key={image.src}
              image={image}
              sizes="(min-width: 1440px) 644px, (min-width: 768px) 46vw, 94vw"
            />
          ))}
        </div>
        <ul
          className="forgefield-world-index"
          aria-label="All nine Forgefield worlds"
        >
          {forgefieldWorlds.map((world, index) => (
            <li key={world}>
              <span aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              {world}
            </li>
          ))}
        </ul>
      </section>
      <section
        className="v2-section-band"
        aria-labelledby="technical-profile-title"
      >
        <div className="v2-container forgefield-engineering">
          <div>
            <p className="v2-eyebrow">Under the surface</p>
            <h2 id="technical-profile-title">
              Native simulation.
              <br />
              Live rendering.
            </h2>
            <p>
              Fortran coordinates the scene lifecycle; OpenGL compute and
              rendering shaders produce the imagery. The native launcher
              connects those worlds to the Windows desktop. Particle counts vary
              by world and quality preset; Eventide’s highest preset uses two
              million particles. This is a simulation scale, not a frame-rate
              guarantee.
            </p>
          </div>
          <TechnicalProfile
            profile={project.technicalProfile!}
            productSlug={project.slug}
          />
        </div>
      </section>
      <section
        className="v2-container forgefield-availability"
        aria-labelledby="availability-title"
      >
        <div>
          <p className="v2-eyebrow">Windows 11 x64 · OpenGL 4.6</p>
          <h2 id="availability-title">Coming to Steam.</h2>
        </div>
        <div>
          <p>
            Scheduled for{" "}
            <time dateTime={forgefieldLaunch.releaseDate}>
              {forgefieldReleaseDate}
            </time>{" "}
            at {forgefieldPrice} USD.
            {getSteamStoreUrl(forgefieldLaunch)
              ? " Visit the Steam page for store details."
              : " The Steam store link will be added here when it is available."}
          </p>
          <ButtonLink
            href={getSteamStoreUrl(forgefieldLaunch) ?? "/contact"}
            variant="contact"
          >
            {getSteamStoreUrl(forgefieldLaunch)
              ? "View on Steam"
              : "Ask About Forgefield"}
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
