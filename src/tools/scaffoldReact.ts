import path from 'node:path';
import fs from 'fs-extra';
import { z } from 'zod';
import { paths } from '../util/paths.js';
import { copyTemplate } from '../scaffold/copyTemplate.js';
import { copyDesignSystem } from '../scaffold/copyAssets.js';
import { runNpmInstall } from '../scaffold/postInstall.js';

export const scaffoldReactInput = z.object({
  name: z
    .string()
    .min(1)
    .regex(/^[a-z0-9][a-z0-9-_]*$/i, 'name must be a valid package name (letters, digits, - or _)'),
  targetDir: z
    .string()
    .min(1)
    .describe('Parent directory where the app will be created. Absolute paths recommended.'),
  runInstall: z.boolean().optional().default(false),
});

export type ScaffoldReactInput = z.infer<typeof scaffoldReactInput>;

export interface ScaffoldResult {
  path: string;
  framework: 'react' | 'angular';
  nextSteps: string[];
}

export async function scaffoldReactApp(input: ScaffoldReactInput): Promise<ScaffoldResult> {
  const { name, targetDir, runInstall } = input;
  const appPath = path.resolve(targetDir, name);

  if (await fs.pathExists(appPath)) {
    const entries = await fs.readdir(appPath);
    if (entries.length > 0) {
      throw new Error(`Target directory is not empty: ${appPath}`);
    }
  }

  await fs.ensureDir(appPath);
  await copyTemplate({ from: paths.reactTemplate, to: appPath, appName: name });
  await copyDesignSystem(appPath);

  if (runInstall) {
    await runNpmInstall(appPath);
  }

  return {
    path: appPath,
    framework: 'react',
    nextSteps: runInstall
      ? [`cd ${appPath}`, 'npm run dev']
      : [`cd ${appPath}`, 'npm install', 'npm run dev'],
  };
}
