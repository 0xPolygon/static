module.exports = {
  testnet: {
    v2: {
      addresses: require('./testnet/v2/index.json'),
      DepositManager: require('./testnet/v2/artifacts/DepositManager.json'),
      WithdrawManager: require('./testnet/v2/artifacts/WithdrawManager.json'),
      RootChain: require('./testnet/v2/artifacts/RootChain.json'),
      ChildERC20: require('./testnet/v2/artifacts/ChildERC20.json'),
      ChildERC721: require('./testnet/v2/artifacts/ChildERC721.json')
    },
    v3: {
      addresses: require('./testnet/v3/index.json'),
      DepositManager: require('./testnet/v3/artifacts/DepositManager.json'),
      WithdrawManager: require('./testnet/v3/artifacts/WithdrawManager.json'),
      RootChain: require('./testnet/v3/artifacts/RootChain.json'),
      Registry: require('./testnet/v3/artifacts/Registry.json'),
      ChildERC20: require('./testnet/v3/artifacts/ChildERC20.json'),
      ChildERC721: require('./testnet/v3/artifacts/ChildERC721.json')
    }
  }, 
  alpha: {
    v1: {
      addresses: require('./alpha/v1/index.json'),
      DepositManager: require('./alpha/v1/artifacts/DepositManager.json'),
      WithdrawManager: require('./alpha/v1/artifacts/WithdrawManager.json'),
      RootChain: require('./alpha/v1/artifacts/RootChain.json'),
      ChildERC20: require('./alpha/v1/artifacts/ChildERC20.json'),
      ChildERC721: require('./alpha/v1/artifacts/ChildERC721.json')
    }
  }, 
  beta: {
    v1: {
      addresses: require('./beta/v1/index.json'),
      DepositManager: require('./beta/v1/artifacts/DepositManager.json'),
      WithdrawManager: require('./beta/v1/artifacts/WithdrawManager.json'),
      RootChain: require('./beta/v1/artifacts/RootChain.json'),
      Registry: require('./beta/v1/artifacts/Registry.json'),
      ChildERC20: require('./beta/v1/artifacts/ChildERC20.json'),
      ChildERC721: require('./beta/v1/artifacts/ChildERC721.json')
    },
    v2: {
      addresses: require('./beta/v2/index.json'),
      DepositManager: require('./beta/v2/artifacts/DepositManager.json'),
      WithdrawManager: require('./beta/v2/artifacts/WithdrawManager.json'),
      RootChain: require('./beta/v2/artifacts/RootChain.json'),
      Registry: require('./beta/v2/artifacts/Registry.json'),
      ChildERC20: require('./beta/v2/artifacts/ChildERC20.json'),
      ChildERC721: require('./beta/v2/artifacts/ChildERC721.json')
    }
  }
}
