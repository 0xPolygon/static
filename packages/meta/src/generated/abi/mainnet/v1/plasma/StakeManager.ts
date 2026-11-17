export const abi = [
  {
    "type": "constructor",
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable"
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
    "name": "RootChainChanged",
    "type": "event",
    "inputs": [
      {
        "name": "previousRootChain",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "newRootChain",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "name": "CHECKPOINT_REWARD",
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
    "name": "NFTContract",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract StakingNFT"
      }
    ],
    "payable": false,
    "constant": true,
    "stateMutability": "view"
  },
  {
    "name": "NFTCounter",
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
    "name": "WITHDRAWAL_DELAY",
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
    "name": "accountStateRoot",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "payable": false,
    "constant": true,
    "stateMutability": "view"
  },
  {
    "name": "auctionPeriod",
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
    "name": "changeRootChain",
    "type": "function",
    "inputs": [
      {
        "name": "newRootChain",
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
    "name": "checkPointBlockInterval",
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
    "name": "checkSignatures",
    "type": "function",
    "inputs": [
      {
        "name": "blockInterval",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "voteHash",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "stateRoot",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "proposer",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "sigs",
        "type": "uint256[3][]",
        "internalType": "uint256[3][]"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "payable": false,
    "constant": false,
    "stateMutability": "nonpayable"
  },
  {
    "name": "checkpointRewardDelta",
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
    "name": "claimFee",
    "type": "function",
    "inputs": [
      {
        "name": "accumFeeAmount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "index",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "proof",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "payable": false,
    "constant": false,
    "stateMutability": "nonpayable"
  },
  {
    "name": "convertMaticToPOL",
    "type": "function",
    "inputs": [
      {
        "name": "amount",
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
    "name": "currentEpoch",
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
    "name": "currentValidatorSetSize",
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
    "name": "currentValidatorSetTotalStake",
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
    "name": "decreaseValidatorDelegatedAmount",
    "type": "function",
    "inputs": [
      {
        "name": "validatorId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "amount",
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
    "name": "delegatedAmount",
    "type": "function",
    "inputs": [
      {
        "name": "validatorId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
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
    "name": "delegationDeposit",
    "type": "function",
    "inputs": [
      {
        "name": "validatorId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "delegator",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "payable": false,
    "constant": false,
    "stateMutability": "nonpayable"
  },
  {
    "name": "delegationDepositPOL",
    "type": "function",
    "inputs": [
      {
        "name": "validatorId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "delegator",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "payable": false,
    "constant": false,
    "stateMutability": "nonpayable"
  },
  {
    "name": "delegationEnabled",
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
    "name": "delegatorsReward",
    "type": "function",
    "inputs": [
      {
        "name": "validatorId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
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
    "name": "dynasty",
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
    "name": "epoch",
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
    "name": "eventsHub",
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
    "name": "extensionCode",
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
    "name": "forceUnstake",
    "type": "function",
    "inputs": [
      {
        "name": "validatorId",
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
    "name": "forceUnstakePOL",
    "type": "function",
    "inputs": [
      {
        "name": "validatorId",
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
    "name": "getRegistry",
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
    "name": "getValidatorContract",
    "type": "function",
    "inputs": [
      {
        "name": "validatorId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
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
    "name": "getValidatorId",
    "type": "function",
    "inputs": [
      {
        "name": "user",
        "type": "address",
        "internalType": "address"
      }
    ],
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
    "name": "insertSigners",
    "type": "function",
    "inputs": [
      {
        "name": "_signers",
        "type": "address[]",
        "internalType": "address[]"
      }
    ],
    "outputs": [],
    "payable": false,
    "constant": false,
    "stateMutability": "nonpayable"
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
    "name": "isValidator",
    "type": "function",
    "inputs": [
      {
        "name": "validatorId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
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
    "name": "latestSignerUpdateEpoch",
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
    "name": "logger",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract StakingInfo"
      }
    ],
    "payable": false,
    "constant": true,
    "stateMutability": "view"
  },
  {
    "name": "maxRewardedCheckpoints",
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
    "name": "migrateDelegation",
    "type": "function",
    "inputs": [
      {
        "name": "fromValidatorId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "toValidatorId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "amount",
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
    "name": "migrateValidatorsData",
    "type": "function",
    "inputs": [
      {
        "name": "validatorIdFrom",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "validatorIdTo",
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
    "name": "migration",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract IPolygonMigration"
      }
    ],
    "payable": false,
    "constant": true,
    "stateMutability": "view"
  },
  {
    "name": "minDeposit",
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
    "name": "minHeimdallFee",
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
    "name": "ownerOf",
    "type": "function",
    "inputs": [
      {
        "name": "tokenId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
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
    "name": "prevBlockInterval",
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
    "name": "proposerBonus",
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
    "name": "registry",
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
    "name": "renounceOwnership",
    "type": "function",
    "inputs": [],
    "outputs": [],
    "payable": false,
    "constant": false,
    "stateMutability": "nonpayable"
  },
  {
    "name": "replacementCoolDown",
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
    "name": "restake",
    "type": "function",
    "inputs": [
      {
        "name": "validatorId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "stakeRewards",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "outputs": [],
    "payable": false,
    "constant": false,
    "stateMutability": "nonpayable"
  },
  {
    "name": "restakePOL",
    "type": "function",
    "inputs": [
      {
        "name": "validatorId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "stakeRewards",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "outputs": [],
    "payable": false,
    "constant": false,
    "stateMutability": "nonpayable"
  },
  {
    "name": "rewardDecreasePerCheckpoint",
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
    "name": "rewardPerStake",
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
    "name": "rootChain",
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
    "name": "setCurrentEpoch",
    "type": "function",
    "inputs": [
      {
        "name": "_currentEpoch",
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
    "name": "setDelegationEnabled",
    "type": "function",
    "inputs": [
      {
        "name": "enabled",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "outputs": [],
    "payable": false,
    "constant": false,
    "stateMutability": "nonpayable"
  },
  {
    "name": "signerToValidator",
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
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
    "name": "signerUpdateLimit",
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
    "name": "signers",
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
    "name": "stakeFor",
    "type": "function",
    "inputs": [
      {
        "name": "user",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "heimdallFee",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "acceptDelegation",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "signerPubkey",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "payable": false,
    "constant": false,
    "stateMutability": "nonpayable"
  },
  {
    "name": "stakeForPOL",
    "type": "function",
    "inputs": [
      {
        "name": "user",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "heimdallFee",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "acceptDelegation",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "signerPubkey",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "payable": false,
    "constant": false,
    "stateMutability": "nonpayable"
  },
  {
    "name": "token",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract IERC20"
      }
    ],
    "payable": false,
    "constant": true,
    "stateMutability": "view"
  },
  {
    "name": "tokenMatic",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract IERC20"
      }
    ],
    "payable": false,
    "constant": true,
    "stateMutability": "view"
  },
  {
    "name": "topUpForFee",
    "type": "function",
    "inputs": [
      {
        "name": "user",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "heimdallFee",
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
    "name": "totalHeimdallFee",
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
    "name": "totalRewards",
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
    "name": "totalRewardsLiquidated",
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
    "name": "totalStaked",
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
    "name": "totalStakedFor",
    "type": "function",
    "inputs": [
      {
        "name": "user",
        "type": "address",
        "internalType": "address"
      }
    ],
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
    "name": "transferFunds",
    "type": "function",
    "inputs": [
      {
        "name": "validatorId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "delegator",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "payable": false,
    "constant": false,
    "stateMutability": "nonpayable"
  },
  {
    "name": "transferFundsPOL",
    "type": "function",
    "inputs": [
      {
        "name": "validatorId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "delegator",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
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
    "name": "unstake",
    "type": "function",
    "inputs": [
      {
        "name": "validatorId",
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
    "name": "unstakeClaim",
    "type": "function",
    "inputs": [
      {
        "name": "validatorId",
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
    "name": "unstakeClaimPOL",
    "type": "function",
    "inputs": [
      {
        "name": "validatorId",
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
    "name": "unstakePOL",
    "type": "function",
    "inputs": [
      {
        "name": "validatorId",
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
    "name": "updateCheckPointBlockInterval",
    "type": "function",
    "inputs": [
      {
        "name": "_blocks",
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
    "name": "updateCheckpointReward",
    "type": "function",
    "inputs": [
      {
        "name": "newReward",
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
    "name": "updateCheckpointRewardParams",
    "type": "function",
    "inputs": [
      {
        "name": "_rewardDecreasePerCheckpoint",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_maxRewardedCheckpoints",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_checkpointRewardDelta",
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
    "name": "updateCommissionRate",
    "type": "function",
    "inputs": [
      {
        "name": "validatorId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "newCommissionRate",
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
    "name": "updateDynastyValue",
    "type": "function",
    "inputs": [
      {
        "name": "newDynasty",
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
    "name": "updateMinAmounts",
    "type": "function",
    "inputs": [
      {
        "name": "_minDeposit",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_minHeimdallFee",
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
    "name": "updateProposerBonus",
    "type": "function",
    "inputs": [
      {
        "name": "newProposerBonus",
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
    "name": "updateSigner",
    "type": "function",
    "inputs": [
      {
        "name": "validatorId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "signerPubkey",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "payable": false,
    "constant": false,
    "stateMutability": "nonpayable"
  },
  {
    "name": "updateSignerUpdateLimit",
    "type": "function",
    "inputs": [
      {
        "name": "_limit",
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
    "name": "updateValidatorContractAddress",
    "type": "function",
    "inputs": [
      {
        "name": "validatorId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "newContractAddress",
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
    "name": "updateValidatorDelegation",
    "type": "function",
    "inputs": [
      {
        "name": "delegation",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "outputs": [],
    "payable": false,
    "constant": false,
    "stateMutability": "nonpayable"
  },
  {
    "name": "updateValidatorState",
    "type": "function",
    "inputs": [
      {
        "name": "validatorId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "amount",
        "type": "int256",
        "internalType": "int256"
      }
    ],
    "outputs": [],
    "payable": false,
    "constant": false,
    "stateMutability": "nonpayable"
  },
  {
    "name": "updateValidatorThreshold",
    "type": "function",
    "inputs": [
      {
        "name": "newThreshold",
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
    "name": "userFeeExit",
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
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
    "name": "validatorAuction",
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
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "startEpoch",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "user",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "acceptDelegation",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "signerPubkey",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "payable": false,
    "constant": true,
    "stateMutability": "view"
  },
  {
    "name": "validatorReward",
    "type": "function",
    "inputs": [
      {
        "name": "validatorId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
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
    "name": "validatorShareFactory",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract ValidatorShareFactory"
      }
    ],
    "payable": false,
    "constant": true,
    "stateMutability": "view"
  },
  {
    "name": "validatorStake",
    "type": "function",
    "inputs": [
      {
        "name": "validatorId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
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
    "name": "validatorState",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "stakerCount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "payable": false,
    "constant": true,
    "stateMutability": "view"
  },
  {
    "name": "validatorStateChanges",
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
        "name": "amount",
        "type": "int256",
        "internalType": "int256"
      },
      {
        "name": "stakerCount",
        "type": "int256",
        "internalType": "int256"
      }
    ],
    "payable": false,
    "constant": true,
    "stateMutability": "view"
  },
  {
    "name": "validatorThreshold",
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
    "name": "validators",
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
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "reward",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "activationEpoch",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "deactivationEpoch",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "jailTime",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "signer",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "contractAddress",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "status",
        "type": "uint8",
        "internalType": "enum StakeManagerStorage.Status"
      },
      {
        "name": "commissionRate",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "lastCommissionUpdate",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "delegatorsReward",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "delegatedAmount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "initialRewardPerStake",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "payable": false,
    "constant": true,
    "stateMutability": "view"
  },
  {
    "name": "withdrawDelegatorsReward",
    "type": "function",
    "inputs": [
      {
        "name": "validatorId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "payable": false,
    "constant": false,
    "stateMutability": "nonpayable"
  },
  {
    "name": "withdrawRewards",
    "type": "function",
    "inputs": [
      {
        "name": "validatorId",
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
    "name": "withdrawRewardsPOL",
    "type": "function",
    "inputs": [
      {
        "name": "validatorId",
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
    "name": "withdrawalDelay",
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
  }
] as const;
