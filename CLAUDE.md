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
   `wrangler.toml` serves directly (no worker script). CORS and caching
   live in `public/_headers`.

   `deploy.yml` is trunk-based: every push to `master` deploys
   **staging** (`static-cf.polygon.technology`, a `custom_domain` on a
   fresh hostname, where wrangler can create the DNS record itself).
   **Production** is `workflow_dispatch`-only. The apex cannot be bound
   from CI while its externally-managed record exists — `custom_domain`
   fails with Cloudflare error 100117, our CI token lacks
   `Zone:DNS:Edit` to override, and zone routes fail likewise (SPEC has
   tried) — so the cutover is the four-step process documented in
   `wrangler.toml` `[env.production]`: dispatch to create the worker,
   land `custom_domain = true`, SPEC swaps the DNS record onto the
   worker in the CF dashboard (zero downtime), dispatch to verify
   wrangler owns the domain. The ordering makes a stray production
   dispatch harmless at every step. Once ownership is verified, a
   release-tag trigger can be re-added so prod auto-deploys on each
   `@polygonlabs/meta` release. See the apps-team-ops
   Cloudflare-migration runbook for the full rationale.

   The legacy nginx-on-ECS origin (`Dockerfile`, `nginx.conf`,
   `deployment.yml`, `build_and_deploy.yml`) and the staged GCP path
   (`deployment_gcp.yml`) are kept as rollback until the apex DNS is
   cut over to Cloudflare, then removed in a follow-up PR. The apex DNS
   cutover and the AWS/GCP teardown are manual infra steps.

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
