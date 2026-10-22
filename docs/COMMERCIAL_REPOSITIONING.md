# Commercial repositioning â€” October 21, 2026

## Outcome and scope

Implemented in the existing Next.js static-export application. No framework migration, backend, new runtime dependency, account purchase, or changes to the untracked marketing directory.

Before: Forgefield-led homepage with commercial services below product showcases and an email-only contact page.

After: a commercial studio homepage leads with business websites, front-end applications, practical automation, agency implementation, and technical visualization. The existing Fortran/WebAssembly/WebGL2 hero remains, including mobile stills, reduced motion, pause/resume, offscreen throttling, and fallback behavior. Forgefield and Phase Arcade retain their dedicated product pages. Other projects remain catalog references, following the owner’s final scope decision.

## Routes and implementation

| Route | Change | Key source |
| --- | --- | --- |
| `/` | Commercial hero, offers, work, process, agency callout, inquiry CTA | `app/page.tsx` |
| `/services` | Five offers, USD planning ranges, explicit scope and infrastructure boundaries | `app/services/page.tsx`, `content/commercial.ts` |
| `/agency-partners` | Existing page retained; nationwide collaboration, scoped rates, technical visualization, inquiry flow | `app/agency-partners/page.tsx`, `content/agency-partners.ts` |
| `/contact` | Accessible email-draft form and direct email fallback | `components/ProjectInquiry.tsx`, `lib/inquiry.ts`, `content/inquiry.ts` |
| `/work` | Client work, original products, and internal demonstrations | `app/work/page.tsx`, `components/CommercialSections.tsx` |
| `/science-lab` | Editorial technical context for existing simulation work; no standalone product launch claim | `app/science-lab/page.tsx` |
| `/about` | Services-first introduction and Start a Project CTA | `app/about/page.tsx` |
| `/privacy`, `/security`, `/terms` | Shared policy date updated; privacy disclosure explains draft preparation and optional conversion counts | `content/legal.ts` |
| Shared | Hire RCL / Explore RCL navigation, footer discovery, design tokens reused | `components/SiteNav.tsx`, `components/SiteFooter.tsx`, `app/commercial.css` |
| SEO | New routes in sitemap and analytics allowlist; commercial metadata and discovery copy | `lib/site-routes.ts`, `lib/seo.ts`, `lib/structured-data.ts`, `public/llms.txt` |

Existing `/products`, Forgefield and Phase Arcade detail URLs, Steam/itch.io links, YouTube trailer, and social URLs remain. Thirteen other product routes no longer generate pages. Permanent redirects lead to visible catalog references or, for Phase Shift, Breaker, and Court, to their sections within Phase Arcade. Legacy TV aliases now lead directly to the Static Drift catalog reference. Sitemap, discovery links, JSON-LD, and analytics allowlists use the two-page product scope. The previously withdrawn `/projects/rcl-science-lab` product URL keeps its existing redirect to `/products`; the new `/science-lab` is an editorial overview, not a revival of that product.

The `.gitignore` rule `work` was narrowed to `/work/` so it continues to ignore the root scratch directory while permitting the new `app/work` route and public work assets to be versioned.

## Portfolio evidence

- **Brotherhood Coffee Co. â€” client website.** Current local repository at `C:/Dev/Brotherhood Coffee Site`: README documents semantic HTML/CSS/JavaScript, managed Square ordering, and client-original assets; `PRODUCTION_AUDIT.md` explicitly identifies supplied client assets and protected business content; `src/components/Footer.js` credits Reed Creative Labs. The official 192Ã—192 public WebP logo was copied unchanged. No paid status, endorsement, testimonial, revenue, or conversion outcome is claimed. An attempted web-tool fetch was unavailable; live external site behavior was not certified in this task.
- **Forgefield â€” original RCL product, released.** Status and Steam/itch.io URLs remain in the existing product registry. Preview uses the real September 20, 2026 native Eventide capture with its build date stated. Product pages and launch checks remain authoritative for availability, price, and release date.
- **Phase Arcade â€” original RCL product, upcoming.** Uses the October 12, 2026 Phase Breaker capture and the approved late-October Windows target with Android/iOS afterward. No new release claim.
- **RCL website â€” internal project.** Fresh 1440×1000 desktop and 390×1000 mobile browser captures of this candidate replace the September presentation in Work and Agency Partners. The captures show the deterministic reduced-motion hero fallback; they are not synthetic mockups. Stack is verified from the current source and dependencies.
- Cascade and RCL Finance were not added: neither has a public entry in this repositoryâ€™s current product registry or a verified public case study here.

