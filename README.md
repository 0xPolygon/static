# Static server
The private static server for Matic.

### How it works?
All files, in this repository, will be served over AWS S3 at `https://static.matic.network/<file-path>`.

### Production
Master branch will be automatically deployed. No other action required.

## Package Usage

### Installation
```bash
$ npm i --save @maticnetwork/meta
```
### Usage
```javascript
const Network = require("@maticnetwork/meta/network")

// define network
const network = new Network("testnet", "mumbai")

const Matic = network.Matic  // all info related to Matic
const Main = network.Main // all info related to Main
const Heimdall = network.Heimdall // all info related to Heimdall

const RootChainABI = network.abi("RootChain")

// use matic js
let matic = new Matic ({
    maticProvider: Matic.RPC,
    mainProvider: Main.RPC,
    registry: Main.Contracts.Registry,
    ...
    ...
})
```


### Before Publishing
```
npm run minify
```
