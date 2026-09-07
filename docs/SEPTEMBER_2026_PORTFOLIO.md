# September 2026 Portfolio Baseline

Verified: 2026-09-06. This is a content/media update, not a design revision.
The owner's September instruction is authoritative for priorities and release
status. A working build, a passing test, or an old release report is not evidence
that a product has shipped.

## Public hierarchy and release language

| Order | Product               | Public status      | Public treatment                                            |
| ----- | --------------------- | ------------------ | ----------------------------------------------------------- |
| 1     | Forgefield            | Launching Soon     | Flagship; current native renderer media                     |
| 2     | Phase Arcade Volume I | Final Testing      | Awaiting testing before release; approved gameplay retained |
| 3     | Project Load Bearing  | Active Development | Major development focus; working structural vertical slice  |
| 4     | Static Drift          | Active Development | Android TV ambient application; no release date             |

No product in this table has a purchase, download, release date, price, or
availability claim. Home, Products, and Press consume the same ordered register.
The two new routes use the existing shared flagship page, section densities,
media components, typography, and navigation.

Forge and Storm Lab are removed from the public register and redirect permanently
to /products. RCL Science Lab's obsolete presentation is withdrawn during its
rebuild; its former route redirects temporarily to /products. None is indexed in
the generated sitemap. Removed media and content remain recoverable in Git.
No product repositories or historical product records were deleted.

Static Drift is the public name. Old TV naming routes redirect permanently to
/projects/static-drift. Existing unrelated secondary/planned projects were not
reclassified or expanded during this task.

## Evidence boundaries

### Forgefield

Inspected the current local working tree, not an assumed old release tag:
README.md, global.json, CMakeLists.txt, src/forgefield_scene_catalog.f90,
src/forgefield___scene.f90, src/forgefield___renderer.f90, launcher source,
and tests/art_capture.f90.

The current catalog has nine worlds: Eventide, Genesis, Gravitas, Abyssal,
Synapse, Quantum Garden, **Corona**, Ember, and Polar Night. The historical
strange-attractors ID aliases the current Corona scene; it is not its public name.

Verified architecture: modern Fortran scene/product lifecycle, C/Win32/WGL
boundaries, OpenGL 4.6 Core and GLSL/compute, .NET 10 WPF launcher, Windows
10/11 x64. Launching Soon is the owner's current status, not an independent
certification of signing, distribution, hardware acceptance, or commercial
release. Older product NO-GO reports were not silently converted into approvals.

### Project Load Bearing

Inspected README.md, LOAD_BEARING_VERTICAL_SLICE_STATUS.md (September 5),
simulation/fortran/src/load_bearing_frame_failure.f90 and the current
Brace the Bay scenario evidence. Unreal Engine 5.8/C++ presentation connects
through a C ABI to a native linear-elastic static frame solver.

The current vertical slice implements construction, load testing, initial
elastic response, first-member failure, modification and local save/load.
Its challenge stops after first removal and one static re-equilibrium.
Do not claim general dynamic collapse, plasticity, fracture, earthquakes,
regulatory certification, or real-world building safety. Packaged evidence does
not establish physical usability or owner acceptance. No release date is known.

### Static Drift

Inspected README.md, CMakeLists.txt, current visualization sources, and
platforms/android-tv/app/src/main/cpp/static_drift_android_bridge.cpp.
C++20/OpenGL/GLSL rendering is connected to Kotlin Android TV controls via JNI.
Local preferences, remote controls, and optional built-in audio are implemented.

The current internal catalog contains Luminous Energy Current, Stillwater,
Aurora Veil and Prismatic Bloom. The latter two are explicitly pending owner
review. Public copy does not lock a launch world count, price or release date.
The Windows host is a development/review host, not a promised consumer release.
No HDR, universal 4K60, system-screensaver, external-music, or burn-in-prevention
claim is made.

### Phase Arcade

Owner status changed to Final Testing. Existing approved three-game media,
PC/VR scope and technical profile are preserved. The July technical verification
date was deliberately not advanced: this sprint did not rerun the game suite.
Included games remain exactly Phase Shift, Phase Breaker, and Phase Court.

## Current Forgefield media

All six public images are native 2560 x 1440 renders captured on September 6.
No AI artwork, compositing, invented UI, color grading, sharpening, or upscaling
was used. PNG intermediates are lossless conversions of native BMP output.
Public WebP encoding uses quality 90, effort 6. The social derivative is a
1200 x 630 center crop at JPEG quality 92. Product/gallery frames remain 16:9.

