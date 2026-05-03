# Contributing

This package has two public surfaces driven from the same source data:

1. The **npm package `@polygonlabs/meta`** — typed `as const` ABI
   modules under `./abi/*`, typed network metadata under `./info/*`,
   plus raw JSON under `./network/*`.
2. The **public HTTP endpoint** at `https://static.polygon.technology/...`
   — same JSON files served verbatim by an nginx Docker image.

The single source of truth for both is the JSON tree under `network/`.
Adding a new ABI or network means dropping JSON files into `network/`;
the typed TS modules are codegenned at build time.

## Adding a new ABI

1. Get the ABI as JSON from your build pipeline (foundry, hardhat,
   solc, Etherscan). The expected shape is `{ "abi": [...] }`.
2. Drop it at `network/<chain>/<network>/artifacts/<type>/<ContractName>.json`
   where `<chain>` is `mainnet` or `testnet`, `<network>` is the
   network identifier (`v1`, `cherry`, `amoy`, `cardona`), and
   `<type>` is the artifact bucket (`pos`, `plasma`, `fx-portal`,
   `genesis`, `zkevm`).
3. Run `pnpm run codegen`. The script:
   - Walks `network/` and re-emits `src/abi/<...>.ts` with
     `export const abi = [...] as const;`.
   - Includes a round-trip self-test that parses each emitted TS
     literal and `JSON.stringify`-compares it to the source JSON,
     failing the run on any drift.
4. Run `pnpm run build` (which re-runs codegen, then `tsc -p
   tsconfig.build.json`) to verify the emitted `.d.ts` carries the
   `as const` tuple type.
5. Add a changeset describing the addition (`pnpm exec changeset add`).

**Don't hand-edit `src/abi/` or `src/info/`.** Both are gitignored
and regenerated on every build. The only authored surface is the
JSON in `network/` plus the small hand-written code in `src/`
(`Network.ts`, `index.ts`).

## Adding a new network

1. Drop a `network/<chain>/<network>/index.json` with the network
   metadata (match the shape used by sibling networks).
2. Drop ABI JSON files under `network/<chain>/<network>/artifacts/<type>/...`
   per "Adding a new ABI" above.
3. Append an entry to `network/networks.json`:

   ```json
   { "network": "<chain>", "version": "<network>" }
   ```

4. Run `pnpm run codegen` and `pnpm run build`.
5. Add a changeset.

## Why `as const`

Each generated ABI module looks like:

```ts
export const abi = [...] as const;
```

The `as const` is load-bearing, not stylistic — without it,
TypeScript widens the array element type to a generic shape and
viem/wagmi/abitype consumers lose the ability to infer function
names, argument types, and return types at the call site. The
codegen script always emits the `as const` automatically; if you
ever need to extend the codegen, preserve it.

## Build

```sh
pnpm run codegen      # emit src/abi/**.ts and src/info/**.ts from network/
pnpm run build        # codegen + tsc → dist/
```

`prepack` runs `build`, so `pnpm pack` and `pnpm publish` always emit
a fresh dist.

## Release

This repo uses [Changesets](https://github.com/changesets/changesets)
for versioning. Open a PR with a `.changeset/<name>.md` file describing
the user-visible change. Merging the PR opens a "Version Packages" PR
that bumps the version and writes the changelog. Merging *that* PR
publishes to npm and tags the release. **Do not run
`pnpm exec changeset publish` manually**, and do not run `npm publish`
directly.

## HTTP endpoint deployment

The Docker image that serves `static.polygon.technology` is built and
deployed via the existing GitHub Actions workflows
(`.github/workflows/deployment.yml`, `deployment_gcp.yml`,
`build_and_deploy.yml`) on every push to `master`. Those workflows
copy the `network/` JSON tree into nginx and ship it. They are
out of scope for this contribution guide; nothing in `network/`
needs special treatment to be served.
