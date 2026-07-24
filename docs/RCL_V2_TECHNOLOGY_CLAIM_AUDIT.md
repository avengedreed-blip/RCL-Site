# RCL V2 Technology Claim Audit

Verified: 2026-07-24

This document is the evidence register for technology names published on the
Reed Creative Labs V2 website. The public profile includes only technology
found in the current product source, manifests, runtime configuration, or
current architecture evidence. An adapter, export preset, plan, or abandoned
implementation is not sufficient on its own.

Status definitions:

- **Current:** present in the active product architecture and safe to publish.
- **Experimental:** present but not the active product path.
- **Planned:** documented direction without a verified current implementation.
- **Tooling only:** used to build or test the product, not part of its public runtime.
- **Legacy:** retained only for compatibility or historical reference.

## Forge

| Public label | Category | Evidence | State | Decision |
| --- | --- | --- | --- | --- |
| Rust | Language / native backend | Forge repository: `src-tauri/Cargo.toml`; `src-tauri/src/` | Current | Display |
| TypeScript | Language / interface | Forge repository: `package.json`; `src/` | Current | Display |
| Tauri 2 | Desktop shell | Forge repository: `package.json`; `src-tauri/tauri.conf.json` | Current | Display |
| Svelte 5 | Interface framework | Forge repository: `package.json` | Current | Display |
| SvelteKit | Interface framework | Forge repository: `package.json`; `svelte.config.js` | Current | Display |
| SQLite | Database | Forge repository: `src-tauri/Cargo.toml` (`rusqlite` with bundled SQLite); database modules in `src-tauri/src/` | Current | Display |
| Codex app-server | Engineering engine interface | Forge repository: `docs/acceptance/capability-matrix.md`; `src-tauri/src/codex/process.rs`; `src-tauri/src/codex/service.rs` | Current and verified | Display |
| Git | Runtime interface | Forge repository: `src-tauri/src/services/git_service.rs`; `docs/acceptance/capability-matrix.md` | Current, with some failure-path verification incomplete | Display without claiming universal workflow coverage |
| Local process execution | Runtime interface | Forge repository: `src-tauri/src/codex/service.rs`; `src-tauri/src/process/` | Current | Display |
| Windows | Platform | Forge repository: `src-tauri/tauri.conf.json`; Windows-specific runtime dependencies in `src-tauri/Cargo.toml` | Current public target | Display |
| Tauri desktop bundle | Distribution | Forge repository: `src-tauri/tauri.conf.json` | Current build path | Display |
| CodeMirror 6 | Editor component | Forge repository: `package.json` | Current | Omit from primary profile to keep it product-level |
| xterm.js | Terminal component | Forge repository: `package.json` | Current | Omit from primary profile to keep it concise |
| Other model/provider adapters | Provider integration | Forge repository: `src-tauri/src/adapters/`; acceptance matrix | Mixed or incomplete | Omit; adapter presence does not prove supported public operation |
| MCP | External tool protocol | Forge planning and deferred integration references | Planned / deferred | Omit |
| macOS / Linux | Platform | Tauri can target them, but current product validation is Windows-led | Unverified public support | Omit |

## Forgefield

| Public label | Category | Evidence | State | Decision |
| --- | --- | --- | --- | --- |
| Fortran 2018 | Language / product core | Forgefield repository: `CMakeLists.txt`; `src/*.f90` | Current | Display |
| C11 | Language / native boundary | Forgefield repository: `CMakeLists.txt`; `native/*.c` | Current | Display |
| C# | Language / launcher | Forgefield repository: `app/Forgefield.Launcher/Forgefield.Launcher.csproj` | Current | Display |
| Fortran simulation and product model | Native core | Forgefield repository: `src/`; `README.md` | Current | Display |
| Win32 / WGL C boundaries | Native interface | Forgefield repository: `native/forgefield_win32_gl_host.*`; native bridge sources | Current | Display |
| .NET 10 / WPF | Launcher framework | Forgefield repository: `global.json`; launcher `.csproj` | Current | Display |
| OpenGL 4.6 Core | Renderer | Forgefield repository: `README.md`; renderer and host source | Current and required | Display |
| GLSL | Shader language | Forgefield repository: `shaders/`; `shaders/README.md` | Current | Display |
| OpenGL compute shaders | GPU compute | `.comp` shader suite; `native/forgefield_gl_bridge.c`; Fortran renderer calls to `ff_gl_dispatch_compute` | Current | Display |
| Windows 10/11 x64 | Platform | launcher target framework and runtime identifier; `README.md` | Current | Display |
| Win32 live-wallpaper host | Runtime interface | native host sources and manifests | Current | Display |
| Windows screensaver (`.scr`) | Runtime interface | screensaver target, manifest, and launcher model | Current | Display |
| Self-contained WPF launcher | Distribution | launcher `.csproj` (`SelfContained`, `PublishSingleFile`) | Current | Display |
| CMake / Ninja / MSYS2 UCRT64 | Build tooling | `CMakeLists.txt`; build docs and presets | Tooling only | Omit from public profile |
| Web hero renderer | Website-specific adaptation | V2 website simulation sources | Separate web implementation | Omit; it is not the shipping Forgefield renderer |
| Release-ready / certified package | Product maturity | current Forgefield release documentation | Not yet verified | Omit |

## RCL Science Lab

