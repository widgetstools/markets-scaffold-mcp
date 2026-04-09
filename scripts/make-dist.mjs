#!/usr/bin/env node
// Stage a zero-install distribution directory at `bundle/dist-pkg/`:
//   markets-scaffold-mcp/
//   ├── markets-scaffold-mcp.mjs   (single esbuild bundle)
//   ├── assets/
//   ├── templates/
//   └── README.md
// Then zip it to `bundle/markets-scaffold-mcp.zip`.
import { execSync } from 'node:child_process';
import fs from 'fs-extra';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const staging = path.join(root, 'bundle', 'dist-pkg', 'markets-scaffold-mcp');

await fs.remove(path.join(root, 'bundle', 'dist-pkg'));
await fs.ensureDir(staging);

await fs.copy(path.join(root, 'bundle', 'markets-scaffold-mcp.mjs'), path.join(staging, 'markets-scaffold-mcp.mjs'));
await fs.copy(path.join(root, 'assets'), path.join(staging, 'assets'));
await fs.copy(path.join(root, 'templates'), path.join(staging, 'templates'));
await fs.copy(path.join(root, 'README.md'), path.join(staging, 'README.md'));

// make the bundle executable on unix
try { fs.chmodSync(path.join(staging, 'markets-scaffold-mcp.mjs'), 0o755); } catch {}

const zipPath = path.join(root, 'bundle', 'markets-scaffold-mcp.zip');
await fs.remove(zipPath);
execSync(`cd "${path.join(root, 'bundle', 'dist-pkg')}" && zip -rq "${zipPath}" markets-scaffold-mcp`, { stdio: 'inherit' });

const { size } = await fs.stat(zipPath);
console.log(`✓ ${zipPath} (${(size / 1024 / 1024).toFixed(1)} MB)`);
