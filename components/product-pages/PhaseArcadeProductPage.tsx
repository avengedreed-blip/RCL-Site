import { FrameGlint } from "@/components/FrameGlint";
import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { StructuredData } from "@/components/StructuredData";
import { phaseArcadeCopy, phaseArcadeGames } from "@/content/phase-arcade";
import type { Project } from "@/content/projects";
import { projectJsonLd } from "@/lib/structured-data";
import styles from "@/components/PhaseArcade.module.css";

export function PhaseArcadeProductPage({ project }: { project: Project }) {
  return (
    <main id="main-content" tabIndex={-1} data-product={project.slug}>
      <StructuredData data={projectJsonLd(project)} />
      <section className={`v2-container ${styles.hero}`} aria-labelledby="phase-title">
        <div className={styles.copy}>
          <h1 id="phase-title" className={styles.title}>{phaseArcadeCopy.name}</h1>
          <p className={styles.deck}>{phaseArcadeCopy.hero}</p>
          <p>{phaseArcadeCopy.lineup}</p>
          <p className={styles.status}>{phaseArcadeCopy.release}</p>
          <ButtonLink href="#gallery-title" variant="secondary">Explore the Games</ButtonLink>
        </div>
        <div className={`${styles.capture} metal-frame`}>
        <FrameGlint />
          <Image src={phaseArcadeGames[0].image} alt={phaseArcadeGames[0].alt} fill priority sizes="(min-width: 1024px) 55vw, 94vw" className="object-contain" />
        </div>
      </section>
      <section className={`v2-container ${styles.games}`} aria-labelledby="gallery-title">
        <h2 id="gallery-title" className="v2-eyebrow">The games</h2>
        <div data-gallery-layout="gameplay">
          {phaseArcadeGames.map((game) => (
            <figure key={game.slug} id={game.slug} className={styles.game}>
              <div className={`${styles.capture} metal-frame`}>
        <FrameGlint />
                <Image src={game.image} alt={game.alt} fill sizes="(min-width: 1024px) 60vw, 94vw" className="object-contain" />
              </div>
              <figcaption>
                <h3>{game.name}</h3>
                <p>{game.description}</p>
                <a className="text-link" href={game.image} aria-label={`View full size: ${game.alt}`}>View full size</a>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section className={`v2-container ${styles.closing}`} aria-labelledby="phase-release-title">
        <h2 id="phase-release-title">Coming Soon</h2>
        <p>{phaseArcadeCopy.closing}</p>
        <ButtonLink href="/products" variant="secondary">Explore More from Reed Creative Labs</ButtonLink>
      </section>
    </main>
  );
}
