#!/usr/bin/env node
// Reads the JSON ABI tree at the repo-root `network/` directory (which is also
// served verbatim by the static.polygon.technology nginx image) and emits two
// kinds of output into this package:
//
//   1. src/generated/abi/<chain>/<version>/<type>/<Contract>.ts
//      src/generated/info/<chain>/<version>.ts
//      src/generated/info/networks.ts
//      — `as const` TypeScript modules so viem/wagmi/abitype can infer
//      function names, argument types, and return types at the call site.
//
//   2. network/  — verbatim mirror of the repo-root JSON tree, so the
//      `@polygonlabs/meta/network/*` subpath export resolves to the same
//      JSON paths that consumers of @maticnetwork/meta@2.x already use.
//
// The repo-root `network/` is the single source of truth. `src/generated/`
// is committed (the `codegen-drift-check` PR gate fails on mismatch).
// `packages/meta/network/` is gitignored — it is a pure publish artifact,
// recreated by `prepack` before `pnpm publish`.
//
// Iteration is driven by `network/networks.json` (the canonical registry) so
// a missing `index.json` or a network without any `artifacts/` directory is
// a hard error, not a silent skip — letting these slide would publish a
// package whose codegen is partially out of date relative to its JSON.

import {
  cpSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync
} from 'node:fs';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = resolve(packageRoot, '..', '..');
const networkRoot = resolve(repoRoot, 'network');
const srcAbiRoot = resolve(packageRoot, 'src', 'generated', 'abi');
const srcInfoRoot = resolve(packageRoot, 'src', 'generated', 'info');
const networkMirrorRoot = resolve(packageRoot, 'network');

// Defence-in-depth against a directory entry containing `..` or a symlink
// that resolves outside the expected root. Cheap; keep it.
function confine(base: string, ...segments: string[]): string {
  const candidate = resolve(base, ...segments);
  if (candidate !== base && !candidate.startsWith(base + sep)) {
    throw new Error(`Path escapes base: ${candidate} not under ${base}`);
  }
  return candidate;
}

function writeTs(outPath: string, exportName: string, value: unknown): void {
  mkdirSync(dirname(outPath), { recursive: true });
  const literal = JSON.stringify(value, null, 2);
  const content = `export const ${exportName} = ${literal} as const;\n`;
  writeFileSync(outPath, content);
}

function readJson(filePath: string): unknown {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

function listDirs(p: string): string[] {
  return readdirSync(p)
    .filter((name) => !name.startsWith('.'))
    .filter((name) => statSync(join(p, name)).isDirectory());
}

function listJsonFiles(p: string): string[] {
  return readdirSync(p)
    .filter((name) => !name.startsWith('.') && name.endsWith('.json'))
    .filter((name) => statSync(join(p, name)).isFile());
}

interface NetworkEntry {
  network: string;
  version: string;
}

const stats = { abi: 0, info: 0, networks: 0 };

// 1. Canonical network registry — drives everything else.
const networksPath = confine(networkRoot, 'networks.json');
const networks = readJson(networksPath) as NetworkEntry[];
if (!Array.isArray(networks)) {
  throw new TypeError(`Expected array in ${networksPath}, got ${typeof networks}`);
}
writeTs(confine(srcInfoRoot, 'networks.ts'), 'networks', networks);
stats.networks += 1;

// 2. Per-network metadata + ABIs. Every registered network must have an
//    `index.json` and an `artifacts/` directory; otherwise the codegen is
//    out of sync with the registry and we refuse to publish.
for (const { network, version } of networks) {
  if (typeof network !== 'string' || typeof version !== 'string') {
    throw new TypeError(
      `Malformed entry in networks.json: ${JSON.stringify({ network, version })}`
    );
  }

  const networkDir = confine(networkRoot, network, version);

  // info: network/<chain>/<version>/index.json — required.
  const infoPath = confine(networkDir, 'index.json');
  const info = readJson(infoPath);
  writeTs(confine(srcInfoRoot, network, `${version}.ts`), 'info', info);
  stats.info += 1;

  // abi: network/<chain>/<version>/artifacts/<type>/*.json — required, at
  // least one type directory with at least one JSON file.
  const artifactsDir = confine(networkDir, 'artifacts');
  const types = listDirs(artifactsDir);
  if (types.length === 0) {
    throw new Error(`No artifact types under ${artifactsDir} for ${network}/${version}`);
  }
  for (const type of types) {
    const typeDir = confine(artifactsDir, type);
    const files = listJsonFiles(typeDir);
    if (files.length === 0) {
      throw new Error(`No JSON artifacts under ${typeDir}`);
    }
    for (const fileName of files) {
      const basename = fileName.slice(0, -'.json'.length);
      const srcJson = readJson(confine(typeDir, fileName)) as { abi?: unknown };
      if (!Array.isArray(srcJson.abi)) {
        throw new TypeError(`Expected { abi: [...] } in ${confine(typeDir, fileName)}`);
      }
      writeTs(confine(srcAbiRoot, network, version, type, `${basename}.ts`), 'abi', srcJson.abi);
      stats.abi += 1;
    }
  }
}

// 3. Mirror the repo-root `network/` tree into the package so that the
//    `./network/*` subpath export resolves to the same paths consumers of
//    @maticnetwork/meta@2.x used (`@polygonlabs/meta/network/<chain>/<version>/...`).
//    Rebuilt from scratch each run so deletions in the source tree don't
//    leave stale files in the mirror.
rmSync(networkMirrorRoot, { recursive: true, force: true });
cpSync(networkRoot, networkMirrorRoot, { recursive: true });

console.log(`abi:      ${stats.abi}`);
console.log(`info:     ${stats.info}`);
console.log(`networks: ${stats.networks}`);
