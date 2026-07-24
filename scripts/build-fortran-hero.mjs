import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  HERO_MEMORY_PAGES,
  inspectHeroArtifact,
  patchMemoryPages,
  sha256,
} from "./hero-wasm-utils.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.join(root, "simulation", "hero", "hero_flow.f90");
const artifactPath = path.join(root, "public", "wasm", "hero-flow.wasm");
const manifestPath = path.join(root, "public", "wasm", "hero-flow.manifest.json");
const compilerRoot = process.env.LFORTRAN_DIST;

if (!compilerRoot) {
  throw new Error(
    "LFORTRAN_DIST must point to an official LFortran browser release directory.",
  );
}

const compilerPath = path.join(compilerRoot, "lfortran.js");
const compilerSource = await readFile(compilerPath, "utf8");
const fortranSource = await readFile(sourcePath, "utf8");
const workDirectory = await mkdtemp(path.join(tmpdir(), "rcl-fortran-hero-"));
const rawArtifactPath = path.join(workDirectory, "hero-flow.raw.wasm");
const wrapperPath = path.join(workDirectory, "compile-hero-flow.cjs");

const moduleConfig = [
  "const nodeFs = require(\"node:fs\");",
  "var Module = {",
  '  arguments: ["--backend=wasm", "/hero_flow.f90", "-o", "/hero-flow.wasm"],',
  `  locateFile: (name) => ${JSON.stringify(`${compilerRoot}${path.sep}`)} + name,`,
  `  preRun: [() => FS.writeFile("/hero_flow.f90", ${JSON.stringify(fortranSource)})],`,
  `  postRun: [() => nodeFs.writeFileSync(${JSON.stringify(rawArtifactPath)}, Buffer.from(FS.readFile("/hero-flow.wasm")))],`,
  "};",
  "",
].join("\n");

await writeFile(wrapperPath, moduleConfig + compilerSource, "utf8");
await mkdir(path.dirname(artifactPath), { recursive: true });

try {
  await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [wrapperPath], {
      cwd: compilerRoot,
      stdio: "inherit",
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`LFortran compilation exited with code ${code}.`));
      }
    });
  });

  const rawArtifact = await readFile(rawArtifactPath);
  const artifact = patchMemoryPages(rawArtifact, HERO_MEMORY_PAGES);
  const inspection = await inspectHeroArtifact(artifact);
  const manifest = {
    schemaVersion: 1,
    compiler: {
      name: "LFortran",
      version: "0.64.0",
      releaseCommit: "abf1f5343",
      backend: "wasm",
    },
    source: {
      path: "simulation/hero/hero_flow.f90",
      sha256: sha256(fortranSource),
    },
    artifact: {
      path: "public/wasm/hero-flow.wasm",
      sha256: sha256(artifact),
      bytes: artifact.byteLength,
      memoryPages: inspection.memoryPages,
      exports: inspection.exportedNames,
    },
    verification: {
      signature: inspection.signature,
      fixedSeed: 1729,
      fixedSampleTime: 137,
      fixedChecksum: inspection.checksum,
      longCycleSamples: inspection.longCycleSamples,
    },
  };

  await writeFile(artifactPath, artifact);
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  console.log(
    `Built ${path.relative(root, artifactPath)} (${artifact.byteLength} bytes, ${inspection.memoryPages} memory pages).`,
  );
} finally {
  await rm(workDirectory, { recursive: true, force: true });
}
