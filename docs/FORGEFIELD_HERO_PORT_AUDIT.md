# Forgefield Hero Port Audit

## Decision

The website hero may adapt Forgefield's EVENTIDE renderer because the authentic
source, shaders, reference captures, quality profiles, and performance evidence
are available in the sibling Forgefield source repository.

The browser version is not a native OpenGL port and must not be described as
one. Forgefield targets OpenGL 4.6 and uses compute shaders plus shader-storage
buffers that WebGL2 does not expose. The browser implementation therefore
preserves the native pass architecture and visual model while substituting
bounded procedural instancing for the native compute-updated particle buffer.

This is a traceable adaptation, not a screenshot recreation and not an
unrelated particle effect.

## Authoritative Native Sources

| Native responsibility | Authoritative source |
| --- | --- |
| Renderer lifecycle and pass order | Forgefield repository: `src/forgefield_renderer.f90` |
| Scene model and physics boundary | Forgefield repository: `docs/scenes/eventide.md` |
| Deterministic particle initialization | Forgefield repository: `shaders/eventide_init.comp` |
| Particle evolution | Forgefield repository: `shaders/eventide_update.comp` |
| Continuous disk, stars, jets, and extinction | Forgefield repository: `shaders/starfield.frag` |
| Particle projection and motion stretch | Forgefield repository: `shaders/particle.vert` |
| Particle energy and class treatment | Forgefield repository: `shaders/particle.frag` |
| Thin-lens resolve and rear-disk fold | Forgefield repository: `shaders/lensing.frag` |
| HDR target ownership and bloom order | Forgefield repository: `src/forgefield_hdr_pipeline.f90` |
| Bloom filters | Forgefield repository: `shaders/bloom_*.frag` |
| Tone mapping and final composite | Forgefield repository: `shaders/composite.frag` |
| Cross-scene quality presets | Forgefield repository: `src/forgefield_config.f90` |
| Accepted visual reference | Forgefield repository: `artifacts/forgefield-commercial-finish/screenshots/worlds/eventide.png` |

## Native Pipeline

Forgefield EVENTIDE renders in this order:

1. `eventide_init.comp` creates one deterministic 64-byte record per particle.
2. `eventide_update.comp` advances those records in a softened analytic central
   field, with circularization, vertical support, spin analogue, turbulence,
   bounded events, finite-value guards, and deterministic respawn.
3. `starfield.frag` renders the distant field and a continuous
   emission-extinction accretion volume into linear `RGBA16F`.
4. `particle.vert` and `particle.frag` add two instanced particle layers:
   broad sparse gas, then granular emissive cores and trails.
5. `lensing.frag` remaps the rendered scene through a softened thin-lens
   approximation and adds sampled rear-disk folds, shadow occlusion, and photon
   ring structure.
6. Bloom extract, downsample, and upsample passes create a bounded glow field.
7. `composite.frag` applies exposure, bloom, ACES-style mapping, saturation,
   vignette, black-floor control, multiplicative grain, and output encoding.

The accepted Forgefield image is characterized by a broad, optically thick,
turbulent disk with granular matter extending well beyond the compact-object
silhouette. The compact object is an anchor inside a field, not a bright ring
floating in empty space.

## Physics and Claim Boundary

The source describes EVENTIDE as relativistically inspired, not as numerical
general relativity or radiative transfer. Its relevant approximations are:

- softened Newtonian central acceleration;
- analytic circularization, vertical support, and spin analogue;
- deterministic turbulence and bounded large-scale events;
- finite-interval emission and extinction through a flared ellipsoid;
- camera-dependent thin-lens-inspired screen-space displacement;
- screen-space rear-disk fold and photon-ring treatments;
- art-directed temperature colors.

The website must use the same boundary. It may describe the visual as a
procedural accretion field adapted from Forgefield. It may not call the result a
general-relativistic solver, a geodesic integrator, an MHD simulation, or a
native Forgefield runtime.

## Browser Capability Audit

### Available in WebGL2

- floating-point render targets when extensions are present;
- framebuffer ping-pong;
- instanced drawing;
- fragment-shader volume integration;
- texture-based lensing and post-processing;
- additive blending;
- transform feedback;
- explicit resource cleanup and context-loss handling.

### Not available in WebGL2

- OpenGL 4.6 compute shaders;
- shader-storage buffer objects;
- `GL_TIME_ELAPSED` queries with the same native contract;
- direct reuse of GLSL 4.60 programs;
- the native million-particle compute/update path.

WebGPU could express a closer compute port, but it is not selected for the
baseline because browser support and static-host reliability are less uniform.
Adding a second GPU backend would also increase failure surface without
improving the website's core communication.

## Approved Browser Adaptation

