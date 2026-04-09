# markets-scaffold-mcp

A local [Model Context Protocol](https://modelcontextprotocol.io) server that scaffolds new React or Angular apps preloaded with the **Markets design system**, `@widgetstools/dock-manager`, AG Grid (themed via DS adapters), and a dark/light theme toggle.

From any MCP-capable client (Claude Desktop, Claude Code, MCP Inspector, …) you can say:

> *scaffold markets react app at ~/apps/my-demo*

and get a ready-to-run project with pinned deps, the full `design-system/` tree, and a trading-style dock layout (bond blotter + candlestick chart + order book).

---

## What you get

Each scaffolded app contains:

- **`design-system/`** — verbatim copy of the Markets DS (themes, adapters, cell renderers), as a sibling of `src/`.
- **`libs/*.tgz`** — local tarballs for `@widgetstools/dock-manager-core`, the framework-specific dock manager, and (React) `react-day-picker` + `tabby_ai-hijri-converter`. Referenced as `file:libs/*.tgz` in `package.json`.
- **Theme toggle** — top-right sun/moon button; flips `data-theme` on `<html>` and `body.dataset.agThemeMode` for AG Grid; persisted to `localStorage`.
- **Dock layout** — 3 panels in a `DockManagerCore` (blotter / chart / order book) using sample data.
- **README** with a Design System usage section (CSS imports, `@design-system/*` path alias, AG Grid + shadcn/PrimeNG adapters, CSS variable reference).

---

## Install

Clone and build locally:

```bash
git clone <this-repo> markets-scaffold-mcp
cd markets-scaffold-mcp
npm install
npm run build
```

Optionally link the `bin` globally:

```bash
npm link          # exposes `markets-scaffold-mcp` on PATH
```

---

## Run

The server speaks MCP over stdio. You normally don't run it by hand — an MCP client launches it. For a quick sanity check:

```bash
npx @modelcontextprotocol/inspector node dist/index.js
```

Then in the inspector UI, invoke `scaffold_markets_react_app` with:

```json
{ "name": "my-demo", "targetDir": "/tmp/scaffold-test", "runInstall": false }
```

---

## Register with an MCP client

### Claude Desktop

Edit `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or the equivalent on your platform:

```json
{
  "mcpServers": {
    "markets-scaffold": {
      "command": "node",
      "args": ["/absolute/path/to/markets-scaffold-mcp/dist/index.js"]
    }
  }
}
```

If you ran `npm link`, you can use the bin directly:

```json
{
  "mcpServers": {
    "markets-scaffold": { "command": "markets-scaffold-mcp" }
  }
}
```

Restart Claude Desktop. You should see the `scaffold_markets_react_app` and `scaffold_markets_angular_app` tools available.

### Claude Code

```bash
claude mcp add markets-scaffold -- node /absolute/path/to/markets-scaffold-mcp/dist/index.js
```

---

## Tools

### `scaffold_markets_react_app`

| Field | Type | Default | Description |
|---|---|---|---|
| `name` | string | — | App name (valid npm package name). |
| `targetDir` | string | — | Parent directory; app is created at `<targetDir>/<name>`. Absolute paths recommended. |
| `runInstall` | boolean | `false` | If true, runs `npm install` inside the new app. |

Returns `{ path, framework: "react", nextSteps: [...] }`.

### `scaffold_markets_angular_app`

Same input shape; produces an Angular 21 + PrimeNG + AG Grid app. Returns `{ path, framework: "angular", nextSteps: [...] }`.

---

## Example session

```
user: scaffold markets react app called demo at /tmp/scaffold-test

assistant: (calls scaffold_markets_react_app)

→ /tmp/scaffold-test/demo
  cd /tmp/scaffold-test/demo
  npm install
  npm run dev
```

The dev server boots at `http://localhost:5173`, shows the dock layout, and the top-right toggle switches between dark and light themes.

---

## Repo layout

```
markets-scaffold-mcp/
├── src/
│   ├── index.ts              # MCP server entrypoint (stdio)
│   ├── tools/                # scaffold_markets_{react,angular}_app
│   ├── scaffold/             # copyTemplate, copyAssets, postInstall
│   └── util/paths.ts
├── templates/
│   ├── react/                # React + Vite app skeleton
│   └── angular/              # Angular app skeleton
└── assets/
    ├── design-system/        # verbatim DS copy
    └── libs/{react,angular}/ # pinned .tgz tarballs
```

To refresh pinned versions, re-copy `design-system/` and re-run `npm pack` on the dock-manager packages, then drop the tarballs into `assets/libs/*/`.

---

## Development

```bash
npm run dev      # tsc --watch
npm run build    # tsc
npm start        # node dist/index.js
```
