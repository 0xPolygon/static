---
'@polygonlabs/meta': patch
---

Point the mainnet `StakeManager` at the PIP-91 Part 2 implementation `0x1D9eE26F794676acF56baC9A479F766403D0f5cC` and refresh its ABI: `setCurrentEpoch`, `decreaseValidatorDelegatedAmount`, `extensionCode` and `migrateValidatorsData` are gone, `reinitializeValidatorState` is added.