| Public label | Category | Evidence | State | Decision |
| --- | --- | --- | --- | --- |
| TypeScript | Language / application | RCL Science Lab repository: `package.json`; `src/` | Current | Display |
| Rust | Language / desktop shell | `...\src-tauri\Cargo.toml`; `src-tauri/src/` | Current | Display |
| Svelte 5 | Interface framework | `...\package.json` | Current | Display |
| SvelteKit | Interface framework | `...\package.json`; `svelte.config.js` | Current | Display |
| Tauri 2 | Desktop shell | `...\package.json`; `src-tauri/Cargo.toml`; `src-tauri/tauri.conf.json` | Current | Display |
| Canvas 2D | Renderer | `...\src\lib\renderers\adapterFactory.ts`; `canvas2dAdapter.ts` | Current active renderer | Display |
| Browser local storage | Storage | `...\src\lib\storage\localStore.ts` | Current | Display |
| Desktop | Platform class | Tauri desktop shell and build scripts | Current | Display conservatively |
| Tauri desktop bundle | Distribution | Tauri configuration and scripts | Current build path | Display |
| WebGL2 | Renderer | `...\src\lib\renderers\webgl/`; `adapterFactory.ts` | Experimental / staged; not active for experiments | Omit |
| Fortran | Native simulation language | No current integration found in manifests or active source | Not implemented | Omit |
| SQLite | Database | No SQLite dependency or current database implementation found | Not implemented | Omit |
| Windows / macOS / Linux release support | Platform | Tauri can package multiple systems, but equivalent current release validation was not found | Unverified | Omit pending owner evidence |

## Storm Lab

| Public label | Category | Evidence | State | Decision |
| --- | --- | --- | --- | --- |
| Fortran | Language / numerical core | Storm Lab repository: `CMakeLists.txt`; `fortran/src/*.f90` | Current working prototype | Display |
| C++ | Language / engine bridge | Storm Lab repository: `bridge/`; `bridge/CMakeLists.txt` | Current working prototype | Display |
| GDScript | Language / presentation | Storm Lab repository: `game/` | Current working prototype | Display |
| Fortran atmospheric simulation | Native core | Fortran modules in `fortran/src/`; native contract tests | Current working prototype | Display |
| Godot 4.7.1 | Engine | Storm Lab repository: `game/project.godot`; delivery documentation | Current working prototype | Display |
| Godot OpenGL Compatibility | Renderer | `game/project.godot`; rendered validation in delivery documentation | Current Windows validation path | Display |
| Versioned C ABI | Native interface | `native/include/stormlab_native.h`; architecture and sprint delivery documents | Current | Display |
| C++ GDExtension | Engine interface | `bridge/src/`; `Docs/ARCHITECTURE.md` | Current | Display |
| Windows | Platform | `Docs/BUILDING.md`; Sprint 3 and 4 validation reports | Current validated target | Display |
| Linux | Platform | project entries and architecture notes | Planned / unvalidated | Omit |
| macOS | Platform | no verified current build path | Unverified | Omit |
| Packaged public release | Distribution | Sprint delivery documentation | Not produced or certified | Omit |
| Complete warning-operations product | Product capability | canonical specification versus current prototype | Planned beyond current foundation | Do not imply in the technical profile |

Storm Lab is publicly labeled **Prototype**. That status is supported by the
functioning Windows implementation, native and Godot test evidence, and rendered
validation recorded in the Storm Lab repository at
`Docs/SPRINT_3_DELIVERY.md`. The
status does not imply a playable or downloadable public build. Radar,
severe-weather, warning, intervention, and operational decision systems remain
planned and must not be described as current capabilities.

## Phase Arcade Volume I

| Public label | Category | Evidence | State | Decision |
| --- | --- | --- | --- | --- |
| GDScript | Language | Phase Shift repository: `scripts/**/*.gd`; source inventory | Current | Display |
| Godot 4.7 | Engine | Phase Shift repository: `project.godot`; `README.md` | Current | Display |
| Godot Forward+ | Renderer | Phase Shift repository: `project.godot` | Current | Display |
| Godot `user://` local saves | Storage | Phase Shift repository: `README.md`; save/settings scripts | Current | Display |
| Windows PC | Platform | `export_presets.cfg`; current Windows export workflow | Current target | Display |
| PCVR | Platform / play mode | `README.md`; VR manager and action map | Current implementation, hardware certification pending | Display without naming headsets |
| OpenXR | Runtime interface | `README.md`; `openxr_action_map.tres`; `scripts/vr/VRManager.gd` | Current PCVR path | Display |
| Godot Windows desktop export | Distribution | `export_presets.cfg`; `README.md` | Current build path | Display |
| Linux | Platform | Linux export preset and candidate package | Unverified candidate | Omit |
| Fortran / native extension | Native integration | no `.f90`, native extension, C, or C++ integration in the current collection repository | Not present | Omit |
| Specific headset support | Platform claim | no completed hardware certification evidence | Unverified | Omit |
| SteamVR certification / storefront target | Distribution | no approved current certification evidence | Unverified | Omit |

## Public presentation rules

- The homepage and Products page use only a compact list derived from each
  product's centralized `technicalProfile.compactFields`.
- Detail pages use the same profile and render only populated fields.
- No technology logos, shields, brand colors, fake terminals, or generated
  architecture diagrams are used.
- Public technology names are ordinary indexed text and remain available to
  assistive technology.
- The public stack describes the product runtime. Build tools are omitted unless
  they materially define distribution.
- This audit must be re-run when a product changes its active renderer, native
  boundary, persistence layer, platform certification, or release packaging.
