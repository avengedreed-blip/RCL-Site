# Forgefield flagship art-direction pass

Date: 2026-09-20. Baseline: `85d4a7e` on `origin/main`.

This document supersedes the product-priority statements in the earlier
September portfolio reports. Those reports remain historical records.
The owner's current brief and subsequent mobile-selection confirmation are
status authority; older repository release language is not.

## Assessment and decisions

1. **Overall verdict.** The site has one clear product center of gravity, while
   RCL remains the studio and client-services brand. The improvement is editorial
   hierarchy and stronger evidence, not a new visual identity.
2. **Initial quality.** The baseline already had a coherent graphite/copper/gold
   system, a distinctive working black-hole hero, sound responsive behavior,
   native media, and substantive verification. Its major weakness against the
   new brief was four launch-style homepage chapters and stale release promises.
3. **Product hierarchy.** Forgefield is the sole featured product on Home,
   Products, and Press. Eleven projects are archived, including the three games
   inside Phase Arcade. No routes were removed.
4. **Forgefield prominence.** A large name, short thesis, near-full-width Eventide
   capture, three facts, and an explicit product CTA replace the portfolio card.
5. **Homepage direction.** RCL hero → Forgefield → a contrasting Polar Night
   study → compact path to other studio work → capabilities → one contact ending.
   Archived screenshots no longer compete for homepage attention.
6. **Project page.** Forgefield has its own server-rendered composition: large
   opening capture, concise playback explanation, four supporting world captures,
   technical profile, and one release-status/contact conclusion. The former
   mission/status/focus/milestone repetition is absent here.
7. **Archive treatment.** Phase Arcade, Load Bearing, and Static Drift remain
   substantive technical case studies. Earlier concepts are behind a native
   disclosure on Products. Archive pages retain screenshots, technical limits,
   platforms, and history, with no current shipping promise.
8. **Mobile treatment.** The owner confirmed Neon Drift, Falling From The Sky,
   and Pigs Can Fly? as the secondary selection. Talk To Me AAC and Bloom are
   archived. No availability, store links, or new release dates were invented.
9. **Hero transition.** The existing black-hole composition leads into Eventide
   through subject matter, spacing, and scale. No renderer or shader was changed.
10. **Microinteractions.** Capture links expose full-size imagery, show a quiet
    persistent affordance, and use a visible keyboard focus ring. Catalog hover
    no longer animates padding and moves surrounding text. Existing navigation,
    button, selection, and reduced-motion conventions remain.
11. **Responsive direction.** Narrow layouts read product/status → thesis →
    image → facts → CTA. Full images retain their native proportions. Browser
    source selection uses 960, 1600, and 2560-pixel media rather than delivering
    the full image to every screen.
12. **Accessibility.** Semantic headings, descriptive image alternatives, normal
    links, reserved image geometry, native archive disclosure, and static-first
    content. No information depends on pointer hover, animation, or JavaScript.
13. **Performance.** See the measured comparison below. No runtime dependency,
    client component, scroll handler, animation loop, or second WebGL scene was
    added. The existing hero lifecycle and fallback behavior remain intact.
14. **SEO.** Home/default descriptions and organization JSON-LD emphasize
    Forgefield and client work. Product descriptions include status. Archived
    projects use `CreativeWork` / `creativeWorkStatus: Archived`, without offers.
    Forgefield and Products use the fresh Eventide social image. `llms.txt` now
    separates the primary product from selected R&D. Canonicals and all 26
    sitemap routes remain intact.
15. **Cleanup.** Removed the unused FeaturedProductChapter, compact technical
    profile helper, obsolete chapter styles, featured-order/treatment fields,
    and unused roadmap exports. Existing reusable detailed project presentation
    and original source media remain. No dependency or lockfile change.
16. **Rejected experiments.** No speculative animation implementation was
    needed. Parallax, random imagery, scroll choreography, and generated artwork
    were considered unnecessary. The initial full-image delivery was refined to
    responsive variants; exact 16:9 framing was rejected after finding that the
    current native captures are actually 2560×1421.
