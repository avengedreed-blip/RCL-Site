# Forgefield Hero Validation

## Scope

This record covers the Forgefield-derived homepage renderer on
`redesign/rcl-site-v2`. It is internal verification evidence, not public
performance marketing.

Validation date: 2026-07-24.

## Runtime proof

The local browser reported:

- renderer: `forgefield-eventide-webgl2`;
- logical GPU stages: `7`;
- shader state: `compiled-and-linked`;
- Fortran state: `runtime-verified`;
- color target: `rgba16f`;
- fixed Fortran seed: `1729`;
- High tier: 42 volume steps and 48,000 instances per matter layer;
- Ultra tier: 58 volume steps and 72,000 instances per matter layer.

`scripts/check-fortran-hero.mjs` separately verifies the checked-in Wasm
artifact, required exports, runtime signature, source hash, manifest hash, and
fixed-seed determinism.

## Measured browser samples

These figures are local samples, not device guarantees. CPU submission is the
time spent invoking the render pipeline from JavaScript. GPU execution comes
from `EXT_disjoint_timer_query_webgl2`.

| Environment | Tier | Internal render size | CPU submit | GPU execution |
| --- | --- | ---: | ---: | ---: |
| Interactive in-app browser | High | 563 x 578 | 0.09 ms | 0.49 ms |
| Interactive in-app browser | Ultra, adaptive | 652 x 669 | 0.07 ms | 0.61 ms |
| Headless Edge, 1440 x 900 | High | 510 x 445 | 0.07-0.10 ms | 0.27-0.36 ms |
| Headless Chrome, 1280 x 720 | Medium | 384 x 347 | 0.06 ms | extension-dependent |
| Headless Edge, 1280 x 720 | Medium | 384 x 347 | 0.08 ms | extension-dependent |
| Headless Edge, 1440 x 900, scale sprint baseline | High | 510 x 445 | 0.09 ms | 0.27-0.36 ms |
| Headless Edge, 1440 x 900, selected composition C | High | 873 x 597 | 0.09-0.10 ms | 0.36-0.38 ms |
| Headless Edge, 1920 x 1080, selected composition C | High | 1005 x 729 | 0.06 ms | 0.59 ms |
| Headless Edge, 768 x 1024, composition B | High | 713 x 462 | 0.08 ms | 0.26 ms |
| Headless Edge, 390 x 844, composition D | High | 544 x 528 | 0.10 ms | 0.34 ms |

The GPU values depend on the local driver and viewport. They demonstrate a
working measurement path, not universal cost.

## Scale and composition review

The scale sprint compared four deterministic compositions at simulation time
90 seconds:

- A kept the event horizon fully visible at a larger scale;
- B used the closest camera framing and a strong right-edge crop;
- C widened the disk toward the copy while keeping the horizon near 75% of
  viewport width;
- D shifted the horizon vertically for a mobile-first partial crop.

Composition C was selected for desktop because it provided the strongest
balance of scale, readable copy, and asymmetric flow. Tablet uses B so the
horizon remains large but moves toward the right edge. Mobile uses D so a
large partial horizon enters below the headline rather than shrinking into a
small centered object.

The desktop renderer changed from a 671 x 585 CSS region to an overscanned
1148 x 785 region at 1440 x 900. The High-tier internal render target changed
from 510 x 445 to 873 x 597. The five RGBA16F render targets therefore reserve
approximately 10.18 MiB instead of 4.43 MiB. Particle count, volume steps,
quality thresholds, and pass count did not increase.

## Lifecycle verification

- Scrolling the hero outside the 160-pixel observation margin changed
  `heroActivity` from `running` to `paused`.
- Returning to the hero changed activity back to `running` without a large
  simulation-time jump.
- A browser lifecycle freeze followed by resume advanced the simulation by
  about 1.42 seconds across a 2.5-second freeze plus 0.9-second active review
  window, confirming that elapsed hidden time was not replayed.
- The animation frame is cancelled while hidden or offscreen.
- WebGL resources, observers, media listeners, and pending timing queries have
  explicit cleanup paths.

## Reduced motion and failure recovery

An Edge context with `reducedMotion: "reduce"` reported:

- `heroMode: reduced`;
- `heroQuality: static`;
- `heroActivity: static`;
- canvas CSS display: `none`;
- no `hero-flow.wasm` resource request.

The localhost-only `?heroFailure=initialization` control reported:

- `heroMode: fallback`;
- fallback reason: `Forced local initialization failure`;
- canvas opacity: `0`;
- renderer-derived fallback opacity: `0.88`.

The static asset is a 1005 x 729 deterministic capture from the live browser
renderer at seed 1729, High quality, and simulation time 90 seconds. It is not AI art,
stock media, the design concept, or the native Forgefield screenshot.

## Responsive and accessibility verification

Validated live at:

- 320 x 568;
- 390 x 844;
- 768 x 1024;
- 1440 x 900;
- 1920 x 1080.

All tested viewports had zero document-level horizontal overflow and no browser
console errors. The hero copy remained HTML, the decorative visual wrapper was
`aria-hidden`, the renderer had `pointer-events: none`, and primary actions
remained ordinary focusable links. Keyboard review reached the skip link,
brand link, navigation links, and hero actions with visible outlines.

## Browser coverage

- Google Chrome: live WebGL2, Fortran verified, no console errors.
- Microsoft Edge: live WebGL2, Fortran verified, no console errors.
- In-app Chromium browser: live WebGL2, float targets, GPU timing, no renderer
  initialization error.
- Installed stock Firefox: automation could not complete because the local
  Playwright package expects a patched Firefox transport and the installed
  browser closed during startup. Firefox rendering is therefore not claimed as
  verified in this sprint.

## Evidence artifacts

Artifacts are under `output/forgefield-hero/`:

- `native-eventide-reference.png`;
- `../hero-renderer-review/rejected-1440x900.jpg`;
- `ultra-090s.png`;
- `high-090s.png`;
- `medium-090s.png`;
- `low-090s.png`;
- `high-005s-1440.png`;
- `high-030s-1440.png`;
- `high-090s-1440.png`;
- `high-180s-1440.png`;
- `high-300s-1440.png`;
- `static-fallback.webp`;
- `mobile-320.png`;
- `mobile-390.png`;
- `ultrawide-1920.png`;
- `reduced-motion.png`;
- `video/hero-live-25s.webm`.

Scale-comparison artifacts are under `output/hero-scale-review/`:

- `baseline-1440x900.png`;
- `option-A-1440x900.png`;
- `option-B-1440x900.png`;
- `option-C-1440x900.png`;
- `option-D-1440x900.png`;
- `final-selected-C-1440x900.png`;
- `final-ultrawide-1920x1080.png`;
- `tablet-selected-B-768x1024.png`;
- `final-mobile-approved-390x844.png`;
- `reduced-motion-1440x900.png`.

## Honest limitations

- The web renderer adapts EVENTIDE architecture and shaders; it does not run
  Forgefield's native OpenGL 4.6 compute/SSBO pipeline in the browser.
- Particle positions are deterministic GPU procedures rather than native
  compute-buffer state.
- Lensing is the documented softened screen-space approximation, not a
  general-relativity geodesic solver.
- Exact Firefox runtime behavior remains unverified locally.
