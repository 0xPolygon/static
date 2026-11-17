# @polygonlabs/meta

## 1.2.1

### Patch Changes

- [#204](https://github.com/0xPolygon/static/pull/204) [`e618dfa`](https://github.com/0xPolygon/static/commit/e618dfa25cc9580bed538b46e63a9334b21df5d6) Thanks [@ethyla](https://github.com/ethyla)! - Point the Amoy `StakeManager` at the PIP-91 Part 2 implementation `0x1D9eE26F794676acF56baC9A479F766403D0f5cC` and refresh its ABI to match mainnet: `setCurrentEpoch`, `decreaseValidatorDelegatedAmount`, `extensionCode` and `migrateValidatorsData` are gone, `reinitializeValidatorState` is added. Also list the POL burn tunnel `NewBurnTunnel` (`0xDEAD4CD252BB87237325B18D71fF4D872CAabcBc`) under `Main.Contracts` (Sepolia) and `Matic.Contracts` (Amoy) in `testnet/amoy/index.json`; it is the burn destination of the Amoy `EIP1559Burn` collector.

- [#200](https://github.com/0xPolygon/static/pull/200) [`b0c46fb`](https://github.com/0xPolygon/static/commit/b0c46fbd1827a4ed6bfa04b77d085a5e4b2275bf) Thanks [@Agusx1211](https://github.com/Agusx1211)! - Add the POL burn tunnel to the mainnet registry.

  `NewBurnTunnel` (`0xDEAD4CD252BB87237325B18D71fF4D872CAabcBc`) is now listed under `Main.Contracts` (Ethereum) and `Matic.Contracts` (Polygon PoS) in `mainnet/v1/index.json`. It is the same contract at the same address on both chains: on Polygon it receives the POL burned by the EIP-1559 collector (`Matic.Contracts.EIP1559Burn`), and on Ethereum it settles the exit and sweeps POL to `0x000000000000000000000000000000000000dEaD`.

- [#198](https://github.com/0xPolygon/static/pull/198) [`29fad55`](https://github.com/0xPolygon/static/commit/29fad55576a01db7ed18c743834e65e385c9d33f) Thanks [@Agusx1211](https://github.com/Agusx1211)! - Point the mainnet `StakeManager` at the PIP-91 Part 2 implementation `0x1D9eE26F794676acF56baC9A479F766403D0f5cC` and refresh its ABI: `setCurrentEpoch`, `decreaseValidatorDelegatedAmount`, `extensionCode` and `migrateValidatorsData` are gone, `reinitializeValidatorState` is added.

## 1.2.0

### Minor Changes

- [#197](https://github.com/0xPolygon/static/pull/197) [`d3fd9c3`](https://github.com/0xPolygon/static/commit/d3fd9c37c4cbe0231abc52fbe32fa501f5dd5b4d) Thanks [@ethyla](https://github.com/ethyla)! - Add the EventsHub implementation address on mainnet and Amoy, and the NewBurn1559 implementation (behind the Polygon/Amoy `EIP1559Burn` proxy) with its ABI.

### Patch Changes

- [#197](https://github.com/0xPolygon/static/pull/197) [`9ab182f`](https://github.com/0xPolygon/static/commit/9ab182f95854ca77040b09e2da510b092eabc665) Thanks [@ethyla](https://github.com/ethyla)! - Refresh ABIs to match the live implementations: StakeManager, DefaultEmissionManager and StateReceiver on mainnet; StakeManager, StateReceiver, DepositManager, PolygonMigration, RootChainManager, ChildChainManager and the six upgraded PoS predicates on Amoy.

- [#197](https://github.com/0xPolygon/static/pull/197) [`e1a1fb4`](https://github.com/0xPolygon/static/commit/e1a1fb47da7a801166f3d7632a7d32cced3c8d08) Thanks [@ethyla](https://github.com/ethyla)! - Point upgraded implementations at their live addresses: StakeManager and DefaultEmissionManager on mainnet; StakeManager, ValidatorShare and the six upgraded PoS bridge predicates on Amoy.

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
