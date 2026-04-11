#!/usr/bin/env node
// Stage a zero-install distribution directory at `bundle/dist-pkg/`:
//   marketsui-mcp/
//   ├── marketsui-mcp.mjs   (single esbuild bundle)
//   ├── assets/
//   ├── templates/
//   └── README.md
//
// Then produce 3 zips:
//   1. marketsui-mcp-core.zip        — server + templates (no libs) + assets
//   2. marketsui-mcp-libs-react.zip   — React tarballs only
//   3. marketsui-mcp-libs-angular.zip — Angular tarballs only
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

// --- Helper to create a zip and print its size ---
async function createZip(zipName, cwd, target) {
  const zipPath = path.join(bundleDir, zipName);
  await fs.remove(zipPath);
  execSync(`cd "${cwd}" && zip -rq "${zipPath}" ${target}`, { stdio: 'inherit' });
  const { size } = await fs.stat(zipPath);
  console.log(`✓ ${zipName} (${(size / 1024 / 1024).toFixed(1)} MB)`);
}

// --- 1. Core zip: everything except libs/ directories ---
// Temporarily move libs dirs out, zip, then move back
const reactLibs = path.join(staging, 'templates', 'react', 'libs');
const angularLibs = path.join(staging, 'templates', 'angular', 'libs');
const tempReactLibs = path.join(bundleDir, '_tmp_react_libs');
const tempAngularLibs = path.join(bundleDir, '_tmp_angular_libs');

await fs.move(reactLibs, tempReactLibs);
await fs.move(angularLibs, tempAngularLibs);

await createZip('marketsui-mcp-core.zip', path.join(bundleDir, 'dist-pkg'), 'marketsui-mcp');

// Restore libs
await fs.move(tempReactLibs, reactLibs);
await fs.move(tempAngularLibs, angularLibs);

// --- 2. React libs zip ---
// Structure inside zip: marketsui-mcp/templates/react/libs/*.tgz
// so it merges cleanly when extracted alongside core
await createZip(
  'marketsui-mcp-libs-react.zip',
  path.join(bundleDir, 'dist-pkg'),
  'marketsui-mcp/templates/react/libs'
);

// --- 3. Angular libs zip ---
await createZip(
  'marketsui-mcp-libs-angular.zip',
  path.join(bundleDir, 'dist-pkg'),
  'marketsui-mcp/templates/angular/libs'
);

// Remove any legacy zips left over from before the rename
for (const stale of [
  'markets-scaffold-mcp.zip',
  'markets-scaffold-mcp-core.zip',
  'markets-scaffold-mcp-libs-react.zip',
  'markets-scaffold-mcp-libs-angular.zip',
]) {
  const staleZip = path.join(bundleDir, stale);
  if (await fs.pathExists(staleZip)) {
    await fs.remove(staleZip);
    console.log(`✗ Removed old ${stale}`);
  }
}
