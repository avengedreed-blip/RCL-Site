import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const component = await readFile(
  path.join(root, "components", "FortranFlowHero.tsx"),
  "utf8",
);
const page = await readFile(path.join(root, "app", "page.tsx"), "utf8");
const styles = await readFile(path.join(root, "app", "globals.css"), "utf8");
const renderer = await readFile(
  path.join(root, "lib", "hero-flow", "renderer.ts"),
  "utf8",
);
const shaders = await readFile(
  path.join(root, "lib", "hero-flow", "shaders.ts"),
  "utf8",
);
const fallback = await readFile(
  path.join(root, "components", "HeroSystemField.tsx"),
  "utf8",
);

const requirements = [
  [component, 'matchMedia("(prefers-reduced-motion: reduce)")', "reduced motion"],
  [component, "IntersectionObserver", "offscreen throttling"],
  [component, 'document.addEventListener("visibilitychange"', "hidden-tab throttling"],
  [component, 'canvas.addEventListener("webglcontextlost"', "context-loss fallback"],
  [component, "window.cancelAnimationFrame", "animation cleanup"],
  [component, "intersectionObserver.disconnect()", "observer cleanup"],
  [component, "resizeObserver.disconnect()", "resize cleanup"],
  [component, "FortranHeroRuntime.load()", "live Fortran runtime invocation"],
  [
    component,
    "new HeroFlowRenderer(canvas, composition)",
    "WebGL2 renderer invocation",
  ],
  [component, "renderer?.dispose()", "WebGL resource cleanup"],
  [
    component,
    "runtime.advance(simulationDelta / 1000)",
    "render-cadence simulation clock",
  ],
  [component, "runtime.seek(overrides.forcedTime)", "deterministic time inspection"],
  [
    component,
    "Forgefield web renderer",
    "truthful runtime framing",
  ],
  [
    component,
    'failure === "initialization"',
    "local initialization-failure control",
  ],
  [component, "updateAnimationState()", "measured lifecycle pausing"],
  [component, "heroSimulationTimeSeconds", "simulation-time diagnostics"],
  [component, "function initialQualityIndex()", "conservative startup quality"],
  [
    component,
    "overrides.forcedQualityIndex ?? initialQualityIndex()",
    "responsive startup tier selection",
  ],
  [
    component,
    '? "mobile-static"',
    "phone-sized deterministic presentation",
  ],
  [
    component,
    'PerformanceObserver.supportedEntryTypes.includes("longtask")',
    "measured constrained-session preflight",
  ],
  [
    component,
    'setDevelopmentStage("performance-fallback")',
    "performance-aware deterministic fallback",
  ],
  [component, "particleCount: 72_000", "bounded ultra particle budget"],
  [component, "volumeSteps: 58", "bounded ultra volume budget"],
  [component, "renderer.diagnostics.passCount", "multipass diagnostics"],
  [
    component,
    'container.dataset.heroMode = "fallback"',
    "initialization failure fallback",
  ],
  [
    component,
    'className="fortran-flow-hero__visual" aria-hidden="true"',
    "decorative canvas accessibility",
  ],
  [page, "Building software that explores complex systems.", "approved headline"],
  [page, "<FortranFlowHero />", "homepage integration"],
  [
    styles,
    '.fortran-flow-hero[data-hero-mode="live"]',
    "live visualization presentation",
  ],
  [
    styles,
    "@media (prefers-reduced-motion: reduce)",
    "reduced-motion presentation",
  ],
  [renderer, 'getContext("webgl2"', "WebGL2 renderer"],
  [renderer, "gl.createFramebuffer()", "offscreen scene framebuffer"],
  [renderer, "gl.framebufferTexture2D(", "scene texture attachment"],
  [
    renderer,
    'renderer: "forgefield-eventide-webgl2"',
    "truthful renderer diagnostics",
  ],
  [renderer, "passCount: 7", "seven-pass renderer diagnostics"],
  [renderer, "gl.drawArraysInstanced(", "instanced accretion matter"],
  [
    renderer,
    '"EXT_disjoint_timer_query_webgl2"',
    "optional GPU timer-query measurement",
  ],
  [renderer, "resolveGpuQuery()", "bounded GPU timing lifecycle"],
  [renderer, "gl.deleteQuery", "GPU timer-query cleanup"],
  [renderer, "quality.particleCount", "adaptive particle budget"],
  [renderer, "quality.volumeSteps", "adaptive volume budget"],
  [renderer, "deleteVertexArray", "WebGL vertex resource cleanup"],
  [renderer, "deleteFramebuffer", "WebGL framebuffer cleanup"],
  [renderer, "deleteTexture", "WebGL texture cleanup"],
  [renderer, "deleteProgram", "WebGL program cleanup"],
  [
    shaders,
    "#define MAX_VOLUME_STEPS 64",
    "bounded accretion volume budget",
  ],
  [shaders, "HERO_ENVIRONMENT_FRAGMENT_SHADER", "finite disk volume pass"],
  [shaders, "HERO_PARTICLE_VERTEX_SHADER", "procedural matter pass"],
  [shaders, "HERO_LENSING_FRAGMENT_SHADER", "separate lensing resolve"],
  [shaders, "HERO_BLOOM_EXTRACT_FRAGMENT_SHADER", "bloom extraction"],
  [shaders, "HERO_BLOOM_DOWNSAMPLE_FRAGMENT_SHADER", "bloom downsample"],
  [shaders, "HERO_BLOOM_UPSAMPLE_FRAGMENT_SHADER", "bloom reconstruction"],
  [shaders, "HERO_COMPOSITE_FRAGMENT_SHADER", "tone-mapped composite"],
  [shaders, "diskDensity", "turbulent accretion density field"],
  [shaders, "foldedDisk", "rear-disk lens fold"],
  [shaders, "photonRing", "event-horizon photon ring"],
  [shaders, "diskTemperature", "temperature-mapped accretion material"],
  [shaders, "uLensStrength", "Fortran-driven lens uniform"],
  [
    fallback,
    "/images/home/forgefield-eventide-static.webp",
    "renderer-derived static fallback",
  ],
];

for (const [source, expected, label] of requirements) {
  if (!source.includes(expected)) {
    throw new Error(`Fortran hero integration is missing ${label}.`);
  }
}

for (const forbiddenLabel of [
  "PROCEDURAL ACCRETION FIELD",
  "FORTRAN STATE",
  "WEBGL2 RENDERER",
]) {
  if (component.toUpperCase().includes(forbiddenLabel)) {
    throw new Error(`Public hero still exposes "${forbiddenLabel}".`);
  }
}

if (fallback.includes("<svg") || fallback.includes("<ellipse")) {
  throw new Error("Rejected ring-based SVG fallback remains active.");
}

console.log("Fortran hero integration guards passed.");
