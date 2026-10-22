export const services = [
  { id: "websites", title: "Business websites", range: "$900–$3,500", body: "A clear, fast website that explains your business and gives customers a direct next step.", examples: "Service businesses, company websites, campaign landing pages, and platform-based storefronts.", scope: "Responsive pages, content structure, search metadata, and a contact path. Content, integrations, and page count determine scope." },
  { id: "front-end", title: "Front-end applications", range: "$1,500–$6,000+", body: "Interfaces that make a workflow easier to understand and use.", examples: "Dashboards, customer-facing tools, calculators, and interfaces for existing APIs.", scope: "Interaction design and implementation around your existing data sources or a suitable managed platform." },
  { id: "automation", title: "Business automation", range: "$500–$3,000", body: "Reduce repetitive steps between the tools your business already uses.", examples: "Report preparation, spreadsheet workflows, data formatting, and managed-service integrations.", scope: "One defined workflow, clear inputs and outputs, error handling, and a documented handoff." },
  { id: "agency", title: "Agency implementation", range: "$60–$100 / hour", body: "A technical partner to turn your creative direction into working pages and components.", examples: "Design-to-code implementation, interactive websites, custom components, and overflow development.", scope: "Hourly work or scoped project pricing. Capacity, review rounds, confidentiality, and handoff are agreed before work begins." },
  { id: "visualization", title: "Scientific & technical visualization", range: "$1,500–$10,000+", body: "Make a complex system visible, explorable, and easier to explain.", examples: "Interactive data views, simulation interfaces, technical demonstrations, and educational visualizations.", scope: "Models, data sources, assumptions, and validation needs are established together. Exploratory visuals are labeled accordingly." },
] as const;

export const processSteps = [
  { title: "Define the work", body: "Share the problem, audience, existing assets, budget, and timing. We check fit and identify the decisions that matter." },
  { title: "Agree the scope", body: "Set deliverables, milestones, price, ownership, and acceptance criteria in writing before implementation begins." },
  { title: "Build & review", body: "Review working progress at agreed checkpoints. Test the important user paths, responsive layouts, and accessibility." },
  { title: "Hand over", body: "Receive the agreed source, access, and operating notes. Hosting, ongoing support, and future changes have a clear owner." },
] as const;
