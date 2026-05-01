# Plan: Refactor `static` to publish typed ABIs as `@polygonlabs/meta@1.0.0`

Branch: `feat/refactoring-with-polygonlabs-renaming` off `origin/master`.
Repo: `repositories/static` (public, default branch `master`).

## Context

`repositories/static` currently serves contract ABIs through two transports from one set of source files:

1. **npm package** `@maticnetwork/meta` — a dynamic-loader CommonJS class (`network/index.js`) that `require()`s JSON files at runtime by name/version/type.
2. **Public HTTP endpoint** `https://static.polygon.technology/network/...` — same JSON files, served by nginx in a Docker image deployed to GCP and AWS ECS via `Dockerfile`, `nginx.conf`, three deployment workflow files, and ECS taskdefs in `.github/taskdef/`.

The npm package is in the wrong scope (`@maticnetwork`, not the team-canonical `@polygonlabs`), exposes ABIs only via dynamic name-based lookup (no tree-shaking, no `as const` literal types for viem/wagmi inference), and publishes via a stale `npm-release.yml` (Node 12, unpinned actions, raw `npm publish` on GitHub Release creation).

This refactor:

- Renames the npm package to `@polygonlabs/meta@1.0.0` and ships **typed ABIs** (`as const`) plus typed network metadata under `./abi/*` and `./info/*` subpath exports.
- **Preserves the HTTP endpoint at `static.polygon.technology`.** The JSON tree under `network/` stays as the source of truth; nginx + the deployment infrastructure are untouched.
- Keeps the **raw JSON files reachable from the npm package** via a `./network/*` subpath export, so consumers who only want JSON (no types) keep working.
- Generates the TS modules at build time from the JSON via `scripts/codegen.mjs`. The generated `src/abi/**/*.ts` and `src/info/**/*.ts` are **gitignored** — JSON remains the only authored format.
- Migrates npm→pnpm.
- Adopts the team's tag-driven changesets release flow via `0xPolygon/pipelines` shared workflows.

Net consumer experience after the refactor:

```ts
// Tree-shakable, viem/wagmi-compatible typed ABI
import { abi } from '@polygonlabs/meta/abi/mainnet/v1/pos/AccessControl'

// Typed network metadata
import { info } from '@polygonlabs/meta/info/mainnet/v1'
import { networks } from '@polygonlabs/meta/info/networks'

// Raw JSON (no types) — same paths as @maticnetwork/meta@2.x
import abiJson from '@polygonlabs/meta/network/mainnet/v1/artifacts/pos/AccessControl.json' with { type: 'json' }

// Dynamic name-based lookup (legacy ergonomic surface, ESM-only, async methods)
import { Network } from '@polygonlabs/meta'
const net = await Network.create('mainnet', 'v1')
const abi = await net.abi('AccessControl', 'pos')
```

## Architecture decisions

- **JSON is the source of truth.** `network/<chain>/<network>/artifacts/<type>/*.json` (already present) is what humans edit. Adding a new contract = drop the solc/foundry/hardhat output JSON and re-run codegen.
- **Codegen at build time, never at install time.** `scripts/codegen.mjs` walks `network/`, emits `src/abi/<chain>/<network>/<type>/<Contract>.ts` (`export const abi = [...] as const;`), `src/info/<chain>/<network>.ts`, and `src/info/networks.ts`. Wired as `pnpm run build` = `codegen → tsc -p tsconfig.build.json`. `prepack` runs `build`, so `pnpm pack` and `pnpm publish` always emit a fresh dist.
- **`src/abi/`, `src/info/`, and `dist/` are gitignored.** Generated artifacts never enter git; the repo stays small and merge-conflict-free.
- **`Network` class preserved** for dynamic name-based lookup. ESM TS rewrite of `network/index.js`. Uses `await import('./abi/<...>.js')`, methods become async. Documented as a breaking change in `MIGRATION.md`.
- **Plain `tsc`**, no bundler. 1:1 file compilation; subpath exports map directly.
- **Use `0xPolygon/pipelines` shared workflows directly** via thin trigger files (`pipelines` is public; verbatim local copies are not required for this public repo).
- **Keep `master` branch.** Master→main rename is a separate PR.

## Files to create / modify / delete

### Plan storage and session continuity

