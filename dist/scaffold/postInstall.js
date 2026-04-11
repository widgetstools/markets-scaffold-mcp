import { spawn } from 'node:child_process';
/**
 * Run `npm ci` inside the newly scaffolded directory.
 * Uses the shipped package-lock.json + .npmrc (offline=true) for fully offline installs.
 */
export function runNpmInstall(cwd) {
    return new Promise((resolve, reject) => {
        const child = spawn('npm', ['ci'], {
            cwd,
            stdio: 'inherit',
            shell: process.platform === 'win32',
        });
        child.on('error', reject);
        child.on('exit', (code) => {
            if (code === 0)
                resolve();
            else
                reject(new Error(`npm ci exited with code ${code}`));
        });
    });
}