The opt-in capture executable was incrementally rebuilt against the existing
current native build. It invokes the shipping scene API and shaders, renders
every frame, and uses a full-resolution offscreen framebuffer. It does not run
the installed wallpaper/screensaver, alter the user's desktop, or change settings.
Captures use the normal balanced preset, fixed seed 20260904 and 1/60-second
simulation steps, sampled at 30 seconds. This is a native renderer capture,
not proof of the complete launcher's physical user journey or display performance.

Reproduction from the Forgefield repository, using the configured local CMake
toolchain and release build directory:

```text
cmake --build out/build/release --target forgefield_art_capture
out/build/release/bin/forgefield_art_capture.exe <absolute shader directory> <existing output directory> <world ID> 30 full-raster 2560 1440 offscreen screenshot last-frame
```

Executable SHA-256:
`0C14160A58B5105D5AE10924372A032397063C6FC6073FE65D2249124A88F17B`

| World / public filename prefix               | Lossless PNG intermediate SHA-256                                |
| -------------------------------------------- | ---------------------------------------------------------------- |
| Eventide / forgefield-eventide-2026-09       | E2AAB5DFACF0E6139FE6DD3E39B7D50190540CCE721A6B0B14B0DCF2191564DB |
| Polar Night / forgefield-polar-night-2026-09 | BFC698893ACAC9517BE809B2769902261CD02195CDAB5D7A0213541A85508C14 |
| Corona / forgefield-corona-2026-09           | B268F8BF6759A79D463536318C48F3CE94AB383844EEA5E91585419DB90D366C |
| Gravitas / forgefield-gravitas-2026-09       | D3C20334C92CD80661FEF9C7B59BC26D4C19E4372DC3457A39003F8FC5684C31 |
| Synapse / forgefield-synapse-2026-09         | 6B22BF8BC5BCC3EE384F7693F78BD79BCDCE3B3D6B4859A7A4F534D01027A2A3 |
| Ember / forgefield-ember-2026-09             | 6A5405DD17359C212C7A197273DCE9F32168E1E50D4576CB36AA08CA397EAC6E |

Paths: public/images/projects/<prefix>.webp. Social:
public/images/social/forgefield-2026-09.jpg. Captions explicitly state
September 2026 pre-release. Selection favors black-hole flow, landscape,
solar surface, interacting galaxies, neural structure and fire over redundant
space imagery. All nine worlds were captured for internal comparison; six
were selected. The 17 stale/withdrawn public assets were removed after checking
references. The separate homepage hero fallback is unchanged.

At the baseline checkpoint, Load Bearing and Static Drift media was withheld
pending approval. The subsequent owner-requested native capture pass replaces
those placeholders; see [Development Media](SEPTEMBER_2026_DEVELOPMENT_MEDIA.md)
for selection, build provenance and the unchanged development-status boundaries.
Phase Arcade image bytes and mappings remain unchanged.

## Regression scope

Portfolio checks cover four-product order, distinct prerelease statuses, native
technical values, new routes, removed route/index entries, redirects, exact
three-game membership, media dates and paths, and public discovery references.
Existing smoke, commercial, privacy, trust, color, Fortran, accessibility and
browser checks remain in force. Raw captures, comparison sheets and test
artifacts stay ignored and must not be staged.

Historical reports in docs describe their dated snapshots, not current release
truth. This document supersedes their affected product/media claims.

## Verification results

- Clean locked install, formatting, lint, TypeScript, production build and full
  smoke suite passed. Both npm dependency audits reported zero vulnerabilities.
- Portfolio checks passed for 15 product routes and four featured products.
- Expanded browser checks passed in Chromium and installed Edge: 26 public
  routes, desktop/mobile axe checks, product navigation, keyboard, clipboard,
  responsive bounds, motion lifecycle, no-WebGL/no-JavaScript fallback and 404.
- Chrome screenshots of all eight affected page types were reviewed at 390 and
  1440 pixels. All images loaded; no content overflow or console errors occurred.
  Responsive automation additionally covered 320 through 2560 pixels.
- Retired route redirects were checked with the local Vercel-rule emulator.
  Production routing will change only when this branch is deployed.
- All 11 unrelated product records and Phase Arcade image bytes remain unchanged.
  No stylesheet, hero renderer, fonts, navigation, dependency or lockfile changed.
- The first TypeScript run encountered malformed pre-existing generated files
  under .next/dev/types. Clearing only the generated cache and rebuilding fixed
  that issue. No source workaround or TypeScript exclusion was added.
- Apple Safari and physical Android TV were not tested in this website sprint.
  No new claim of native product release acceptance or performance certification
  follows from the website checks.