## Curation and visual review

The review retained the graphite, copper/gold, and white palette and the actual simulation/product media. Changes address repetition and unfinished presentation rather than replacing the visual identity:

- Home and Services use numbered editorial offer rows with restrained rules instead of repeated equal-sized filled cards.
- Home proof pairs a real client website with Forgefield at different sizes and vertical positions. Work expands each example using content-specific layouts, factual labels, and real screenshots.
- About’s discipline cards became open numbered rows. The footer separates Hire RCL and Explore RCL rather than repeating a long generic capability list.
- Contact’s form is open on the page with a restrained top rule and clear email-draft language, rather than another large panel.
- Generic catalog slogans were replaced with “Games & software” and “Technical studies.” The two marketed product pages retain their distinct layouts and real imagery.
- Removing the other detail pages also removes their generic “No public imagery available” hero placeholders. Their underlying source records/assets remain available without exposing unused detail pages.
- Founder biography, legal information, original gameplay copy, existing store links, and launch facts were preserved.

The owner requested restoration of the live hero framing after the initial review. The field is back inside the original constrained layout, with its original insets, masks, caption, and playback-button position. Responsive stage heights now preserve the measured live composition independently of the shorter commercial copy. A read-only live comparison at eight viewport sizes (390–1920 pixels wide, including a short desktop display) confirmed identical horizontal bounds and less than one pixel of difference in field height and hero-relative vertical position. Desktop/mobile website screenshots were refreshed to show the restored framing. The simulation runtime is unchanged.

## Inquiry delivery and owner setup

**Working now in the candidate:** required fields, native validation plus explicit value/length validation, honeypot rejection, optional company, all requested budget bands, partnership selection, local draft preparation, encoded mailto link, readable draft, copy success/error feedback, invalidation of outdated drafts after edits, and direct email fallback without JavaScript.

`content/inquiry.ts` is the isolated delivery configuration. Current mode is `email-draft`; recipient comes from the existing verified `content/contact.ts` address. The browser holds fields only in the current page. No server receives or stores the form, no inquiry details enter analytics, and no delivery success is claimed. There is no server-side form validation to test because no submission endpoint exists. Honeypot validation is a local guard, not a managed anti-spam service. Email-provider spam handling applies after a visitor sends mail.

**Before enabling direct on-site submission:** the owner must select an existing managed form service/account and verify the destination inbox. Then implement that providerâ€™s documented adapter at this boundary, configure its server-side required-field validation and spam controls, permit only its exact endpoint in CSP, update the provider disclosure, and verify success/failure and inbox receipt using an authorized test. No provider, form ID, destination credential, paid plan, or server functionality has been invented. This integration is a follow-up; the current email flow can be used as-is if the owner accepts that delivery method.

No test email was sent. Opening a mailto link and a providerâ€™s delivery receipt are different evidence; only local draft construction and browser behavior are tested here.

## Measurement

Existing Vercel Web Analytics and Speed Insights retain the production-only gate, published-path allowlist, query/fragment removal, and DNT/GPC suppression. New pages are included in that allowlist.

Optional fixed events are wired in `components/ConversionEvents.tsx` and `lib/conversion-events.ts`:

| Event | Meaning |
| --- | --- |
| `contact_click` | Contact-page or studio email link selected |
| `partnership_inquiry` | Partnership contact anchor or partnership email link selected |
| `product_outbound` | Steam, RCL itch.io, Google Play, or Apple App Store link selected |

These events contain no custom properties or form values. They measure clicks, not messages received or purchases. There is intentionally no `inquiry_submitted` event while delivery is email-only.

