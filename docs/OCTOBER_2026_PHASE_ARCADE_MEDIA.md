# Phase Arcade media refresh — October 12, 2026

Fresh 1920×1080 native gameplay captures replace the older screenshots on the homepage, product listing, collection page, individual game pages, and social previews. Artwork and game rendering are Reed Creative Labs material. No generated imagery, compositing, retouching, or gameplay cropping is used.

## Build provenance

- Game checkout: `C:/Dev/Phase_Arcade`.
- Latest candidate recorded by `docs/release/CURRENT_STATUS.md`: `builds/expansion-feedback-local-input-2026-10-12/Phase Arcade.exe`.
- Verified executable SHA-256: `8f3d239939e54dda6577b6e9b2946bc61f069e4bee05e2926e982cbe1815adca`.
- Compared all 433 source inputs in `output/gap-closing-batch-two/frozen-production-inputs.json` with the current checkout: zero changed files.
- Captured those matching production scenes using Godot 4.7's native Vulkan renderer and the existing `res://tools/debug/ProductionRuntimeBenchmark.tscn` runner at High quality and 1920×1080. These are source-run captures matching the candidate inputs, not screenshots taken by launching the exported executable.
- The runner starts the actual game scenes and supplies automated gameplay input. Only gameplay images were selected; forced result screens were excluded.

Capture arguments, after `--path C:/Dev/Phase_Arcade`:

```text
--xr-mode off --audio-driver Dummy --windowed --resolution 1920x1080 res://tools/debug/ProductionRuntimeBenchmark.tscn --log-file <capture-directory>/capture.log -- --output=<capture-directory> --audit-size=1920x1080 --audit-seconds=1 --target-fps=60
```

`APPDATA` pointed to an isolated profile under the capture directory. The silent audio driver caused three soundtrack-context assertions and exit code 1; all selected viewport images saved with result 0. A texture cleanup warning also appeared on shutdown. This run is screenshot evidence, not a passing game benchmark, human playtest, or release certification.

## Exports

Original PNGs and logs remain in ignored `output/phase-media-2026-10-12/`. Reproduce the exports with:

```powershell
node scripts/export-phase-media.mjs output/phase-media-2026-10-12
```

The script uses the installed Sharp version: WebP quality 88 at native resolution; social JPEG quality 90 in a 1200×630 frame with dark padding to preserve the complete image. Phase Breaker supplies the collection preview. Input/output hashes, dimensions, and sizes are recorded in `phase-media-2026-10-12.json`.

Dated asset paths prevent stale browser caches. Superseded files remain available for old external links but are no longer referenced by the active presentation.
