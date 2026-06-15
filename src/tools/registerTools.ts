import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { SingularityClient } from "../client/singularityClient.js";
import {
  researchBriefSchema,
  searchStocksSchema,
  tickerSchema,
} from "./schemas.js";

function toTextContent(data: unknown) {
  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}

export function registerTools(server: McpServer, client: SingularityClient) {
  server.tool(
    "singularity_get_market_direction",
    "Get latest O'Neil-style market direction analysis from Singularity Radar. Research-only; not investment advice.",
    {},
    async () => toTextContent(await client.getMarketDirection()),
  );

  server.tool(
    "singularity_search_stocks",
    "Screen A-share stocks using Singularity Radar factors such as Lynch score, RS Rating, PEG, and industry context.",
    searchStocksSchema,
    async (input) => toTextContent(await client.searchStocks(input)),
  );

  server.tool(
    "singularity_analyze_stock",
    "Analyze one A-share stock by ticker with Singularity Radar fundamental, technical, and risk signals.",
    tickerSchema,
    async ({ ticker }) => toTextContent(await client.analyzeStock(ticker)),
  );

  server.tool(
    "singularity_get_sell_signals",
    "Get research-only O'Neil/Lynch sell-signal context for one A-share ticker.",
    tickerSchema,
    async ({ ticker }) => toTextContent(await client.getSellSignals(ticker)),
  );

  server.tool(
    "singularity_generate_research_brief",
    "Generate a structured Singularity Radar research brief for a ticker or topic. Research-only; not personalized investment advice.",
    researchBriefSchema,
    async (input) => toTextContent(await client.generateResearchBrief(input)),
  );
}
