# Singularity Agent Tools

Agent-facing tools for Singularity Radar investment research workflows.

This project exposes Singularity Radar capabilities through:

- MCP tools for agent clients such as Codex, Claude Desktop, and Cursor
- A typed TypeScript client for Singularity platform APIs
- An OpenAPI contract for HTTP-based integrations

The tools are research-only. They provide screening context, model outputs, evidence, and risk notes. They do not provide personalized investment advice.

## Install Options

### Install the Skill

Use this when you want Codex, Cursor, Claude Code, Gemini CLI, Copilot, or another Agent Skills host to understand how to use Singularity Radar:

```bash
npx skills add jingxuansd/singularity-agent-tools -g
```

Update later:

```bash
npx skills update singularity-agent-tools -g
```

The Skill lives at [skills/singularity-agent-tools/SKILL.md](skills/singularity-agent-tools/SKILL.md).

### Install the MCP Runtime

Use this when you want live MCP tools that call Singularity Radar:

```bash
git clone https://github.com/jingxuansd/singularity-agent-tools.git
cd singularity-agent-tools
npm install
npm run build
```

The `npx skills add` path installs the agent instructions. The MCP runtime still needs this repository checkout and Node dependencies.

## Quick Start

### 1. Create a Singularity API token

Sign in to Singularity Radar and create a user API token.

The platform should return the raw token once. Store it somewhere safe; the server only keeps a hash and cannot show the token again.

Until the product UI is available, create a token from an authenticated browser/session:

```bash
curl -X POST "https://your-singularity-domain.com/api/tokens" \
  -H "content-type: application/json" \
  -b "your-authenticated-cookie" \
  -d '{
    "name": "Claude Desktop",
    "scopes": ["research:read"]
  }'
```

Use the returned `token` as `SINGULARITY_API_TOKEN`.

### 2. Install this MCP server

```bash
git clone https://github.com/jingxuansd/singularity-agent-tools.git
cd singularity-agent-tools
npm install
cp .env.example .env
npm run build
```

Edit `.env`:

```bash
SINGULARITY_API_BASE_URL=https://your-singularity-domain.com
SINGULARITY_API_TOKEN=sgr_xxx
```

### 3. Verify it starts

```bash
npm run dev
```

The server uses stdio MCP transport, so it waits for an MCP client to connect. Use `Ctrl+C` to stop the manual run.

### 4. Connect an agent client

Most MCP clients need a command and environment variables:

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

Build first if your client uses `npm run start`:

```bash
npm run build
```

For more client examples, see [docs/client-setup.md](docs/client-setup.md).

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

## Example Agent Prompts

After the MCP server is connected, ask your agent:

```text
Use Singularity to summarize the current A-share market direction.
```

```text
Use Singularity to find A-share companies with Lynch score above 75, RS Rating above 80, and PEG below 1.5.
```

```text
Use Singularity to analyze ticker 300750 and separate facts, model signals, and risks.
```

## Token Management

List your tokens:

```bash
curl "https://your-singularity-domain.com/api/tokens" \
  -b "your-authenticated-cookie"
```

Revoke a token:

```bash
curl -X DELETE "https://your-singularity-domain.com/api/tokens/{token_id}" \
  -b "your-authenticated-cookie"
```

Do not commit `.env` or paste tokens into prompts.

## Development

```bash
npm run typecheck
npm run build
```
