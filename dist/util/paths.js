import path from 'node:path';
import { fileURLToPath } from 'node:url';
/**
 * Resolve asset/template paths relative to the compiled `dist/` directory.
 *
 * Layout when installed:
 *   <pkg>/
 *     dist/index.js          ← import.meta.url points here
 *     assets/
 *     templates/
 */
// Resolve pkgRoot for both layouts:
//   - tsc build: <pkg>/dist/util/paths.js → two levels up
//   - esbuild bundle: <pkg>/marketsui-mcp.mjs → same dir
// Walk upward from the compiled file until we find a sibling `assets/` dir.
import fsSync from 'node:fs';
const here = path.dirname(fileURLToPath(import.meta.url));
function findPkgRoot(start) {
    let dir = start;
    for (let i = 0; i < 5; i++) {
        if (fsSync.existsSync(path.join(dir, 'assets')) && fsSync.existsSync(path.join(dir, 'templates'))) {
            return dir;
        }
        const parent = path.dirname(dir);
        if (parent === dir)
            break;
        dir = parent;
    }
    throw new Error(`marketsui-mcp: could not locate assets/ + templates/ near ${start}`);
}
const pkgRoot = findPkgRoot(here);
export const TEMPLATE_DIR = path.join(pkgRoot, 'templates');
export const ASSET_DIR = path.join(pkgRoot, 'assets');
export const paths = {
    reactTemplate: path.join(TEMPLATE_DIR, 'react'),
    angularTemplate: path.join(TEMPLATE_DIR, 'angular'),
    designSystem: path.join(ASSET_DIR, 'design-system'),
};
