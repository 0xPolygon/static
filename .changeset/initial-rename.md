---
"@polygonlabs/meta": major
---

Initial release of `@polygonlabs/meta`, replacing the legacy `@maticnetwork/meta@2.x` package.

## What's new

- **Per-contract typed deep imports.** `import { abi } from '@polygonlabs/meta/abi/<chain>/<network>/<type>/<Contract>'` pulls exactly one ABI; the rest of the package is tree-shaken at bundle time.
- **`as const` literal ABI types.** Each ABI is exported as a literal tuple so `viem`, `wagmi`, and `abitype` can extract function names, argument types, and return types at the call site. Without `as const` the type widens to `{ name: string }[]` and consumer-side type inference disappears entirely — the typed-ABI value proposition exists only because of `as const`.
- **Typed network metadata** under `/info/<chain>/<network>` and `/info/networks`, also `as const`.
- **Raw JSON access preserved.** The `./network/*` subpath export keeps the same path scheme as `@maticnetwork/meta@2.x`, so consumers who only want JSON migrate by changing the package name.
- **Provenance-stamped publishes** via npm OIDC trusted publishing, driven by changesets-on-merge.

## Breaking changes vs `@maticnetwork/meta@2.x`

- **Package renamed**: `@maticnetwork/meta` → `@polygonlabs/meta`.
- **ESM-only.** `require()` is no longer supported. Consumers must be ESM and on Node ≥ 24.
- **`Network` class methods are async.** Construction now goes through `await Network.create(name, version)`, and `artifacts()` / `abi()` return Promises because contract artifacts are loaded via dynamic `import()`.
- **Mumbai testnet** is gone (already removed upstream); use Amoy.

The HTTP endpoint at `static.polygon.technology` is unchanged. See `MIGRATION.md` for full before/after import examples.
