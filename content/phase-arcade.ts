export const phaseArcadeCopy = {
  name: "Phase Arcade",
  route: "/projects/phase-arcade-volume-1",
  tagline: "Three arcade games. One collection.",
  introduction: "An upcoming collection featuring Phase Breaker, Phase Shift, and Phase Court.",
  hero: "A collection of three distinct arcade games built around responsive controls, engaging mechanics, and replayability.",
  lineup: "Featuring Phase Breaker, Phase Shift, and Phase Court.",
  status: "Coming Soon | Windows",
  release: "Windows release targeted for late October 2026. Android and iOS to follow.",
  closing: "Phase Arcade is currently targeting a late-October release on Windows, with Android and iOS versions planned afterward.",
} as const;

export const phaseArcadeGames = [
  {
    slug: "phase-breaker",
    name: "Phase Breaker",
    status: "Coming Soon",
    image: "/images/projects/phase-breaker-gameplay-01.webp",
    alt: "Phase Breaker gameplay inside a cyan and magenta containment chamber.",
    description:
      "Position a reflector to return photons and clear three numbered targets in each chamber. Use Bind for controlled returns or Release to redirect shots through a mirror field.",
  },
  {
    slug: "phase-shift",
    name: "Phase Shift",
    status: "Coming Soon",
    image: "/images/projects/phase-shift-gameplay-01.webp",
    alt: "Phase Shift gameplay with a photon moving through a cyan and magenta tunnel.",
    description:
      "Steer through a sequence of gates, choosing wider recovery paths or narrower precision routes. Switch between Bind and Release to control how field lenses affect your movement.",
  },
  {
    slug: "phase-court",
    name: "Phase Court",
    status: "Coming Soon",
    image: "/images/projects/phase-court-gameplay-02.webp",
    alt: "Phase Court desktop gameplay showing a cyan player paddle returning the glowing ball across the magenta court.",
    description:
      "Play a paddle duel to seven points. Position each return and choose between a controlled Bind shot or a wider Release shot that can interact with the central mirror.",
  },
] as const;