This plan currently lives at `~/.claude/plans/before-executing-can-you-polished-pond.md` (plan-mode mandates that path). Commit 1 copies it into the repo at `plans/refactoring-with-polygonlabs-renaming.md` so subsequent sessions can read and update progress directly.

`.gitignore` ignores `plans/*` but un-ignores this specific plan file:

```
plans/*
!plans/refactoring-with-polygonlabs-renaming.md
```

That keeps this plan committed (portable across sessions, reviewers can read it) while ignoring any other ad-hoc plan files developers drop in `plans/`.

**To resume in a new session**: read `plans/refactoring-with-polygonlabs-renaming.md`, find the first unchecked box in the Checklist section below, and continue.

### Created (committed)

- `.changeset/config.json` — copy from `repositories/apps-team-ts-template/.changeset/config.json`; change `baseBranch` from `main` → `master`.
- `.changeset/initial-rename.md` — major bump for `@polygonlabs/meta`. Plain-prose first line, then headings/bullets describing the rename + new typed exports.
- `.github/workflows/npm-release-trigger.yml` — copy from template; `branches: [master]`. Calls `0xPolygon/pipelines/.github/workflows/apps-npm-release.yml@main`. Explicit `permissions:`, no `secrets: inherit`.
- `.github/workflows/changeset-check-trigger.yml` — same pattern. Calls `0xPolygon/pipelines/.github/workflows/apps-changeset-check.yml@main`.
- `.gitignore` — `.DS_Store`, `node_modules/`, `dist/`, `src/abi/`, `src/info/`, `pnpm-debug.log`, `plans/*`, `!plans/refactoring-with-polygonlabs-renaming.md`.
- `.npmrc` — `link-workspace-packages=false`.
- `.nvmrc` — `24` (verbatim from template).
- `pnpm-workspace.yaml` — supply-chain block from template (no `packages:` array; single-package repo).
- `tsconfig.json` — extends `@tsconfig/node24` + `@tsconfig/node-ts`. `outDir: dist`, `rootDir: src`, `declaration: true`, `module: nodenext`, `moduleResolution: nodenext`, `target: es2022`, `strict: true`, `noUncheckedSideEffectImports: true`, `noEmit: true`. `include: ["src/**/*"]`.
- `tsconfig.build.json` — extends `tsconfig.json`, flips `noEmit: false`.
- `src/Network.ts` — ESM TS port of `network/index.js`. Methods become async via `await import()`.
- `src/index.ts` — re-exports `Network` from `./Network.ts`.
- `scripts/codegen.mjs` — committed (not deleted after run). Runs in `prepack` and on demand. Walks `network/`, emits `src/abi/**/*.ts` and `src/info/**/*.ts` with `as const`. Includes inline round-trip self-test that fails the build on drift.
- `MIGRATION.md` — rename rationale, before/after import examples, ESM-only / Node 24 requirements, async-method note for `Network`, `as const` rationale. **No HTTP-endpoint sunset notice** — the endpoint stays.
- `CONTRIBUTING.md` — codegen flow: edit JSON in `network/`, run `pnpm run codegen` to refresh `src/abi/`, never hand-edit `src/abi/`. How to add a new contract / network.

### Modified

