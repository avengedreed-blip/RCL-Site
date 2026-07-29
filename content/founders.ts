export const founderStory = {
  hero: {
    title: "The People Behind Reed Creative Labs",
    subtitle:
      "An independent studio built by real people, real life, and the belief that software should be creative, useful, private, and worth owning.",
  },
  founders: [
    {
      name: "Aaron Reed",
      title: "Founder, Lead Developer & Creative Technologist",
      intro: "Hi, I'm Aaron.",
      bio: [
        "Before founding Reed Creative Labs, I served as a U.S. Navy submariner and trained through the Navy Nuclear Power Program. That background, along with years of technical troubleshooting and industrial maintenance, shaped a systems-first approach built around precision, disciplined problem solving, and understanding how complex parts affect the whole.",
        "That experience still influences how the studio works today: understand the system deeply, build carefully, verify behavior, and choose reliability over unnecessary complexity. Over time, that approach grew into a passion for software development, systems design, simulations, and games.",
        "Today, I design, develop, and maintain every Reed Creative Labs product, from productivity tools and creative software to experimental projects and games. My goal is simple: build things that are useful, memorable, and worth owning.",
      ],
    },
    {
      name: "Katy Reed",
      title: "Creative Director, Art Director & Chief Reality Officer",
      bio: [
        "Every studio needs someone who can see both the big picture and the details that everyone else misses.",
        "For Reed Creative Labs, that's Katy.",
        "She helps guide the visual identity and creative direction of the studio while providing invaluable feedback on everything from usability and design to the overall feel of a product. Many of the best improvements across RCL projects started as a simple observation from Katy during testing or review.",
        "When ambitious ideas begin growing beyond their intended scope, she's usually the first person to ask the most important question:",
      ],
      quote: "But does it actually make the product better?",
    },
  ],
  familyBuilt: {
    heading: "A Family-Built Studio",
    body: [
      "Reed Creative Labs is an independent studio built by a husband-and-wife team with a shared belief that software should be creative, useful, and respectful of the people who use it.",
      "Every product is developed alongside full-time work, family life, and the wonderful chaos that comes with raising four children. Progress doesn't happen in a massive office or a venture-funded startup. It happens during early mornings, late nights, nap times, quiet moments, and every spare hour we can find.",
      "That reality shapes the way we build.",
      "We focus on creating products that are thoughtful, practical, and worth the time people invest in them because we understand how valuable that time is.",
      "Reed Creative Labs exists because we believe small teams can still build meaningful things, and because creating something worthwhile is a journey worth sharing.",
    ],
  },
  support: {
    heading: "Support the Work",
    copy:
      "The best way to support Reed Creative Labs is to try the products, share the studio, and help independent software reach the people who need it.",
    ctas: [
      { label: "View Products", href: "/products", variant: "primary" },
      { label: "Contact the Studio", href: "/contact", variant: "secondary" },
    ],
  },
} as const;
