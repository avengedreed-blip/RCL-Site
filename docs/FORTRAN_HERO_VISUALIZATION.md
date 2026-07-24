# RCL Homepage Accretion Field

## Runtime truth

The homepage hero is a live procedural system. Modern Fortran owns its
deterministic, long-cycle state and is compiled to WebAssembly with LFortran.
The browser invokes those Fortran-generated exports while the hero runs.
TypeScript performs loading, lifecycle management, measured quality selection,
uniform transfer, and failure recovery. WebGL2 renders the state through seven
logical GPU stages.

The experience does not use AI-generated artwork, stock media, a prerecorded
video, or a JavaScript simulation labelled as Fortran. It does not run native
OpenGL in the browser. It is a browser GPU adaptation informed by the
repository-owned Forgefield EVENTIDE work.

## Model and honesty boundary

The field combines:

- a dark event-horizon region;
- a thick, emissive accretion volume;
- temperature-mapped outer, middle, and inner material;
- orbital beaming within the RCL warm-white, gold, and copper palette;
- an analytic, screen-space thin-lens approximation;
- rear-disk folds above and below the event horizon;
- a restrained photon-ring treatment;
- volumetric turbulence, density waves, fine filaments, and localized flares;
- deterministic background stars and slow camera drift.

The lensing family is:

```text
delta(theta) = strength * theta_E^2 /
               sqrt(theta^2 + 0.052 * theta_E^2)
```

The result is not a numerical general-relativity solver, a geodesic integrator,
a radiative-transfer model, or a scientific benchmark. The accretion volume,
screen-space fold, and photon ring are visually and conceptually informed
approximations. Public-facing language therefore describes a procedural
accretion field rather than claiming publication-grade astrophysics.

## Fortran state system

`simulation/hero/hero_flow.f90` is the canonical state source. Its seeded
exports control:

- precession;
- inclination and tilt;
- accretion density;
- flare strength;
- lens strength;
- turbulence;
- camera drift;
- emission temperature.

The signals use different timescales, so the field keeps evolving over several
minutes instead of resetting on an obvious short loop. A fixed seed makes
initialization and review timestamps deterministic. TypeScript does not
reproduce these equations; it advances elapsed time, calls the Fortran exports,
and transfers the resulting scalar state to the GPU.

## Source organization

- `simulation/hero/hero_flow.f90`: canonical Fortran state model.
- `scripts/build-fortran-hero.mjs`: pinned compiler driver and manifest writer.
- `scripts/hero-wasm-utils.mjs`: artifact validation and export execution.
- `scripts/check-fortran-hero.mjs`: source, artifact, hash, and determinism checks.
- `scripts/check-fortran-hero-integration.mjs`: browser-integration guards.
- `public/wasm/hero-flow.wasm`: checked-in generated browser artifact.
- `public/wasm/hero-flow.manifest.json`: compiler and provenance manifest.
- `lib/hero-flow/runtime.ts`: same-origin Wasm loading and state sampling.
- `lib/hero-flow/shaders.ts`: bounded scene and lens/composite shaders.
- `lib/hero-flow/renderer.ts`: GPU programs, framebuffer, texture, sizing, cleanup.
- `components/FortranFlowHero.tsx`: lifecycle, quality, diagnostics, fallback.
- `components/HeroSystemField.tsx`: renderer-derived deterministic fallback.
- `public/images/home/forgefield-eventide-static.webp`: checked-in fallback
  captured from the live browser renderer at fixed seed 1729, High quality,
  and simulation time 180 seconds.

## Compilation path

The artifact is compiled with:

- LFortran `0.64.0`;
- official browser release commit `abf1f5343`;
- LFortran's custom `wasm` backend.

Set `LFORTRAN_DIST` to the pinned official release when rebuilding:

```powershell
$env:LFORTRAN_DIST = "<path-to-lfortran-wasm-toolchain>"
npm run build:fortran
npm run check:fortran
```

The build script validates the module, invokes every required state export,
checks fixed-seed determinism, and records long-cycle samples in the manifest.
Normal Vercel builds consume the checked-in artifact and do not require a
native compiler or server process.

The production Content Security Policy permits `'wasm-unsafe-eval'` only so the
same-origin Wasm artifact can compile. It does not enable general JavaScript
`'unsafe-eval'`.

