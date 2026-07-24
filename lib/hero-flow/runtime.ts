const FORTRAN_SIGNATURE = 20260724;
const DEFAULT_SEED = 1729;

interface HeroSystemExports extends WebAssembly.Exports {
  memory: WebAssembly.Memory;
  hero_camera_x: (time: number, seed: number) => number;
  hero_camera_y: (time: number, seed: number) => number;
  hero_density: (time: number, seed: number) => number;
  hero_flare: (time: number, seed: number) => number;
  hero_lens_strength: (time: number, seed: number) => number;
  hero_precession: (time: number, seed: number) => number;
  hero_signature: () => number;
  hero_state_checksum: (seed: number) => number;
  hero_temperature: (time: number, seed: number) => number;
  hero_tilt: (time: number, seed: number) => number;
  hero_turbulence: (time: number, seed: number) => number;
}

export interface HeroSystemState {
  cameraX: number;
  cameraY: number;
  density: number;
  flare: number;
  lensStrength: number;
  precession: number;
  temperature: number;
  tilt: number;
  time: number;
  turbulence: number;
}

function createWasiImports(): WebAssembly.Imports {
  return {
    wasi_snapshot_preview1: {
      fd_write: () => 0,
      proc_exit: (code: number) => {
        throw new Error(`Fortran WebAssembly requested process exit ${code}.`);
      },
    },
  };
}

async function instantiateFortranModule(url: string) {
  const response = await fetch(url, { cache: "force-cache" });
  if (!response.ok) {
    throw new Error(`Fortran WebAssembly request failed with ${response.status}.`);
  }

  const bytes = await response.arrayBuffer();
  if (!WebAssembly.validate(bytes)) {
    throw new Error("Fortran hero module failed WebAssembly validation.");
  }

  const result = await WebAssembly.instantiate(bytes, createWasiImports());
  return result.instance.exports as HeroSystemExports;
}

export class FortranHeroRuntime {
  private readonly exports: HeroSystemExports;
  private readonly seed: number;
  private readonly systemState: HeroSystemState = {
    cameraX: 0,
    cameraY: 0,
    density: 0,
    flare: 0,
    lensStrength: 0,
    precession: 0,
    temperature: 0,
    tilt: 0,
    time: 0,
    turbulence: 0,
  };

  private constructor(exports: HeroSystemExports, seed = DEFAULT_SEED) {
    this.exports = exports;
    this.seed = seed;
    this.sample();
  }

  static async load() {
    const exports = await instantiateFortranModule("/wasm/hero-flow.wasm");
    if (exports.hero_signature() !== FORTRAN_SIGNATURE) {
      throw new Error("Fortran hero signature does not match the website runtime.");
    }

    const checksumA = exports.hero_state_checksum(DEFAULT_SEED);
    const checksumB = exports.hero_state_checksum(DEFAULT_SEED);
    if (!Number.isFinite(checksumA) || checksumA !== checksumB) {
      throw new Error("Fortran hero initialization is not deterministic.");
    }

    return new FortranHeroRuntime(exports);
  }

  get state(): HeroSystemState {
    return this.systemState;
  }

  advance(deltaSeconds: number) {
    this.systemState.time += Math.min(Math.max(deltaSeconds, 0), 0.1);
    this.sample();
  }

  seek(timeSeconds: number) {
    this.systemState.time = Math.max(0, timeSeconds);
    this.sample();
  }

  private sample() {
    const time = this.systemState.time;
    this.systemState.cameraX = this.exports.hero_camera_x(time, this.seed);
    this.systemState.cameraY = this.exports.hero_camera_y(time, this.seed);
    this.systemState.density = this.exports.hero_density(time, this.seed);
    this.systemState.flare = this.exports.hero_flare(time, this.seed);
    this.systemState.lensStrength = this.exports.hero_lens_strength(
      time,
      this.seed,
    );
    this.systemState.precession = this.exports.hero_precession(time, this.seed);
    this.systemState.temperature = this.exports.hero_temperature(time, this.seed);
    this.systemState.tilt = this.exports.hero_tilt(time, this.seed);
    this.systemState.turbulence = this.exports.hero_turbulence(time, this.seed);
  }
}
