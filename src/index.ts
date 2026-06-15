import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SingularityClient } from "./client/singularityClient.js";
import { loadConfig } from "./config.js";
import { registerTools } from "./tools/registerTools.js";

const config = loadConfig();

const server = new McpServer({
  name: "singularity-agent-tools",
  version: "0.1.0",
});

const client = new SingularityClient({
  baseUrl: config.singularityApiBaseUrl,
  apiKey: config.singularityApiToken,
});

registerTools(server, client);

const transport = new StdioServerTransport();
await server.connect(transport);
