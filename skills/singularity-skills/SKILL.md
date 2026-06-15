---
name: singularity-skills
description: Use Singularity Radar as an AI-agent research skill for Chinese A-share investment research. Trigger when a user wants to use Singularity Radar through an agent, request or configure Singularity API tokens, screen A-share stocks, analyze market direction, inspect stock signals, generate research briefs, or interpret Singularity's research-only investment outputs.
---

# Singularity Skills

Use this skill when helping a user connect an AI agent to Singularity Radar or interpret Singularity Radar investment research.

## Research Boundary

Treat all Singularity outputs as research-only. Do not present results as personalized investment advice. Separate facts, model scores, interpretation, and risks. Include the data date when the upstream response provides it.

## What Singularity Provides

Singularity Radar is an AI-driven stock discovery engine for Chinese A-share market research. It combines:

- Market direction analysis based on O'Neil-style distribution-day logic.
- Industry inventory-cycle analysis.
- Stock screening based on Peter Lynch-style growth, PEG, institutional ownership, and quality factors.
- Technical context such as RS Rating, moving-average alignment, volume tightness, and sell-risk signals.

## Installation

Install globally for Agent Skills hosts such as Codex, Cursor, Claude Code, Gemini CLI, Copilot, and other compatible agents:

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

## Token Setup

The user should create a Singularity API token inside the Singularity Radar platform. The token should have at least:

```text
research:read
```

The raw token is shown once by Singularity Radar. Never ask the user to paste tokens into chat unless there is no safer local configuration path.

## How To Use

If the current agent environment has direct tools or APIs for Singularity Radar, use them. If no direct tools are available, guide the user to:

1. Sign in to Singularity Radar.
2. Create a user API token.
3. Provide the token to their chosen agent integration through local secret storage or environment configuration.
4. Ask research questions in terms of market direction, industry cycle, stock screening, individual stock analysis, or sell-risk context.

## Research Workflows

- For broad market regime questions, start with market direction.
- For discovery and filtering, combine market direction, industry context, and stock factors.
- For one ticker, explain fundamentals, technicals, valuation, risks, and data freshness.
- For exit-risk questions, emphasize sell-signal evidence and uncertainty instead of giving trade instructions.
- For narrative output, produce a structured research brief with findings, evidence, risks, and follow-up questions.

## Output Style

When summarizing results:

- Say "research signal", "watchlist candidate", or "risk flag" instead of "buy" or "sell".
- Explain the evidence behind scores.
- Include valuation, technical, market-regime, and data-quality risks when present.
- State when the platform response is missing fields or appears stale.

## Example Prompts

```text
Use Singularity to summarize the latest A-share market direction.
```

```text
Use Singularity to find A-share companies with strong Lynch score, high RS Rating, and reasonable PEG.
```

```text
Use Singularity to analyze 300750 and separate facts, model signals, interpretation, and risks.
```
