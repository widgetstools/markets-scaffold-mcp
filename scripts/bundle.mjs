#!/usr/bin/env node
import { build } from 'esbuild';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');

await build({
  entryPoints: [path.join(root, 'src/index.ts')],
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node18',
  outfile: path.join(root, 'bundle/markets-scaffold-mcp.mjs'),
  // src/index.ts already has a #!/usr/bin/env node shebang which esbuild preserves.
  banner: {
    js: [
      "import { createRequire as __mscRequire } from 'node:module';",
      'const require = __mscRequire(import.meta.url);',
    ].join('\n'),
  },
  logLevel: 'info',
});
