import { networks } from './info/networks.ts';

export type Chain = 'mainnet' | 'testnet';
export type ArtifactType = 'pos' | 'plasma' | 'fx-portal' | 'genesis' | 'zkevm';

const VALID_ARTIFACT_TYPES: readonly ArtifactType[] = [
  'pos',
  'plasma',
  'fx-portal',
  'genesis',
  'zkevm',
];

// Contract identifiers used in solc/foundry/hardhat output and on this
// package's published ABIs. Letters, digits, underscores; no dots or
// slashes. Constrains the dynamic import below to a single directory
// level, so a malicious caller cannot escape the abi tree via path
// traversal.
const CONTRACT_NAME = /^[A-Za-z0-9_]+$/;

function assertKnownNetwork(name: string, version: string): void {
  const found = networks.some((n) => n.network === name && n.version === version);
  if (!found) {
    throw new TypeError(
      `Unknown network: ${name}/${version}. Known networks: ${networks
        .map((n) => `${n.network}/${n.version}`)
        .join(', ')}`,
    );
  }
}

function assertContractName(name: string): void {
  if (!CONTRACT_NAME.test(name)) {
    throw new TypeError(
      `Invalid contract name: ${name}. Expected /^[A-Za-z0-9_]+$/.`,
    );
  }
}

function assertArtifactType(type: string): asserts type is ArtifactType {
  if (!(VALID_ARTIFACT_TYPES as readonly string[]).includes(type)) {
    throw new TypeError(
      `Invalid artifact type: ${type}. Expected one of ${VALID_ARTIFACT_TYPES.join(', ')}.`,
    );
  }
}

export class Network {
  readonly name: Chain;
  readonly version: string;

  static readonly networks = networks;

  private constructor(name: Chain, version: string, info: Record<string, unknown>) {
    this.name = name;
    this.version = version;
    for (const [key, value] of Object.entries(info)) {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: false,
        writable: false,
        value,
      });
    }
  }

  static async create(name: Chain, version: string = 'v1'): Promise<Network> {
    assertKnownNetwork(name, version);
    const mod = (await import(`./info/${name}/${version}.js`)) as {
      info: Record<string, unknown>;
    };
    return new Network(name, version, mod.info);
  }

  async artifacts(
    name: string,
    type: ArtifactType = 'plasma',
  ): Promise<{ abi: readonly unknown[] }> {
    assertContractName(name);
    assertArtifactType(type);
    const mod = (await import(
      `./abi/${this.name}/${this.version}/${type}/${name}.js`
    )) as {
      abi: readonly unknown[];
    };
    return { abi: mod.abi };
  }

  async abi(
    name: string,
    type: ArtifactType = 'plasma',
  ): Promise<readonly unknown[]> {
    return (await this.artifacts(name, type)).abi;
  }
}
