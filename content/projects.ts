export type ProjectStatus = "launching" | "active-development" | "future";

export type ProjectCategory =
  | "software"
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
  | "darren"
  | "talk-to-me"
  | "phase-arcade-2"
  | "misread";

export type Project = {
  name: string;
  slug: string;
  status: ProjectStatus;
  category: ProjectCategory;
  headline: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  launchDate?: string;
  route: string;
  visual: ProjectVisual;
  featured?: boolean;
  includedGames?: string[];
  pageSections: {
    title: string;
    body: string;
  }[];
};

export const projects: Project[] = [
  {
    name: "Echo",
    slug: "echo",
    status: "launching",
    category: "software",
    headline: "Preserve What Matters.",
    tagline: "Preserve What Matters.",
    shortDescription:
      "Create meaningful presentations from photos, music, and memories without cloud accounts, subscriptions, or distractions.",
    longDescription:
      "Echo is a private place for life's most important moments. It turns photos, music, and memories into meaningful presentations built around family, legacy, and preservation without cloud accounts, subscriptions, or distractions.",
    launchDate: "June 11, 2026",
    route: "/projects/echo",
    visual: "echo",
    featured: true,
    pageSections: [
      {
        title: "Made for memory",
        body: "Echo is built for the moments people want to keep close: family milestones, personal stories, and the pieces of a life worth preserving.",
      },
      {
        title: "No account required",
        body: "The product stays focused on the presentation itself, not feeds, profiles, subscriptions, or cloud-first ceremony.",
      },
    ],
  },
  {
    name: "Phase Arcade Volume 1",
    slug: "phase-arcade-volume-1",
    status: "launching",
    category: "game-collection",
    headline: "Three Games. One Arcade Collection.",
    tagline: "Three Games. One Arcade Collection.",
    shortDescription:
      "Three focused arcade experiences built around skill, speed, and replayability.",
    longDescription:
      "Phase Arcade Volume 1 brings Phase Shift, Phase Defense, and Phase Court into one focused collection. Fast sessions, clean mechanics, and replayable challenge define the release.",
    launchDate: "June 18, 2026",
    route: "/projects/phase-arcade-volume-1",
    visual: "phase-arcade",
    featured: true,
    includedGames: ["phase-shift", "phase-defense", "phase-court"],
    pageSections: [
      {
        title: "Three distinct games",
        body: "Phase Shift, Phase Defense, and Phase Court each center on a clear arcade idea: timing, pressure, and competitive control.",
      },
      {
        title: "Built for replay",
        body: "The collection favors short sessions, immediate reads, and mechanics players can return to without friction.",
      },
    ],
  },
  {
    name: "Phase Shift",
    slug: "phase-shift",
    status: "launching",
    category: "included-game",
    headline: "Thread Impossible Gaps.",
    tagline: "Thread Impossible Gaps.",
    shortDescription:
      "Survive increasingly chaotic patterns by moving at exactly the right moment.",
    longDescription:
      "Phase Shift is momentum, timing, and split-second decisions. One mistake ends the run.",
    launchDate: "June 18, 2026",
    route: "/projects/phase-shift",
    visual: "phase-shift",
    pageSections: [
      {
        title: "Move at the moment",
        body: "Success comes from reading the gap, trusting the timing, and committing before the pattern closes.",
      },
      {
        title: "One more run",
        body: "Clean restarts and escalating patterns keep the focus on mastery, not waiting.",
      },
    ],
  },
  {
    name: "Phase Defense",
    slug: "phase-defense",
    status: "launching",
    category: "included-game",
    headline: "Hold The Line.",
    tagline: "Hold The Line.",
    shortDescription:
      "Read threats, prioritize targets, and survive the escalating assault.",
    longDescription:
      "Phase Defense is simple rules under relentless pressure. Every second matters.",
    launchDate: "June 18, 2026",
    route: "/projects/phase-defense",
    visual: "phase-defense",
    pageSections: [
      {
        title: "Read the assault",
        body: "The playfield is built for fast decisions: what matters now, what can wait, and what will break the line.",
      },
      {
        title: "Pressure without clutter",
        body: "The rules stay simple so the escalation can do the work.",
      },
    ],
  },
  {
    name: "Phase Court",
    slug: "phase-court",
    status: "launching",
    category: "included-game",
    headline: "Own The Angle.",
    tagline: "Own The Angle.",
    shortDescription:
      "Outmaneuver your opponent through positioning, reaction speed, and fast arcade control.",
    longDescription:
      "Phase Court is easy to learn and hard to dominate: a fast arcade duel built around angles, space, and timing.",
    launchDate: "June 18, 2026",
    route: "/projects/phase-court",
    visual: "phase-court",
    pageSections: [
      {
        title: "Fast to understand",
        body: "The rules are direct enough to read immediately, then deep enough to reward better positioning.",
      },
      {
        title: "Built for dominance",
        body: "Every exchange is a test of angle control, reaction speed, and whether you can stay one move ahead.",
      },
    ],
  },
  {
    name: "RCL Workspace",
    slug: "rcl-workspace",
    status: "active-development",
    category: "tool",
    headline: "Never Lose The Thread.",
    tagline: "Never Lose The Thread.",
    shortDescription:
      "A local-first workspace designed to preserve context, organize projects, and help creators return to complex work without starting over.",
    longDescription:
      "RCL Workspace is being built for creative projects that take time, context, and a clear path back in. It is a local-first workspace for organizing notes, references, decisions, and project state so creators can return to complex work without starting over.",
    route: "/projects/rcl-workspace",
    visual: "workspace",
    pageSections: [
      {
        title: "Context has value",
        body: "The product treats notes, decisions, references, and project state as part of the work itself.",
      },
      {
        title: "Built for long projects",
        body: "The direction is a quiet workspace that helps creators reconnect with the decisions, references, and next steps that make a project possible.",
      },
    ],
  },
  {
    name: "Darren in the Woods 2",
    slug: "darren-in-the-woods-2",
    status: "active-development",
    category: "game",
    headline: "Something Is Waiting In The Woods.",
    tagline: "Something Is Waiting In The Woods.",
    shortDescription:
      "A psychological horror experience inspired by Appalachian wilderness, isolation, and the feeling of being watched.",
    longDescription:
      "Darren in the Woods 2 is a psychological horror experience shaped by Appalachian wilderness, isolation, and the feeling of being watched. The project is currently in active development, with atmosphere, restraint, and tension guiding the public direction.",
    route: "/projects/darren-in-the-woods-2",
    visual: "darren",
    pageSections: [
      {
        title: "The woods are not empty",
        body: "The project leans on atmosphere, distance, and the fear of noticing something too late.",
      },
      {
        title: "Atmosphere first",
        body: "The experience is being shaped around silhouettes, fog, distance, and the slow realization that something in the woods has noticed you.",
      },
    ],
  },
  {
    name: "Talk To Me",
    slug: "talk-to-me",
    status: "future",
    category: "app",
    headline: "Communication Without Compromise.",
    tagline: "Communication Without Compromise.",
    shortDescription:
      "An offline-first AAC platform designed to help autistic and nonverbal users communicate clearly while keeping data private and local.",
    longDescription:
      "Talk To Me is a planned offline-first AAC communication platform designed to support autistic and nonverbal users with accessible communication tools while keeping data private and local. The goal is calm, respectful software that helps people communicate clearly without turning personal expression into a cloud service.",
    route: "/projects/talk-to-me",
    visual: "talk-to-me",
    pageSections: [
      {
        title: "Local by default",
        body: "Communication tools should remain useful without depending on an account, a signal, or a remote service.",
      },
      {
        title: "Designed around expression",
        body: "The goal is calm, practical software that keeps the person using it at the center.",
      },
    ],
  },
  {
    name: "Phase Arcade Volume 2",
    slug: "phase-arcade-volume-2",
    status: "future",
    category: "game-collection",
    headline: "More Games. More Challenge. More Arcade.",
    tagline: "More Games. More Challenge. More Arcade.",
    shortDescription:
      "The next collection of focused arcade experiences built on the foundation of Volume 1.",
    longDescription:
      "Phase Arcade Volume 2 is the planned follow-up to Phase Arcade Volume 1, expanding the collection with additional focused arcade experiences while preserving the fast-session philosophy of the original release. The direction is more challenge, more variety, and the same commitment to clean mechanics.",
    route: "/projects/phase-arcade-volume-2",
    visual: "phase-arcade-2",
    pageSections: [
      {
        title: "Built from Volume 1",
        body: "The follow-up keeps the arcade line moving while preserving the fast-session philosophy of the first collection.",
      },
      {
        title: "More without clutter",
        body: "The direction is more challenge, more variety, and the same commitment to focused mechanics.",
      },
    ],
  },
  {
    name: "Misread",
    slug: "misread",
    status: "future",
    category: "game",
    headline: "What Did They Really Mean?",
    tagline: "What Did They Really Mean?",
    shortDescription:
      "A communication-focused game built around misunderstanding, hidden intent, interpretation, and uncertainty.",
    longDescription:
      "Misread is a communication-focused game built around misunderstanding, interpretation, hidden intent, and the challenge of determining what people actually mean. It explores the unstable space between what someone says, what they leave out, and what the player thinks they heard.",
    route: "/projects/misread",
    visual: "misread",
    pageSections: [
      {
        title: "Meaning is unstable",
        body: "The game is built around interpretation, hidden intent, and the uncertainty inside ordinary conversation.",
      },
      {
        title: "Quiet tension",
        body: "Misread is planned as a smaller, stranger project where reading people becomes the central challenge.",
      },
    ],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const includedGames = projects.filter(
  (project) => project.category === "included-game",
);

export const activeDevelopmentProjects = projects.filter(
  (project) => project.status === "active-development",
);

export const futureProjects = projects.filter(
  (project) => project.status === "future",
);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getStatusLabel(status: ProjectStatus) {
  if (status === "launching") {
    return "Launching";
  }

  if (status === "active-development") {
    return "Active development";
  }

  if (status === "future") {
    return "Planned";
  }

  return "Planned";
}

export function getProjectDateLabel(project: Project) {
  if (project.launchDate) {
    return `Launching ${project.launchDate}`;
  }

  return getStatusLabel(project.status);
}
