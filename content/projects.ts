export type ProjectStatus =
  | "concept"
  | "research"
  | "prototype"
  | "active-development"
  | "private-beta"
  | "public-release"
  | "production"
  | "archived";

export type RoadmapGroup =
  | "coming-soon"
  | "active-development"
  | "planned"
  | "included-game";

export type ProjectCategory =
  | "software"
  | "simulation"
  | "game-collection"
  | "included-game"
  | "tool"
  | "game"
  | "app";

export type ProjectVisual =
  | "forge"
  | "forgefield"
  | "storm-lab"
  | "phase-arcade"
  | "phase-arcade-2"
  | "phase-shift"
  | "phase-breaker"
  | "phase-court"
  | "pigs-can-fly"
  | "science-lab"
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
    name: "Forge",
    slug: "forge",
    status: "active-development",
    roadmapGroup: "active-development",
    category: "tool",
    categoryLabel: "Software Engineering Environment",
    headline: "Serious engineering work, kept in context.",
    tagline:
      "A local-first engineering environment for sustained work on real repositories and codebases.",
    shortDescription:
      "Forge is a local-first engineering workspace for developers working on real repositories and long-running codebases. It coordinates supported AI models, tools, tasks, plans, and review evidence inside one sustained project workflow. Consequential work remains organized, inspectable, and subject to user approval instead of being reduced to disconnected prompts.",
    longDescription:
      "Forge is a local-first software engineering environment for developers and maintainers doing sustained work on real repositories. It connects repository inspection, planning, implementation, review, and repair so that project context survives across tasks. The engineering goal is to coordinate supported models and tools without obscuring evidence, affected files, or approval boundaries. Its long-term direction is a dependable desktop workspace where complex codebase work remains continuous and reviewable.",
    platforms: ["Windows"],
    idealFor: [
      "Developers working across real repositories",
      "Software maintainers",
      "Privacy-conscious engineers",
      "People managing long-running technical projects",
    ],
    usersCan: [
      "Inspect a repository and keep project context connected to the work.",
      "Plan, build, audit, repair, and improve codebases through one sustained workflow.",
      "Coordinate supported models, tools, and tasks while reviewing consequential changes before approval.",
      "Choose Dale, Iris, or Victor as the engineering colleague communication style.",
    ],
    route: "/projects/forge",
    visual: "forge",
    featured: true,
    featuredOrder: 1,
    presentationTier: "flagship",
    showcaseMedia: {
      kind: "placeholder",
      alt: "Forge product media is being prepared for public release.",
      message: "Images coming soon.",
    },
    currentFocus: [
      "Repository inspection and sustained project context",
      "Planning, implementation, review, and repair workflows",
      "Clear approval boundaries for consequential changes",
    ],
    features: [
      "Repository-aware project work",
      "Model, tool, and task coordination",
      "Selectable engineering-colleague communication profiles",
      "Reviewable plans and proposed changes",
    ],
    technicalProfile: {
      summary:
        "A Rust backend and Tauri 2 desktop shell host a Svelte 5 and SvelteKit interface. SQLite provides local persistence, while the installed Codex app-server is the currently verified engineering engine.",
      verifiedOn: "2026-07-23",
      compactFields: ["languages", "frameworks", "database"],
      languages: ["Rust", "TypeScript"],
      frameworks: ["Tauri 2", "Svelte 5", "SvelteKit"],
      database: ["SQLite"],
      platforms: ["Windows"],
      interfaces: [
        "Codex app-server",
        "Git",
        "Local process execution",
      ],
      packaging: ["Tauri desktop bundle"],
    },
    milestones: [
      { title: "Core engineering workflow", state: "current" },
      { title: "Integration and reliability validation", state: "current" },
      { title: "Public release", state: "planned" },
    ],
    pageSections: [
      {
        title: "How Forge works",
        body: "Forge keeps repository context, engineering decisions, plans, evidence, and proposed changes connected to one project thread. It is designed for continued work rather than disposable prompts.",
      },
      {
        title: "Engineering colleagues",
        body: "Dale, Iris, and Victor are selectable communication profiles applied across supported reasoning models. Dale is the default. They are not separate AI models, and changing colleagues does not change Forge's routing or engineering rules.",
      },
      {
        title: "Review before change",
        body: "Forge is designed to show plans, evidence, affected files, and proposed changes before consequential work is applied. User approval remains the trust boundary.",
      },
      {
        title: "Development state",
        body: "Forge is in active development. Product behavior, supported integrations, and release plans may change as the engineering workflow is tested and refined.",
      },
      {
        title: "Long-term direction",
        body: "Forge is intended to support continued engineering work across the life of a repository, preserving the decisions, evidence, and project context needed to understand what changed and why.",
      },
    ],
  },
  {
    name: "Forgefield",
    slug: "forgefield",
    status: "active-development",
    roadmapGroup: "active-development",
    category: "software",
    categoryLabel: "Procedural Live Wallpapers & Screensavers",
    headline: "Living worlds for the Windows desktop.",
    tagline:
      "A native Windows procedural-rendering project for premium live wallpapers and screensavers.",
    shortDescription:
      "Forgefield is a native Windows procedural-rendering project in active development. Its current implementation contains nine living worlds rendered as active systems for live wallpaper and screensaver playback rather than replayed as fixed video loops. Installer, licensing, packaging, and public distribution remain separate release gates.",
    longDescription:
      "Forgefield is a renderer-led native Windows application for people who want procedural motion on the desktop rather than looping video. The current implementation generates nine living worlds through the product's rendering systems for live wallpaper and screensaver playback. Engineering work focuses on visual continuity, reliable long-running playback, and responsible use of desktop resources. Forgefield remains in active development: installer readiness, licensing, packaging, distribution, and final release validation have not yet passed.",
    platforms: ["Windows"],
    idealFor: [
      "Windows users who want procedural desktop environments",
      "People who prefer renderer-driven visuals over looping video",
    ],
    route: "/projects/forgefield",
    visual: "forgefield",
    featured: true,
    featuredOrder: 2,
    presentationTier: "featured",
    showcaseMedia: {
      kind: "placeholder",
      alt: "Forgefield imagery is intentionally withheld until an approved current-build capture is available.",
      message: "Images coming soon.",
    },
    currentFocus: [
      "Representative hardware validation",
      "Installer, packaging, and signing readiness",
      "Live wallpaper and screensaver reliability",
    ],
    features: [
      "Nine procedural living worlds",
      "Live wallpaper playback",
      "Screensaver playback",
    ],
    technicalProfile: {
      summary:
        "Modern Fortran owns the product model and procedural scene lifecycle, with narrow C and Win32 boundaries feeding an OpenGL 4.6 renderer. A self-contained WPF launcher manages live-wallpaper and screensaver operation.",
      verifiedOn: "2026-07-23",
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
      interfaces: [
        "Win32 live-wallpaper host",
        "Windows screensaver (.scr)",
      ],
      packaging: ["Self-contained WPF launcher"],
    },
    milestones: [
      { title: "Procedural world architecture", state: "complete" },
      { title: "Reliability and hardware validation", state: "current" },
      { title: "Installer, licensing, and distribution gates", state: "planned" },
    ],
    pageSections: [
      {
        title: "What it is",
        body: "Forgefield is a Windows desktop application for procedural live wallpapers and screensavers. Its visual worlds are rendered rather than presented as pre-recorded video loops.",
      },
      {
        title: "Development state",
        body: "Forgefield is in active development and is not presented as released or commercially available. Current work is focused on representative hardware evidence, installer readiness, packaging, signing, licensing, and long-running reliability.",
      },
      {
        title: "Engineering goal",
        body: "The product is being built to sustain renderer-driven environments during normal desktop use, with reliability and resource behavior treated as part of the experience rather than afterthoughts.",
      },
    ],
  },
  {
    name: "Phase Arcade Volume I",
    slug: "phase-arcade-volume-1",
    status: "active-development",
    roadmapGroup: "coming-soon",
    category: "game-collection",
    categoryLabel: "Desktop & VR Arcade Game Collection",
    headline: "Three focused arcade games for desktop and VR.",
    tagline: "Phase Shift, Phase Breaker, and Phase Court in one arcade collection.",
    shortDescription:
      "Phase Arcade Volume I is a collection of three compact arcade games for traditional desktop play and VR. Phase Shift, Phase Breaker, and Phase Court each explore a different relationship between motion, timing, positioning, and physical interaction. The collection is for players who value readable mechanics, short sessions, and repeatable score-driven practice.",
    longDescription:
      "Phase Arcade Volume I brings Phase Shift, Phase Breaker, and Phase Court into one desktop and VR collection. It is built for players who want focused mechanics and short sessions that reward timing, positioning, and repeated practice. The engineering goal is to keep input response, visual readability, and the core rules consistent across traditional desktop play and VR without erasing each game's identity. The collection's long-term direction is a stable arcade foundation that can support distinct games under one shared release.",
    platforms: ["PC", "VR"],
    usersCan: [
      "Play three distinct arcade games in one collection.",
      "Practice short-session gameplay built around replayable score-chasing loops.",
      "Play Phase Shift, Phase Breaker, and Phase Court through traditional desktop play or VR.",
    ],
    route: "/projects/phase-arcade-volume-1",
    visual: "phase-arcade",
    featured: true,
    featuredOrder: 5,
    presentationTier: "featured",
    showcaseMedia: {
      kind: "approved-image",
      src: "/images/projects/phase-shift-gameplay-01.webp",
      alt: "Phase Shift gameplay from Phase Arcade Volume I, showing a cyan and magenta tunnel.",
      caption: "Phase Shift gameplay captured from the current desktop build.",
      fit: "cover",
      position: "center",
    },
    includedGames: ["phase-shift", "phase-breaker", "phase-court"],
    currentFocus: [
      "Desktop and VR play across all three included games",
      "Readability, input response, and short-session pacing",
      "Collection-level release validation",
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
        title: "Collection direction",
        body: "The three games are being refined as one release, with shared attention to input response, readable feedback, short-session pacing, and consistent behavior across desktop and VR.",
      },
    ],
  },
  {
    name: "RCL Science Lab",
    slug: "rcl-science-lab",
    status: "active-development",
    roadmapGroup: "coming-soon",
    category: "simulation",
    categoryLabel: "Educational Software & Scientific Simulation Platform",
    headline: "Science you can manipulate.",
    tagline: "Explore scientific ideas through real-time simulation and visualization.",
    shortDescription:
      "RCL Science Lab is an educational application built around interactive simulations, visualizations, and guided scientific exploration. Students, educators, homeschool families, and independent learners can change variables and observe how a modeled system responds. It exists to make complex scientific behavior easier to investigate through direct experimentation instead of passive explanation alone.",
    longDescription:
      "RCL Science Lab helps students, educators, homeschool families, and self-learners explore science through interactive simulation. Its catalog spans physics, astronomy, cosmology, mathematics, chemistry, and related concepts, with variable controls and guided learning organized around direct observation. The engineering goal is to make each modeled system legible without hiding where an educational simplification is being used. Over time, the lab is intended to become a coherent local environment for experimentation, learning paths, and retained study progress.",
    platforms: ["Desktop"],
    idealFor: [
      "Students",
      "Educators",
      "Homeschool families",
      "Self-learners",
      "Science enthusiasts",
    ],
    usersCan: [
      "Manipulate simulation variables and observe outcomes.",
      "Explore scientific concepts through visual experimentation.",
      "Build intuition for systems that are easier to understand when seen in motion.",
    ],
    route: "/projects/rcl-science-lab",
    visual: "science-lab",
    featured: true,
    featuredOrder: 3,
    presentationTier: "featured",
    showcaseMedia: {
      kind: "approved-image",
      src: "/images/projects/rcl-science-lab-observatory.jpg",
      alt: "RCL Science Lab observatory launch screen with simulation and learning-path navigation.",
      caption: "The current RCL Science Lab observatory organizes simulations and local study progress.",
      fit: "contain",
      position: "center",
    },
    currentFocus: [
      "Scientific simulation breadth and accuracy review",
      "Guided learning and observation workflows",
      "Local progress and experiment organization",
    ],
    features: [
      "Interactive scientific simulations",
      "Real-time variable control",
      "Guided learning paths",
      "Local study progress",
    ],
    technicalProfile: {
      summary:
        "A Svelte 5 and SvelteKit interface runs inside a Tauri 2 desktop shell. Current experiments render through Canvas 2D and retain study state in browser local storage; the staged WebGL2 adapter is not presented as the active renderer.",
      verifiedOn: "2026-07-23",
      compactFields: ["languages", "frameworks", "renderer"],
      languages: ["TypeScript", "Rust"],
      frameworks: ["Svelte 5", "SvelteKit", "Tauri 2"],
      renderer: ["Canvas 2D"],
      storage: ["Browser local storage"],
      platforms: ["Desktop"],
      packaging: ["Tauri desktop bundle"],
    },
    milestones: [
      { title: "Core observatory and catalog", state: "complete" },
      { title: "Simulation and lesson validation", state: "current" },
      { title: "Public release", state: "planned" },
    ],
    pageSections: [
      {
        title: "What it is",
        body: "RCL Science Lab is educational software and a scientific simulation platform focused on interactive exploration rather than passive reading.",
      },
      {
        title: "What users can do",
        body: "Users can adjust variables, compare outcomes, and observe scientific systems through real-time visual feedback.",
      },
      {
        title: "Educational scope",
        body: "RCL Science Lab uses educational models that may simplify complex systems. Educators should assess each simulation for their learners and setting.",
      },
      {
        title: "Long-term direction",
        body: "The project is being organized as a connected local science environment where simulations, guided investigations, learning paths, and progress records support continued study rather than isolated demonstrations.",
      },
    ],
  },
  {
    name: "Storm Lab",
    slug: "storm-lab",
    status: "prototype",
    roadmapGroup: "active-development",
    category: "simulation",
    categoryLabel: "Meteorological Simulation Research Prototype",
    headline: "Atmospheric modeling from field behavior to future decisions.",
    tagline:
      "A working meteorological simulation prototype with a native atmospheric model and map-based visualization.",
    shortDescription:
      "Storm Lab is an in-development meteorological simulation prototype. Its current Windows foundation connects a native atmospheric model to a Godot presentation layer for map-based inspection of modeled weather fields. Radar visualization, severe-weather behavior, forecasting, warnings, and operational decision systems remain planned direction rather than completed public features.",
    longDescription:
      "Storm Lab has a functioning Windows prototype that connects a modern Fortran atmospheric model to a Godot presentation layer. The implemented foundation models moisture, warm-rain microphysics, precipitation, cloud behavior, ordinary convection, and deterministic state, with map-based field, cloud, precipitation, and satellite-style visualization. Radar visualization, forecasting systems, organized severe-weather behavior, warnings, interventions, and operational decision-making remain planned technical direction. The project is research software in active prototype development, not a playable, downloadable, or release-ready product.",
    platforms: ["Windows"],
    idealFor: [
      "People interested in weather systems and operational decision-making",
      "Learners interested in meteorology and simulation",
    ],
    route: "/projects/storm-lab",
    visual: "storm-lab",
    featured: true,
    featuredOrder: 4,
    presentationTier: "featured",
    showcaseMedia: {
      kind: "placeholder",
      alt: "Storm Lab does not yet have approved product imagery.",
      message: "Images coming soon.",
    },
    currentFocus: [
      "Validation of the warm-rain and ordinary-convection model",
      "Map-based weather-field readability",
      "Research toward severe-weather, radar, forecast, and decision systems",
    ],
    milestones: [
      { title: "Fortran and Godot prototype foundation", state: "complete" },
      { title: "Atmospheric-model validation", state: "current" },
      { title: "Radar, warning, and decision systems", state: "planned" },
    ],
    features: [
      "Native atmospheric simulation prototype",
      "Map-based weather-field visualization",
      "Field-derived cloud, precipitation, and satellite-style products",
    ],
    technicalProfile: {
      summary:
        "The current Windows prototype uses a Fortran atmosphere model exposed through a versioned C ABI and C++ GDExtension to Godot 4.7.1. Godot owns presentation and input. Radar, severe-weather, warning, intervention, and broader operational systems are not presented as implemented.",
      verifiedOn: "2026-07-23",
      compactFields: ["languages", "engine", "interfaces"],
      languages: ["Fortran", "C++", "GDScript"],
      nativeCore: ["Fortran atmospheric simulation"],
      engine: ["Godot 4.7.1"],
      renderer: ["Godot OpenGL Compatibility"],
      platforms: ["Windows"],
      interfaces: ["Versioned C ABI", "C++ GDExtension"],
    },
    pageSections: [
      {
        title: "Current state",
        body: "Storm Lab has a functioning simulation prototype: a native atmospheric model, a Godot presentation layer, map-based field inspection, and deterministic state. It is not presented as playable, downloadable, feature-complete, or release-ready.",
      },
      {
        title: "Planned direction",
        body: "Radar visualization, forecasting systems, organized severe-weather behavior, warnings, interventions, and operational decision-making remain planned technical direction. They are not claims about the current prototype.",
      },
      {
        title: "Engineering goal",
        body: "Prototype work is testing whether researched atmospheric behavior and readable visual evidence can support an understandable meteorological simulation before the broader operational scope advances.",
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
    tagline: "A mobile arcade game about thrust, timing, and precision navigation.",
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
    tagline: "A mobile action game focused on movement, aerial control, and reaction timing.",
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
    tagline: "A neon tunnel runner built around movement, timing, and state switching.",
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
      caption: "Real desktop gameplay captured from the current Phase Shift build.",
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
      caption: "Real desktop gameplay captured from the current Phase Breaker build.",
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
    tagline: "An arcade paddle duel focused on positioning, angles, and reaction speed.",
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
    tagline: "A mobile arcade game built around upward movement, altitude, and limited lives.",
    shortDescription:
      "Pigs Can Fly? is a mobile arcade game about propelling a pig upward, managing a limited run, and pushing for a higher altitude.",
    longDescription:
      "Pigs Can Fly? is a mobile arcade game with touch-focused play, character selection, lives, and current and best altitude tracking. It remains in active development while release systems and representative device testing are completed.",
    platforms: ["Mobile"],
    idealFor: ["Mobile arcade players", "Players who enjoy short score-driven runs"],
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
    idealFor: ["VR arcade players", "Players interested in focused short-session games"],
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
    tagline: "A stylized horror experience built around atmosphere, discovery, and tension.",
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
    tagline: "AAC software focused on accessibility, usability, affordability, and family needs.",
    shortDescription:
      "Talk To Me AAC is an augmentative and alternative communication application for nonverbal and minimally verbal users.",
    longDescription:
      "Talk To Me AAC is accessibility and communication software designed to help nonverbal and minimally verbal users communicate through customizable visual and speech-based tools. The project focuses on accessibility, usability, affordability, and real-world family needs.",
    platforms: ["Android", "iOS", "Tablets"],
    idealFor: ["Nonverbal users", "Minimally verbal users", "Families", "Caregivers"],
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
    tagline: "A sobriety and recovery support app being developed by Aaron and Katy.",
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
    tagline: "A narrative psychological experience about communication and interpretation.",
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
  "forge",
  "forgefield",
  "rcl-science-lab",
  "storm-lab",
  "phase-arcade-volume-1",
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

export const activeDevelopmentRoadmapProjects = activeDevelopmentProjects.filter(
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