17. **Deliberately preserved.** Logo, font families, palette, navigation, Services,
    single homepage contact ending, black-hole simulation, motion preferences,
    and fallback rendering. These already served the brief.
18. **Limitations.** Stills demonstrate appearance, not continuous product motion
    or release readiness. Six of nine worlds are illustrated; the remaining
    three are named without substitute images. Browser emulation is not physical
    phone, MacBook, or Safari testing. Local timings are not production field
    Core Web Vitals, and cannot establish a universal percentage improvement.
19. **Final quality.** A more focused, substantial presentation with less
    competing material. Its strength is actual product imagery and a coherent
    studio system. Secondary archive pages remain utilitarian; they were not
    expanded into new showcase launches.
20. **Brand/product relationship.** Forgefield is unmistakably the main product;
    RCL still owns the opening, navigation, engineering context, services, and
    final invitation to work together.
21. **Client credibility.** Yes: the website remains a credible primary
    proof-of-quality asset for website/software clients. Clear services and
    contact routes accompany demonstrable engineering and presentation quality.
    This is a design assessment, not a conversion or revenue claim.

## Native media provenance

Source: `C:/Dev/Forgefield/artifacts/rc-execution-2026-09-20/v4-worlds/1440p/`.
Inspected `run-world-regression-v4.ps1`, `artifact-identities-v4.json`, and
`final-v4-world-review.md`. The collector used the current v4 diagnostics
executable, Balanced preset, seed 20260904, capture frame 900. The requested
2560×1440 window yielded **2560×1421 native images**; that exact aspect is retained.
No diagnostic overlays appear in the selected captures. The Forgefield repository,
builds, desktop settings, and running application were not modified by this task.

The BMPs were converted losslessly to PNG for encoding, then to full-resolution
WebP at quality 88 / effort 6. Responsive derivatives are proportionally resized
960/1600-wide WebP at quality 85 / effort 6. No grading, compositing, invented UI,
upscaling, or generated art. The 1200×630 JPEG social image is a center crop only;
its uncropped source remains accessible from the page. Previous September images
remain in the repository.

| Capture | Native BMP SHA-256 |
| --- | --- |
| Eventide | `5e22b86d6181bf5e341b24f234c89bc2012926bee06f97a6302edae966894c9e` |
| Polar Night | `d5f9fd9376209d821829728c36dcea8ab60620ec6ef59debc6f2e78d3c41b36e` |
| Corona | `e679661b00c02a6bb8694b3ee8871246b83ab5fccd4f215780d70a7575383137` |
| Gravitas | `c1227bc498a22ff71b986181d570b7288c4d192af1551a0d3039ccb65bc49fad` |
| Synapse | `dda5e6541d2d3be27d3ffb4d638a49580e0369f00024f19cc8e57915052cf09b` |
| Ember | `03f13c8215360e39a795aa2390849fa975f5598663ed05a9814352a629493710` |

## Validation

- Production export, ESLint, TypeScript, and all repository smoke checks pass.
- Edge and Firefox pass the full 26-route suite, including axe checks at
  390/1440px, product navigation, keyboard behavior, clipboard, 404, no-JS,
  no-WebGL/Wasm fallback, reduced motion, and hero pause/resume/lifecycle.
- Responsive bounds checked at 320, 360, 390, 430, 720, 768, 820, 1024, 1100,
  1180, 1280, 1366, 1440, 1920, and 2560px. Short-height checks use 600px at
  360/768/1280/2560 widths; text enlargement checks use 200%.
- Images decode with native proportions, reserved geometry, responsive source
  selection, accessible full-size links, and visible focus feedback.
- Screenshots of affected pages were reviewed. This caught a nested technical
  grid collapsing its value column at tablet width, which automated text bounds
  had missed. The corrected layout and a minimum readable-value-width guard now
  pass. Product-link testing also caught and fixed a mobile roster filter that
  omitted Pigs Can Fly?.
- Valid-route console messages are empty in Edge and Firefox.
- New/reworked core components and content pass Prettier; the complete diff
  passes whitespace validation. Dependencies, lockfile, shaders, and hero
  renderer are unchanged. WebKit comparison is documented below.
