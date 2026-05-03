#!/usr/bin/env node
// Walks the JSON ABI tree under `network/` and emits TypeScript modules
// under `src/abi/` and `src/info/` whose bodies are `as const` literals.
// Run via `pnpm run codegen`; also called from `pnpm run build` and
// transitively by `pnpm run prepack`.
//
// JSON in `network/` is the source of truth. Both `src/abi/` and
// `src/info/` are gitignored — never hand-edit them.
//
// Each emitted ABI module looks like:
//
//   export const abi = [...] as const;
//
// The trailing `as const` is load-bearing, not stylistic: without it,
// TypeScript widens the array element type to a generic shape and
// viem/wagmi/abitype cannot extract function names, argument types, or
// return types at the call site.

import { mkdirSync, readFileSync, readdirSync, writeFileSync, statSync } from 'node:fs';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const networkRoot = resolve(repoRoot, 'network');
const srcAbiRoot = resolve(repoRoot, 'src', 'abi');
const srcInfoRoot = resolve(repoRoot, 'src', 'info');

// Confines a child path to live within `base`. Defends against a
// directory entry containing `..` or a symlink that resolves outside
// the expected root.
function confine(base, ...segments) {
  const candidate = resolve(base, ...segments);
  if (candidate !== base && !candidate.startsWith(base + sep)) {
    throw new Error(`Path escapes base: ${candidate} not under ${base}`);
  }
  return candidate;
}

const stats = { abi: 0, info: 0, networks: 0, mismatches: [] };

function writeTs(outPath, exportName, value) {
  mkdirSync(dirname(outPath), { recursive: true });
  const literal = JSON.stringify(value, null, 2);
  const content = `export const ${exportName} = ${literal} as const;\n`;
  writeFileSync(outPath, content);
}

function readTsLiteral(tsPath, exportName) {
  const raw = readFileSync(tsPath, 'utf8');
  const prefix = `export const ${exportName} = `;
  const suffix = ' as const;';
  if (!raw.startsWith(prefix)) throw new Error(`Unexpected prefix in ${tsPath}`);
  const end = raw.lastIndexOf(suffix);
  if (end < 0) throw new Error(`Missing suffix in ${tsPath}`);
  return JSON.parse(raw.slice(prefix.length, end));
}

function listDirs(p) {
  return readdirSync(p).filter((name) => statSync(join(p, name)).isDirectory());
}

function listFiles(p) {
  return readdirSync(p).filter((name) => statSync(join(p, name)).isFile());
}

// 1. ABI artifacts: network/<chain>/<network>/artifacts/<type>/<Contract>.json
for (const chain of listDirs(networkRoot)) {
  const chainPath = confine(networkRoot, chain);
  for (const network of listDirs(chainPath)) {
    const artifactsPath = confine(networkRoot, chain, network, 'artifacts');
    let types;
    try {
      types = listDirs(artifactsPath);
    } catch {
      continue;
    }
    for (const type of types) {
      const typePath = confine(networkRoot, chain, network, 'artifacts', type);
      for (const fileName of listFiles(typePath)) {
        if (!fileName.endsWith('.json')) continue;
        const basename = fileName.slice(0, -'.json'.length);
        const inPath = confine(networkRoot, chain, network, 'artifacts', type, fileName);
        const srcJson = JSON.parse(readFileSync(inPath, 'utf8'));
        if (!Array.isArray(srcJson.abi)) {
          throw new TypeError(`Expected { abi: [...] } in ${inPath}`);
        }
        const outPath = confine(srcAbiRoot, chain, network, type, `${basename}.ts`);
        writeTs(outPath, 'abi', srcJson.abi);

        const roundTripped = readTsLiteral(outPath, 'abi');
        if (JSON.stringify(roundTripped) !== JSON.stringify(srcJson.abi)) {
          stats.mismatches.push(outPath);
        }
        stats.abi += 1;
      }
    }
  }
}

// 2. Per-network metadata: network/<chain>/<network>/index.json
for (const chain of listDirs(networkRoot)) {
  const chainPath = confine(networkRoot, chain);
  for (const network of listDirs(chainPath)) {
    const indexPath = confine(networkRoot, chain, network, 'index.json');
    let info;
    try {
      info = JSON.parse(readFileSync(indexPath, 'utf8'));
    } catch {
      continue;
    }
    const outPath = confine(srcInfoRoot, chain, `${network}.ts`);
    writeTs(outPath, 'info', info);

    const roundTripped = readTsLiteral(outPath, 'info');
    if (JSON.stringify(roundTripped) !== JSON.stringify(info)) {
      stats.mismatches.push(outPath);
    }
    stats.info += 1;
  }
}

// 3. Top-level network registry: network/networks.json
{
  const networksPath = confine(networkRoot, 'networks.json');
  const networks = JSON.parse(readFileSync(networksPath, 'utf8'));
  const outPath = confine(srcInfoRoot, 'networks.ts');
  writeTs(outPath, 'networks', networks);

  const roundTripped = readTsLiteral(outPath, 'networks');
  if (JSON.stringify(roundTripped) !== JSON.stringify(networks)) {
    stats.mismatches.push(outPath);
  }
  stats.networks += 1;
}

console.log(`abi:      ${stats.abi}`);
console.log(`info:     ${stats.info}`);
console.log(`networks: ${stats.networks}`);
if (stats.mismatches.length > 0) {
  console.error(`\nMISMATCHES (${stats.mismatches.length}):`);
  for (const m of stats.mismatches) console.error(`  ${m}`);
  process.exit(1);
}
