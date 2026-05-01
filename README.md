# @polygonlabs/meta

Polygon contract addresses and ABIs in two transports from one set of
source files:

1. **npm package `@polygonlabs/meta`** — tree-shakable `as const`
   TypeScript ABIs, typed network metadata, and the same raw JSON
   files as the previous `@maticnetwork/meta`.
2. **Public HTTP endpoint** at `https://static.polygon.technology/...`
   — the same JSON files served by nginx, unchanged from how
   `@maticnetwork/meta@2.x` exposed them.

## Install

```sh
pnpm add @polygonlabs/meta
# or
npm i @polygonlabs/meta
```

Requires **Node ≥ 24** and an **ESM** consumer.

## Usage

### Typed ABI per contract (preferred)

```ts
import { abi } from '@polygonlabs/meta/abi/mainnet/v1/pos/AccessControl'
import { readContract } from 'viem'

await readContract(client, {
  abi,                         // ← `as const` literal type — viem infers everything below
  functionName: 'hasRole',     // autocompleted from the literal tuple
  args: [bytes32Role, address] // arg types inferred from the function's `inputs`
})
```

The ABI is loaded only for the contracts you import. Unused contracts
do not enter your bundle.

### Network metadata

```ts
import { info } from '@polygonlabs/meta/info/mainnet/v1'

const ethChainId = info.Main.ChainId           // typed as the literal `1`
const rootChainAddr = info.Main.Contracts.RootChain
```

```ts
import { networks } from '@polygonlabs/meta/info/networks'

for (const { network, version } of networks) {
  // ...
}
```

### Raw JSON (no types)

The same JSON files served by `static.polygon.technology` are also
reachable from the npm package, at the same paths:

```ts
import abi from '@polygonlabs/meta/network/mainnet/v1/artifacts/pos/AccessControl.json'
  with { type: 'json' }
```

### Dynamic name-based lookup

For code that needs to load ABIs by string name at runtime:

```ts
import { Network } from '@polygonlabs/meta'

const net = await Network.create('mainnet', 'v1')
const main = net.Main                                         // sync after create()
const accessControlAbi = await net.abi('AccessControl', 'pos') // async
```

Methods are async because contract artifacts are loaded via dynamic
`import()`. For new code, prefer the static deep imports above — same
data, fully typed, sync.

## HTTP endpoint

```
https://static.polygon.technology/network/<chain>/<network>/artifacts/<type>/<Contract>.json
```

The HTTP endpoint serves the same JSON files as the npm package's
`/network/*` subpath. Use it for environments that can't import
modules (e.g. clients running in a browser without a bundler) or when
you want to fetch ABIs dynamically without bundling them.

## Available paths

```
@polygonlabs/meta/abi/<chain>/<network>/<type>/<Contract>           # typed
@polygonlabs/meta/info/<chain>/<network>                            # typed
@polygonlabs/meta/info/networks                                     # typed
@polygonlabs/meta/network/<chain>/<network>/artifacts/<type>/<C>.json  # raw JSON
```

| chain     | network   | types                                  |
| --------- | --------- | -------------------------------------- |
| `mainnet` | `v1`      | `pos`, `plasma`, `fx-portal`, `genesis` |
| `mainnet` | `cherry`  | `zkevm`                                |
| `testnet` | `amoy`    | `pos`, `plasma`, `fx-portal`, `genesis` |
| `testnet` | `cardona` | `zkevm`                                |

## Migrating from `@maticnetwork/meta`

See [MIGRATION.md](./MIGRATION.md). The HTTP endpoint at
`static.polygon.technology` continues to work as before — the
migration only affects npm consumers.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). Source of truth is the JSON
tree under `network/`; the typed TS modules are codegenned by
`scripts/codegen.mjs` at build time.

## License

MIT
