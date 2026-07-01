import { defineConfig } from 'eslint/config';

import { recommended, typescript } from '@polygonlabs/apps-team-lint';

export default defineConfig([
  ...recommended({ globals: 'node' }),
  ...typescript(),
  // src/index.ts is the Cloudflare Worker entry — built by wrangler/esbuild, not
  // the repo's tsc (root tsconfig has include: []), and the Workers runtime
  // mandates `export default`. Linting it would fight both, for no value on a
  // 3-line framework shim.
  { ignores: ['.claude/**', '**/dist/**', 'packages/meta/src/generated/**', 'src/index.ts'] }
]);
