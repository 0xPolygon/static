export const abi = [
  {
    "type": "constructor",
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable"
  },
  {
    "name": "MaxErc20DepositUpdate",
    "type": "event",
    "inputs": [
      {
        "name": "oldLimit",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "newLimit",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "name": "NewDepositBlock",
    "type": "event",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "token",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "amountOrNFTId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "depositBlockId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "name": "OwnershipTransferred",
    "type": "event",
    "inputs": [
      {
        "name": "previousOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "newOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "fallback",
    "payable": true,
    "stateMutability": "payable"
  },
  {
    "name": "childChain",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "payable": false,
    "constant": true,
    "stateMutability": "view"
  },
  {
    "name": "depositBulk",
    "type": "function",
    "inputs": [
      {
        "name": "_tokens",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "_amountOrTokens",
        "type": "uint256[]",
        "internalType": "uint256[]"
      },
      {
        "name": "_user",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "payable": false,
    "constant": false,
    "stateMutability": "nonpayable"
  },
  {
    "name": "depositERC20",
    "type": "function",
    "inputs": [
      {
        "name": "_token",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "payable": false,
    "constant": false,
    "stateMutability": "nonpayable"
  },
  {
    "name": "depositERC20ForUser",
    "type": "function",
    "inputs": [
      {
        "name": "_token",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_user",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "payable": false,
    "constant": false,
    "stateMutability": "nonpayable"
  },
  {
    "name": "depositERC721",
    "type": "function",
    "inputs": [
      {
        "name": "_token",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_tokenId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "payable": false,
    "constant": false,
    "stateMutability": "nonpayable"
  },
  {
    "name": "depositERC721ForUser",
    "type": "function",
    "inputs": [
      {
        "name": "_token",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_user",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_tokenId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "payable": false,
    "constant": false,
    "stateMutability": "nonpayable"
  },
  {
    "name": "depositEther",
    "type": "function",
    "inputs": [],
    "outputs": [],
    "payable": true,
    "constant": false,
    "stateMutability": "payable"
  },
  {
    "name": "deposits",
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "depositHash",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "createdAt",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "payable": false,
    "constant": true,
    "stateMutability": "view"
  },
  {
    "name": "governance",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract IGovernance"
      }
    ],
    "payable": false,
    "constant": true,
    "stateMutability": "view"
  },
  {
    "name": "isOwner",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "payable": false,
    "constant": true,
    "stateMutability": "view"
  },
  {
    "name": "lock",
    "type": "function",
    "inputs": [],
    "outputs": [],
    "payable": false,
    "constant": false,
    "stateMutability": "nonpayable"
  },
  {
    "name": "locked",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "payable": false,
    "constant": true,
    "stateMutability": "view"
  },
  {
    "name": "maxErc20Deposit",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "payable": false,
    "constant": true,
    "stateMutability": "view"
  },
  {
    "name": "migrateMatic",
    "type": "function",
    "inputs": [
      {
        "name": "_amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "payable": false,
    "constant": false,
    "stateMutability": "nonpayable"
  },
  {
    "name": "onERC721Received",
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bytes4",
        "internalType": "bytes4"
      }
    ],
    "payable": false,
    "constant": false,
    "stateMutability": "nonpayable"
  },
  {
    "name": "owner",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "payable": false,
    "constant": true,
    "stateMutability": "view"
  },
  {
    "name": "registry",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract Registry"
      }
    ],
    "payable": false,
    "constant": true,
    "stateMutability": "view"
  },
  {
    "name": "renounceOwnership",
    "type": "function",
    "inputs": [],
    "outputs": [],
    "payable": false,
    "constant": false,
    "stateMutability": "nonpayable"
  },
  {
    "name": "rootChain",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract RootChain"
      }
    ],
    "payable": false,
    "constant": true,
    "stateMutability": "view"
  },
  {
    "name": "stateSender",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract StateSender"
      }
    ],
    "payable": false,
    "constant": true,
    "stateMutability": "view"
  },
  {
    "name": "transferAssets",
    "type": "function",
    "inputs": [
      {
        "name": "_token",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_user",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_amountOrNFTId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "payable": false,
    "constant": false,
    "stateMutability": "nonpayable"
  },
  {
    "name": "transferOwnership",
    "type": "function",
    "inputs": [
      {
        "name": "newOwner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "payable": false,
    "constant": false,
    "stateMutability": "nonpayable"
  },
  {
    "name": "unlock",
    "type": "function",
    "inputs": [],
    "outputs": [],
    "payable": false,
    "constant": false,
    "stateMutability": "nonpayable"
  },
  {
    "name": "updateChildChainAndStateSender",
    "type": "function",
    "inputs": [],
    "outputs": [],
    "payable": false,
    "constant": false,
    "stateMutability": "nonpayable"
  },
  {
    "name": "updateMaxErc20Deposit",
    "type": "function",
    "inputs": [
      {
        "name": "maxDepositAmount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "payable": false,
    "constant": false,
    "stateMutability": "nonpayable"
  },
  {
    "name": "updateRootChain",
    "type": "function",
    "inputs": [
      {
        "name": "_rootChain",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "payable": false,
    "constant": false,
    "stateMutability": "nonpayable"
  }
] as const;
