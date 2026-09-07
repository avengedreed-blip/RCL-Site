# September 2026 Development Media

Captured and inspected on 2026-09-06 in response to the owner's request to source
the best current Static Drift and Project Load Bearing images from their actual
projects. This authorizes website use of development imagery, not product release
acceptance. Both products remain Active Development. No product source was edited.

## Selection and usage

| Product | Cover | Gallery, in order | Source resolution |
| --- | --- | --- | --- |
| Static Drift | Prismatic Bloom | Prismatic Bloom, Luminous Energy Current, Aurora Veil | 3840 x 2160 |
| Project Load Bearing | Braced frame | Build, engineering inspection, redesigned result | 3840 x 2160 cover; 2560 x 1440 UI |

The shared product records supply Home, Products, and the detail-page covers.
Detail galleries preserve the existing frames, full-size links and lazy loading.
Each product has its own dated gallery context rather than inheriting Phase
Arcade's game-specific heading and action. Other product images are unchanged.

Stillwater was also captured and reviewed but not selected: the three chosen
Static Drift images offer stronger definition and visual contrast. No comparison
sheets, diagnostic overlays, editor windows, chats or desktop captures are used.

## Static Drift source

The existing native Release host was run directly, without rebuilding or changing
the product's dirty working tree. Source: `platforms/windows/src/static_drift_main.cpp`
and `artifacts/static-drift/windows/Release/StaticDrift.exe` in the Static Drift
repository (historically named Forgefield TV).

Executable SHA-256:
`c90857188a9d9e83c1178284b040c542669307f84424aff38cb2abcdb065b10d`

Effective native invocation for each selected scene:

```text
StaticDrift.exe --visualization=<scene-id> --quality=high --width=3840 --height=2160
  --frames=1800 --fixed-frame-seconds=0.016666666666666666 --seed=1212566596
  --palette=rcl_signature --no-audio
  --settings=<isolated-output.state> --capture=<capture.png> --telemetry=<capture.json>
```

Scene IDs: `prismatic_bloom`, `luminous_energy_current_proof`, `aurora_veil`.
Fresh native settings supplied brightness 0.72, confirmed in the saved state.
The host does not parse a brightness CLI override.
All captures report 3840 x 2160 client, renderer and viewport dimensions,
`resolutionVerified: true`, `placeholder: false`, scene age 30 seconds, and
`sceneRenderingReady: true`. Audio was disabled. Settings and telemetry were
isolated under the website's ignored capture directory.

These are real procedural-engine frames from a Windows development host for the
Android TV product, not physical-TV screenshots or performance certification.
The native application's human-review gate remains pending. No consumer Windows
platform, fixed launch world count, HDR capability or release date is implied.

## Project Load Bearing source

Existing Win64 Shipping package:
`artifacts/brace-the-bay/packages/20260905-040732-065/package-manifest.json`.
The executable hash matched that manifest before capture:
`584fca5a24636b8b8ea1aab67b30f2e9c33ee711371f8ec142b94a6358394b83`.
No rebuild or source modification was needed.

The native capture interfaces are documented in `tools/capture_brace_the_bay.ps1`
and implemented by `unreal/LoadBearing/Source/LoadBearing/LoadBearingBuildSite.cpp`.
Runs used `-unattended -nosplash -NoSound -RenderOffscreen -windowed -ForceRes
-FixedSeed`, explicit `-ResX`/`-ResY`, and an isolated `-UserDir`.

- Cover: `LBSprint7CaptureState=BAY_SOLUTION_WORLD`, 3840 x 2160.
- UI: `LBSprint9UiCaptureState=BAY_BUILD`, `BAY_RESULT_ENGINEERING`,
  `BAY_SUCCESS`, each 2560 x 1440.
- Each run used its corresponding explicit capture path and dimensions.

The images show scripted states rendered by the real prototype with its real HUD,
not a UI mockup or an externally composited scene. The screenshots are not proof
of manual usability acceptance, general dynamic collapse, engineering certification
or real-world structural safety. The success panel reports the authored challenge's
test results, not external performance or commercial claims.

## Encoding and provenance

All seven website images are 2560 x 1440 WebP, quality 92, effort 6. The exported
files and gallery images retain the full 16:9 frame. Clean covers use the existing
responsive cover-crop behavior; UI screenshots appear only in uncropped galleries.
Source images were only downsampled where larger; no upscaling,
color grading, sharpening, retouching, AI artwork or fabricated UI was used.
WebP files range from 73,108 to 357,732 bytes. The two social previews are 1200 x
630 center crops from the native covers, JPEG quality 92. Metadata is stripped by
the export pipeline. Public captions and alt text describe visible content.

| Native PNG | SHA-256 |
| --- | --- |
| Static Drift / Prismatic Bloom | `f1562d0a40c10d16d8580cacc6d0ce298121e539eabb8cc709ea4be1ddd8c00c` |
| Static Drift / Energy Current | `e9139c4847d12282a8968cf5185c370b564ae222cc9754713f48a70186ca2350` |
| Static Drift / Aurora Veil | `f28e9750d0bc5b413a9dec3cfc7c8e8a633a4e03b7b027de4ae662ed317ae772` |
| Load Bearing / Braced Frame | `d0348702aea62887da797c0e2f8ac2f6bba1e59062ad57fecab5820d320d29be` |
| Load Bearing / Build | `33dc58f77c4a8209c9c2ade422f0e3b2e6066d1f8222ee73c39c85d0e78ff5f7` |
| Load Bearing / Engineering | `4d520fd90bcb4bd32051fbee800371850e7337f84790ec2dca4b9e0afc5ca979` |
| Load Bearing / Redesign | `20e536ca9d93af9fa15824398d50f5271100a6044bf2b5b5b0076e2188e69455` |

Native PNGs, telemetry, isolated settings and browser review captures remain in
ignored `output/product-media-2026-09/`, not the repository or public export.
Only the selected website images and their social derivatives are published.

## Website verification

- `npm run typecheck`, `npm run lint`, `npm run build`, `npm run smoke`, and
  `git diff --check` passed on the final changes.
- `npm run check:browser` passed with installed Chrome and Playwright WebKit:
  26 routes, desktop/mobile axe checks, responsive bounds from 320 to 2560,
  product links, reduced motion, keyboard checks and existing renderer fallbacks.
- New regressions require one cover plus three loaded 2560 x 1440 gallery
  images per page, descriptive alternatives, correct full-size links, and stable
  image-frame dimensions on decode. Covers fill their responsive frames;
  gallery screenshots retain their entire UI without stretching or cropping.
- Both product pages and their Products-page chapters were visually reviewed
  at 390, 768 and 1440 pixels. Local review recorded no overflow or console errors.
- Every product record was compared with the preceding commit: only the two
  requested `showcaseMedia` fields changed. Other product galleries and social
  mappings are unchanged. No CSS, fonts, renderer, dependencies or routes changed.
- All seven WebP files and both 1200 x 630 JPEGs passed dimension/format checks
  and contain no EXIF or XMP metadata.

Windows WebKit is an engine compatibility check, not native Apple Safari. Its
runner cannot verify native Tab traversal; keyboard activation is tested instead.
This website work does not certify physical Android TV behavior or native-product
release readiness. Source app code and existing product work were preserved.
