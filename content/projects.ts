import {
  forgefieldLaunch,
  forgefieldLaunchSummary,
  forgefieldWorlds,
  getLaunchCampaign,
  type ProductLaunch,
} from "./forgefield.ts";
import { phaseArcadeCopy, phaseArcadeGames } from "./phase-arcade.ts";

export type ProjectStatus =
  | "concept"
  | "research"
  | "prototype"
  | "active-development"
  | "launching-soon"
  | "scheduled"
  | "final-testing"
  | "private-beta"
  | "public-release"
  | "production"
  | "archived";

export type RoadmapGroup =
  | "released"
  | "coming-soon"
  | "active-development"
  | "planned"
  | "included-game"
  | "archived";

export type ProjectCategory =
  | "software"
  | "simulation"
  | "game-collection"
  | "included-game"
  | "tool"
  | "game"
  | "app";

export type ProjectVisual =
  | "forgefield"
  | "load-bearing"
  | "static-drift"
  | "phase-arcade"
  | "phase-arcade-2"
  | "phase-shift"
  | "phase-breaker"
  | "phase-court"
  | "pigs-can-fly"
  | "neon-drift"
  | "falling-from-the-sky"
  | "darren"
  | "talk-to-me"
  | "bloom"
  | "misread";

export type ProjectMedia =
  | {
      kind: "approved-image";
      src: string;
      alt: string;
      caption?: string;
      fit?: "cover" | "contain";
      position?: string;
    }
  | {
      kind: "placeholder";
      alt: string;
      message: string;
    };

export type ProjectMilestone = {
  title: string;
  state: "complete" | "current" | "planned";
};

export type TechnicalProfileKey =
  | "languages"
  | "nativeCore"
  | "engine"
  | "frameworks"
  | "renderer"
  | "gpu"
  | "database"
  | "storage"
  | "platforms"
  | "interfaces"
  | "packaging"
  | "tooling";

export type TechnicalProfile = {
  summary: string;
  verifiedOn: string;
  languages?: string[];
  nativeCore?: string[];
  engine?: string[];
  frameworks?: string[];
  renderer?: string[];
  gpu?: string[];
  database?: string[];
  storage?: string[];
  platforms?: string[];
  interfaces?: string[];
  packaging?: string[];
  tooling?: string[];
};

export type Project = {
  name: string;
  slug: string;
  status: ProjectStatus;
  launch?: ProductLaunch;
  roadmapGroup: RoadmapGroup;
  category: ProjectCategory;
  categoryLabel: string;
  headline: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  platforms: string[];
  idealFor?: string[];
  usersCan?: string[];
  route: string;
  visual: ProjectVisual;
  featured?: boolean;
  presentationTier?: "flagship" | "featured" | "catalog";
  showcaseMedia?: ProjectMedia;
  includedGames?: string[];
  parentProject?: string;
  currentFocus?: string[];
  milestones?: ProjectMilestone[];
  features?: string[];
  technicalProfile?: TechnicalProfile;
  pageSections: {
    title: string;
    body: string;
  }[];
};

