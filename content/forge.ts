export const forgeWorkflow = [
  {
    title: "Understand",
    body: "Start with the repository itself: its files, structure, conventions, and the decisions already visible in the code.",
  },
  {
    title: "Plan",
    body: "Turn a goal into a reviewable sequence of work, with scope and affected areas made clear before consequential changes.",
  },
  {
    title: "Work",
    body: "Coordinate supported reasoning engines and tools while keeping the project thread connected to the implementation.",
  },
  {
    title: "Review",
    body: "Present evidence, affected files, and proposed diffs so the engineer can inspect the work instead of trusting a summary.",
  },
  {
    title: "Verify",
    body: "Run the available checks, investigate failures, and keep the validation result attached to the work that produced it.",
  },
] as const;

export const forgeColleagues = [
  {
    name: "Dale",
    role: "Default engineering colleague",
    body: "Calm, concise, and evidence-led. Dale prioritizes correctness, trust, simplicity, and maintainability.",
  },
  {
    name: "Iris",
    role: "Research engineer",
    body: "Methodical and curious. Iris emphasizes architecture, patterns, tradeoffs, and understanding before change.",
  },
  {
    name: "Victor",
    role: "Performance engineer",
    body: "Measured and practical. Victor looks for unnecessary work, profiles before optimizing, and keeps performance claims tied to evidence.",
  },
] as const;

export const forgeDevelopmentState = [
  {
    label: "Implemented now",
    body: "Project and folder discovery, a continuous working thread, streaming responses, file inspection, review and approval cards, local project state, and the engineering-colleague system are represented in the current application.",
  },
  {
    label: "Active development",
    body: "The end-to-end planning, execution, review, provider, privacy, and settings experience is being connected and hardened as one reliable workflow.",
  },
  {
    label: "Not yet available",
    body: "Forge is not currently released, downloadable, or purchasable. Public preview details have not been announced.",
  },
] as const;

export const forgeAudience = [
  "Independent developers maintaining real products",
  "Small engineering teams that need durable project context",
  "Game and application developers working across unfamiliar codebases",
  "Technical founders coordinating implementation, review, and validation",
] as const;
