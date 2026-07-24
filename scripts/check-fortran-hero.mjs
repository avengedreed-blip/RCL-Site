import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inspectHeroArtifact, sha256 } from "./hero-wasm-utils.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.join(root, "simulation", "hero", "hero_flow.f90");
const artifactPath = path.join(root, "public", "wasm", "hero-flow.wasm");
const manifestPath = path.join(root, "public", "wasm", "hero-flow.manifest.json");

const [source, artifact, manifestText] = await Promise.all([
  readFile(sourcePath),
  readFile(artifactPath),
  readFile(manifestPath, "utf8"),
]);
const manifest = JSON.parse(manifestText);

if (sha256(source) !== manifest.source.sha256) {
  throw new Error(
    "Fortran source changed without regenerating the checked-in Wasm artifact.",
  );
}
if (sha256(artifact) !== manifest.artifact.sha256) {
  throw new Error("Fortran Wasm artifact hash does not match its manifest.");
}
if (artifact.byteLength !== manifest.artifact.bytes) {
  throw new Error("Fortran Wasm artifact byte count does not match its manifest.");
}

const inspection = await inspectHeroArtifact(artifact);
if (inspection.checksum !== manifest.verification.fixedChecksum) {
  throw new Error("Fortran fixed-seed checksum does not match its manifest.");
}
if (
  JSON.stringify(inspection.longCycleSamples) !==
  JSON.stringify(manifest.verification.longCycleSamples)
) {
  throw new Error("Fortran long-cycle samples do not match their manifest.");
}
if (new Set(inspection.longCycleSamples).size !== 3) {
  throw new Error("Fortran long-cycle state does not evolve across samples.");
}

console.log(
  `Fortran hero verified: signature ${inspection.signature}, ${inspection.memoryPages} pages, checksum ${inspection.checksum}.`,
);
