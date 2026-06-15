# Singularity Agent Tools

Agent-facing tools for Singularity Radar investment research workflows.

This project exposes Singularity Radar capabilities through:

- MCP tools for agent clients such as Codex, Claude Desktop, and Cursor
- A typed TypeScript client for Singularity platform APIs
- An OpenAPI contract for HTTP-based integrations

The tools are research-only. They provide screening context, model outputs, evidence, and risk notes. They do not provide personalized investment advice.

## Quick Start

```bash
npm install
cp .env.example .env
npm run dev
```

## Environment

| Variable | Purpose |
| --- | --- |
| `SINGULARITY_API_BASE_URL` | Base URL for the Singularity Radar app/API |
| `SINGULARITY_API_TOKEN` | User API token created inside Singularity Radar |

Create a token from Singularity Radar through `POST /api/tokens` while signed in. The raw token is returned once and should be stored in the agent client's secret storage.

## MCP Tools

| Tool | Purpose |
| --- | --- |
| `singularity_get_market_direction` | Read latest market direction analysis |
| `singularity_search_stocks` | Screen A-share stocks with research filters |
| `singularity_analyze_stock` | Analyze one stock by ticker |
| `singularity_get_sell_signals` | Compute sell-signal context for a ticker |
| `singularity_generate_research_brief` | Produce a structured research brief |

## Development

```bash
npm run typecheck
npm run build
```
