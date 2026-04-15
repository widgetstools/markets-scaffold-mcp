#!/usr/bin/env node
// Build a single zero-install distribution zip at `bundle/marketsui-mcp.zip`.
//
//   bundle/marketsui-mcp.zip  →  marketsui-mcp/
//     ├── marketsui-mcp.mjs   (single esbuild bundle)
//     ├── assets/
//     ├── templates/
//     └── README.md
//
// Libs are tiny now (only 4 React + 3 Angular tarballs), so everything fits
// comfortably in a single downloadable zip — no more split libs / LFS.
import { execSync } from 'node:child_process';
import fs from 'fs-extra';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const bundleDir = path.join(root, 'bundle');
const staging = path.join(bundleDir, 'dist-pkg', 'marketsui-mcp');

// --- Stage full directory ---
await fs.remove(path.join(bundleDir, 'dist-pkg'));
await fs.ensureDir(staging);

await fs.copy(path.join(root, 'bundle', 'marketsui-mcp.mjs'), path.join(staging, 'marketsui-mcp.mjs'));
await fs.copy(path.join(root, 'assets'), path.join(staging, 'assets'));
await fs.copy(path.join(root, 'templates'), path.join(staging, 'templates'));
await fs.copy(path.join(root, 'README.md'), path.join(staging, 'README.md'));

// make the bundle executable on unix
try { fs.chmodSync(path.join(staging, 'marketsui-mcp.mjs'), 0o755); } catch {}

// --- Single zip ---
const zipPath = path.join(bundleDir, 'marketsui-mcp.zip');
await fs.remove(zipPath);
execSync(`cd "${path.join(bundleDir, 'dist-pkg')}" && zip -rq "${zipPath}" marketsui-mcp`, { stdio: 'inherit' });
const { size } = await fs.stat(zipPath);
console.log(`✓ marketsui-mcp.zip (${(size / 1024 / 1024).toFixed(1)} MB)`);

// Remove any legacy zips from previous multi-zip or renamed builds
for (const stale of [
  'marketsui-mcp-core.zip',
  'marketsui-mcp-libs-react.zip',
  'marketsui-mcp-libs-angular.zip',
  'markets-scaffold-mcp.zip',
  'markets-scaffold-mcp-core.zip',
  'markets-scaffold-mcp-libs-react.zip',
  'markets-scaffold-mcp-libs-angular.zip',
]) {
  const staleZip = path.join(bundleDir, stale);
  if (await fs.pathExists(staleZip)) {
    await fs.remove(staleZip);
    console.log(`✗ Removed legacy ${stale}`);
  }
}
