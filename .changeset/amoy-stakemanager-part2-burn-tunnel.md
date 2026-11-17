---
'@polygonlabs/meta': patch
---

Point the Amoy `StakeManager` at the PIP-91 Part 2 implementation `0x1D9eE26F794676acF56baC9A479F766403D0f5cC` and refresh its ABI to match mainnet: `setCurrentEpoch`, `decreaseValidatorDelegatedAmount`, `extensionCode` and `migrateValidatorsData` are gone, `reinitializeValidatorState` is added. Also list the POL burn tunnel `NewBurnTunnel` (`0xDEAD4CD252BB87237325B18D71fF4D872CAabcBc`) under `Main.Contracts` (Sepolia) and `Matic.Contracts` (Amoy) in `testnet/amoy/index.json`; it is the burn destination of the Amoy `EIP1559Burn` collector.