- `package.json` — full rewrite: name → `@polygonlabs/meta`, version → `1.0.0`, `type: module`, `repository.url` / `bugs.url` / `homepage` → `0xPolygon/static`, `publishConfig.access: public` + `provenance: true`, `files: ["dist", "network", "MIGRATION.md", "README.md", "CHANGELOG.md"]`, `exports` map (root + `./abi/*` + `./info/*` + `./network/*`), scripts (`codegen`, `build`, `prepack`, `ci:publish`). Drops `main`, `prepublish`, `minify`. Adds devDependencies for changesets, typescript, @tsconfig/*, @types/node.
- `README.md` — keep the HTTP-endpoint mention, replace the npm usage block with `@polygonlabs/meta` typed-import examples.

### Deleted

- `package-lock.json` — replaced by `pnpm-lock.yaml`.
- `network/index.js` — replaced by `src/Network.ts`.
- `minify.js` — replaced by `scripts/codegen.mjs`.
- `.github/workflows/npm-release.yml` — superseded by the changesets trigger pattern.

### Untouched (deferred per "rest later")

- `Dockerfile`, `nginx.conf`, `index.html` — HTTP-endpoint serving infrastructure, stays.
- `.github/workflows/{deployment,deployment_gcp,build_and_deploy}.yml` and `.github/taskdef/*` — deployment pipeline, stays. The audit's hygiene findings (`secrets: inherit`, missing `permissions:`, unpinned action SHAs) get a separate PR.
- `network/` JSON content — source of truth, no edits.

## Existing patterns being reused

- `repositories/apps-team-ts-template/.changeset/config.json` — verbatim except `baseBranch`.
- `repositories/apps-team-ts-template/.github/workflows/{npm-release,changeset-check}-trigger.yml` — verbatim except `branches`.
- `repositories/apps-team-ts-template/pnpm-workspace.yaml` — supply-chain block verbatim.
- `repositories/apps-team-ts-template/.nvmrc` — verbatim.
- `0xPolygon/pipelines/.github/workflows/apps-npm-release.yml` — handles OIDC `--provenance` publish, signed commits, GitHub-API tag creation.
- `0xPolygon/pipelines/.github/workflows/apps-changeset-check.yml` — PR nag if changeset missing.
- `network/index.js` semantics — preserved 1:1 in `src/Network.ts` modulo async methods.

## Preconditions (user must verify)

- [ ] `CHANGESET_RELEASE_BOT_APP_ID` and `CHANGESET_RELEASE_BOT_APP_PRIVATE_KEY` org secrets accessible to `0xPolygon/static`.
- [ ] npm trusted-publisher configured for `@polygonlabs/meta` ↔ `0xPolygon/static`'s `apps-npm-release.yml@master` (one-time UI step on npmjs.com when ready to publish).

## Checklist (track progress across sessions)

Update boxes inline (`- [ ]` → `- [x]`) as work completes. Each commit is independently buildable.

### Commit 1 — Plan scaffolding
- [ ] Create branch `feat/refactoring-with-polygonlabs-renaming` from fresh `origin/master`.
- [ ] Create `plans/` directory and copy this plan file in.
- [ ] Write `.gitignore` with the new content (including `plans/*` + negation, plus codegen-output ignores).
- [ ] User-approved commit: `chore: add implementation plan and gitignore ad-hoc plans`.

### Commit 2 — pnpm migration
- [ ] Delete `package-lock.json`.
- [ ] Create `.nvmrc` = `24`.
- [ ] Create `pnpm-workspace.yaml` with the supply-chain block.
- [ ] Create `.npmrc` with `link-workspace-packages=false`.
- [ ] Add `packageManager: pnpm@10.30.3` and `engines.node: ">=24"` to `package.json`.
- [ ] Run `pnpm install`; commit `pnpm-lock.yaml`.
- [ ] User-approved commit: `chore: migrate from npm to pnpm`.

### Commit 3 — TypeScript toolchain
- [ ] `pnpm add -D typescript @tsconfig/node-ts @tsconfig/node24 @types/node`.
- [ ] Create `tsconfig.json` and `tsconfig.build.json`.
- [ ] User-approved commit: `feat: add TypeScript toolchain`.

### Commit 4 — Codegen, Network class, ESM source
- [ ] Add `"type": "module"` to `package.json`.
- [ ] Create `scripts/codegen.mjs` walking `network/` and emitting `src/abi/**.ts` + `src/info/**.ts` with `as const`. Include inline round-trip self-test.
- [ ] Create `src/Network.ts` (ESM TS port, async methods via `await import()`, static `Network.create()` factory).
- [ ] Create `src/index.ts` re-exporting `Network`.
- [ ] Add `codegen` and `build` scripts to `package.json` (`build` = `codegen && tsc -p tsconfig.build.json`).
- [ ] Delete `network/index.js` and `minify.js`.
- [ ] Run `pnpm run build`; verify `dist/abi/<...>.{js,d.ts}` emits the `as const` tuple type and runtime smoke (static + dynamic import paths return matching ABIs) passes.
- [ ] User-approved commit: `feat: add JSON→TS codegen and ESM Network class`.

### Commit 5 — Package rename + subpath exports + docs
- [ ] Rewrite `package.json`: name, version, repository URLs, exports (incl. `./network/*`), files (incl. `network`), publishConfig with provenance.
- [ ] Replace scripts: `codegen`, `build`, `prepack`, `ci:publish`. Remove `prepublish`, `minify`.
- [ ] Create `MIGRATION.md` (rename rationale, before/after, async Network, `as const` rationale — no HTTP-endpoint sunset).
- [ ] Create `CONTRIBUTING.md` (codegen flow, never hand-edit `src/abi/`).
- [ ] Rewrite `README.md`: typed-import examples, dynamic Network section, raw JSON path note, mention HTTP endpoint at `static.polygon.technology`.
- [ ] `pnpm pack --dry-run` confirms only `dist/`, `network/`, `MIGRATION.md`, `README.md`, `CHANGELOG.md`, `package.json` are listed.
- [ ] Runtime smoke confirms static, dynamic, and raw-JSON imports all work and match.
- [ ] User-approved commit: `feat!: rename package to @polygonlabs/meta with subpath exports`.

### Commit 6 — Changesets + tag-driven release
- [ ] `pnpm add -D @changesets/cli@^2.30.0`.
- [ ] Create `.changeset/config.json` (`baseBranch: master`).
- [ ] Create `.changeset/initial-rename.md` (major bump).
- [ ] Create `.github/workflows/{npm-release,changeset-check}-trigger.yml` (`branches: [master]`).
- [ ] Delete `.github/workflows/npm-release.yml`.
- [ ] Verify `pnpm exec changeset status` reports the pending major bump.
- [ ] User-approved commit: `feat: adopt changesets and tag-driven npm release`.

### Pre-PR
- [ ] All six commits land on the branch.
- [ ] From a clean checkout: `pnpm install && pnpm run build` succeeds.
- [ ] User explicitly authorises `git push --force-with-lease` and PR description update.
- [ ] PR #182 description updated to reflect codegen architecture and HTTP-endpoint preservation.

### Post-merge (user actions)
- [ ] Configure npm trusted publisher for `@polygonlabs/meta` ↔ `0xPolygon/static` `apps-npm-release.yml@master`.
- [ ] Confirm `CHANGESET_RELEASE_BOT_APP_*` org secrets accessible.
- [ ] CI green → mark PR ready (`gh pr ready 182`).
- [ ] PR merged → `apps-npm-release.yml` opens "Version Packages" PR.
- [ ] Version Packages PR merged → automatic publish + tag `@polygonlabs/meta@1.0.0`.
- [ ] Verify `npm view @polygonlabs/meta` returns 1.0.0 with provenance.

## Risks and mitigations

- **Codegen drift**: if `scripts/codegen.mjs` has a bug, emitted TS could silently differ from source JSON. Mitigated via the inline round-trip self-test (re-parse the emitted TS literal, `JSON.stringify`-compare to source) that fails the build on mismatch.
- **`as const` literal type explosion**: ~470 ABI files × multi-line literals. TS compilation may slow IDEs. Mitigation: pretty-printed JSON for readability; if compile time becomes a problem we can flip the abi files' tsconfig to `skipLibCheck` for emitted bodies (consumer-facing `.d.ts` still ships full `as const`).
- **`Network` class methods become async**: breaking change for legacy consumers. Documented in `MIGRATION.md`. New consumers prefer the static typed deep imports anyway.
- **Bot token availability**: covered in Preconditions.
- **Codegen runs in CI on every publish**: small cost, single-digit seconds for ~470 files. Acceptable.

## Out of scope (separate PRs, deferred per user)

- Master→main rename.
- `.github/CODEOWNERS` with `@0xPolygon/product-applications`.
- Branch protection (`require_code_owner_reviews`, `enforce_admins:false`).
- Auto-delete branch on merge.
- Claude Code integration (`.claude/settings.json`, root `CLAUDE.md`).
- ESLint / Prettier / Husky / lint-staged / commitlint per template.
- Dockerfile / nginx hardening (non-root user, etc.).
- Workflow hygiene: drop `secrets: inherit` and add explicit `permissions:` blocks in the deployment workflows; pin action SHAs.
- Adding `0xPolygon/static` to `polygon-infrastructure/google-cloud/landing-zone/service_accounts.tf`'s `shared-prod-oidc-sa.github_repos` list — only relevant for the GCP pipeline that already works.

## History note

An earlier iteration of this plan proposed deleting the HTTP-endpoint deployment infrastructure and committing the TS files directly (no codegen). That decision was reversed because the `static.polygon.technology` HTTPS endpoint is in active use and removing it carries unknown blast radius. The current plan keeps both transports and codegens TS from the JSON source, which is the format new ABIs naturally arrive in from solc/foundry/hardhat.
