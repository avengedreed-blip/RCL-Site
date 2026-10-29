# Visual refinement — October 29, 2026

Implemented in the existing Next.js checkout. This is a local implementation and static export, not a production deployment.

## Audit and direction

Reviewed the current route inventory, shared components, global/commercial/module styles, project media, commercial content, inquiry flow, navigation, and Fortran/WebAssembly/WebGL integration. Captured the original build before edits. The baseline full browser suite passed on 16 public routes; the baseline commercial suite passed six routes at five widths.

Retained the graphite/copper/gold palette, logo, homepage headline, commercial copy and pricing qualifications, client-first ordering, all product records and destinations, authentic captures, and technical demonstrations. The product-specific showcases already have substantial imagery and remain intact.

Main opportunities: excessive hero height, small unframed client imagery, competing gold interactive accents, overly heavy metallic buttons, small footer typography, and inconsistent page-header composition.

## Implemented

- Tighter homepage hero with lighter display typography, copper emphasis, and content-driven mobile height. A follow-up typography pass reduces hero/page title sizes and brings the oversized About/founder headings onto the supporting section scale. Existing renderer masks, adaptive quality, pause behavior, and static fallbacks are unchanged.
- Larger client-first homepage portfolio layout. Brotherhood Coffee receives a full-width capture on the work page; original products use supporting compositions.
- Reusable server component `ProjectFrame` with browser, application, and phone treatments. Captures retain their original pixels, aspect ratios, alternative text, and lazy-loading behavior. All visual assets are existing authentic media.
- Editorial page headers, consistent section spacing, subtle graphite section bands, numbered service rows with decorative SVG discipline icons, and process markers.
- Copper interaction accents, quieter buttons, current-page navigation indicators, refined form hover/focus states, clearer footer links, and framed partnership calls to action.
- Tablet portfolio stacking and shorter mobile page headers. Hover movement is restricted to hover-capable devices without a reduced-motion preference; reduced-motion button transforms are disabled.
- Raw-metal grain across charcoal/black page surfaces, section bands, and the footer. A small static SVG combines irregular directional brushing and fine grain, replacing the dotted pattern. It is cached and has no animation or JavaScript rendering loop.
- A copper-gold spark follows the service icon strokes while a row is hovered or contains keyboard focus on a hover-capable device. Only the small decorative SVG overlay animates. Reduced-motion visitors receive a static copper highlight; touch devices do not run the spark.

## Main files

| File | Responsibility |
| --- | --- |
| `app/globals.css` | Shared tokens, typography, page headers, buttons, navigation shell, footer |
| `app/commercial.css` | Hero, service rows, portfolio frames/layouts, forms, responsive composition |
| `components/ProjectFrame.tsx` | New reusable presentational media frame |
| `components/CommercialSections.tsx` | Framed commercial portfolio and service markers |
| `components/ButtonLink.tsx` | Calmer button typography |
| `app/work/page.tsx` | Client showcase, product frames, desktop/mobile composition |
| `app/agency-partners/page.tsx` and its CSS module | Shared frames and copper emphasis |
| `scripts/commercial-browser-check.mjs` | Eight-width checks, label/name matching, capture proportions, local performance observations, bounded focus wait |

New reusable tokens: `--studio-interactive`, `--studio-rule`, `--studio-section-space`, `--studio-reading-width`, `--studio-heading-size`, `--studio-motion-fast`, `--studio-motion-slow`, `--studio-metal-grain`. They reference the established palette and motion curve; gold remains available for selective metadata, focus indicators, and the small icon highlight.

## Verification

VERIFIED on the local production export:

- `npm run lint`, `npm run typecheck`, `npm run build`, `npm run smoke`, and `git diff --check`.
- `npm run check:browser`: 16 routes, desktop/mobile axe checks, responsive bounds from 320 through 2560px on key routes, keyboard and clipboard paths, product links, live simulation pause/resume, motion preference changes, async cancellation, no-WebGL, no-JavaScript, and 404 behavior.
- `npm run check:commercial-browser`: all 48 route/viewport combinations passed after the final typography and texture pass. Zero recorded errors, axe violations, or overflow; complete screenshot proportions; keyboard, inquiry, privacy, 200% text sizing, no-JavaScript paths; moving icon stroke on hover and a stopped, hidden spark after reduced motion is enabled.
- `npm run check:agency`: five widths, axe, partnership/email navigation, internal links, metadata, structured data, no-JavaScript behavior, and JavaScript budget.
- No application errors in the passing full-site and agency runs. The full-site run reports the existing iframe warning: `Allow attribute will take precedence over 'allowfullscreen'.`
- Homepage entry JavaScript: 202,207 bytes gzipped versus the repository's saved agency reference of 201,855 bytes (+352 bytes; within its 1,024-byte allowance). This is a saved reference, not a fresh before/after performance benchmark.

The expanded commercial run records six routes at 320, 375, 390, 430, 768, 1024, 1440, and 1920px. Results and unthrottled local CLS/LCP observations are stored in `output/playwright/refinement-after-commercial/results.json`. Focus and changed media-preference assertions wait for the browser's existing frame lifecycle, with a two-second bound.

## Visual evidence

- Before, all routes: `output/playwright/refinement-before/`
- Before, commercial routes and hero crops: `output/playwright/commercial/`
- After, all routes: `output/playwright/refinement-after/`
- After, eight-width commercial captures: `output/playwright/refinement-after-commercial/`
- After, partnership flow: `output/playwright/agency/`

The isolated `client-work-*` component screenshots hide the sticky site header to avoid it covering the frame during element capture. Full-page and hero screenshots retain the header. Most captures use reduced motion for deterministic comparisons.

## Limits

NOT TESTED: deployment, CI on the remote, physical phones/tablets, screen-reader user testing, Safari/Firefox, real-world Core Web Vitals/INP, or email delivery. Form tests prepare local drafts without sending messages. Automated axe results are not a complete accessibility certification. Local Chromium performance observations are unthrottled lab data, not field acceptance or evidence of a measured improvement.

No packages, fonts, raster assets, shaders, numerical kernels, product copy, SEO metadata, or commercial claims were added or replaced. Existing untracked marketing work was preserved.

Background correction: restored the exact pre-texture body gradients and section surface colors, removed the added lighting-gradient and broad background-image overrides, and blended neutral metallic grain with soft-light. Local homepage/services browser checks confirmed the original color tokens and passed axe; semantic color guards also passed. Evidence: output/playwright/metal-finish-home.png and metal-finish-services.png.

Frame accent follow-up: slightly increased copper/gold rule opacity; added matching borders and a reusable decorative FrameGlint SVG to portfolio frames, Forgefield captures, Phase Arcade captures, and approved product media. The stroke travels around the actual rectangular perimeter only on hover/focus with motion allowed. Ten local page/viewport checks passed (375/1440px), including axe and overflow; hover movement and reduced-motion shutdown passed. Background colors and metallic grain were unchanged.
