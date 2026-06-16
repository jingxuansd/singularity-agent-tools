# Singularity Skills

Agent Skill instructions for Singularity Radar investment research workflows.

This repository is intentionally lightweight. It only ships an Agent Skill, not an MCP server, SDK, OpenAPI client, or Node runtime.

## Install

Install globally for Codex, Cursor, Claude Code, Gemini CLI, Copilot, and other Agent Skills hosts:

```bash
npx skills add jingxuansd/singularity-skills -g
```

Update later:

```bash
npx skills update singularity-skills -g
```

For a project-local install, omit `-g`:

```bash
npx skills add jingxuansd/singularity-skills
```

The Skill lives at [skills/singularity-skills/SKILL.md](skills/singularity-skills/SKILL.md).

## What It Does

Singularity Skills teaches an agent how to use Singularity Radar for Chinese A-share research:

- Market direction analysis
- Industry inventory-cycle analysis
- Peter Lynch-style stock screening
- O'Neil-style technical and sell-risk context
- Research-only briefs with evidence and risk notes

The Skill is research-only. It helps agents describe findings, scores, evidence, and risks. It should not produce personalized investment advice.

## Token Management

Singularity Radar issues user API tokens from the main product settings page.

1. Sign in to Singularity Radar.
2. Open `/{locale}/settings`, for example `/zh/settings` or `/en/settings`.
3. Create a token and choose an expiration period.
4. Copy the token immediately. The full token is shown only once.
5. Store it in your agent integration, shell secret store, or local environment file.

Tokens should be stored in the user's agent integration or local secret storage, not pasted into prompts.

Required minimum scope:

```text
research:read
```

### Verify A Token

Use the token verification endpoint before wiring an external tool:

```bash
curl https://your-singularity-domain.com/api/tokens/verify \
  -H "Authorization: Bearer sgr_xxx"
```

Expected success response:

```json
{
  "ok": true,
  "token": {
    "name": "Agent research token",
    "scopes": ["research:read"],
    "expiresAt": "2026-09-14T00:00:00.000Z"
  }
}
```

### Call Research APIs

Use the token as a Bearer token:

```bash
curl https://your-singularity-domain.com/api/market-direction \
  -H "Authorization: Bearer sgr_xxx"
```

For local development:

```bash
curl http://localhost:3000/api/market-direction \
  -H "Authorization: Bearer sgr_xxx"
```

If a bad token is provided, token-protected APIs should return `401` or `403`.

### Agent Environment Pattern

For custom agents or scripts, store:

```bash
SINGULARITY_API_BASE_URL=https://your-singularity-domain.com
SINGULARITY_API_TOKEN=sgr_xxx
```

Then send requests with:

```text
Authorization: Bearer ${SINGULARITY_API_TOKEN}
```

### Rotate Or Revoke

Return to `/{locale}/settings` to revoke a token. Create a new token when:

- The old token expires.
- A token may have been exposed.
- You are moving an integration to another machine or agent client.

## Example Agent Prompts

```text
Use Singularity to summarize the current A-share market direction.
```

```text
Use Singularity to find A-share companies with Lynch score above 75, RS Rating above 80, and PEG below 1.5.
```

```text
Use Singularity to analyze ticker 300750 and separate facts, model signals, and risks.
```
