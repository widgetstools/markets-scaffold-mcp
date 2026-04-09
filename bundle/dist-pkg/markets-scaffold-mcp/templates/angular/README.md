# {{APP_NAME}}

An Angular 21 app preloaded with the **Markets Design System**, `@widgetstools/angular-dock-manager`, and a trading-style starter layout (Bond Blotter · Chart · Order Book).

Scaffolded by [`markets-scaffold-mcp`](https://github.com/your-org/markets-scaffold-mcp).

## Quick start

```bash
npm install
npm start
```

Open the dev server URL printed by `ng serve`. The top-right button toggles between **dark** and **light** mode.

## Project structure

```
{{APP_NAME}}/
├── design-system/              ← Markets design system (copied verbatim — do not edit)
│   ├── themes/                 ← fi-dark.css, fi-light.css, marketsui-*.css
│   ├── adapters/               ← ag-grid, shadcn, primeng adapters
│   ├── tokens/                 ← primitives, semantic, components
│   └── cell-renderers.ts
├── libs/                       ← Local .tgz tarballs (dock manager)
├── src/
│   ├── main.ts
│   ├── styles.scss             ← Imports design system theme CSS + dock manager styles
│   ├── index.html              ← <html data-theme="dark"> + <body data-ag-theme-mode="dark">
│   └── app/
│       ├── app.ts              ← Root component with DockManagerCore + ThemeToggle
│       ├── app.config.ts
│       ├── sample-data.ts      ← Static bonds, order book, candles
│       └── widgets/            ← bond-blotter / chart / order-book widgets
├── angular.json
└── tsconfig.json               ← Path mapping @design-system/* → design-system/*
```

## Design system usage

The design system lives at `./design-system/` at the app root.

### 1. Theme CSS

`src/styles.scss` imports the dark and light theme stylesheets:

```scss
@import '../design-system/themes/fi-dark.css';
@import '../design-system/themes/fi-light.css';
@import '@widgetstools/dock-manager-core/styles.css';
```

Dark mode is active when `<html data-theme="dark">`, light mode when `data-theme="light"`. The root `App` component owns an `isDark` signal and an `effect` writes the attribute on every toggle:

```ts
effect(() => {
  const mode = this.isDark() ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', mode);
  document.body.dataset['agThemeMode'] = mode;  // AG Grid uses this
});
```

### 2. TypeScript adapters

Framework adapters are imported under the `@design-system/*` path alias (configured in `tsconfig.json`):

**AG Grid** — [`src/app/widgets/bond-blotter.widget.ts`](./src/app/widgets/bond-blotter.widget.ts):

```ts
import { themeQuartz } from 'ag-grid-community';
import { agGridLightParams, agGridDarkParams } from '@design-system/adapters/ag-grid';

const fiGridTheme = themeQuartz
  .withParams(agGridLightParams as any, 'light')
  .withParams(agGridDarkParams as any, 'dark');
```

Pass `[theme]="fiGridTheme"` to any `<ag-grid-angular>`; rows automatically pick up dark/light mode from `document.body.dataset.agThemeMode`.

**PrimeNG** — to use PrimeNG with DS tokens, wire the preset in `app.config.ts`:

```ts
import { providePrimeNG } from 'primeng/config';
import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import { generatePrimeNGPreset } from '@design-system/adapters/primeng';

export const appConfig: ApplicationConfig = {
  providers: [
    providePrimeNG({ theme: { preset: definePreset(Aura, generatePrimeNGPreset()) } }),
  ],
};
```

**Cell renderers** — reusable AG Grid renderers live in `@design-system/cell-renderers`.

### 3. CSS variable reference

Most commonly used tokens (full list in `design-system/themes/fi-dark.css`):

| Category   | Variables                                                    |
|------------|--------------------------------------------------------------|
| Surfaces   | `--bn-bg`, `--bn-bg1`, `--bn-bg2`, `--bn-bg3`                |
| Text       | `--bn-t0`, `--bn-t1`, `--bn-t2`, `--bn-t3`                   |
| Borders    | `--bn-border`, `--bn-border2`                                |
| Accents    | `--bn-green`, `--bn-red`, `--bn-blue`, `--bn-cyan`, `--bn-yellow` |
| Typography | `--fi-sans`, `--fi-mono`, `--fi-font-xs`..`--fi-font-lg`     |

## Dock manager basics

The starter uses `@widgetstools/angular-dock-manager` (bundled in `libs/`). `app.ts` defines:

- **`WIDGETS`** — a `Record<string, Type<any>>` mapping widget type strings to Angular component classes
- **`INITIAL_LAYOUT`** — a `DockManagerState` describing splits, tab groups, and panels
- Passes both to `<dock-manager-core>` with `[theme]="dockTheme"`

To add a panel: create a standalone component, register it in `WIDGETS`, add it to `INITIAL_LAYOUT`, or call `addPanel()` via the API from the `(ready)` event.

## Upgrading the design system

The `design-system/` folder is a verbatim copy of the source-of-truth directory in `fi-trading-terminal`. Re-scaffold or `rsync` the folder to pull updates.
