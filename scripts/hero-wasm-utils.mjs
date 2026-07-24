import { createHash } from "node:crypto";

export const HERO_SIGNATURE = 20260724;
export const HERO_MEMORY_PAGES = 16;
export const HERO_REQUIRED_EXPORTS = [
  "memory",
  "hero_camera_x",
  "hero_camera_y",
  "hero_density",
  "hero_flare",
  "hero_lens_strength",
  "hero_precession",
  "hero_signature",
  "hero_state_checksum",
  "hero_temperature",
  "hero_tilt",
  "hero_turbulence",
];

export function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function readUnsignedLeb(bytes, offset) {
  let value = 0;
  let shift = 0;
  let position = offset;
  let byte;

  do {
    byte = bytes[position];
    if (byte === undefined) {
      throw new Error("Unexpected end of WebAssembly data.");
    }
    position += 1;
    value += (byte & 0x7f) * 2 ** shift;
    shift += 7;
  } while ((byte & 0x80) !== 0);

  return { value, next: position };
}

function encodePaddedUnsignedLeb(value, width) {
  const result = [];
  let remaining = value;

  for (let index = 0; index < width; index += 1) {
    let byte = remaining & 0x7f;
    remaining = Math.floor(remaining / 128);
    if (index < width - 1) {
      byte |= 0x80;
    }
    result.push(byte);
  }

  if (remaining !== 0) {
    throw new Error(`Value ${value} does not fit in ${width} LEB128 bytes.`);
  }

  return result;
}

export function patchMemoryPages(input, pages = HERO_MEMORY_PAGES) {
  const bytes = Buffer.from(input);
  let position = 8;

  while (position < bytes.length) {
    const sectionId = bytes[position];
    position += 1;
    const sectionSize = readUnsignedLeb(bytes, position);
    const payloadStart = sectionSize.next;
    const payloadEnd = payloadStart + sectionSize.value;

    if (sectionId === 5) {
      const count = readUnsignedLeb(bytes, payloadStart);
      if (count.value !== 1) {
        throw new Error(`Expected one Wasm memory, found ${count.value}.`);
      }

      const flagsPosition = count.next;
      const flags = bytes[flagsPosition];
      const minimumPosition = flagsPosition + 1;
      const minimum = readUnsignedLeb(bytes, minimumPosition);
      bytes.set(
        encodePaddedUnsignedLeb(pages, minimum.next - minimumPosition),
        minimumPosition,
      );

      if ((flags & 1) !== 0) {
        const maximumPosition = minimum.next;
        const maximum = readUnsignedLeb(bytes, maximumPosition);
        bytes.set(
          encodePaddedUnsignedLeb(pages, maximum.next - maximumPosition),
          maximumPosition,
        );
      }

      return bytes;
    }

    position = payloadEnd;
  }

  throw new Error("The WebAssembly artifact does not contain a memory section.");
}

export function createWasiImports() {
  return {
    wasi_snapshot_preview1: {
      fd_write: () => 0,
      proc_exit: (code) => {
        throw new Error(`Fortran WebAssembly requested process exit ${code}.`);
      },
    },
  };
}

export async function inspectHeroArtifact(bytes) {
  if (!WebAssembly.validate(bytes)) {
    throw new Error("The Fortran hero artifact is not valid WebAssembly.");
  }

  const compiledModule = await WebAssembly.compile(bytes);
  const exportedNames = WebAssembly.Module.exports(compiledModule).map(
    ({ name }) => name,
  );

  for (const requiredExport of HERO_REQUIRED_EXPORTS) {
    if (!exportedNames.includes(requiredExport)) {
      throw new Error(`Missing required Fortran export: ${requiredExport}`);
    }
  }

  const instance = await WebAssembly.instantiate(
    compiledModule,
    createWasiImports(),
  );
  const exports = instance.exports;
  const signature = exports.hero_signature();
  const checksumA = exports.hero_state_checksum(1729);
  const checksumB = exports.hero_state_checksum(1729);
  const stateAtZero = exports.hero_precession(0, 1729);
  const stateAtThirty = exports.hero_precession(30, 1729);
  const stateAtThreeHundred = exports.hero_precession(300, 1729);
  const memoryPages = exports.memory.buffer.byteLength / 65536;

  if (signature !== HERO_SIGNATURE) {
    throw new Error(`Unexpected Fortran signature ${signature}.`);
  }
  if (checksumA !== checksumB) {
    throw new Error("Fixed-seed Fortran system state is not deterministic.");
  }
  if (stateAtZero === stateAtThirty || stateAtThirty === stateAtThreeHundred) {
    throw new Error("Fortran system state does not evolve across its time scales.");
  }
  if (memoryPages !== HERO_MEMORY_PAGES) {
    throw new Error(
      `Expected ${HERO_MEMORY_PAGES} Wasm memory pages, found ${memoryPages}.`,
    );
  }

  return {
    checksum: checksumA,
    exportedNames,
    longCycleSamples: [stateAtZero, stateAtThirty, stateAtThreeHundred],
    memoryPages,
    signature,
  };
}