| Browser pass | Native source | Browser treatment |
| --- | --- | --- |
| Environment and disk volume | `starfield.frag` | WebGL2 full-screen fragment pass retaining finite ellipsoid intersection, emission/extinction, flared vertical density, spiral families, long-cycle breathing, and thermal zoning |
| Particle matter | `eventide_init.comp`, `eventide_update.comp`, `particle.vert`, `particle.frag` | Deterministic procedural particle population evaluated in an instanced WebGL2 vertex shader; orbital position, inward drift, thickness, coherent streams, temperature class, sparse fragments, and motion stretch remain GPU-side |
| Lensing resolve | `lensing.frag` | Separate WebGL2 texture-remap pass retaining softened deflection, camera-relative aspect correction, sampled rear fold, shadow transmission, and restrained photon-ring hierarchy |
| Bloom | `bloom_extract.frag`, `bloom_downsample.frag`, `bloom_upsample.frag` | Half- and quarter-resolution extract/downsample/upsample chain |
| Composite | `composite.frag` | Exposure, bloom, ACES-style tone map, restrained saturation, vignette, multiplicative grain, and alpha shaping for page integration |

The procedural particle substitution is intentionally bounded and documented:
particles do not persist in an SSBO between frames, do not collide, and are not
advanced by the native compute kernel. They are deterministic orbital samples
whose positions are evaluated from seed, radius, class, and time on the GPU.
The continuous volume remains the primary body of the disk; the particles
supply the native renderer's granular matter and coherent landmarks.

## Fortran Runtime Role

`simulation/hero/hero_flow.f90` remains the canonical long-cycle state source
for the website. Its compiled WebAssembly exports are invoked at runtime and
control:

- precession;
- disk inclination;
- density;
- bounded flare energy;
- lens strength;
- turbulence;
- camera drift;
- temperature response.

TypeScript only advances elapsed time, invokes the Fortran-generated exports,
transfers scalar state, manages lifecycle and quality, and submits GPU work.
The browser shader owns rendering and bounded procedural particle evaluation.

The Fortran module does not reproduce Forgefield's native compute-particle
solver. Documentation and UI must not imply that it does.

## Composition Requirements

- The field center sits to the right of the copy column.
- The disk must occupy a broad area and remain visibly three-dimensional.
- Granular matter must read as part of the disk, not random spark decoration.
- Background lensing must be visible near the compact object.
- The rear-disk fold must be sampled from scene material.
- The black center and ring must not dominate the entire composition.
- Left-side alpha protection must preserve headline and action contrast.
- Negative space remains near-black, not gray or blue.
- Copper and gold describe temperature and energy, not a page-wide wash.

## Quality Mapping

The native quality system ranges from Safe to Unreasonable. The website maps it
to four live tiers and one static tier:

| Website tier | Relative native intent | Render scale | Volume steps | Particle instances | Bloom |
| --- | --- | ---: | ---: | ---: | --- |
| Low | Safe | 0.48 | 18 | 12,000 | bounded, half-resolution |
| Medium | Quiet/Balanced | 0.62 | 28 | 24,000 | half plus quarter |
| High | Balanced/Stellar | 0.76 | 42 | 48,000 | half plus quarter |
| Ultra | Stellar | 0.88 | 58 | 72,000 | half plus quarter |
| Static | Reduced motion/failure | 1 captured state | n/a | n/a | baked from the same renderer |

Every live tier preserves the disk volume, granular matter, lensing, rear fold,
and tone-mapped composite. Tiers reduce resolution, sample count, particle
population, and frame target before removing the scene's defining structure.

## Performance and Lifecycle Requirements

- initialize after first content paint;
- adapt from measured frame interval and CPU submission cost;
- cap device pixel ratio and render scale per tier;
- allocate textures, programs, framebuffers, and vertex arrays only at
  initialization or resize;
- avoid per-frame typed-array allocation;
- pause when the document is hidden;
- pause outside the hero's observation margin;
- clamp simulation delta after stalls;
- dispose every owned GPU resource;
- recover to a deterministic still on initialization or context failure;
- expose diagnostics only on localhost.

Browser timings are CPU-side observations unless a disjoint timer-query path is
explicitly implemented and reported as such.

## Static Fallback

The ring-based SVG fallback was retired with the old renderer. The replacement
is `public/images/home/forgefield-eventide-static.webp`, captured from the live
Forgefield-derived browser renderer with seed 1729, High quality, and simulation
time 180 seconds. It is used for reduced motion, explicit local static review,
initialization failure, and context loss. It does not use Forgefield's native
screenshot, the design concept image, stock media, or generated art.

## Verification Gate

The renderer is not complete until all of the following are demonstrated:

- WebGL2 programs compile and link in the local browser;
- the Fortran Wasm signature and deterministic checksum pass;
- the live canvas is visibly distinct at 5, 30, 90, and 180 seconds;
- high, medium, and low tiers preserve the same scene identity;
- the disk reads as a dense field rather than a ring;
- background remapping and rear-fold sampling are visible;
- reduced motion avoids live initialization;
- forced failure produces the deterministic still;
- hidden-tab and offscreen pauses are observable;
- desktop, tablet, and mobile preserve copy readability;
- typecheck, lint, build, and hero integration checks pass.

## Provenance

The browser visual is procedurally generated at runtime from repository-owned
Fortran, TypeScript, and GLSL. It uses no AI-generated image, stock asset,
prerecorded video, native Forgefield screenshot, or downloaded media in the live
or fallback hero.
