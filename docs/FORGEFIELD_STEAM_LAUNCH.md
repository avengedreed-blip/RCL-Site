# Forgefield Steam launch pass — September 30, 2026

Forgefield is scheduled for Steam on October 14, 2026 at $4.99 USD. This is a
focused launch presentation pass; the RCL identity, black-hole renderer,
existing native captures, and secondary/archived portfolio hierarchy remain.

## Source of truth and store handoff

`content/forgefield.ts` owns the date, price, currency, nine-world catalog, and
future Steam URL. The owner supplied the launch date and price. Product facts
were checked against `C:\Dev\Forgefield` at commit `20788b3`:

- `src/forgefield_scene_catalog.f90`: nine current worlds, including Corona.
  Strange Attractors is a legacy alias, not an additional current world.
- `SUPPORTED_HARDWARE.md`: Windows 11 x64 and desktop OpenGL 4.6. Windows 10
  is outside the current support boundary; Linux support is not advertised.
- `src/forgefield_config.f90` and `src/forgefield_eventide_scene.f90`: Eventide's
  highest built-in quality preset uses two million particles. Counts vary by
  world and quality; no frame-rate benchmark or hardware guarantee was added.
- `CMakeLists.txt` and `launcher/app/Forgefield.Launcher/Forgefield.Launcher.csproj`:
  Fortran 2018, C11, .NET 10/WPF, and self-contained Windows launcher packaging.

No verified Steam store URL was present in either repository. Set `steamUrl`
only after verifying the public app page. The shared launch component then adds
View on Steam, while Home and Products retain Explore Forgefield. No wishlist
claim is made. Scheduled status does not automatically become Available Now.

Software/Product structured data includes the announced release date and
verified platform. A future Offer is gated on the verified store URL; there are
no ratings, reviews, or current availability claims. Keep `public/llms.txt`
aligned with the central data; `check:launch` verifies it.

## Files changed

- `content/forgefield.ts`, `content/projects.ts`: central launch data and scheduled status.
- `components/ForgefieldLaunch.tsx`: reusable release masthead and store-link gating.
- `components/ForgefieldShowcase.tsx`, `components/product-pages/ForgefieldProductPage.tsx`:
  flagship hierarchy, release details, verified scale, and nine-world index.
- `app/page.tsx`, `app/products/page.tsx`, `app/press/page.tsx`,
  `app/projects/[slug]/page.tsx`: launch messaging and page metadata.
- `app/globals.css`: scoped, static launch typography and responsive layouts.
- `lib/seo.ts`, `lib/structured-data.ts`, `public/llms.txt`: discovery and schema.
- `scripts/launch-check.mjs`, `scripts/portfolio-check.mjs`, `scripts/browser-check.mjs`:
  content, store-link, semantic date, responsive prominence, and focus checks.
- `package.json`, `tsconfig.json`: launch validation command and explicit TypeScript
  imports for the existing Node content checks. No dependency or lockfile change.
- `README.md`, `docs/FORGEFIELD_STEAM_LAUNCH.md`: maintenance and verification notes.

## Verification

- Production build, lint, typecheck, and complete smoke chain pass.
- Edge and Firefox pass the full 26-route browser suite: desktop/mobile axe,
  320–2560px responsive bounds, short viewports, enlarged text, keyboard/links,
  clipboard, hero lifecycle, reduced motion, no-WebGL, no-JavaScript, and 404.
- Desktop, tablet, and phone captures reviewed for Home, Products, Forgefield,
  and Press. The Home launch date is visible within a 600px-high viewport.
- WebKit completes the layout/accessibility and interaction assertions, but the
  final accumulated-error assertion fails on Next.js prefetch access-control
  errors in the Windows runner. This matches the previously documented runner
  limitation; the full WebKit suite is not reported as passing.
- The prior GitHub Actions dependency-install failure and dependency advisories
  documented in `FORGEFIELD_FLAGSHIP_PASS.md` are outside this focused pass.
  Local checks are not evidence that those separate issues are resolved.

Local logs and baseline export: `work/steam-launch-2026-09-30/`.
Reviewed screenshots: `output/playwright/steam-launch-final/`.
These artifacts are ignored and are not shipped.

## Optional launch-day work

After the live Steam release is verified, manually update availability and
store wording. A short, click-to-play trailer made from genuine product capture
could strengthen the launch page; no video or autoplay payload was added here.

## Performance evidence

The baseline is the production export of main at `2172b25`, preserved before
editing. Both exports are served with the same Windows segment aliases. Runs
alternate baseline/candidate in fresh Edge contexts; the first round is warmup
and excluded. Reduced motion isolates document/media costs from the unchanged
hero renderer, whose normal-motion behavior is covered by the browser suite.
No other test/build process ran during these measurements.

The conservative test uses 4x CPU slowdown, 40 ms latency, and 10 Mbps, with
six measured pairs per route/width. Its results are retained, including increases:

| Route / width | LCP baseline → launch | Main-thread task delta | Launch CLS |
| --- | --- | --- | --- |
| Home / 1440 | 1114 → 1200 ms | +104.8 ms | 0.000117 |
| Forgefield / 1440 | 986 → 1038 ms | +55.0 ms | 0 |
| Products / 1440 | 1136 → 1094 ms | +89.2 ms | 0 |
| Home / 390 | 1126 → 1188 ms | +61.3 ms | 0 |
| Forgefield / 390 | 992 → 1014 ms | +8.7 ms | 0 |
| Products / 390 | 1030 → 1076 ms | +50.0 ms | 0 |

JavaScript increases by 329 uncompressed bytes (about 0.06%). The initial
transfer delta varies from -58.6 KB to +30.0 KB as the new content positions
change prefetch/lazy-load thresholds; no media files or source weights changed.
Home desktop transfer grows 4.5 KB (0.46%). No client component, animation,
renderer, library, or dependency was added.

Profiling found the same three layout passes and approximately unchanged script
execution, with 18 additional Home DOM nodes. Isolated server-side CSS variants
(removing date balancing or adding layout containment) did not establish a
consistent benefit and were not adopted. These experiments did not change the
shipped source.

Raw stress-test evidence: `output/playwright/steam-launch-performance.json`.
Lab observations are not field Core Web Vitals. Field INP and physical-device
Safari performance are not established by these checks.
A larger run uses normal CPU speed with the same 40 ms/10 Mbps network model,
thirteen alternating pairs, and medians of twelve measured pairs:

| Route / width | LCP baseline → launch | Main-thread task delta | Launch CLS |
| --- | --- | --- | --- |
| Home / 1440 | 798 → 838 ms | +24.9 ms | 0.000117 |
| Forgefield / 1440 | 744 → 756 ms | +11.2 ms | 0 |
| Products / 1440 | 834 → 768 ms | +14.1 ms | 0 |
| Home / 390 | 806 → 820 ms | +15.3 ms | 0 |
| Forgefield / 390 | 742 → 744 ms | +3.4 ms | 0 |
| Products / 390 | 754 → 766 ms | +9.6 ms | 0 |

The launch presentation has a small measured document/layout cost; it is not
claimed to be literally free. Normal-CPU LCP changes range from -66 to +40 ms,
with Home desktop +5.0% and mobile +1.7%. All measured launch LCP medians remain
under 0.84 seconds in this local network model. The conservative CPU-throttled
increases above remain part of the result, not discarded as noise. The small
absolute cost, negligible JavaScript increase, stable CLS, and unchanged media
and renderer support accepting this focused presentation change.

Raw normal-CPU evidence: `output/playwright/steam-launch-performance-normal.json`.