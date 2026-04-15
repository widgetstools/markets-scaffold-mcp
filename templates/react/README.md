# {{APP_NAME}}

A React + Vite app preloaded with the **Markets Design System**, `@widgetstools/react-dock-manager`, and a trading-style starter layout (Bond Blotter · Chart · Order Book).

Scaffolded by [`marketsui-mcp`](https://github.com/your-org/marketsui-mcp).

## Quick start

```bash
npm install
npm run dev
```

Open the dev server URL printed by Vite. The top-right button toggles between **dark** and **light** mode.

## Project structure

```
{{APP_NAME}}/
├── design-system/              ← Markets design system (copied verbatim — do not edit)
│   ├── themes/                 ← fi-dark.css, fi-light.css, marketsui-*.css
│   ├── adapters/               ← ag-grid, shadcn, primeng adapters
│   ├── tokens/                 ← primitives, semantic, components
│   └── cell-renderers.ts
├── libs/                       ← Local .tgz tarballs for packages that aren't on every corporate mirror (dock manager, lucide-react, tabby_ai-hijri-converter)
├── src/
│   ├── main.tsx                ← ThemeProvider wraps App
│   ├── App.tsx                 ← DockManagerCore + 3-panel layout + ThemeToggle
│   ├── index.css               ← Imports design system theme CSS + Tailwind
│   ├── context/ThemeContext.tsx
│   ├── components/
│   │   ├── ThemeToggle.tsx
│   │   └── panels/             ← BondBlotter, Chart, OrderBook
│   ├── data/sampleData.ts      ← Static fake bonds, order book, candles
│   └── lib/agGridTheme.ts      ← fiGridTheme wired to DS ag-grid adapter
├── vite.config.ts              ← Aliases @ → src, @design-system → design-system
└── tsconfig.app.json           ← Path mappings match vite aliases
```

## Design system usage

The design system lives at `./design-system/` at the app root and is imported two ways:

### 1. Theme CSS

`src/index.css` imports the dark and light theme stylesheets from the design system:

```css
@import '../design-system/themes/fi-dark.css';
@import '../design-system/themes/fi-light.css';
```

Both files declare CSS custom properties (`--bn-bg`, `--bn-t0`, `--bn-blue`, `--fi-mono`, etc.). Dark mode is active when `<html data-theme="dark">`, light mode when `data-theme="light"`.

The `ThemeProvider` in [`src/context/ThemeContext.tsx`](./src/context/ThemeContext.tsx) owns the state and writes the attribute on every toggle:

```tsx
document.documentElement.setAttribute('data-theme', theme);
document.body.dataset.agThemeMode = theme;  // AG Grid uses this
```

Toggle it from anywhere with the `useTheme()` hook:

```tsx
import { useTheme } from '@/context/ThemeContext';
const { isDark, toggleTheme } = useTheme();
```

### 2. TypeScript adapters

The design system also exports framework adapters under the `@design-system/*` path alias (configured in `tsconfig.app.json` and `vite.config.ts`):

**AG Grid** — [`src/lib/agGridTheme.ts`](./src/lib/agGridTheme.ts):

```ts
import { themeQuartz } from 'ag-grid-community';
import { agGridLightParams, agGridDarkParams } from '@design-system/adapters/ag-grid';

export const fiGridTheme = themeQuartz
  .withParams(agGridLightParams as any, 'light')
  .withParams(agGridDarkParams as any, 'dark');
```

Pass `theme={fiGridTheme}` to any `<AgGridReact />` instance; rows automatically pick up dark/light mode from `document.body.dataset.agThemeMode`.

**shadcn/ui** — if you add shadcn components, generate the HSL tokens from the design system:

```ts
import { generateShadcnCSS } from '@design-system/adapters/shadcn';
// emit into a <style> tag or a .css file at build time
```

**Cell renderers** — reusable AG Grid renderers live in `@design-system/cell-renderers`:

```ts
import { SideCellRenderer, RatingBadgeRenderer } from '@design-system/cell-renderers';
```

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

The starter uses `@widgetstools/react-dock-manager` (bundled in `libs/`). `App.tsx` defines:

- **`WIDGETS`** — a record mapping widget type strings to React components
- **`INITIAL_LAYOUT`** — a `DockManagerState` describing splits, tab groups, and panels
- Passes both to `<DockManagerCore>` with `theme={isDark ? slateDark : vsCodeLight}`

To add a panel: create a component, register it in `WIDGETS`, and either add it to `INITIAL_LAYOUT` or call `api.addPanel(...)` via `dockRef.current?.getApi()`.

## Upgrading the design system

The `design-system/` folder is a verbatim copy of the source-of-truth directory in `fi-trading-terminal`. Re-scaffold or `rsync` the folder to pull updates.
