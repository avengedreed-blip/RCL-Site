export type ProjectStatus =
  | "concept"
  | "research"
  | "prototype"
  | "active-development"
  | "launching-soon"
  | "final-testing"
  | "private-beta"
  | "public-release"
  | "production"
  | "archived";

export type RoadmapGroup =
  "coming-soon" | "active-development" | "planned" | "included-game";

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
  compactFields: TechnicalProfileKey[];
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
  featuredOrder?: number;
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

export const roadmapDisclaimer =
  "Projects and priorities may evolve as development continues. Availability and platform support are subject to change.";

export const projects: Project[] = [
  {
    name: "Forgefield",
    slug: "forgefield",
    status: "launching-soon",
    roadmapGroup: "coming-soon",
    category: "software",
    categoryLabel: "Procedural Live Wallpapers & Screensavers",
    headline: "Living worlds for the Windows desktop.",
    tagline:
      "Nine procedural worlds. Live wallpaper and screensaver playback. Launching soon.",
    shortDescription:
      "Launching soon: Forgefield is RCL's flagship Windows application for procedural live wallpapers and screensavers. Nine worlds evolve through native simulation and GPU rendering, from black-hole accretion and interacting galaxies to aurora, embers, and neural structures. Not yet publicly released.",
    longDescription:
      "Forgefield turns the Windows desktop into a continuously evolving procedural environment, not a repeating video. Its nine worlds span Eventide, Genesis, Gravitas, Abyssal, Synapse, Quantum Garden, Corona, Ember, and Polar Night. Modern Fortran coordinates the simulation and scene lifecycle, while OpenGL compute and rendering shaders produce the imagery in real time. A native Windows launcher manages world selection, preview, live wallpaper, and screensaver operation. Forgefield is RCL's flagship product and is launching soon. Public availability and a release date have not yet been announced.",
    platforms: ["Windows"],
    idealFor: [
      "Windows users who want procedural desktop environments",
      "People who prefer renderer-driven visuals over looping video",
    ],
    route: "/projects/forgefield",
    visual: "forgefield",
    featured: true,
    featuredOrder: 1,
    presentationTier: "flagship",
    showcaseMedia: {
      kind: "approved-image",
      src: "/images/projects/forgefield-eventide-2026-09.webp",
      alt: "Eventide in Forgefield: a bright black-hole accretion ring with flowing copper material and polar jets.",
      caption:
        "Eventide. Native Forgefield renderer capture, September 2026 pre-release build.",
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
      verifiedOn: "2026-09-06",
      compactFields: ["languages", "renderer", "gpu"],
      languages: ["Fortran 2018", "C11", "C#"],
      nativeCore: [
        "Fortran simulation and product model",
        "Win32 / WGL C boundaries",
      ],
      frameworks: [".NET 10 / WPF"],
      renderer: ["OpenGL 4.6 Core", "GLSL"],
      gpu: ["OpenGL compute shaders"],
      platforms: ["Windows 10/11 x64"],
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
        body: "The Windows launcher brings world selection, live preview, wallpaper operation, screensaver settings, and quality presets together. Windows 10/11 x64 and an OpenGL 4.6-capable GPU are the current technical baseline.",
      },
      {
        title: "Launching soon",
        body: "Forgefield is approaching public release. The current images are real pre-release renderer captures, not a claim that downloads or purchases are available today. Release details will be published when confirmed.",
      },
    ],
  },
  {
    name: "Phase Arcade Volume I",
    slug: "phase-arcade-volume-1",
    status: "final-testing",
    roadmapGroup: "coming-soon",
    category: "game-collection",
    categoryLabel: "Desktop & VR Arcade Game Collection",
    headline: "Three focused arcade games for desktop and VR.",
    tagline:
      "Phase Shift, Phase Breaker, and Phase Court in one arcade collection.",
    shortDescription:
      "Phase Arcade Volume I is a three-game desktop and VR collection awaiting final testing before release. Phase Shift, Phase Breaker, and Phase Court explore motion, timing, positioning, and physical interaction through focused arcade play. The collection has not launched.",
    longDescription:
      "Phase Arcade Volume I brings Phase Shift, Phase Breaker, and Phase Court into one desktop and VR collection. It is built for players who want focused mechanics and short sessions that reward timing, positioning, and repeated practice. Input response, visual readability, and consistent core rules connect traditional desktop play and VR without erasing each game's identity. The collection is awaiting final testing before release. It has not launched, and a release date has not been announced.",
    platforms: ["PC", "VR"],
    usersCan: [
      "Play three distinct arcade games in one collection.",
      "Practice short-session gameplay built around replayable score-chasing loops.",
      "Play Phase Shift, Phase Breaker, and Phase Court through traditional desktop play or VR.",
    ],
    route: "/projects/phase-arcade-volume-1",
    visual: "phase-arcade",
    featured: true,
    featuredOrder: 2,
    presentationTier: "featured",
    showcaseMedia: {
      kind: "approved-image",
      src: "/images/projects/phase-breaker-gameplay-01.webp",
      alt: "Phase Breaker gameplay from Phase Arcade Volume I inside a cyan and magenta containment chamber.",
      caption:
        "Phase Breaker gameplay captured from the current desktop build.",
      fit: "cover",
      position: "center",
    },
    includedGames: ["phase-shift", "phase-breaker", "phase-court"],
    currentFocus: [
      "Desktop and VR play across all three included games",
      "Readability, input response, and short-session pacing",
      "Final testing before public release",
    ],
    features: [
      "Exactly three included games: Phase Shift, Phase Breaker, and Phase Court",
      "Traditional desktop play",
      "VR support",
      "Short-session arcade structure and replayable score chasing",
    ],
    technicalProfile: {
      summary:
        "Godot 4.7 runs the three-game collection in GDScript, using Forward+ for rendering and OpenXR for the PCVR path. Desktop and VR share the collection shell and local save and settings system.",
      verifiedOn: "2026-07-23",
      compactFields: [
        "languages",
        "engine",
        "renderer",
        "interfaces",
        "platforms",
      ],
      languages: ["GDScript"],
      engine: ["Godot 4.7"],
      renderer: ["Godot Forward+"],
      storage: ["Godot user:// local saves"],
      platforms: ["Windows PC", "PCVR"],
      interfaces: ["OpenXR"],
      packaging: ["Godot Windows desktop export"],
    },
    milestones: [
      { title: "Three-game collection structure", state: "complete" },
      { title: "Desktop and VR validation", state: "current" },
      { title: "Public release", state: "planned" },
    ],
    pageSections: [
      {
        title: "Included games",
        body: "Volume I includes exactly three games: Phase Shift, Phase Breaker, and Phase Court. Each has its own arcade focus while remaining part of one collection.",
      },
      {
        title: "Desktop and VR",
        body: "The collection supports traditional desktop play and VR. Specific headset support and release details have not been announced.",
      },
      {
        title: "Final testing",
        body: "The three-game collection is awaiting final testing before release, with attention to input response, readable feedback, and consistent behavior across desktop and VR. It is not yet available to purchase or download.",
      },
    ],
  },
  {
    name: "Project Load Bearing",
    slug: "project-load-bearing",
    status: "active-development",
    roadmapGroup: "active-development",
    category: "simulation",
    categoryLabel: "Structural Engineering Simulation",
    headline: "Build a structure. Test the decisions holding it together.",
    tagline:
      "A structural simulation in development, connecting hands-on construction to a native Fortran solver.",
    shortDescription:
      "Project Load Bearing is a major RCL development focus: build and modify a steel frame, test it under load, inspect its response, and redesign it. The current Brace the Bay prototype connects an Unreal Engine construction environment to a native Fortran structural solver. In development, with no release date announced.",
    longDescription:
      "Project Load Bearing explores structural engineering through a build, test, inspect, and redesign loop. In the current Brace the Bay prototype, a steel-frame construction challenge is evaluated against authored gravity and lateral loads. A native Fortran solver calculates the initial elastic response and identifies the first member failure; Unreal Engine presents the structure, editing tools, and inspection views. The project is a primary RCL development focus, not an imminent release. Its current scope is a working vertical slice rather than a finished engineering simulator.",
    platforms: ["Windows"],
    route: "/projects/project-load-bearing",
    visual: "load-bearing",
    featured: true,
    featuredOrder: 3,
    presentationTier: "featured",
    showcaseMedia: {
      kind: "placeholder",
      alt: "Project Load Bearing public screenshots are not yet approved.",
      message: "Images coming soon.",
    },
    currentFocus: [
      "The Brace the Bay construction, testing, and redesign journey",
      "Clear explanations of structural response and model limits",
      "Hands-on usability and product validation",
    ],
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
      compactFields: ["languages", "engine", "nativeCore"],
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
        title: "In development",
        body: "The current vertical slice is being developed and reviewed. Hands-on usability, presentation, and broader product scope still require validation. No release window has been announced.",
      },
    ],
  },
  {
    name: "Static Drift",
    slug: "static-drift",
    status: "active-development",
    roadmapGroup: "active-development",
    category: "app",
    categoryLabel: "Procedural Ambient TV Application",
    headline: "A quieter kind of screen time.",
    tagline:
      "An offline ambient TV application built around evolving procedural worlds.",
    shortDescription:
      "Static Drift is an ambient application in development for Android TV. Its native renderer creates evolving procedural worlds, with optional built-in sound, simple remote controls, and saved playback settings. It is not yet publicly released.",
    longDescription:
      "Static Drift brings procedural ambient visuals to the television without relying on looping video. The current application combines a native C++ renderer with Android TV controls, optional built-in sound, and local playback settings. Development is focused on sustained visual quality and a quiet, remote-friendly experience. Static Drift remains in development: visual and audio review, physical-TV testing, and release preparation are still ahead of public availability.",
    platforms: ["Android TV"],
    route: "/projects/static-drift",
    visual: "static-drift",
    featured: true,
    featuredOrder: 4,
    presentationTier: "featured",
    showcaseMedia: {
      kind: "placeholder",
      alt: "Static Drift public screenshots are not yet approved.",
      message: "Images coming soon.",
    },
    currentFocus: [
      "Procedural world quality and long-duration playback",
      "Remote-control usability and optional ambient sound",
      "Physical-TV validation and owner review",
    ],
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
      compactFields: ["languages", "renderer", "platforms"],
      languages: ["C++20", "Kotlin"],
      renderer: ["OpenGL", "GLSL"],
      interfaces: ["JNI"],
      storage: ["Local playback preferences"],
      platforms: ["Android TV"],
    },
    pageSections: [
      {
        title: "Ambient, not passive video",
        body: "The native engine generates visual motion as the application runs. Current worlds are under review, so the public page does not substitute concepts or unfinished captures for approved product imagery.",
      },
      {
        title: "Built for a remote",
        body: "Playback controls support D-pad navigation, scene selection, brightness, sound, and volume. Settings persist locally, and the visuals can run without audio.",
      },
      {
        title: "In development",
        body: "Static Drift is not a store release. Physical-TV behavior and the final visual and audio experience still need review. No release date, universal performance target, or HDR support is being promised.",
      },
    ],
  },
  {
    name: "Neon Drift",
    slug: "neon-drift",
    status: "active-development",
    roadmapGroup: "coming-soon",
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
    roadmapGroup: "coming-soon",
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
    status: "active-development",
    roadmapGroup: "included-game",
    category: "included-game",
    categoryLabel: "Included Game in Phase Arcade Volume I",
    headline: "Movement and timing.",
    tagline:
      "A neon tunnel runner built around movement, timing, and state switching.",
    shortDescription:
      "Phase Shift is a tunnel runner where forward motion, lane control, and switching between measured and unmeasured states determine each run.",
    longDescription:
      "Phase Shift is one of the three games included in Phase Arcade Volume I. Players move through a neon corridor, read incoming gates, and switch state at the right moment to keep the run alive.",
    platforms: ["PC", "VR"],
    parentProject: "phase-arcade-volume-1",
    route: "/projects/phase-shift",
    visual: "phase-shift",
    showcaseMedia: {
      kind: "approved-image",
      src: "/images/projects/phase-shift-gameplay-01.webp",
      alt: "Phase Shift gameplay with a photon moving through a cyan and magenta tunnel.",
      caption:
        "Real desktop gameplay captured from the current Phase Shift build.",
      fit: "contain",
      position: "center",
    },
    pageSections: [
      {
        title: "Collection context",
        body: "Phase Shift is part of Phase Arcade Volume I alongside Phase Breaker and Phase Court.",
      },
      {
        title: "Core focus",
        body: "The game emphasizes forward movement, lane control, timing, and switching between measured and unmeasured states inside a short-session arcade format.",
      },
    ],
  },
  {
    name: "Phase Breaker",
    slug: "phase-breaker",
    status: "active-development",
    roadmapGroup: "included-game",
    category: "included-game",
    categoryLabel: "Included Game in Phase Arcade Volume I",
    headline: "Redirect energy. Hold the chamber.",
    tagline: "A reflector survival game built around positioning and pressure.",
    shortDescription:
      "Phase Breaker is a reflector survival game where the player redirects energy through a containment chamber while managing pressure and positioning.",
    longDescription:
      "Phase Breaker is one of the three games included in Phase Arcade Volume I. Its contained arena, readable targets, and reflector-driven play give it a distinct identity within the collection.",
    platforms: ["PC", "VR"],
    parentProject: "phase-arcade-volume-1",
    route: "/projects/phase-breaker",
    visual: "phase-breaker",
    showcaseMedia: {
      kind: "approved-image",
      src: "/images/projects/phase-breaker-gameplay-01.webp",
      alt: "Phase Breaker gameplay inside a cyan and magenta containment chamber.",
      caption:
        "Real desktop gameplay captured from the current Phase Breaker build.",
      fit: "contain",
      position: "center",
    },
    pageSections: [
      {
        title: "Collection context",
        body: "Phase Breaker is part of Phase Arcade Volume I alongside Phase Shift and Phase Court.",
      },
      {
        title: "Core focus",
        body: "The game centers on redirecting energy, maintaining control of the chamber, and surviving mounting arcade pressure.",
      },
    ],
  },
  {
    name: "Phase Court",
    slug: "phase-court",
    status: "active-development",
    roadmapGroup: "included-game",
    category: "included-game",
    categoryLabel: "Included Game in Phase Arcade Volume I",
    headline: "Competition and reaction.",
    tagline:
      "An arcade paddle duel focused on positioning, angles, and reaction speed.",
    shortDescription:
      "Phase Court is an arcade paddle duel where court positioning, reaction speed, and the angle of each return shape the rally.",
    longDescription:
      "Phase Court is one of the three games included in Phase Arcade Volume I. Opposing cyan and magenta sides keep the competitive relationship clear while each rally rewards timing and control.",
    platforms: ["PC", "VR"],
    parentProject: "phase-arcade-volume-1",
    route: "/projects/phase-court",
    visual: "phase-court",
    showcaseMedia: {
      kind: "approved-image",
      src: "/images/projects/phase-court-gameplay-02.webp",
      alt: "Phase Court desktop gameplay showing a cyan player paddle returning the glowing ball across the magenta court.",
      caption:
        "Native desktop gameplay captured from the current Phase Court build.",
      fit: "contain",
      position: "center",
    },
    pageSections: [
      {
        title: "Collection context",
        body: "Phase Court is part of Phase Arcade Volume I alongside Phase Shift and Phase Breaker.",
      },
      {
        title: "Core focus",
        body: "The game emphasizes competitive arcade play, court positioning, return angles, reaction speed, and control.",
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
    status: "active-development",
    roadmapGroup: "active-development",
    category: "game-collection",
    categoryLabel: "VR Arcade Game Collection",
    headline: "The next Phase Arcade collection.",
    tagline: "A VR-focused follow-up collection in active development.",
    shortDescription:
      "Phase Arcade Volume II is a VR-focused follow-up collection currently being built on a shared Phase Arcade framework.",
    longDescription:
      "Phase Arcade Volume II continues the Phase Arcade identity in a VR-focused collection. Its final lineup, release timing, and detailed platform support have not been announced.",
    platforms: ["VR"],
    idealFor: [
      "VR arcade players",
      "Players interested in focused short-session games",
    ],
    usersCan: [
      "Follow development of the next Phase Arcade collection.",
      "Expect distinct games to share a consistent Phase Arcade interaction and presentation framework.",
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
        body: "The collection is in active development. Its included games, final platforms, pricing, and release timing have not been announced.",
      },
    ],
  },
  {
    name: "Darren In The Woods 2",
    slug: "darren-in-the-woods-2",
    status: "active-development",
    roadmapGroup: "active-development",
    category: "game",
    categoryLabel: "Atmospheric Horror Game",
    headline: "Atmospheric Appalachian horror.",
    tagline:
      "A stylized horror experience built around atmosphere, discovery, and tension.",
    shortDescription:
      "Darren In The Woods 2 is a stylized horror experience inspired by Appalachian folklore, wilderness exploration, environmental storytelling, and psychological tension.",
    longDescription:
      "Darren In The Woods 2 focuses on atmosphere, discovery, and unsettling encounters rather than constant combat. The project is built around wilderness exploration, environmental storytelling, and psychological tension.",
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
    status: "active-development",
    roadmapGroup: "active-development",
    category: "app",
    categoryLabel: "Accessibility & Communication Software",
    headline: "Communication support built for real use.",
    tagline:
      "AAC software focused on accessibility, usability, affordability, and family needs.",
    shortDescription:
      "Talk To Me AAC is an augmentative and alternative communication application for nonverbal and minimally verbal users.",
    longDescription:
      "Talk To Me AAC is accessibility and communication software designed to help nonverbal and minimally verbal users communicate through customizable visual and speech-based tools. The project focuses on accessibility, usability, affordability, and real-world family needs.",
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
        body: "Talk To Me AAC is an augmentative and alternative communication application in active development for accessibility and everyday communication support. It is not medical treatment or an emergency service.",
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
    status: "concept",
    roadmapGroup: "planned",
    category: "app",
    categoryLabel: "Recovery & Sobriety Support App",
    headline: "Support for recovery milestones.",
    tagline:
      "A sobriety and recovery support app being developed by Aaron and Katy.",
    shortDescription:
      "Bloom is a sobriety and recovery support application being developed by Aaron and Katy.",
    longDescription:
      "Bloom is planned to help users track progress, build healthier habits, celebrate milestones, and stay motivated during long-term recovery journeys.",
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
        body: "Bloom is a planned personal recovery and sobriety support application being developed by Aaron and Katy. It is not treatment, crisis support, or a replacement for professional care.",
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
    status: "concept",
    roadmapGroup: "planned",
    category: "game",
    categoryLabel: "Narrative Psychological Experience",
    headline: "What people mean. What others hear.",
    tagline:
      "A narrative psychological experience about communication and interpretation.",
    shortDescription:
      "Misread is a narrative-focused project exploring perception, communication, misunderstanding, memory, and human psychology.",
    longDescription:
      "Misread is intended as one of Reed Creative Labs' largest creative efforts. The project explores how people interpret what is said, what is remembered, what is misunderstood, and what is left unsaid.",
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
        body: "The project is planned as a major creative effort for Reed Creative Labs, with emphasis on interpretation, ambiguity, and psychological tension.",
      },
    ],
  },
];

