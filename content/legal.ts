import { studioEmail } from "@/content/contact";

export const policyDates = {
  effective: "August 6, 2026",
  lastUpdated: "September 5, 2026",
} as const;

export type LegalSection = {
  title: string;
  body: string[];
};

export const privacySections: LegalSection[] = [
  {
    title: "Scope",
    body: [
      "This policy describes the current data practices of the Reed Creative Labs website at reedcreativelabs.com. It does not automatically cover separately distributed products, client work, or third-party storefronts.",
    ],
  },
  {
    title: "Information processed when you visit",
    body: [
      "The website does not require accounts and does not intentionally collect personal information through forms, newsletters, purchases, or user profiles.",
      "The site is hosted by Vercel. Vercel may process ordinary technical information needed to deliver and protect the site, such as an IP address, browser and device information, requested URLs, timestamps, and security or error logs. Reed Creative Labs may review limited hosting logs when operating or troubleshooting the site.",
    ],
  },
  {
    title: "Cookies, storage, and analytics",
    body: [
      "The Reed Creative Labs production website is configured to use Vercel Speed Insights to measure aggregate page performance. According to Vercel, each anonymous performance record may include the route and URL after Reed Creative Labs removes query strings and fragments, network speed, browser, device type, operating system, country, Web Vital and its page-element attribution, SDK version, and server-received time. Vercel states that these records are not tied to an individual visitor or IP address and cannot be used to reconstruct a browsing session.",
      "Speed Insights uses native browser performance APIs and first-party Vercel intake routes. Reed Creative Labs does not use cookies, local storage, session storage, advertising identifiers, custom analytics events, or visitor profiles for this measurement.",
      "Performance records are limited to published page paths. Unknown URLs, including mistyped addresses, are excluded. Records are also suppressed when the browser signals Do Not Track or Global Privacy Control.",
      "Reed Creative Labs does not use Vercel Web Analytics because it creates a daily visitor hash and groups page views into sessions, which does not meet the studio's stricter no-fingerprinting standard. The site does not use advertising analytics, tracking pixels, behavioral advertising, session recording, heatmaps, or cross-site tracking.",
      "The copy-email control uses the browser Clipboard API only after you select it and does not send clipboard contents to Reed Creative Labs.",
    ],
  },
  {
    title: "Email and service inquiries",
    body: [
      `If you email ${studioEmail}, Reed Creative Labs receives the address you use, your message, and anything you choose to attach. Email providers also process messages under their own terms and privacy practices.`,
      "Messages are used to respond to inquiries and maintain appropriate business or security records. They are kept only as long as reasonably needed for those purposes or legal obligations. Do not send passwords, payment-card details, health records, or other highly sensitive information by ordinary email.",
    ],
  },
  {
    title: "Sharing and selling",
    body: [
      "Reed Creative Labs does not sell personal information or use visitor information for behavioral advertising.",
      "Information may be processed by providers needed to operate the website and email, or disclosed when reasonably necessary to comply with law or address fraud, security, rights, or safety concerns.",
    ],
  },
  {
    title: "Third-party destinations",
    body: [
      "Links to storefronts, model providers, app stores, social platforms, or other services are governed by the destination's own terms and privacy practices after you leave this site. The current website does not intentionally embed third-party video, advertising, or social-media widgets.",
    ],
  },
  {
    title: "Children and families",
    body: [
      "This marketing website is not designed to collect personal information from children. A parent, guardian, or caregiver should assist if a child needs to contact Reed Creative Labs. Contact the studio if you believe a child has sent personal information by email.",
    ],
  },
  {
    title: "Security",
    body: [
      "Reed Creative Labs uses a static-site architecture and reasonable measures intended to reduce the website's data and security exposure. No internet transmission, hosting provider, or email system can be guaranteed completely secure.",
    ],
  },
  {
    title: "Questions and updates",
    body: [
      `Questions or reasonable privacy requests can be sent to ${studioEmail}. Enough information may be needed to understand and verify a request before acting on it.`,
      "This policy may change as the website and studio offerings evolve. The effective and last-updated dates identify the current version.",
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    title: "Acceptance and scope",
    body: [
      "By using this website, you agree to these Website Terms. If you do not agree, do not use the site.",
      "These terms govern the public Reed Creative Labs website. Distributed products, purchases, client work, and third-party storefronts may have additional licenses, store terms, or written agreements.",
    ],
  },
  {
    title: "Information and development status",
    body: [
      "Website content is provided for general information. Product descriptions, screenshots, roadmaps, platforms, and development statuses describe current intentions and may change.",
      "Concept, Research, Prototype, Active Development, Private Beta, Final Testing, and Launching Soon do not promise a release date, final feature set, price, platform, or continued development. A product is available only when Reed Creative Labs or an authorized storefront clearly says it is available.",
    ],
  },
  {
    title: "Intellectual property and use",
    body: [
      "Copyright and other rights in original Reed Creative Labs site content are reserved. Third-party names, software, icons, and marks remain the property of their respective owners, and their appearance does not imply endorsement.",
      "You may view and link to public pages for personal, editorial, or legitimate business purposes. You may not misrepresent affiliation, republish substantial site content as your own, interfere with the site, attempt unauthorized access, or distribute malicious material through it.",
      "Access to this website does not grant a license to copy or commercially exploit separately distributed Reed Creative Labs products. Product-specific terms will apply when products are distributed.",
    ],
  },
  {
    title: "Services and communications",
    body: [
      "Sending an inquiry does not create a client relationship, reserve availability, or require either party to proceed. Work begins only after both parties accept a written scope or equivalent agreement.",
      "You are responsible for having permission to share materials submitted for a possible project. Do not send credentials, regulated data, or highly sensitive information until an appropriate method and written scope have been agreed upon.",
    ],
  },
  {
    title: "Educational and wellness information",
    body: [
      "RCL simulations may simplify complex systems. They are not professional engineering, safety, medical, financial, or research advice.",
      "Descriptions of planned AAC, recovery, accessibility, or wellness projects do not claim medical treatment, diagnosis, clinical validation, emergency service, or guaranteed outcomes.",
    ],
  },
  {
    title: "Third-party links, stores, and purchases",
    body: [
      "Third-party links are provided for convenience. Reed Creative Labs is not responsible for the destination's content, availability, security, or practices.",
      "If a product is distributed through a third-party storefront, that store generally handles payment, delivery, taxes, accounts, and refunds under its own terms unless Reed Creative Labs states otherwise. This website does not currently offer direct checkout.",
    ],
  },
  {
    title: "Availability and liability",
    body: [
      "The website is provided as available without a guarantee that it will always be uninterrupted, complete, current, secure, or error-free.",
      "To the extent permitted by law, Reed Creative Labs is not liable for indirect, incidental, special, consequential, or punitive losses arising from use of, inability to use, or reliance on this informational website. This does not exclude rights or liabilities that cannot legally be excluded.",
    ],
  },
  {
    title: "Changes and contact",
    body: [
      "These terms may change as the website and studio offerings evolve. The effective and last-updated dates identify the current version.",
      `Questions can be sent to ${studioEmail}.`,
    ],
  },
];

export const accessibilitySections: LegalSection[] = [
  {
    title: "Current approach",
    body: [
      "Reed Creative Labs aims to make this website usable with keyboard, touch, screen readers, zoom, and reduced-motion preferences. Accessibility is ongoing work, not a one-time certification.",
      "The current site uses semantic landmarks and headings, a skip link, visible keyboard focus, text alternatives for meaningful images, responsive layouts, and reduced-motion behavior.",
    ],
  },
  {
    title: "Conformance and limitations",
    body: [
      "Reed Creative Labs does not claim formal accessibility certification or complete conformance with a particular standard at this time.",
      "Some product screenshots contain small interface text that may not be readable at every size. Captions and surrounding descriptions provide the main context while the studio continues to review contrast, reflow, focus behavior, and assistive-technology support.",
    ],
  },
  {
    title: "Accessibility feedback",
    body: [
      `If a page, control, image, or document is difficult to use, email ${studioEmail}. Include the page address, what you were trying to do, and any browser or assistive-technology details you are comfortable sharing.`,
      "Reed Creative Labs will review practical accessibility reports and work toward a reasonable improvement or alternative where possible. No fixed response or remediation time is promised.",
    ],
  },
];

export const securitySections: LegalSection[] = [
  {
    title: "Website security posture",
    body: [
      "This marketing site is a static Next.js export. It does not currently provide public accounts, form submission, payment processing, or a database. Its only intentional telemetry configuration is production-only Vercel Speed Insights for anonymous aggregate Web Vitals; it does not use visitor analytics, advertising scripts, or behavioral profiles.",
      "The deployment uses HTTPS and browser security headers. These choices reduce the site's attack surface but do not make the website or its providers risk-free.",
    ],
  },
  {
    title: "Report a vulnerability",
    body: [
      `Send a good-faith security report to ${studioEmail} with the affected URL or product, reproduction steps, potential impact, and evidence that can be shared safely. Use the subject line Security Report when practical.`,
      "Do not access, alter, retain, or disclose other people's data; disrupt availability; use social engineering; or perform destructive testing. Allow a reasonable opportunity to investigate before public disclosure.",
    ],
  },
  {
    title: "Scope and expectations",
    body: [
      "The public security contact covers this website and public Reed Creative Labs products. Reports about third-party platforms should normally use that provider's disclosure channel.",
      "Submitting a report does not create a contract, guarantee a response time, or promise payment or a bug bounty.",
    ],
  },
];
