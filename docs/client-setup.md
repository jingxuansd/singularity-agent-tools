# MCP Client Setup

This guide shows how to connect Singularity Agent Tools to MCP-compatible agent clients.

## Prerequisites

- Node.js 20 or newer
- A deployed or local Singularity Radar API
- A Singularity user API token with `research:read` scope
- This repository cloned locally

```bash
git clone https://github.com/jingxuansd/singularity-agent-tools.git
cd singularity-agent-tools
npm install
npm run build
```

## Configuration Values

Use these values in any MCP client:

| Field | Value |
| --- | --- |
| Command | `npm` |
| Args | `["run", "start", "--prefix", "/absolute/path/to/singularity-agent-tools"]` |
| Environment | `SINGULARITY_API_BASE_URL`, `SINGULARITY_API_TOKEN` |

## Claude Desktop

Add this to your Claude Desktop MCP config file and restart Claude Desktop.

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

## Cursor

Add a new MCP server in Cursor settings:

```json
{
  "singularity": {
    "command": "npm",
    "args": ["run", "start", "--prefix", "/absolute/path/to/singularity-agent-tools"],
    "env": {
      "SINGULARITY_API_BASE_URL": "https://your-singularity-domain.com",
      "SINGULARITY_API_TOKEN": "sgr_xxx"
    }
  }
}
```

## Local Singularity Development

When Singularity Radar is running locally:

```json
{
  "SINGULARITY_API_BASE_URL": "http://localhost:3000",
  "SINGULARITY_API_TOKEN": "sgr_xxx"
}
```

The token must still be created by the local Singularity app/database.

## Smoke Test Prompts

Use these prompts after connecting the MCP server:

```text
Use Singularity to get the latest market direction.
```

```text
Use Singularity to search for stocks with minLynchScore 70 and minRsRating 80.
```

```text
Use Singularity to analyze ticker 300750.
```

## Troubleshooting

If the client cannot see Singularity tools:

- Run `npm run build` again.
- Use an absolute path in `--prefix`.
- Restart the MCP client after editing config.
- Confirm Node.js 20+ is available to the client.

If requests return `401`:

- Confirm `SINGULARITY_API_TOKEN` starts with `sgr_`.
- Create a fresh token in Singularity Radar.
- Make sure the token has not expired or been revoked.

If requests return `404`:

- Confirm `SINGULARITY_API_BASE_URL` points to the Singularity Radar app, not this MCP server.
- Confirm the deployed app includes the agent-facing API routes.
