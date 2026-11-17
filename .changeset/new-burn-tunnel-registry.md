---
"@polygonlabs/meta": patch
---

Add the POL burn tunnel to the mainnet registry.

`NewBurnTunnel` (`0xDEAD4CD252BB87237325B18D71fF4D872CAabcBc`) is now listed under `Main.Contracts` (Ethereum) and `Matic.Contracts` (Polygon PoS) in `mainnet/v1/index.json`. It is the same contract at the same address on both chains: on Polygon it receives the POL burned by the EIP-1559 collector (`Matic.Contracts.EIP1559Burn`), and on Ethereum it settles the exit and sweeps POL to `0x000000000000000000000000000000000000dEaD`.
