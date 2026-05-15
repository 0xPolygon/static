---
"@polygonlabs/meta": minor
---

Add `MultiRootDistributor` ABI and addresses for Sepolia testnet.

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
