# Static server
The private static server for Matic.

### How it works?
All files, in this repository, will be served over AWS S3 at `https://static.matic.network/<file-path>`.

### Production
Master branch will be automatically deployed. No other action required. 

### Package Usage

### Installation
```bash
$ npm i --save @maticnetwork/meta
```
### Usage
```javascript
// require('@maticnetwork/meta').<network-name>.<version>
const meta = require('@maticnetwork/meta').testnet.v3
 
const DepositManagerABI = meta.DepositManager.abi;
const DepositManagerAddress = meta.addresses.Main.Contracts.DepositManager;

// use matic js 
let matic = new Matic ({
    maticProvider: meta.addresses.Matic.RPC,
    mainProvider: meta.addresses.Main.RPC,
    registry: meta.addresses.Main.Contracts.Registry,
    ...
    ...
})

// or contract instantiation via web3
let DepositManagerContract = new web3.eth.Contract(DepositManagerABI, DepositManagerAddresss)

```
