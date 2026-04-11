import path from 'node:path';
import fs from 'fs-extra';
import { paths } from '../util/paths.js';
/**
 * Copy the shared design-system directory into `<target>/design-system`.
 */
export async function copyDesignSystem(target) {
    const dst = path.join(target, 'design-system');
    await fs.copy(paths.designSystem, dst, { overwrite: true });
}
