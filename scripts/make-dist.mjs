#!/usr/bin/env node
// Stage a zero-install distribution directory at `bundle/dist-pkg/`:
//   markets-scaffold-mcp/
//   ├── markets-scaffold-mcp.mjs   (single esbuild bundle)
//   ├── assets/
//   ├── templates/
//   └── README.md
//
// Then produce 3 zips:
//   1. markets-scaffold-mcp-core.zip        — server + templates (no libs) + assets
//   2. markets-scaffold-mcp-libs-react.zip   — React tarballs only
//   3. markets-scaffold-mcp-libs-angular.zip — Angular tarballs only
import { execSync } from 'node:child_process';
import fs from 'fs-extra';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const bundleDir = path.join(root, 'bundle');
const staging = path.join(bundleDir, 'dist-pkg', 'markets-scaffold-mcp');

// --- Stage full directory ---
await fs.remove(path.join(bundleDir, 'dist-pkg'));
await fs.ensureDir(staging);

await fs.copy(path.join(root, 'bundle', 'markets-scaffold-mcp.mjs'), path.join(staging, 'markets-scaffold-mcp.mjs'));
await fs.copy(path.join(root, 'assets'), path.join(staging, 'assets'));
await fs.copy(path.join(root, 'templates'), path.join(staging, 'templates'));
await fs.copy(path.join(root, 'README.md'), path.join(staging, 'README.md'));

// make the bundle executable on unix
try { fs.chmodSync(path.join(staging, 'markets-scaffold-mcp.mjs'), 0o755); } catch {}

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

await createZip('markets-scaffold-mcp-core.zip', path.join(bundleDir, 'dist-pkg'), 'markets-scaffold-mcp');

// Restore libs
await fs.move(tempReactLibs, reactLibs);
await fs.move(tempAngularLibs, angularLibs);

// --- 2. React libs zip ---
// Structure inside zip: markets-scaffold-mcp/templates/react/libs/*.tgz
// so it merges cleanly when extracted alongside core
await createZip(
  'markets-scaffold-mcp-libs-react.zip',
  path.join(bundleDir, 'dist-pkg'),
  'markets-scaffold-mcp/templates/react/libs'
);

// --- 3. Angular libs zip ---
await createZip(
  'markets-scaffold-mcp-libs-angular.zip',
  path.join(bundleDir, 'dist-pkg'),
  'markets-scaffold-mcp/templates/angular/libs'
);

// Remove old single zip if it exists
const oldZip = path.join(bundleDir, 'markets-scaffold-mcp.zip');
if (await fs.pathExists(oldZip)) {
  await fs.remove(oldZip);
  console.log(`✗ Removed old ${path.basename(oldZip)}`);
}
