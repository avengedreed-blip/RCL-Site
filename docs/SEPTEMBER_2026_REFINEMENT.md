# September 2026 Refinement

Review date: 2026-09-06. Baseline: 7ae3b7f on
codex/september-portfolio-update. This is an editorial refinement of the
September portfolio, not a new design or a product release.

## Verdict and priorities

The baseline had a strong identity and authentic technical work, but treated
unavailable media and routine information with disproportionate emphasis.
Its Services scope list also contained a real CSS defect: a legacy paragraph
grid placed text in a 42px track inside an already correctly gridded list item.
This produced a tall column of narrow text without necessarily overflowing
the viewport. A bounds-only test could not detect that defect.

Changes are concentrated on hierarchy, reading order, useful captions, and
commercial proof. The logo, font families, palette, homepage renderer, navigation,
footer, legal/security configuration, product statuses, routes and technical
profiles are preserved.

## Editorial decisions

- Central product data now specifies chapterTreatment: lead for Forgefield,
  feature for Phase Arcade, development for Load Bearing, brief for Static Drift.
  This is editorial weight, not a release-state inference.
- Product name, status and introduction precede media in the DOM. Supporting
  details follow. Desktop retains the alternating composition; narrow columns
  show evidence before the technical specification.
- Unavailable images no longer occupy full homepage showcase panels or empty
  galleries. Load Bearing retains a substantial development note and its complete
  technical page. Static Drift has a quieter Android TV development entry.
- Forgefield retains all six September native captures. Eventide and Polar Night
  receive full-width gallery frames; four contrasting worlds follow in pairs on
  wider screens. Mobile retains readable full-width images. Every gallery image
  has a full-size link; no carousel or extra client bundle was introduced.
- Captions describe the scene or gameplay. Dated pre-release provenance appears
  once above the Forgefield gallery and remains documented in
  SEPTEMBER_2026_PORTFOLIO.md. Removing repetitive approval labels does not
  change asset approval or imply that a product has shipped.
- Hero and thesis headings remain the loudest. Status, current focus, features,
  engineering and service support headings use quieter sizes from the same fonts.
- The homepage now progresses from selected work to its relevance for client
  projects, then one contact invitation. Repetitive research/philosophy finales
  were consolidated, not replaced with a competing visual effect.
- Concise introductions propagate through Home, Products and Press. Featured
  metadata explicitly prefixes the centralized status; JSON-LD continues to use
  the qualified long descriptions. No new release date, availability, headset,
  customer, pricing, performance guarantee or certification claim was added.

## Services evidence

The website is explicitly labeled **Internal RCL project**, not client work.
Its three engineering decisions are source-backed: a Fortran/Wasm kernel and
WebGL2 renderer, responsive composition and deterministic fallback, and HTML
content/navigation with pausable, hidden/offscreen-aware rendering.

Two real browser screenshots were captured from the local production export:

| Asset                         | Source and state                                                                   | Dimensions  |
| ----------------------------- | ---------------------------------------------------------------------------------- | ----------- |
| rcl-site-desktop-2026-09.webp | Chrome homepage, live renderer paused for capture, low quality diagnostic override | 1440 x 1000 |
| rcl-site-mobile-2026-09.webp  | Chrome mobile viewport, reduced motion and deterministic fallback                  | 390 x 844   |

These are viewport screenshots, not a composite, mockup, fake terminal or
generated artwork. WebP encoding used quality 88/90, with no upscaling or visual
retouching. Combined size: 107,902 bytes. Both are lazy-loaded below the Services
introduction with explicit dimensions. They are not performance measurements.
Raw review screenshots stay outside Git in ignored folders. Temporary capture
helpers were removed after verification; the local preview server is retained.

The Services page retains written scope, ownership, support boundaries,
qualification and quote language. The low-budget dismissal was replaced with
a practical smaller-scope starting point, without publishing unsupported rates.

## Responsive and accessibility decisions

