---
"@polygonlabs/meta": patch
---

Lower the published `engines.node` floor from `>=24` to `>=20` to match the package's actual runtime requirements.

`@polygonlabs/meta` ships only `as const` data modules — typed ABIs and network metadata — with zero runtime code; every module under `dist/generated/**` is a plain `export const ... = [...] as const` literal. It has no Node 24 runtime dependency. The previous `>=24` floor described the build toolchain (codegen runs `node scripts/codegen.ts` via Node's native TypeScript execution), not what consumers need to run the package, and surfaced a spurious engine-mismatch warning for anyone targeting Node 20.

The build-time Node 24 requirement is now declared explicitly in `devEngines.runtime` and documented in CONTRIBUTING, leaving `engines.node` to describe the consumer runtime. Downstream SDKs that target Node 20 — such as `@polygonlabs/pos-sdk` — can now depend on `@polygonlabs/meta` without inheriting an inaccurate Node 24 floor.
