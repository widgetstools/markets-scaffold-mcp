import path from 'node:path';
import fs from 'fs-extra';
import { paths } from '../util/paths.js';

/**
 * Copy the shared design-system directory into `<target>/design-system`.
 */
export async function copyDesignSystem(target: string): Promise<void> {
  const dst = path.join(target, 'design-system');
  await fs.copy(paths.designSystem, dst, { overwrite: true });
}

/**
 * Copy all framework-specific .tgz libs into `<target>/libs`.
 */
export async function copyLibs(target: string, framework: 'react' | 'angular'): Promise<void> {
  const srcDir = framework === 'react' ? paths.reactLibs : paths.angularLibs;
  const dstDir = path.join(target, 'libs');
  await fs.ensureDir(dstDir);
  const entries = await fs.readdir(srcDir);
  for (const name of entries) {
    if (name.endsWith('.tgz')) {
      await fs.copy(path.join(srcDir, name), path.join(dstDir, name));
    }
  }
}
