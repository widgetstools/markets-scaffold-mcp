import path from 'node:path';
import fs from 'fs-extra';
/**
 * Files whose content should have `{{APP_NAME}}` replaced with the real app name.
 * Everything else is copied as-is (binary-safe).
 */
const TEXT_EXTENSIONS = new Set([
    '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs',
    '.json', '.html', '.css', '.scss', '.md', '.txt',
    '.yml', '.yaml', '.gitignore',
]);
function isTextFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    if (TEXT_EXTENSIONS.has(ext))
        return true;
    // handle dotfiles without extensions
    const base = path.basename(filePath);
    if (base.startsWith('.'))
        return true;
    return false;
}
/**
 * Recursively copy `from` → `to`, substituting `{{APP_NAME}}` inside text files.
 */
export async function copyTemplate({ from, to, appName }) {
    await fs.ensureDir(to);
    const entries = await fs.readdir(from, { withFileTypes: true });
    for (const entry of entries) {
        const src = path.join(from, entry.name);
        const dst = path.join(to, entry.name);
        if (entry.isDirectory()) {
            await copyTemplate({ from: src, to: dst, appName });
        }
        else if (entry.isFile()) {
            if (isTextFile(src)) {
                const content = await fs.readFile(src, 'utf8');
                const replaced = content.replaceAll('{{APP_NAME}}', appName);
                await fs.writeFile(dst, replaced, 'utf8');
            }
            else {
                await fs.copy(src, dst);
            }
        }
    }
}
