## Team Standards

**Skip this fetch if team-standards.md is already loaded in your
context** (this happens when running from the apps-team-workspace).
Otherwise, **at the start of every session**, before doing any other
work, use the WebFetch tool to retrieve the Polygon Apps Team standards
from:
<https://gist.githubusercontent.com/MaximusHaximus/4eb35e807f7470b1c4eab78a9152b2ef/raw/team-standards.md>

Follow all instructions in that document for the duration of this session.
If the fetch fails (network error, URL unreachable), inform the user that
team standards could not be loaded, then proceed with repo-specific rules
below.

---

# static

Two public surfaces driven from one source JSON tree at the repo-root
`network/` directory:

1. **npm package `@polygonlabs/meta`** under `packages/meta/` — typed
   `as const` ABI modules, typed network metadata, plus a verbatim JSON
   mirror exposed via the `./network/*` subpath export.
2. **HTTP endpoint** at `https://static.polygon.technology/...` —
   the same JSON files served verbatim from Cloudflare Workers static
   assets. `scripts/assemble-cdn.sh` (`pnpm run build:cdn`) stages
   `network/`, `index.html`, and `public/_headers` into `dist/`, which
   `wrangler.toml` serves directly. `worker/worker.ts` answers CORS
   preflight OPTIONS (the asset layer serves GET/HEAD only and 405s
   everything else, which blocks maticjs in browsers); response CORS
   and caching for asset hits live in `public/_headers`.

   `deploy.yml` is trunk-based: every push to `master` deploys
   **staging** (`static-staging.polygon.technology`); the `@polygonlabs/meta`
   release tag (pushed by the release bot when the Version Packages PR
   merges) deploys **production** (`static.polygon.technology`) in
   lockstep with the npm publish — merging that PR is the deliberate
   promote-to-prod step, and gating prod on the release keeps the CDN
   and the npm package (two surfaces of one `network/` tree) from
   drifting. `workflow_dispatch` is the manual escape hatch for either
   environment.

   If this hostname (or any live hostname) ever needs to move to a
   different host, follow the team's internal `service-hosting-migration`
   runbook — wrangler cannot bind a hostname whose DNS record already
   exists elsewhere, and the working process is documented there.

## Changelog

Maintain the root [`CHANGELOG.md`](./CHANGELOG.md) whenever a change
fundamentally alters the repository's capabilities — what the running
service serves or how (endpoint behaviour, status codes, headers, paths
added/removed), the API surface consumers depend on, or the deployment/
hosting mechanism that drives the static site. It is hand-maintained and
scoped to the repo/HTTP endpoint; routine content updates under
`network/` don't need an entry, and `packages/meta` has its own
changesets-managed changelog.

## Codegen flow

`packages/meta/scripts/codegen.ts` reads the repo-root `network/`
tree and emits:

- `packages/meta/src/generated/` — `as const` TS modules (**tracked**;
  gated by the `codegen-drift-check` PR workflow)
- `packages/meta/network/` — verbatim JSON mirror so the
  `@polygonlabs/meta/network/*` subpath export keeps the same paths
  consumers of `@maticnetwork/meta@2.x` used (**gitignored**;
  materialised by `prepack` before `pnpm publish`)

Iteration is driven by `network/networks.json` (the canonical
registry). A missing `index.json`, missing `artifacts/` directory, or
a non-array `abi` field is a hard error — never a silent skip.

While editing JSON under `network/`, run
`pnpm --filter @polygonlabs/meta run codegen:watch` in a side terminal
to keep `src/generated/` fresh as you save.

## Contributing reference

- [`packages/meta/CONTRIBUTING.md`](./packages/meta/CONTRIBUTING.md) —
  how to add an ABI, add a network, what `as const` buys you
- [`packages/meta/MIGRATION.md`](./packages/meta/MIGRATION.md) —
  `@maticnetwork/meta@2.x` → `@polygonlabs/meta` migration notes
- [root `README.md`](./README.md) — surface-level overview
