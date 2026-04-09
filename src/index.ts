#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { scaffoldReactApp, scaffoldReactInput } from './tools/scaffoldReact.js';
import { scaffoldAngularApp, scaffoldAngularInput } from './tools/scaffoldAngular.js';

const server = new McpServer({
  name: 'markets-scaffold-mcp',
  version: '0.1.0',
});

server.registerTool(
  'scaffold_markets_react_app',
  {
    description:
      'Scaffold a new React + Vite app preloaded with the Markets design system, dock manager, AG Grid, and a dark/light theme toggle. Produces a ready-to-run project at <targetDir>/<name>.',
    inputSchema: scaffoldReactInput.shape,
  },
  async (input) => {
    const result = await scaffoldReactApp(input as any);
    return {
      content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
    };
  },
);

server.registerTool(
  'scaffold_markets_angular_app',
  {
    description:
      'Scaffold a new Angular app preloaded with the Markets design system, dock manager, AG Grid, PrimeNG, and a dark/light theme toggle. Produces a ready-to-run project at <targetDir>/<name>.',
    inputSchema: scaffoldAngularInput.shape,
  },
  async (input) => {
    const result = await scaffoldAngularApp(input as any);
    return {
      content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
    };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // Keep stderr clean; MCP uses stdout for the protocol.
  process.stderr.write('markets-scaffold-mcp ready\n');
}

main().catch((err) => {
  process.stderr.write(`markets-scaffold-mcp fatal: ${err?.stack ?? err}\n`);
  process.exit(1);
});
