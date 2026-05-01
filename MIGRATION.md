# Migration: `@maticnetwork/meta` → `@polygonlabs/meta`

`@polygonlabs/meta@1.0.0` replaces `@maticnetwork/meta@2.4.82`. The
underlying ABI and address data is unchanged. The npm-package surface
is significantly different; the public HTTP endpoint at
`https://static.polygon.technology/...` continues to serve the same
JSON files unchanged.

## What you get

Three things, none of which existed before:

1. **Tree-shakable, deep imports per contract.** `import { abi } from
   '@polygonlabs/meta/abi/mainnet/v1/pos/AccessControl'` pulls exactly
   one ABI; the rest of the package isn't bundled.
2. **`as const` literal types**, so `viem`, `wagmi`, and `abitype`
   infer function names, argument types, and return types at the call
   site. See "Why `as const`" below — it's the single biggest reason
   to migrate.
3. **Typed network metadata** under `/info/*` (chain IDs, RPC URLs,
   contract address maps), also `as const`.

## What's unchanged

- **The `static.polygon.technology` HTTP endpoint** keeps serving the
  same JSON files. If you `fetch()` URLs like
  `https://static.polygon.technology/network/mainnet/v1/artifacts/pos/AccessControl.json`,
  nothing changes for you.
- **The raw JSON path is also reachable from the npm package** via
  `import abi from '@polygonlabs/meta/network/<...>.json' with { type: 'json' }`.
  Same file paths as `@maticnetwork/meta@2.x` had — only the package
  name changes.

## What's gone

- **CommonJS `require()` is no longer supported.** The package is
  ESM-only.
- **Node < 24 is no longer supported.**
- **The Mumbai testnet** was already dropped from the source tree.
  Use Amoy.

## Required environment

- Node ≥ 24
- ESM consumer (use `import`, not `require`)

If you can't be ESM yet, stay on `@maticnetwork/meta@2.x` for now or
keep fetching from `static.polygon.technology` over HTTPS.

## Import migration

### Static, typed ABI access (preferred)

```js
// Before
const RootChainABI = require('@maticnetwork/meta/network/mainnet/v1/artifacts/plasma/RootChain.json').abi
```

```ts
// After
import { abi as RootChainAbi } from '@polygonlabs/meta/abi/mainnet/v1/plasma/RootChain'
```

The new path is tree-shakable and gives you the literal `as const`
type that viem/wagmi/abitype need.

### Raw JSON access (no types)

```js
// Before
const RootChainJson = require('@maticnetwork/meta/network/mainnet/v1/artifacts/plasma/RootChain.json')
```

```ts
// After — same path, just the renamed package
import RootChainJson from '@polygonlabs/meta/network/mainnet/v1/artifacts/plasma/RootChain.json' with { type: 'json' }
```

### Network metadata

```js
// Before
const Network = require('@maticnetwork/meta/network')
const net = new Network('mainnet', 'v1')
const chainId = net.Main.ChainId
```

```ts
// After (preferred — fully typed)
import { info } from '@polygonlabs/meta/info/mainnet/v1'
const chainId = info.Main.ChainId  // typed as the literal `1`
```

### Dynamic name-based lookup (legacy ergonomic surface)

The `Network` class still exists but its methods are async, and
construction goes through a static factory because the per-network
`info` is loaded via dynamic `import()`:

```js
// Before — sync
const Network = require('@maticnetwork/meta/network')
const net = new Network('mainnet', 'v1')
const Main = net.Main
const RootChainAbi = net.abi('RootChain')
```

```ts
// After — async
import { Network } from '@polygonlabs/meta'
const net = await Network.create('mainnet', 'v1')
const Main = net.Main                                     // sync read after create()
const RootChainAbi = await net.abi('RootChain')           // async; defaults to type 'plasma'
```

For new code, prefer the static `/abi/*` and `/info/*` deep imports
above — fully typed, sync, tree-shakable.

## Why `as const`

Each generated module looks like:

```ts
export const abi = [
  { type: "function", name: "hasRole", inputs: [...], outputs: [...] },
  ...
] as const;
```

That trailing `as const` is load-bearing, not stylistic. **Without it,
TypeScript widens the array element type to a generic
`{ type: string; name: string; inputs: ...[] }`**, which means
`viem` / `wagmi` / `abitype` cannot extract function names, argument
types, or return types at the call site — the whole point of shipping
typed ABIs disappears.

With `as const`, every string literal stays at its exact value and the
array becomes a tuple, giving consumers full type-level inference:

```ts
import { abi } from '@polygonlabs/meta/abi/mainnet/v1/pos/AccessControl'
import { readContract } from 'viem'

await readContract(client, {
  abi,                          // ← needs `as const` for the next line to compile
  functionName: 'hasRole',      // ← autocompleted from the literal tuple
  args: [bytes32Role, address], // ← arg types inferred from the function's `inputs`
})
```

The codegen step (`scripts/codegen.mjs`) emits each ABI module with
the trailing `as const` automatically. Don't hand-edit `src/abi/` —
it's gitignored and regenerated on every build.

## Path scheme

```
@polygonlabs/meta/abi/<chain>/<network>/<type>/<Contract>           # typed
@polygonlabs/meta/info/<chain>/<network>                            # typed
@polygonlabs/meta/info/networks                                     # typed
@polygonlabs/meta/network/<chain>/<network>/artifacts/<type>/<C>.json  # raw JSON
```

| chain     | network   | types available                        |
| --------- | --------- | -------------------------------------- |
| `mainnet` | `v1`      | `pos`, `plasma`, `fx-portal`, `genesis` |
| `mainnet` | `cherry`  | `zkevm`                                |
| `testnet` | `amoy`    | `pos`, `plasma`, `fx-portal`, `genesis` |
| `testnet` | `cardona` | `zkevm`                                |
