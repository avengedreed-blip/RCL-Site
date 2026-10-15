"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";
import { forgefieldTrailer } from "@/content/forgefield";
import styles from "./ForgefieldTrailer.module.css";

export function ForgefieldTrailer() {
  const [loaded, setLoaded] = useState(false);
  return (
    <section className={`v2-container ${styles.section}`} aria-labelledby="forgefield-trailer-title">
      <h2 id="forgefield-trailer-title">See Forgefield in Motion</h2>
      <div className={styles.frame}>
        {loaded ? (
          <iframe
            src={forgefieldTrailer.embedUrl}
            title={forgefieldTrailer.title}
            allow="encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={(event) => event.currentTarget.focus()}
          />
        ) : (
          <>
            <Image src="/images/projects/forgefield-eventide-2026-09-20-1600.webp" alt="" fill sizes="(min-width: 1440px) 1320px, 94vw" className={styles.poster} />
            <button type="button" onClick={() => setLoaded(true)} className={styles.load} aria-describedby="forgefield-video-privacy">
              <Play aria-hidden="true" size={22} />
              Load official trailer
            </button>
          </>
        )}
      </div>
      <div className={styles.caption}>
        <p id="forgefield-video-privacy">Loading the player connects to YouTube. Playback is optional.</p>
        <a className="text-link" href={forgefieldTrailer.watchUrl} rel="noopener noreferrer">Watch on YouTube</a>
      </div>
    </section>
  );
}
