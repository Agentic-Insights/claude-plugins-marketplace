# Chain-of-Density Summarizer

Iterative text summarization using the Chain-of-Density (CoD) technique. Demonstrates Claude Code-native orchestration patterns.

## What is Chain-of-Density?

From the paper ["From Sparse to Dense: GPT-4 Summarization with Chain of Density Prompting"](https://arxiv.org/abs/2309.04269):

> Summaries often trade off brevity for completeness. Chain-of-Density solves this by iteratively densifying summaries—adding key entities while keeping length roughly constant.

## Installation

```bash
claude plugin install agentic-insights/foundry --path plugins/chain-of-density
```

Or clone and install locally:

```bash
git clone https://github.com/agentic-insights/foundry
claude plugin install ./foundry/plugins/chain-of-density
```

## Usage

The skill activates when you ask to summarize or condense text:

```
Summarize this document using chain-of-density technique:
[paste your text]
```

Or explicitly:

```
Use chain-of-density to compress this verbose skill to under 200 words:
[paste skill content]
```

## Architecture

This plugin demonstrates Claude Code's orchestration pattern:

```
┌─────────────────────────────────────┐
│  SKILL (chain-of-density/SKILL.md) │
│  Orchestrates via Task tool         │
└──────────────┬──────────────────────┘
               │ invokes serially
               ▼
┌─────────────────────────────────────┐
│  AGENT (cod-iteration.md)           │
│  Executes ONE iteration             │
│  Fresh context each call            │
└──────────────┬──────────────────────┘
               │ uses
               ▼
┌─────────────────────────────────────┐
│  SCRIPT (text_metrics.py)           │
│  Deterministic word/byte counts     │
└─────────────────────────────────────┘
```

**Key constraint**: Sub-agents cannot call other sub-agents. Only skills orchestrate.

## Components

| Component | Purpose |
|-----------|---------|
| `skills/chain-of-density/SKILL.md` | Orchestrator instructions |
| `agents/cod-iteration.md` | Single-iteration worker |
| `skills/chain-of-density/scripts/text_metrics.py` | Length enforcement |

## Example Output

**Input**: 500-word verbose documentation
**After 5 iterations**: ~175-word dense summary (65% compression)

Each iteration:
1. Base summary (establish length)
2. Add entity density (names, numbers, commands)
3. Add specificity (concrete examples)
4. Add context (why/when it matters)
5. Polish for nuance (resolve ambiguities)

## License

Apache-2.0
