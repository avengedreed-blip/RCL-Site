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
  | "echo"
  | "phase-arcade"
  | "phase-shift"
  | "phase-defense"
  | "phase-court"
  | "workspace"
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
    name: "Echo",
    slug: "echo",
    status: "coming-soon",
    roadmapGroup: "coming-soon",
    category: "software",
    categoryLabel: "Cinematic Slideshow & Memory Presentation Software",
    headline: "Cinematic memory presentations.",
    tagline: "Turn important photos and moments into polished visual stories.",
    shortDescription:
      "Echo is a cinematic slideshow application for transforming photos, memories, milestones, and meaningful moments into polished visual presentations.",
    longDescription:
      "Echo is a cinematic slideshow and memory presentation application designed for emotional storytelling. It focuses on atmosphere, pacing, music, and presentation quality rather than traditional slide decks.",
    platforms: ["Windows", "macOS", "Linux"],
    idealFor: [
      "Families",
      "Couples",
      "Memorials",
      "Graduations",
      "Weddings",
      "Anniversaries",
      "Personal storytelling",
    ],
    usersCan: [
      "Create visual presentations from meaningful photos and memories.",
      "Build presentations around pacing, music, and atmosphere.",
      "Use Echo for personal milestones, memorials, celebrations, and family stories.",
    ],
    route: "/projects/echo",
    visual: "echo",
    featured: true,
    pageSections: [
      {
        title: "What it is",
        body: "Echo is built for people who want a presentation to feel personal, cinematic, and carefully paced instead of looking like a conventional slide deck.",
      },
      {
        title: "Who it is for",
        body: "The application is intended for families, couples, memorials, graduations, weddings, anniversaries, and personal storytelling projects where presentation quality matters.",
      },
    ],
  },
  {
    name: "RCL Workspace",
    slug: "rcl-workspace",
    status: "coming-soon",
    roadmapGroup: "coming-soon",
    category: "tool",
    categoryLabel: "Productivity & Project Management Software",
    headline: "Local-first project organization.",
    tagline: "Plan, document, and organize complex work in one local-first workspace.",
    shortDescription:
      "RCL Workspace combines project management, notes, planning, documentation, and organizational tools into a single local-first productivity environment.",
    longDescription:
      "RCL Workspace is productivity and project-management software for creators, developers, students, researchers, and professionals who want ownership of their project data without relying on cloud subscriptions.",
    platforms: ["Windows", "macOS", "Linux"],
    idealFor: ["Creators", "Developers", "Students", "Researchers", "Professionals"],
    usersCan: [
      "Organize notes, documentation, plans, and project context.",
      "Keep project information local-first and under user control.",
      "Return to complex work without losing the thread of decisions and next steps.",
    ],
    route: "/projects/rcl-workspace",
    visual: "workspace",
    featured: true,
    pageSections: [
      {
        title: "What it is",
        body: "RCL Workspace is a local-first productivity environment that brings project planning, notes, documentation, and organization into one workspace.",
      },
      {
        title: "Who it is for",
        body: "It is designed for people managing complex creative, technical, academic, or professional work who want structure without surrendering ownership of their data.",
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
    name: "Phase Arcade Volume 1",
    slug: "phase-arcade-volume-1",
    status: "coming-soon",
    roadmapGroup: "coming-soon",
    category: "game-collection",
    categoryLabel: "Arcade Game Collection",
    headline: "Three focused arcade games.",
    tagline: "Phase Shift, Phase Defense, and Phase Court in one arcade collection.",
    shortDescription:
      "Phase Arcade Volume 1 is a collection of fast, focused arcade games built around short-session gameplay, clean mechanics, and replayable score-chasing loops.",
    longDescription:
      "Phase Arcade Volume 1 includes Phase Shift, Phase Defense, and Phase Court. Each game is designed as a distinct arcade experience under the broader Phase Arcade identity.",
    platforms: ["PC", "Potential future Android release"],
    usersCan: [
      "Play three distinct arcade games in one collection.",
      "Practice short-session gameplay built around replayable score-chasing loops.",
      "Move between Phase Shift, Phase Defense, and Phase Court under one shared arcade identity.",
    ],
    route: "/projects/phase-arcade-volume-1",
    visual: "phase-arcade",
    featured: true,
    includedGames: ["phase-shift", "phase-defense", "phase-court"],
    pageSections: [
      {
        title: "Included games",
        body: "The first volume includes Phase Shift, Phase Defense, and Phase Court. Each game has its own core arcade focus while remaining part of the Phase Arcade collection.",
      },
      {
        title: "Who it is for",
        body: "The collection is for players who like short, focused arcade sessions with clean mechanics and repeatable score-chasing goals.",
      },
    ],
  },
  {
    name: "Phase Shift",
    slug: "phase-shift",
    status: "coming-soon",
    roadmapGroup: "included-game",
    category: "included-game",
    categoryLabel: "Included Game in Phase Arcade Volume 1",
    headline: "Movement and timing.",
    tagline: "An included Phase Arcade game focused on movement, timing, and momentum.",
    shortDescription:
      "Phase Shift is included in Phase Arcade Volume 1 and focuses on movement, timing, momentum, and avoiding failure through precise control.",
    longDescription:
      "Phase Shift is one of the three games included in Phase Arcade Volume 1. It is presented as part of the collection rather than a separate standalone roadmap priority.",
    platforms: ["PC", "Potential future Android release"],
    parentProject: "phase-arcade-volume-1",
    route: "/projects/phase-shift",
    visual: "phase-shift",
    pageSections: [
      {
        title: "Collection context",
        body: "Phase Shift is part of Phase Arcade Volume 1 alongside Phase Defense and Phase Court.",
      },
      {
        title: "Core focus",
        body: "The game emphasizes movement, timing, momentum, and quick recovery inside a short-session arcade format.",
      },
    ],
  },
  {
    name: "Phase Defense",
    slug: "phase-defense",
    status: "coming-soon",
    roadmapGroup: "included-game",
    category: "included-game",
    categoryLabel: "Included Game in Phase Arcade Volume 1",
    headline: "Defense and survival.",
    tagline: "An included Phase Arcade game focused on defense, pressure, and target priority.",
    shortDescription:
      "Phase Defense is included in Phase Arcade Volume 1 and focuses on defensive play, pressure, target priority, and survival.",
    longDescription:
      "Phase Defense is one of the three games included in Phase Arcade Volume 1. It is presented as part of the collection rather than a separate standalone roadmap priority.",
    platforms: ["PC", "Potential future Android release"],
    parentProject: "phase-arcade-volume-1",
    route: "/projects/phase-defense",
    visual: "phase-defense",
    pageSections: [
      {
        title: "Collection context",
        body: "Phase Defense is part of Phase Arcade Volume 1 alongside Phase Shift and Phase Court.",
      },
      {
        title: "Core focus",
        body: "The game emphasizes defensive decision-making, pressure management, target priority, and survival.",
      },
    ],
  },
  {
    name: "Phase Court",
    slug: "phase-court",
    status: "coming-soon",
    roadmapGroup: "included-game",
    category: "included-game",
    categoryLabel: "Included Game in Phase Arcade Volume 1",
    headline: "Competition and reaction.",
    tagline: "An included Phase Arcade game focused on competition, positioning, and reaction speed.",
    shortDescription:
      "Phase Court is included in Phase Arcade Volume 1 and focuses on opposing sides, competitive positioning, reaction speed, and arcade control.",
    longDescription:
      "Phase Court is one of the three games included in Phase Arcade Volume 1. It is presented as part of the collection rather than a separate standalone roadmap priority.",
    platforms: ["PC", "Potential future Android release"],
    parentProject: "phase-arcade-volume-1",
    route: "/projects/phase-court",
    visual: "phase-court",
    pageSections: [
      {
        title: "Collection context",
        body: "Phase Court is part of Phase Arcade Volume 1 alongside Phase Shift and Phase Defense.",
      },
      {
        title: "Core focus",
        body: "The game emphasizes competitive arcade play, positioning, reaction speed, and control.",
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
        body: "Talk To Me AAC is an augmentative and alternative communication application for accessibility and everyday communication support.",
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
    headline: "Support for long-term recovery.",
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
        body: "Bloom is a planned recovery and sobriety support application being developed by Aaron and Katy.",
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
    headline: "Perception, memory, and misunderstanding.",
    tagline: "A narrative psychological experience about communication and what people think they understand.",
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
  "rcl-workspace",
  "echo",
  "rcl-science-lab",
  "phase-arcade-volume-1",
] as const;

export const featuredProjects = featuredProjectSlugs
  .map((slug) => getProject(slug))
  .filter((project): project is Project => Boolean(project));

export const includedGames = projects.filter(
  (project) => project.roadmapGroup === "included-game",
);

export const roadmapProjects = projects.filter(
  (project) => project.roadmapGroup !== "included-game",
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
