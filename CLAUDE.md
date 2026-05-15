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
   the same JSON files served verbatim by an nginx Docker image built
   from the root `Dockerfile`. Deployed to AWS ECS via the legacy
   `deployment.yml` / `build_and_deploy.yml` workflows and to GCP via
   `deployment_gcp.yml`. These predate the team's canonical
   `docker-release` pattern and are load-bearing for prod; do not
   migrate them without coordinating with the team.

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