- WebKit completes the functional/layout/accessibility assertions but fails its
  final page-error assertion with Next.js segment-prefetch access-control errors
  during navigation. The original browser script against the untouched baseline
  export reproduces the same failure class. Error counts differ between the two
  suites, so this is evidence of an existing issue, not proof of identical impact.
  WebKit is not reported as passing; physical Safari validation remains open.
  Logs: `work/browser-webkit-final.log` and
  `work/browser-webkit-baseline.log`.

## Performance comparison

Baseline and candidate were served from preserved static production exports.
Alternating before/after pairs per route/width, each in a fresh Edge browser
context; first round discarded. The final table reports medians of 20 measured
pairs on desktop and six measured pairs on mobile. Reduced
motion isolates document/media work from the unchanged black-hole animation.
Normal-motion hero pause/resume, offscreen, hidden-tab, and failure behavior are
covered separately by the browser suite.

The initial unthrottled comparison showed 9–24% lower transfer and effectively
unchanged JavaScript, but mixed timing differences (including 8–24 ms LCP
increases). Those results were not treated as proof of parity. A second pass uses
4× CPU slowdown, 40 ms latency, and 10 Mbps to assess the timing concern.

Raw local evidence: `output/playwright/performance.json` and
`output/playwright/performance-controlled.json`. Screenshots are retained under
`output/playwright/baseline/`, `output/playwright/after/`, and
`output/playwright/final-edge/`; they are ignored and not shipped.

| Route / width | Initial transfer | LCP before → after | Main-thread task time | CLS after |
| --- | --- | --- | --- | --- |
| / / 1440px | -23.6% | 1112 → 1134 ms (2.0%) | 0.7% | 0.00012 |
| /projects/forgefield / 1440px | -13.6% | 1144 → 998 ms (-12.8%) | -10.5% | 0.00000 |
| /products / 1440px | -25.1% | 1382 → 1154 ms (-16.5%) | -0.9% | 0.00000 |
| / / 390px | -14.2% | 1116 → 1120 ms (0.4%) | 0.9% | 0.00000 |
| /projects/forgefield / 390px | -8.7% | 1130 → 1000 ms (-11.5%) | -7.0% | 0.00000 |
| /products / 390px | -26.9% | 1042 → 1042 ms (0.0%) | -5.6% | 0.00000 |

The initial Products variant duplicated the homepage's Polar Night study. It
showed higher main-thread task time under the controlled test and was removed.
After the tablet technical-profile correction, the six-pair final run showed
a 4.1% LCP and 7.7% main-thread increase on desktop Home, conflicting with an
earlier controlled sample. That result remains in `performance-final.json`.

The expanded 20-pair desktop run above reduces the Home result to +2.0% LCP
and +0.7% main-thread time. This supports the 0–3% guardrail at the larger sample
size, while demonstrating that short local runs are noisy. All final expanded
desktop and six-pair mobile medians remain within that guardrail or improve.
The expanded raw data is `output/playwright/performance-home-confirmation.json`.
Transfer falls approximately 9–27%; JavaScript is effectively unchanged. These
are lab observations, not a field-performance guarantee.

## Existing dependency audit finding

The unchanged baseline lockfile reports two vulnerable packages: Next.js 16.2.12
(critical) and sharp 0.35.0 (high). This pass does not remediate them and must not
be interpreted as a clean security audit. No dependency changes were introduced.

[Next.js Windows server RCE](https://github.com/advisories/GHSA-p293-qw3h-jr36),
[Next.js image-optimization AVIF RCE](https://github.com/advisories/GHSA-2xp9-vwfh-vxw4),
and [sharp/libheif advisory](https://github.com/advisories/GHSA-rgj7-g3m4-5g8c)
describe the relevant attack paths and patched versions (Next.js 16.3.3 and
sharp 0.35.4). The verified configuration uses static export and unoptimized
images. The shipped static artifact has no Next.js server or image-optimization
endpoint; that limits applicability of those specific server attack paths. It
does not establish that the dependency tree or build tooling is vulnerability-free.
A separately verified dependency update remains necessary.
