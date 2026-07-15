export type ProjectStatus = "coming-soon" | "active-development" | "planned";

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
  includedGames?: string[];
  parentProject?: string;
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
      "Forge helps developers inspect, plan, build, audit, repair, and improve real codebases while coordinating models, tools, tasks, and engineering context.",
    longDescription:
      "Forge is a local-first software engineering environment for sustained project work. It combines repository inspection, planning, implementation, review, and repair in one continuous workflow while keeping consequential changes visible for user approval.",
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
    ],
  },
  {
    name: "Phase Arcade Volume I",
    slug: "phase-arcade-volume-1",
    status: "coming-soon",
    roadmapGroup: "coming-soon",
    category: "game-collection",
    categoryLabel: "Desktop & VR Arcade Game Collection",
    headline: "Three focused arcade games for desktop and VR.",
    tagline: "Phase Shift, Phase Breaker, and Phase Court in one arcade collection.",
    shortDescription:
      "Phase Arcade Volume I is a collection of three focused arcade games built around short sessions, clean mechanics, and replayable score-chasing loops for desktop and VR.",
    longDescription:
      "Phase Arcade Volume I includes Phase Shift, Phase Breaker, and Phase Court. Each game is a distinct arcade experience under the broader Phase Arcade identity, with both traditional desktop play and VR support.",
    platforms: ["PC", "VR"],
    usersCan: [
      "Play three distinct arcade games in one collection.",
      "Practice short-session gameplay built around replayable score-chasing loops.",
      "Play Phase Shift, Phase Breaker, and Phase Court through traditional desktop play or VR.",
    ],
    route: "/projects/phase-arcade-volume-1",
    visual: "phase-arcade",
    featured: true,
    includedGames: ["phase-shift", "phase-breaker", "phase-court"],
    pageSections: [
      {
        title: "Included games",
        body: "Volume I includes exactly three games: Phase Shift, Phase Breaker, and Phase Court. Each has its own arcade focus while remaining part of one collection.",
      },
      {
        title: "Desktop and VR",
        body: "The collection supports traditional desktop play and VR. Specific headset support and release details have not been announced.",
      },
    ],
  },
  {
    name: "RCL Science Lab",
    slug: "rcl-science-lab",
    status: "coming-soon",
    roadmapGroup: "coming-soon",
    category: "simulation",
    categoryLabel: "Educational Software & Scientific Simulation Platform",
    headline: "Science you can manipulate.",
    tagline: "Explore scientific ideas through real-time simulation and visualization.",
    shortDescription:
      "RCL Science Lab is an educational simulation platform for exploring scientific concepts through real-time visualization, experimentation, and variable control.",
    longDescription:
      "RCL Science Lab helps users explore science through interactive simulations covering physics, astronomy, cosmology, mathematics, chemistry, and other scientific concepts. Users can manipulate variables, observe outcomes, and build intuition for how complex systems behave.",
    platforms: ["Windows", "macOS", "Linux"],
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
    ],
  },
  {
    name: "Neon Drift",
    slug: "neon-drift",
    status: "coming-soon",
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
    status: "coming-soon",
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
    status: "coming-soon",
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
    status: "coming-soon",
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
    status: "coming-soon",
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
    status: "planned",
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
    status: "planned",
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
  "phase-arcade-volume-1",
  "rcl-science-lab",
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
  if (status === "coming-soon") {
    return "Coming Soon";
  }

  if (status === "active-development") {
    return "Active Development";
  }

  return "Planned";
}

export function getProjectDateLabel(project: Project) {
  return getStatusLabel(project.status);
}