export const projects: Project[] = [
  {
    name: "Forgefield",
    slug: "forgefield",
    status:
      forgefieldLaunch.state === "released" ? "public-release" : "scheduled",
    launch: forgefieldLaunch,
    roadmapGroup:
      forgefieldLaunch.state === "released" ? "released" : "coming-soon",
    category: "software",
    categoryLabel: "Real-Time Generative Particle Worlds",
    headline: "Real-time generative particle worlds.",
    tagline: `Nine procedural worlds. Live wallpaper and screensaver playback. ${forgefieldLaunchSummary}`,
    shortDescription: `Real-time generative particle worlds for the Windows desktop. Native simulation, GPU rendering, live wallpapers, and screensavers. ${forgefieldLaunchSummary}`,
    longDescription: `Forgefield turns the Windows desktop into a continuously evolving particle universe. Its nine worlds span ${forgefieldWorlds.join(", ")}. Modern Fortran coordinates simulation and scene lifecycle; OpenGL compute and rendering shaders generate the imagery live. A native Windows launcher manages world selection, preview, live wallpaper, and screensaver playback. Particle counts vary by world and quality preset, with million-particle systems. ${forgefieldLaunchSummary}`,
    platforms: ["Windows 11 x64"],
    idealFor: [
      "Windows users who want procedural desktop environments",
      "People who prefer renderer-driven visuals over looping video",
    ],
    route: "/projects/forgefield",
    visual: "forgefield",
    featured: true,
    presentationTier: "flagship",
    showcaseMedia: {
      kind: "approved-image",
      src: "/images/projects/forgefield-eventide-2026-09-20.webp",
      alt: "Eventide in Forgefield: a bright black-hole accretion ring with flowing copper material and polar jets.",
      caption: "Eventide, captured from the September 20, 2026 Windows build.",
      fit: "cover",
    },
    currentFocus: [
      "Final release preparation",
      "Representative Windows hardware and long-running playback validation",
      "Live wallpaper and screensaver reliability",
    ],
    features: [
      "Nine distinct procedural worlds, rendered live rather than looped video",
      "Native Windows live wallpaper and screensaver modes",
      "World selection and live preview in the Windows launcher",
      "Quality presets for different hardware budgets",
    ],
    technicalProfile: {
      summary:
        "Modern Fortran owns the product model and procedural scene lifecycle. Narrow C and Win32/WGL boundaries support an OpenGL 4.6 renderer, including compute shaders. A self-contained WPF launcher manages world selection, preview, live wallpaper, and screensaver operation.",
      verifiedOn: "2026-09-30",
      languages: ["Fortran 2018", "C11", "C#"],
      nativeCore: [
        "Fortran simulation and product model",
        "Win32 / WGL C boundaries",
      ],
      frameworks: [".NET 10 / WPF"],
      renderer: ["OpenGL 4.6 Core", "GLSL"],
      gpu: ["OpenGL compute shaders"],
      platforms: ["Windows 11 x64"],
      interfaces: ["Win32 live-wallpaper host", "Windows screensaver (.scr)"],
      packaging: ["Self-contained WPF launcher"],
    },
    milestones: [
      { title: "Nine-world procedural collection", state: "complete" },
      { title: "Final release preparation and validation", state: "current" },
      { title: "Public release", state: "planned" },
    ],
    pageSections: [
      {
        title: "Rendered, not replayed",
        body: "The worlds are active rendering systems. Particle, field, surface, and lighting behavior evolves during playback rather than repeating a pre-recorded movie.",
      },
      {
        title: "A desktop application",
        body: "The Windows launcher brings world selection, live preview, wallpaper operation, screensaver settings, and quality presets together. Windows 11 x64 and an OpenGL 4.6-capable GPU are the current technical baseline.",
      },
      {
        title: "Steam release",
        body: forgefieldLaunchSummary,
      },
    ],
  },
  {
    name: phaseArcadeCopy.name,
    slug: "phase-arcade-volume-1",
    status: "launching-soon",
    roadmapGroup: "coming-soon",
    category: "game-collection",
    categoryLabel: "Arcade Game Collection",
    headline: phaseArcadeCopy.tagline,
    tagline: phaseArcadeCopy.hero,
    shortDescription: `${phaseArcadeCopy.introduction} ${phaseArcadeCopy.release}`,
    longDescription: `${phaseArcadeCopy.hero} ${phaseArcadeCopy.lineup} ${phaseArcadeCopy.release}`,
    platforms: ["Windows"],
    usersCan: [
      "Play three distinct arcade games in one collection.",
      "Practice timing, positioning, and control in short sessions.",
    ],
    route: "/projects/phase-arcade-volume-1",
    visual: "phase-arcade",
    presentationTier: "featured",
    showcaseMedia: {
      kind: "approved-image",
      src: "/images/projects/phase-breaker-2026-10-12.webp",
      alt: "Phase Breaker gameplay from Phase Arcade inside a cyan and magenta containment chamber.",
      caption:
        "Phase Breaker gameplay captured from the current desktop build.",
      fit: "cover",
      position: "center",
    },
    includedGames: phaseArcadeGames.map((game) => game.slug),
    features: [
      "Phase Breaker, Phase Shift, and Phase Court",
      "Windows desktop play",
      "Local challenges and technique records",
    ],
    technicalProfile: {
      summary:
        "Godot 4.7 runs the three-game collection in GDScript, using Forward+ for rendering and local saves and settings. Windows desktop is the initial release target; VR development is deferred.",
      verifiedOn: "2026-10-12",
      languages: ["GDScript"],
      engine: ["Godot 4.7"],
      renderer: ["Godot Forward+"],
      storage: ["Godot user:// local saves"],
      platforms: ["Windows PC"],
      packaging: ["Godot Windows desktop export"],
    },
    pageSections: [
      {
        title: "Included games",
        body: phaseArcadeCopy.lineup,
      },
      {
        title: "Release plans",
        body: phaseArcadeCopy.release,
      },
    ],
  },
  {
    name: "Project Load Bearing",
    slug: "project-load-bearing",
    status: "archived",
    roadmapGroup: "archived",
    category: "simulation",
    categoryLabel: "Structural Engineering Simulation",
    headline: "Build a structure. Test the decisions holding it together.",
    tagline:
      "An archived structural prototype connecting hands-on construction to a native Fortran solver.",
    shortDescription:
      "Build a steel frame, test it under load, inspect its response, and redesign it. The current Brace the Bay prototype connects hands-on construction in Unreal Engine to a native Fortran structural solver.",
    longDescription:
      "An archived structural-engineering prototype built around construction, testing, inspection, and redesign. Brace the Bay evaluates a steel frame against authored gravity and lateral loads. A native Fortran solver calculates initial elastic response and first-member failure; Unreal Engine presents the structure and editing tools. The working vertical slice is retained as selected R&D, with no current release commitment.",
    platforms: ["Windows"],
    route: "/projects/project-load-bearing",
    visual: "load-bearing",
    presentationTier: "featured",
    showcaseMedia: {
      kind: "approved-image",
      src: "/images/projects/load-bearing-braced-frame-2026-09.webp",
      alt: "Project Load Bearing's Brace the Bay prototype: a steel frame with roof equipment and a diagonal brace.",
      caption: "Brace the Bay. A braced frame in the current prototype.",
      fit: "cover",
    },
    features: [
      "Steel-frame construction and editing in a working prototype",
      "Authored gravity and lateral load tests",
      "Inspection of initial elastic response and first-member failure",
      "Design revision, undo/redo, and local save/load",
    ],
    technicalProfile: {
      summary:
        "Unreal Engine 5.8 and C++ provide construction tools and presentation. A native Fortran solver evaluates linear-elastic static frame response through a C ABI. The current challenge stops after the first member removal and one static re-equilibrium; it does not model general dynamic collapse.",
      verifiedOn: "2026-09-06",
      languages: ["Fortran", "C++"],
      nativeCore: ["Linear-elastic static frame solver"],
      engine: ["Unreal Engine 5.8"],
      interfaces: ["C ABI"],
      storage: ["Local design and session saves"],
      platforms: ["Windows"],
    },
    pageSections: [
      {
        title: "A working construction challenge",
        body: "Brace the Bay asks players to improve a steel frame within a defined budget and load case. The prototype connects direct construction, testing, failure inspection, modification, and a repeatable redesign loop.",
      },
      {
        title: "The model has boundaries",
        body: "The current solver uses a linear-elastic static frame model. It does not claim dynamic collapse, plasticity, fracture, earthquake simulation, or certified building design. The project is an interactive simulation, not a tool for real-world structural safety decisions.",
      },
      {
        title: "Archived prototype",
        body: "The preserved vertical slice demonstrates construction, inspection, and redesign within a bounded structural model. It is selected R&D, with no current release commitment.",
      },
    ],
  },
  {
    name: "Static Drift",
    slug: "static-drift",
    status: "archived",
    roadmapGroup: "archived",
    category: "app",
    categoryLabel: "Procedural Ambient TV Application",
    headline: "A quieter kind of screen time.",
    tagline:
      "An offline ambient TV application built around evolving procedural worlds.",
    shortDescription:
      "Procedural ambient worlds for Android TV, with optional built-in sound, simple remote controls, and locally saved playback settings. An archived exploration of ambient rendering and remote interaction.",
    longDescription:
      "An archived procedural ambient TV prototype. A native C++ renderer connects to Android TV controls, optional built-in sound, and local playback settings. The work explores sustained visual quality and a quiet, remote-friendly experience. Physical-TV behavior and the final visual and audio experience were not established as release-ready. Retained as rendering R&D, with no current release commitment.",
    platforms: ["Android TV"],
    route: "/projects/static-drift",
    visual: "static-drift",
    presentationTier: "featured",
    showcaseMedia: {
      kind: "approved-image",
      src: "/images/projects/static-drift-prismatic-bloom-2026-09.webp",
      alt: "Static Drift Prismatic Bloom: a folded glass-like form with silver and warm reflections against black.",
      caption: "Prismatic Bloom. Captured from the development renderer.",
      fit: "cover",
    },
    features: [
      "Procedural ambient worlds generated during playback",
      "Optional built-in sound, including silence",
      "Remote-friendly playback controls",
      "Locally saved scene, brightness, sound, and volume settings",
    ],
    technicalProfile: {
      summary:
        "A C++20 rendering core produces procedural visuals through OpenGL and GLSL. The Android TV application connects Kotlin controls to the native engine through JNI. A Windows host supports development and review; it is not an announced consumer platform.",
      verifiedOn: "2026-09-06",
      languages: ["C++20", "Kotlin"],
      renderer: ["OpenGL", "GLSL"],
      interfaces: ["JNI"],
      storage: ["Local playback preferences"],
      platforms: ["Android TV"],
    },
    pageSections: [
      {
        title: "Ambient, not passive video",
        body: "The native engine generates visual motion during playback rather than repeating a movie. The prototype explores visual quality and sustained playback.",
      },
      {
        title: "Built for a remote",
        body: "Playback controls support D-pad navigation, scene selection, brightness, sound, and volume. Settings persist locally, and the visuals can run without audio.",
      },
      {
        title: "Archived prototype",
        body: "Static Drift is retained as rendering R&D, not a store release or an upcoming product. Physical-TV behavior remains unverified; no universal performance target or HDR support is claimed.",
      },
    ],
  },
  {
    name: "Neon Drift",
    slug: "neon-drift",
    status: "active-development",
    roadmapGroup: "active-development",
    category: "game",
    categoryLabel: "Mobile Arcade Game",
    headline: "Forward motion under pressure.",
    tagline:
      "A mobile arcade game about thrust, timing, and precision navigation.",
    shortDescription:
      "Neon Drift is a mobile-first arcade game built around constant forward movement, vertical thrust controls, obstacle avoidance, and precision navigation.",
    longDescription:
      "Neon Drift uses simple controls that are easy to learn while increasingly difficult gameplay rewards mastery, fast reflexes, and careful movement through a stylized neon environment.",
    platforms: ["Android", "Potential future iOS release"],
    usersCan: [
      "Control vertical thrust through a neon obstacle course.",
      "Avoid hazards while maintaining forward momentum.",
      "Improve through short, repeatable arcade runs.",
    ],
    route: "/projects/neon-drift",
    visual: "neon-drift",
    pageSections: [
      {
        title: "What it is",
        body: "Neon Drift is a mobile arcade game, not a racing game. The focus is forward movement, vertical thrust control, obstacle avoidance, and precise navigation.",
      },
      {
        title: "Who it is for",
        body: "It is for mobile players who want a fast arcade challenge that can be learned quickly and improved through repeated play.",
      },
    ],
  },
  {
    name: "Falling From The Sky",
    slug: "falling-from-the-sky",
    status: "active-development",
    roadmapGroup: "active-development",
    category: "game",
    categoryLabel: "Mobile Action Platformer",
    headline: "Freeform aerial movement.",
    tagline:
      "A mobile action game focused on movement, aerial control, and reaction timing.",
    shortDescription:
      "Falling From The Sky is a fast-paced mobile action game focused on fluid movement, aerial control, freeform navigation, and reaction-based gameplay.",
    longDescription:
      "Falling From The Sky gives players freedom of movement instead of lane-based runner structure. Players maneuver through hazards using timing, control, and quick reactions.",
    platforms: ["Android", "Potential future iOS release"],
    usersCan: [
      "Move freely through airborne hazards.",
      "Use timing and aerial control to survive reaction-based challenges.",
      "Play short mobile sessions built around movement skill.",
    ],
    route: "/projects/falling-from-the-sky",
    visual: "falling-from-the-sky",
    pageSections: [
      {
        title: "What it is",
        body: "Falling From The Sky is a mobile action platformer centered on fluid movement, aerial control, and reaction-based navigation.",
      },
      {
        title: "What it is not",
        body: "The project is not positioned as a lane-based runner. Its public direction emphasizes freeform movement and player control.",
      },
    ],
  },
  {
    name: "Phase Shift",
    slug: "phase-shift",
    status: "launching-soon",
    roadmapGroup: "included-game",
    category: "included-game",
    categoryLabel: "Included Game in Phase Arcade",
    headline: "Phase Shift",
    tagline: phaseArcadeGames[1].description,
    shortDescription: phaseArcadeGames[1].description,
    longDescription: `Included in Phase Arcade. ${phaseArcadeCopy.release}`,
    platforms: ["Windows"],
    parentProject: "phase-arcade-volume-1",
    route: "/projects/phase-shift",
    visual: "phase-shift",
    showcaseMedia: {
      kind: "approved-image",
      src: "/images/projects/phase-shift-2026-10-12.webp",
      alt: "Phase Shift gameplay with a photon moving through a cyan and magenta tunnel.",
      caption:
        "Real desktop gameplay captured from the current Phase Shift build.",
      fit: "contain",
      position: "center",
    },
    pageSections: [
      {
        title: "Collection context",
        body: "Phase Shift is part of Phase Arcade alongside Phase Breaker and Phase Court.",
      },
      {
        title: "Routes and control",
        body: "Wide paths provide room for recovery. Narrow apertures require precision, while Release lenses affect the steering target.",
      },
    ],
  },
  {
    name: "Phase Breaker",
    slug: "phase-breaker",
    status: "launching-soon",
    roadmapGroup: "included-game",
    category: "included-game",
    categoryLabel: "Included Game in Phase Arcade",
    headline: "Phase Breaker",
    tagline: phaseArcadeGames[0].description,
    shortDescription: phaseArcadeGames[0].description,
    longDescription: `Included in Phase Arcade. ${phaseArcadeCopy.release}`,
    platforms: ["Windows"],
    parentProject: "phase-arcade-volume-1",
    route: "/projects/phase-breaker",
    visual: "phase-breaker",
    showcaseMedia: {
      kind: "approved-image",
      src: "/images/projects/phase-breaker-2026-10-12.webp",
      alt: "Phase Breaker gameplay inside a cyan and magenta containment chamber.",
      caption:
        "Real desktop gameplay captured from the current Phase Breaker build.",
      fit: "contain",
      position: "center",
    },
    pageSections: [
      {
        title: "Collection context",
        body: "Phase Breaker is part of Phase Arcade alongside Phase Shift and Phase Court.",
      },
      {
        title: "Chamber objectives",
        body: "Clear the three numbered targets in each chamber. Reflector position and movement shape each return; not every remaining tile needs to be cleared.",
      },
    ],
  },
  {
    name: "Phase Court",
    slug: "phase-court",
    status: "launching-soon",
    roadmapGroup: "included-game",
    category: "included-game",
    categoryLabel: "Included Game in Phase Arcade",
    headline: "Phase Court",
    tagline: phaseArcadeGames[2].description,
    shortDescription: phaseArcadeGames[2].description,
    longDescription: `Included in Phase Arcade. ${phaseArcadeCopy.release}`,
    platforms: ["Windows"],
    parentProject: "phase-arcade-volume-1",
    route: "/projects/phase-court",
    visual: "phase-court",
    showcaseMedia: {
      kind: "approved-image",
      src: "/images/projects/phase-court-2026-10-12.webp",
      alt: "Phase Court desktop gameplay showing a cyan player paddle returning the glowing ball across the magenta court.",
      caption:
        "Native desktop gameplay captured from the current Phase Court build.",
      fit: "contain",
      position: "center",
    },
    pageSections: [
      {
        title: "Collection context",
        body: "Phase Court is part of Phase Arcade alongside Phase Shift and Phase Breaker.",
      },
      {
        title: "Returns and rallies",
        body: "State selection takes effect at the next paddle contact. The central mirror reverses the lateral direction of eligible Release shots.",
      },
    ],
  },
  {
    name: "Pigs Can Fly?",
    slug: "pigs-can-fly",
    status: "active-development",
    roadmapGroup: "active-development",
    category: "game",
    categoryLabel: "Mobile Vertical Arcade Game",
    headline: "Climb higher, one run at a time.",
    tagline:
      "A mobile arcade game built around upward movement, altitude, and limited lives.",
    shortDescription:
      "Pigs Can Fly? is a mobile arcade game about propelling a pig upward, managing a limited run, and pushing for a higher altitude.",
    longDescription:
      "Pigs Can Fly? is a mobile arcade game with touch-focused play, character selection, lives, and current and best altitude tracking. It remains in active development while release systems and representative device testing are completed.",
    platforms: ["Mobile"],
    idealFor: [
      "Mobile arcade players",
      "Players who enjoy short score-driven runs",
    ],
    usersCan: [
      "Control upward movement during a mobile arcade run.",
      "Track current and best altitude across attempts.",
      "Choose a character and improve through repeatable sessions.",
    ],
    route: "/projects/pigs-can-fly",
    visual: "pigs-can-fly",
    pageSections: [
      {
        title: "What it is",
        body: "Pigs Can Fly? is built around upward movement, altitude tracking, limited lives, character selection, and repeatable mobile runs.",
      },
      {
        title: "Development state",
        body: "The project remains in active development. Final store systems, platform packaging, and representative Android and iPhone device testing are not yet complete.",
      },
    ],
  },
  {
    name: "Phase Arcade Volume II",
    slug: "phase-arcade-volume-2",
    status: "archived",
    roadmapGroup: "archived",
    category: "game-collection",
    categoryLabel: "VR Arcade Game Collection",
    headline: "An exploration of a shared VR arcade framework.",
    tagline: "An archived VR collection experiment.",
    shortDescription:
      "Phase Arcade Volume II is archived R&D in a shared VR arcade framework.",
    longDescription:
      "An archived exploration of a shared VR arcade framework. The project extended Phase Arcade’s interaction and presentation language into a follow-up collection. Retained as historical work, with no current release commitment.",
    platforms: ["VR"],
    idealFor: [
      "VR arcade players",
      "Players interested in focused short-session games",
    ],
    usersCan: [
      "Explore the direction of the archived collection.",
      "A shared interaction and presentation framework was the design direction.",
    ],
    route: "/projects/phase-arcade-volume-2",
    visual: "phase-arcade-2",
    pageSections: [
      {
        title: "What it is",
        body: "Phase Arcade Volume II is a VR-focused follow-up collection built around the shared design and interaction language of Phase Arcade.",
      },
      {
        title: "Development state",
        body: "The collection is archived. Its shared framework remains useful as a record of VR experimentation.",
      },
    ],
  },
  {
    name: "Darren In The Woods 2",
    slug: "darren-in-the-woods-2",
    status: "archived",
    roadmapGroup: "archived",
    category: "game",
    categoryLabel: "Atmospheric Horror Game",
    headline: "Atmospheric Appalachian horror.",
    tagline:
      "A stylized horror experience built around atmosphere, discovery, and tension.",
    shortDescription:
      "Darren In The Woods 2 is a stylized horror experience inspired by Appalachian folklore, wilderness exploration, environmental storytelling, and psychological tension.",
    longDescription:
      "Archived studio work. Darren In The Woods 2 focuses on atmosphere, discovery, and unsettling encounters rather than constant combat. The project is built around wilderness exploration, environmental storytelling, and psychological tension. This project is retained as R&D and is not an active release commitment.",
    platforms: ["PC"],
    usersCan: [
      "Explore a stylized wilderness horror setting.",
      "Discover environmental details and unsettling encounters.",
      "Experience tension shaped by atmosphere rather than constant combat.",
    ],
    route: "/projects/darren-in-the-woods-2",
    visual: "darren",
    pageSections: [
      {
        title: "What it is",
        body: "Darren In The Woods 2 is an atmospheric horror game inspired by Appalachian folklore and wilderness unease.",
      },
      {
        title: "Design focus",
        body: "The public direction centers on exploration, environmental storytelling, psychological tension, and unsettling encounters.",
      },
    ],
  },
  {
    name: "Talk To Me AAC",
    slug: "talk-to-me",
    status: "archived",
    roadmapGroup: "archived",
    category: "app",
    categoryLabel: "Accessibility & Communication Software",
    headline: "Communication support built for real use.",
    tagline:
      "AAC software focused on accessibility, usability, affordability, and family needs.",
    shortDescription:
      "Talk To Me AAC is an augmentative and alternative communication application for nonverbal and minimally verbal users.",
    longDescription:
      "An archived exploration of accessible communication software for nonverbal and minimally verbal users. The direction centered on customizable visual and speech-based tools, usability, affordability, and family needs. Retained as a project study, with no current release commitment.",
    platforms: ["Android", "iOS", "Tablets"],
    idealFor: [
      "Nonverbal users",
      "Minimally verbal users",
      "Families",
      "Caregivers",
    ],
    usersCan: [
      "Use customizable visual communication tools.",
      "Communicate through speech-based support features.",
      "Use the application on mobile and tablet devices when available.",
    ],
    route: "/projects/talk-to-me",
    visual: "talk-to-me",
    pageSections: [
      {
        title: "What it is",
        body: "Talk To Me AAC is an archived augmentative and alternative communication concept for accessibility and everyday communication support. It is not medical treatment or an emergency service.",
      },
      {
        title: "Who it is for",
        body: "The project is intended for nonverbal and minimally verbal users, families, and caregivers who need practical communication tools.",
      },
    ],
  },
  {
    name: "Bloom",
    slug: "bloom",
    status: "archived",
    roadmapGroup: "archived",
    category: "app",
    categoryLabel: "Recovery & Sobriety Support App",
    headline: "Support for recovery milestones.",
    tagline: "An archived sobriety and recovery support app concept.",
    shortDescription:
      "Bloom is an archived sobriety and recovery support application concept.",
    longDescription:
      "Archived studio work. Bloom explored how to help users track progress, build healthier habits, celebrate milestones, and stay motivated during long-term recovery journeys. This project is retained as R&D and is not an active release commitment.",
    platforms: ["Android", "iOS"],
    usersCan: [
      "Track recovery progress.",
      "Build healthier habits.",
      "Recognize milestones and stay motivated during long-term recovery.",
    ],
    route: "/projects/bloom",
    visual: "bloom",
    pageSections: [
      {
        title: "What it is",
        body: "Bloom is an archived personal recovery and sobriety support application concept. It is not treatment, crisis support, or a replacement for professional care.",
      },
      {
        title: "Who it is for",
        body: "The project is intended for people who want simple support for tracking progress, building habits, and staying motivated during recovery.",
      },
    ],
  },
  {
    name: "Misread",
    slug: "misread",
    status: "archived",
    roadmapGroup: "archived",
    category: "game",
    categoryLabel: "Narrative Psychological Experience",
    headline: "What people mean. What others hear.",
    tagline:
      "A narrative psychological experience about communication and interpretation.",
    shortDescription:
      "Misread is a narrative-focused project exploring perception, communication, misunderstanding, memory, and human psychology.",
    longDescription:
      "An archived narrative concept about perception, communication, memory, and misunderstanding. The project explored how people interpret what is said, what is remembered, and what is left unsaid. Retained as a creative study, with no current release commitment.",
    platforms: ["PC"],
    usersCan: [
      "Experience a narrative centered on interpretation and uncertainty.",
      "Engage with themes of communication, misunderstanding, memory, and human psychology.",
      "Follow a project designed around psychological tension rather than conventional action.",
    ],
    route: "/projects/misread",
    visual: "misread",
    pageSections: [
      {
        title: "What it is",
        body: "Misread is a narrative psychological experience focused on perception, communication, misunderstanding, memory, and human psychology.",
      },
      {
        title: "Creative direction",
        body: "The archived creative direction explored interpretation, ambiguity, and psychological tension.",
      },
    ],
  },
];

export const featuredProjectSlugs = ["forgefield"] as const;

export const featuredProjects = featuredProjectSlugs
  .map((slug) => getProject(slug))
  .filter((project): project is Project => Boolean(project));

export const includedGames = projects.filter((project) =>
  Boolean(project.parentProject),
);

export const archivedProjects = projects.filter(
  (project) => project.status === "archived" && !project.parentProject,
);

export const mobileProjects = projects.filter((project) =>
  ["neon-drift", "falling-from-the-sky", "pigs-can-fly"].includes(project.slug),
);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getStatusLabel(status: ProjectStatus) {
  const labels: Record<ProjectStatus, string> = {
    concept: "Concept",
    research: "Research",
    prototype: "Prototype",
    "active-development": "Active Development",
    "launching-soon": "Coming Soon",
    scheduled: "Scheduled Release",
    "final-testing": "Final Testing",
    "private-beta": "Private Beta",
    "public-release": "Public Release",
    production: "Production",
    archived: "Archived",
  };

  return labels[status];
}

export function getProjectDateLabel(project: Project) {
  return project.launch
    ? getLaunchCampaign(project.launch).statusLabel
    : getStatusLabel(project.status);
}
