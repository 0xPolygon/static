# @polygonlabs/meta

## 1.1.1

### Patch Changes

- 02b6d2b: Lower the published `engines.node` floor from `>=24` to `>=20` to match the package's actual runtime requirements.

  `@polygonlabs/meta` ships only `as const` data modules — typed ABIs and network metadata — with zero runtime code; every module under `dist/generated/**` is a plain `export const ... = [...] as const` literal. It has no Node 24 runtime dependency. The previous `>=24` floor described the build toolchain (codegen runs `node scripts/codegen.ts` via Node's native TypeScript execution), not what consumers need to run the package, and surfaced a spurious engine-mismatch warning for anyone targeting Node 20.

  The build-time Node 24 requirement is now declared explicitly in `devEngines.runtime` and documented in CONTRIBUTING, leaving `engines.node` to describe the consumer runtime. Downstream SDKs that target Node 20 — such as `@polygonlabs/pos-sdk` — can now depend on `@polygonlabs/meta` without inheriting an inaccurate Node 24 floor.

## 1.1.0

### Minor Changes

- b110fd0: Add `MultiRootDistributor` ABI and addresses for Sepolia testnet.

  The Polygon Apps Team's priority-fee distribution contract is now indexed under a new
  `Main.PriorityFeeDistributionContracts` sub-group on `testnet/amoy/index.json` (the section
  labelled `Main` carries Sepolia entries):
  - `MultiRootDistributorProxy` — `0x1Ff397F3BCDA58952Ac2326A1Fb799f9FBE6ecd7` (transparent
    upgradeable proxy, deployed at Sepolia block `10833197`).
  - `MultiRootDistributor` — `0x42666db9f9dBdE270Bc752E776EaD2967E606679` (implementation).

  Consumers can now import the typed ABI via
  `@polygonlabs/meta/abi/testnet/amoy/plasma/MultiRootDistributor` or reference the raw JSON
  through the `./network/*` subpath. The contract emits
  `Claimed(bytes32 indexed root, uint256 indexed index, address indexed account, uint256 amount)`
  plus four root-lifecycle events (`RootAdded`, `RootRemoved`, `RootStateChanged`,
  `RootToppedUp`); the downstream `pos-staker-pool-claims` subgraph in `0xPolygon/subgraphs`
  indexes the proxy address using this ABI.

  Ethereum mainnet additions will follow in a subsequent release once the contract deploys to
  mainnet.

## 1.0.0

### Major Changes

- 0c1d7e5: Initial release of `@polygonlabs/meta`, replacing the legacy `@maticnetwork/meta@2.x` package.

  ## What's new
  - **Per-contract typed deep imports.** `import { abi } from '@polygonlabs/meta/abi/<chain>/<network>/<type>/<Contract>'` pulls exactly one ABI; the rest of the package is tree-shaken at bundle time.
  - **`as const` literal ABI types.** Each ABI is exported as a literal tuple so `viem`, `wagmi`, and `abitype` can extract function names, argument types, and return types at the call site. Without `as const` the type widens to `{ name: string }[]` and consumer-side type inference disappears entirely — the typed-ABI value proposition exists only because of `as const`.
  - **Typed network metadata** under `/info/<chain>/<network>` and `/info/networks`, also `as const`.
  - **Raw JSON access preserved.** The `./network/*` subpath export keeps the same path scheme as `@maticnetwork/meta@2.x`, so consumers who only want JSON migrate by changing the package name.
  - **Provenance-stamped publishes** via npm OIDC trusted publishing, driven by changesets-on-merge.

  ## Breaking changes vs `@maticnetwork/meta@2.x`
  - **Package renamed**: `@maticnetwork/meta` → `@polygonlabs/meta`.
  - **ESM-only.** `require()` is no longer supported. Consumers must be ESM and on Node ≥ 24.
  - **The `Network` class is gone.** Replace `new Network(chain, version).abi(name)` with the typed deep imports under `./abi/<chain>/<network>/<type>/<Contract>` — same data, fully typed, sync, tree-shakable.
  - **Mumbai testnet** is gone (already removed upstream); use Amoy.

  The HTTP endpoint at `static.polygon.technology` is unchanged. See `MIGRATION.md` for full before/after import examples.