The first implementation revealed a tablet-width title overflow and a fixed
580px heading cap that failed enlarged text. Both were corrected. Named,
font-relative container queries let chapters and relevant product/service
columns stack when their content needs more room, including at 200% text size.
Ordinary viewport breakpoints remain as fallbacks.

Firefox additionally exposed stale font-relative container-query evaluation
after dynamic text enlargement. The Services scope and product mission splits
now use intrinsic flex wrapping with rem-based minimum widths; their normal
desktop proportions are unchanged. Product-list icon tracks also accommodate
the enlarged icon instead of retaining a fixed 18px slot.

Semantic heading levels, native links, native FAQ details, image alternatives,
44px text-link targets and reduced-motion handling remain intact. Regression
checks cover mobile intro/evidence/details order, enlarged text, the nested
scope-grid defect, editorial weights, empty-gallery prevention, and provenance
context. These are behavioral checks, not pixel-perfect screenshot assertions.

## Measured pacing

Chrome, 900px viewport height, reduced motion, fonts loaded, full-page review:

| Route                           | Width | Before height | After height |
| ------------------------------- | ----: | ------------: | -----------: |
| /                               |  1440 |          7136 |         4887 |
| /products                       |  1440 |          6885 |         5801 |
| /services                       |  1440 |         10140 |         9484 |
| /projects/forgefield            |  1440 |         10936 |         8194 |
| /projects/phase-arcade-volume-1 |  1440 |          8178 |         8038 |
| /projects/project-load-bearing  |  1440 |          5609 |         4356 |
| /projects/static-drift          |  1440 |          5290 |         4136 |
| /                               |   390 |          9711 |         7031 |
| /services                       |   390 |         13502 |        13417 |
| /projects/forgefield            |   390 |          9385 |         9526 |
| /projects/phase-arcade-volume-1 |   390 |          8287 |         8401 |

The small mobile gallery increases are intentional: full-size links, more useful
captions and early gallery access take space. Images were not shrunk to meet an
arbitrary length target. Homepage reduction comes mainly from removing empty
media and repeated conclusions, not compressing paragraph line heights.

## Performance cost and limits

No dependency or client component was added. The two Services screenshots add
107,902 bytes only when lazy-loaded. Gzipped source CSS increased from 21,530
to 22,958 bytes, a 1,428-byte increase; this is a source comparison, not a
measurement of the complete transferred page bundle.

Local Chrome hero captures at 1024-2560px reported CLS between 0.00018 and
0.00279. These were unthrottled local sessions with a low-quality diagnostic
override, not controlled benchmarks or field data. They do not establish
production LCP, INP, battery life, universal smoothness, or zero performance
regression. The renderer and its resource-management code were not changed.

## What stayed unchanged

The live black-hole composition was reviewed at 1024, 1180, 1280, 1366, 1400,
1440, 1920 and 2560px. Its existing laptop correction already keeps the core
inside the right visual field; no further offset was justified.
Renderer code, Wasm, shader behavior, quality tiers and animation lifecycle are
unchanged. Pause/resume, reduced motion and the non-WebGL/no-JS paths remain
part of the browser suite.

Phase Arcade's actual gameplay captures are unchanged. Load Bearing and Static
Drift imagery remains withheld pending approval. Forge, Storm Lab and the
immature Science Lab rebuild remain absent. No stock or generated human image
was added. Navigation, footer, contact method and existing restrained motion
did not need another design pass.

## Commercial assessment

These are qualitative buying-risk assessments, not proposed prices.

| Engagement scale            | What this site supports                                                                    | What a prospect still needs                                                        |
| --------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| $2,500-$5,000               | Clear service fit, visible design competence, direct contact, explicit ownership and scope | A focused written proposal and relevant deliverables                               |
| Around $10,000              | Stronger technical proof and a concrete internal web example                               | A project-specific plan, review schedule and acceptance criteria                   |
| $25,000+ or larger software | Evidence of unusual engineering capability                                                 | Shipped comparable work, referenceable delivery, risk ownership and a support plan |