## WebAssembly interface

Required Fortran-generated exports:

- `hero_signature()`
- `hero_state_checksum(seed)`
- `hero_precession(time, seed)`
- `hero_tilt(time, seed)`
- `hero_density(time, seed)`
- `hero_flare(time, seed)`
- `hero_lens_strength(time, seed)`
- `hero_turbulence(time, seed)`
- `hero_camera_x(time, seed)`
- `hero_camera_y(time, seed)`
- `hero_temperature(time, seed)`

The module imports only the minimal WASI functions emitted by the compiler.
Local browser shims supply them.

## Browser GPU architecture

The browser baseline is WebGL2 because it provides the required framebuffer,
floating-point-target feature detection, and broad static-host compatibility
without adding a runtime dependency.

### Stage 1: finite accretion environment

A full-screen triangle drives a bounded raymarch through an inclined ellipsoid.
Up to 58 samples integrate:

- nonuniform radial and vertical density;
- domain-warped multi-octave turbulence;
- two broad spiral structures and a fine filament field;
- different inner, middle, and outer temperature zones;
- orbital asymmetry and a migrating local flare;
- slow Fortran-driven precession, tilt, density, and camera drift.

The result is rendered once into the full-resolution scene target.

### Stage 2: broad and emissive accretion matter

One deterministic instanced particle program draws two material layers into
the scene target with additive blending. Orbital position, radial inflow,
vertical thickness, streak length, stream membership, thermal class, and
fragment breakup are evaluated on the GPU from stable instance identifiers and
the current Fortran state. No particle positions are advanced by JavaScript.

Live instance populations are bounded per layer:

- Low: 12,000;
- Medium: 24,000;
- High: 48,000;
- Ultra: 72,000.

### Stage 3: lensing resolve

The scene texture is sampled through the analytic lens field. This pass adds:

- visible source displacement around the central mass;
- sampled rear-disk folds above and below the event horizon;
- a smaller counter-fold;
- event-horizon occlusion;
- attached primary and secondary photon-ring structure;
- quality-bounded bloom;
- localized flare integration;
- left-side copy protection, edge vignetting, and tone mapping.

The rear fold is generated from displaced scene samples. It is not a duplicate
ellipse drawn behind the shadow.

### Stages 4-6: restrained bloom

Bright resolved material is extracted into a half-resolution target, filtered
into a quarter-resolution target, then reconstructed into a second
half-resolution target. The pipeline uses bounded kernels and a low composite
intensity, so bloom supports hot material without turning the field into an
orange blur.

### Stage 7: display composite

The resolved scene and bloom result are combined with exposure control,
filmic/ACES-style tone mapping, edge vignette, transparent copy protection on
the left, and a low-amplitude long-cycle exposure variation.

The scene, resolved, and bloom targets use RGBA16F only when float rendering,
linear float filtering, and float blending are all available. Otherwise the
renderer uses RGBA8.

The live path uses no external textures, images, videos, sprites, or per-frame
JavaScript object allocation. GPU resources are allocated at initialization or
resize and explicitly released.

## Quality and performance strategy

Eligible live viewports begin from a conservative viewport-based tier: Medium
below 1200 CSS pixels and High at wider viewports. The Low tier remains
available to measured adaptation and forced local diagnostics. This prevents a
smaller live viewport from paying the High-tier startup cost before any
measurements exist. The renderer then adapts from measured frame interval, CPU
submission cost, and WebGL timer-query GPU cost when the driver exposes
`EXT_disjoint_timer_query_webgl2`. It does not classify devices from browser
names or user-agent strings. Lensing and the layered disk remain present in
every live tier; raymarch resolution, instance population, frame target, and
render scale are reduced first.

The default sub-768 CSS-pixel presentation uses the deterministic renderer
still instead of compiling the seven-pass WebGL system on a phone-sized
viewport. This is a responsive presentation rule, not device or browser
detection. Tablets and desktops retain live initialization; local diagnostics
can force any live tier for mobile validation.

