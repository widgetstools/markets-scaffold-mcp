import { spawn } from 'node:child_process';
/**
 * Run `npm install` inside the newly scaffolded directory.
 * Returns a promise that resolves once the process exits (non-zero exits reject).
 */
export function runNpmInstall(cwd) {
    return new Promise((resolve, reject) => {
        const child = spawn('npm', ['install'], {
            cwd,
            stdio: 'inherit',
            shell: process.platform === 'win32',
        });
        child.on('error', reject);
        child.on('exit', (code) => {
            if (code === 0)
                resolve();
            else
                reject(new Error(`npm install exited with code ${code}`));
        });
    });
}