**Owner configuration:** custom events are disabled by default. Vercel currently documents them for Pro/Enterprise: https://vercel.com/docs/analytics/custom-events. If the existing plan supports them and the owner wants them active, set `RCL_CONVERSION_EVENTS=1` for the production build. Do not upgrade or incur charges without authorization. After a separately authorized deployment, verify actual intake and event display in the project dashboard. This task does not claim production ingestion or dashboard verification.

## Verification record

Final candidate verification, October 21, 2026:

- `npm run lint`, `npm run typecheck`, and `npm run build` passed. The production build lists only Forgefield and Phase Arcade under `/projects/[slug]`.
- `npm run smoke` passed: static output, portfolio scope, Steam release/store links, commercial content, trust/legal content, Fortran integration, color/contrast tokens, privacy filtering, and inquiry validation. Portfolio checks verify 2 product pages and 13 reference-only records, with no retired detail output or sitemap/internal-link references and valid redirect targets/anchors.
- `RCL_BROWSER_CHANNEL=msedge npm run check:browser` passed for all 16 public routes: axe at 390/1440 pixels, responsive bounds at 14 widths from 320 to 2560 pixels, 200% text enlargement, product navigation, all 13 retired route redirects, keyboard, clipboard, reduced motion, asynchronous initialization cancellation, live hero pause/resume/offscreen behavior, WebGL fallback, no JavaScript, and branded 404. One existing YouTube iframe warning about `allow` taking precedence over `allowfullscreen` remains; no test failures or application errors.
- `RCL_BROWSER_CHANNEL=msedge npm run check:commercial-browser` passed: 6 commercial routes at 320/390/768/1024/1440 pixels, zero axe violations, no measured text overflow, decoded images, canonical metadata, navigation/Escape behavior, agency selection, required fields, email draft creation, copy success/failure, edit invalidation, no inquiry data in requests/storage, text enlargement, and no-JS direct contact.
- `RCL_BROWSER_CHANNEL=msedge npm run check:agency` passed at five widths, including links, inquiry flow, metadata/schema, and no-JS behavior. Homepage JavaScript measured 202,207 gzip bytes against the recorded 201,855-byte baseline, a 352-byte increase.
- Analytics exclusion outside production and the opt-in production event path were browser-tested earlier in this implementation with local provider stubs. Fixed event names, no custom payloads, cleaned page URLs, and DNT/GPC behavior passed. The final route cleanup additionally verifies that removed product paths are excluded by the privacy allowlist. No real telemetry or test email was sent.
- Screenshot review covered all 16 retained routes at 390 and 1440 pixels, with focused native-size hero and commercial-page inspection plus tablet checks. Final captures and overview sheets are in `output/playwright/curated-review/`; focused checks also save `output/playwright/commercial/`, `output/playwright/final-site/`, and `output/playwright/agency/`. These are ignored local evidence, not public website assets.
- `git diff --check` passed. Initial review was local only; the owner subsequently authorized pushing to main and production publication after restoring the hero. Publication status is reported separately after verification.

Browser verification used the static export and headless Edge with local headers. Redirects were tested using the entries in `vercel.json` on the local verification server; Vercel production execution is pending deployment. A separate read-only browser comparison against the live homepage verified the hero-framing difference. Visual review is a design assessment, not a promise that every viewer will share the same aesthetic judgment.

## Remaining release decisions

- Production publication was explicitly authorized after restoring the hero; verify the resulting main-branch deployment and live routes.
- Owner acceptance of email-draft delivery versus selection/configuration of a managed provider.
- Owner review of initial planning ranges, scope/ownership/support terms, and operational privacy wording. Prices are planning hypotheses, not binding packages.
- Optional conversion plan/configuration and real production intake checks.
- Physical mobile-device, assistive-technology, real inbox delivery, and production Core Web Vitals checks are not substituted by headless browser tests.

The $2,000/month owner-profit objective is not presented as a public claim or verified outcome. Pricing, delivery effort, and lead quality still need actual commercial evidence after launch.