The site can be a primary proof-of-craft asset. It is not a substitute for
client outcomes or independently demonstrated delivery at larger engagement
sizes. Inventing testimonials or dashboard scores would weaken that trust.

## Assessment

Fresh qualitative assessment of the reviewed implementation, not a benchmark
certification: baseline 83/100; refined branch 88/100.

| Dimension                 | Score |
| ------------------------- | ----: |
| Visual design             |    89 |
| Art direction             |    89 |
| UX                        |    88 |
| Responsive design         |    88 |
| Accessibility             |    89 |
| Performance               |    85 |
| Technical quality         |    91 |
| Content/editorial quality |    87 |
| Commercial credibility    |    82 |
| Portfolio effectiveness   |    88 |

No claim of universal device acceptance or exceptional commercial maturity is
made. The remaining highest-value improvements require real material: approved
product media, released-product evidence, a consented human artifact, and an
actual client case study. Services still contains substantial scoping information;
that is more useful than shaving its length through hidden terms or tiny text.

## Final validation

All commands below completed successfully on the refined source/export:

- `npm ci`: reproducible installation, zero audit vulnerabilities.
- `npm run typecheck`: no TypeScript errors.
- `npm run lint`: no ESLint errors.
- `npm run build`: production static export; Fortran integration and color
  guards pass. No compiler warnings were reported.
- `npm run smoke`: export, 15-product/four-featured consistency, commercial,
  trust, Fortran, color, privacy and llms.txt checks pass.
- `npm audit` and `npm audit --omit=dev`: zero vulnerabilities.
- Cached Prettier check for the edited TS/TSX, portfolio test and this document.
  Existing CSS/browser-test formatting was preserved rather than reformatted.
- `git diff --check`: no whitespace errors. Git's normal LF/CRLF conversion
  notices are not test failures.

`npm run check:browser` passed separately with these environment selectors:

| Browser            | RCL_BROWSER_ENGINE | RCL_BROWSER_CHANNEL | Result |
| ------------------ | ------------------ | ------------------- | ------ |
| Installed Chrome   | chromium           | chrome              | Pass   |
| Installed Edge     | chromium           | msedge              | Pass   |
| Playwright Firefox | firefox            | unset               | Pass   |
| Playwright WebKit  | webkit             | unset               | Pass   |

Each run covers 26 public routes, desktop/mobile axe checks, all product links
and back navigation, responsive bounds, mobile evidence ordering, 200% text
enlargement, clipboard success/failure, skip-link activation, reduced motion,
delayed Wasm cancellation, live pause/resume, hidden/offscreen lifecycle,
initialization failure, no-WebGL, no-JavaScript and branded 404 behavior.
Responsive bounds include 320, 360, 430, 720, 768, 820, 1024, 1100, 1180,
1280, 1366, 1920 and 2560px, with route/accessibility checks at 390 and 1440px.
No page exceptions or unexpected failing resource responses were observed.

Final full-page captures cover Home, Products, Services and all four featured
product pages at 390, 820, 1280 and 1440px. Additional captures cover the live
hero, About, Founder, Press, Contact and the Services scope/case-study sections.
All nine full-size gallery links returned HTTP 200. The new WebP images have no
EXIF or XMP metadata. No dependencies, lockfile, secrets or local configuration
were added or changed.

Limitations: Windows WebKit is not native Safari on macOS/iOS. Its runner does
not support native Tab traversal, so the skip link is explicitly focused and
then activated with Enter; Chrome, Edge and Firefox use Tab. This is automated
accessibility and visual inspection, not a screen-reader/device certification.
Production deployment, remote CI and field performance are not claimed.

## Review artifacts

Ignored output/playwright/refinement-before and refinement-final contain
full-page desktop/tablet/mobile captures and section measurements. A separate
adversarial review covers hero framing, Services scope rows and case study,
About, Founder, Press, Contact, full-size media responses, and enlarged text.
Screenshots are local review evidence, not production deployment proof.
