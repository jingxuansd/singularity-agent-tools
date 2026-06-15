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

Singularity Radar should issue user API tokens from the main product. Tokens should be stored in the user's agent integration or local secret storage, not pasted into prompts.

Required minimum scope:

```text
research:read
```

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