| Tier | Scale | DPR cap | Volume steps | Instances/layer | Target |
| --- | ---: | ---: | ---: | ---: | ---: |
| Low | 0.48 | 1.0 | 18 | 12,000 | 30 fps |
| Medium | 0.62 | 1.15 | 28 | 24,000 | 40 fps |
| High | 0.76 | 1.35 | 42 | 48,000 | 50 fps |
| Ultra | 0.88 | 1.5 | 58 | 72,000 | 60 fps |

The controller waits for 120 samples before changing tier. It downgrades under
sustained timing pressure and upgrades only after sustained headroom.

Additional controls:

- initialization is deferred without blocking first contentful paint;
- phone-sized viewports use the deterministic renderer still and do not
  download or compile the live renderer chunk;
- a buffered Long Tasks API preflight keeps the deterministic still when the
  page has already measured a task of 180 ms or longer before WebGL
  initialization; this avoids adding shader-compilation pressure to a session
  that is already constrained;
- simulation delta is clamped;
- `IntersectionObserver` cancels the animation frame away from the hero;
- `visibilitychange` cancels hidden-tab work and resumes from a clamped delta;
- `ResizeObserver` controls backing resolution;
- device pixel ratio is capped per tier;
- WebGL context loss produces the static fallback;
- there is no user-agent quality gate and no production debug panel.

The long-task preflight is an observed session measurement, not a browser,
device-model, or user-agent guess. Browsers without Long Tasks API support
continue through the normal live initialization and adaptive quality path.

Browser timings exposed during local review identify CPU submission, observed
frame interval, and GPU timer-query execution separately. When the timer-query
extension is unavailable, diagnostics say `unavailable` and quality selection
continues from frame pacing and CPU submission without treating the missing
metric as zero.

## Local diagnostics

Diagnostics exist only on `localhost` and `127.0.0.1`. The hero element records
the selected renderer, initialization stage, activity state, shader status,
Fortran status, quality, render target, frame interval, CPU submission cost,
GPU time when supported, simulation time, internal render size, and fallback
reason.

Local-only review parameters:

```text
?heroQuality=ultra
?heroQuality=high
?heroQuality=medium
?heroQuality=low
?heroQuality=static
?heroTime=5
?heroTime=30
?heroTime=90
?heroTime=180
?heroFailure=initialization
```

A forced quality tier disables adaptation for repeatable screenshots. A forced
time seeks the deterministic Fortran state before the first render. The forced
failure control exists only on localhost and verifies the initialization
fallback without corrupting production behavior.

## Accessibility and fallbacks

The fallback stack is:

1. live Fortran state with High or Ultra multi-pass rendering;
2. live Fortran state with Medium rendering;
3. live Fortran state with Low rendering;
4. deterministic WebP still captured from the same live renderer if Wasm or
   WebGL2 fails;
5. the same renderer-derived still when reduced motion is requested.

Reduced-motion visitors do not initialize WebAssembly or WebGL. The canvas and
fallback image are hidden from assistive technology and cannot capture pointer
or keyboard input. The headline, capability line, actions, and restrained
simulation caption remain ordinary HTML.

## Validation commands

```powershell
npm run build:fortran
npm run check:fortran
npm run check:hero
npm run typecheck
npm run lint
npm run build
npm run smoke
```

`npm run build:fortran` requires `LFORTRAN_DIST`. The remaining commands use the
checked-in artifact.

## Provenance

The live visual is generated at runtime from repository-owned Fortran,
TypeScript, and GLSL. Its static fallback is a deterministic capture from that
same browser renderer. Neither path uses AI-generated artwork.

The technical direction adapts relevant accretion-density, turbulence,
temperature, framebuffer, lensing, and bloom concepts from the local
Forgefield EVENTIDE implementation. Native launcher and desktop-specific code
were not copied into the browser or represented as running there.

## Known limitations

- LFortran's custom Wasm backend is alpha software, so the exact release and
  generated artifact are pinned and verified.
- The state is expressive and deterministic, not a validated astrophysical
  simulation.
- The lensing pass is an analytic screen-space approximation, not curved
  spacetime ray integration.
- WebGL2 is the full live baseline; browsers that reject it receive the static
  fallback without losing content or actions.
- Actual GPU cost varies by browser and driver. Adaptive tiers bound cost but
  do not promise a fixed frame rate on every device.
- GPU timer queries are optional. Drivers that do not expose the extension use
  measured frame pacing and CPU submission for adaptation.
