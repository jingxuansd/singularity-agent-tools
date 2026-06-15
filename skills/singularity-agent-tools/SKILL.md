---
name: singularity-agent-tools
description: Use Singularity Radar as an AI-agent research platform for Chinese A-share investment research. Trigger when a user wants an agent to connect to Singularity Radar, configure Singularity API tokens, install the Singularity MCP server, screen A-share stocks, analyze market direction, inspect stock signals, generate research briefs, or understand Singularity's research-only investment outputs.
---

# Singularity Agent Tools

Use this skill when helping a user connect an AI agent to Singularity Radar or run research through Singularity Radar tools.

## Research Boundary

Treat all outputs as research-only. Do not present results as personalized investment advice. Separate facts, model scores, interpretation, and risks. Include the data date when the upstream response provides it.

## First Check

Determine whether Singularity MCP tools are already available in the current agent session:

- `singularity_get_market_direction`
- `singularity_search_stocks`
- `singularity_analyze_stock`
- `singularity_get_sell_signals`
- `singularity_generate_research_brief`

If the tools are available, use them directly. If they are not available, guide the user through MCP server installation and token setup.

## Installation

For Skill installation in Codex, Cursor, Claude Code, Gemini CLI, Copilot, or other Agent Skills hosts:

```bash
npx skills add jingxuansd/singularity-agent-tools -g
```

For MCP runtime installation:

```bash
git clone https://github.com/jingxuansd/singularity-agent-tools.git
cd singularity-agent-tools
npm install
npm run build
```

The `npx skills add` command installs these agent instructions. The MCP runtime still needs the repository checkout plus Node dependencies if the user wants live tools.

## Token Setup

The user should create a Singularity API token inside the Singularity Radar platform. The token should have at least:

```text
research:read
```

Store it in the MCP client environment:

```bash
SINGULARITY_API_BASE_URL=https://your-singularity-domain.com
SINGULARITY_API_TOKEN=sgr_xxx
```

The raw token is shown once by Singularity Radar. Never ask the user to paste tokens into chat unless there is no safer local configuration path.

## MCP Client Config

Use an absolute path to the cloned runtime:

```json
{
  "mcpServers": {
    "singularity": {
      "command": "npm",
      "args": ["run", "start", "--prefix", "/absolute/path/to/singularity-agent-tools"],
      "env": {
        "SINGULARITY_API_BASE_URL": "https://your-singularity-domain.com",
        "SINGULARITY_API_TOKEN": "sgr_xxx"
      }
    }
  }
}
```

If the user runs Singularity Radar locally, use:

```text
SINGULARITY_API_BASE_URL=http://localhost:3000
```

## Tool Selection

- For broad market regime questions, call `singularity_get_market_direction`.
- For discovery and filtering, call `singularity_search_stocks`.
- For one ticker, call `singularity_analyze_stock`.
- For exit-risk or risk-management context, call `singularity_get_sell_signals`.
- For narrative output, call `singularity_generate_research_brief`.

## Output Style

When summarizing results:

- Say "research signal", "watchlist candidate", or "risk flag" instead of "buy" or "sell".
- Explain the evidence behind scores.
- Include valuation, technical, market-regime, and data-quality risks when present.
- State when the platform response is missing fields or appears stale.

## Troubleshooting

If the agent cannot see Singularity tools:

1. Confirm the Skill was installed with `npx skills add jingxuansd/singularity-agent-tools -g`.
2. Confirm the MCP server repo was cloned and `npm run build` succeeded.
3. Confirm the MCP client config uses an absolute path.
4. Restart the MCP client.

If API calls return `401`, ask the user to create a fresh Singularity API token and check that it was not revoked or expired.
