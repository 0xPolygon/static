import { networks } from './info/networks.ts';

export class Network {
  readonly name: string;
  readonly version: string;

  static readonly networks = networks;

  private constructor(name: string, version: string, info: Record<string, unknown>) {
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

  static async create(name: string, version: string = 'v1'): Promise<Network> {
    const mod = (await import(`./info/${name}/${version}.js`)) as {
      info: Record<string, unknown>;
    };
    return new Network(name, version, mod.info);
  }

  async artifacts(name: string, type: string = 'plasma'): Promise<{ abi: readonly unknown[] }> {
    const mod = (await import(`./abi/${this.name}/${this.version}/${type}/${name}.js`)) as {
      abi: readonly unknown[];
    };
    return { abi: mod.abi };
  }

  async abi(name: string, type: string = 'plasma'): Promise<readonly unknown[]> {
    return (await this.artifacts(name, type)).abi;
  }
}
