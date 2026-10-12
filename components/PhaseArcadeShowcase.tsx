import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { phaseArcadeCopy, phaseArcadeGames } from "@/content/phase-arcade";
import styles from "./PhaseArcade.module.css";

export function PhaseArcadeShowcase() {
  const game = phaseArcadeGames[0];
  return (
    <section className={`v2-container ${styles.showcase}`} data-product-slug="phase-arcade-volume-1" aria-labelledby="phase-arcade-title">
      <div className={styles.copy}>
        <h2 id="phase-arcade-title" className={styles.title}>{phaseArcadeCopy.name}</h2>
        <p className={styles.deck}>{phaseArcadeCopy.tagline}</p>
        <p>{phaseArcadeCopy.introduction}</p>
        <p className={styles.status}>{phaseArcadeCopy.status}</p>
        <ButtonLink href={phaseArcadeCopy.route} variant="secondary">Explore Phase Arcade</ButtonLink>
      </div>
      <div className={styles.capture}>
        <Image src={game.image} alt={game.alt} fill sizes="(min-width: 1024px) 55vw, 94vw" className="object-contain" />
      </div>
    </section>
  );
}