export const featuredProjectSlugs = [
  "forgefield",
  "phase-arcade-volume-1",
  "project-load-bearing",
  "static-drift",
] as const;

export const featuredProjects = featuredProjectSlugs
  .map((slug) => getProject(slug))
  .filter((project): project is Project => Boolean(project));

const featuredProjectSlugSet = new Set<string>(featuredProjectSlugs);

export const includedGames = projects.filter(
  (project) => project.roadmapGroup === "included-game",
);

export const comingSoonProjects = projects.filter(
  (project) => project.roadmapGroup === "coming-soon",
);

export const activeDevelopmentProjects = projects.filter(
  (project) => project.roadmapGroup === "active-development",
);

export const plannedProjects = projects.filter(
  (project) => project.roadmapGroup === "planned",
);

export const comingSoonRoadmapProjects = comingSoonProjects.filter(
  (project) => !featuredProjectSlugSet.has(project.slug),
);

export const activeDevelopmentRoadmapProjects =
  activeDevelopmentProjects.filter(
    (project) => !featuredProjectSlugSet.has(project.slug),
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
    "launching-soon": "Launching Soon",
    "final-testing": "Final Testing",
    "private-beta": "Private Beta",
    "public-release": "Public Release",
    production: "Production",
    archived: "Archived",
  };

  return labels[status];
}

export function getProjectDateLabel(project: Project) {
  return getStatusLabel(project.status);
}
