---
name: chain-of-density
description: "Iteratively densify text summaries using Chain-of-Density technique. Use when compressing verbose documentation, condensing requirements, or creating executive summaries while preserving information density."
license: Apache-2.0
compatibility: "Python 3.10+ (for text_metrics.py script via uv run)"
metadata:
  author: agentic-insights
  version: "1.1"
  paper: "From Sparse to Dense: GPT-4 Summarization with Chain of Density Prompting"
---

# Chain-of-Density Summarization

Compress text through iterative entity injection. Each pass identifies missing entities from the source and incorporates them while maintaining constant length.

## The Method

Chain-of-Density works by:
1. Starting with a **sparse, verbose summary** (~80 words with filler phrases)
2. Each iteration **identifies 1-3 missing entities** from the source
3. **Rewriting** to include them WITHOUT increasing length
4. **Compressing** filler to make room (fusion, removing "this discusses", etc.)

**Key principle**: Never drop entities from previous iterations - only add and compress.

## Quick Start

1. User provides text to summarize
2. You orchestrate 3-5 iterations via `cod-iteration` agent
3. Each iteration reports which entities it added
4. Return final summary + entity accumulation history

## Orchestration Pattern

```
Iteration 1: Sparse base (~80 words, verbose filler)
     ↓ Adding: (none)
Iteration 2: +3 entities, compress filler
     ↓ Adding: "entity1"; "entity2"; "entity3"
Iteration 3: +3 entities, compress more
     ↓ Adding: "entity4"; "entity5"; "entity6"
Iteration 4: +2 entities, polish
     ↓ Adding: "entity7"; "entity8"
Iteration 5: +1-2 entities, final density
     ↓ Adding: "entity9"
Final dense summary (same length, 9+ entities)
```

## How to Orchestrate

**Iteration 1** - Pass source text only:

```
Task(subagent_type="cod-iteration", prompt="""
iteration: 1
target_words: 80
text: [SOURCE TEXT HERE]
""")
```

**Iterations 2-5** - Pass BOTH previous summary AND source:

```
Task(subagent_type="cod-iteration", prompt="""
iteration: 2
target_words: 80
text: [PREVIOUS SUMMARY HERE]
source: [ORIGINAL SOURCE TEXT HERE]
""")
```

**Critical**:
- Invoke serially, not parallel
- Pass the SOURCE text in every iteration so the agent can identify missing entities
- Parse the "Adding:" line from each response to track entity accumulation

## Expected Agent Output Format

The `cod-iteration` agent returns:

```
Adding: "entity1"; "entity2"; "entity3"

Summary:
[The densified summary text]
```

Parse both parts - track entities for history, pass summary to next iteration.

## Measuring Density

Use `scripts/text_metrics.py` for deterministic word counts:

```bash
echo "your summary text" | uv run scripts/text_metrics.py words
# Returns: word count

uv run scripts/text_metrics.py metrics "your summary text"
# Returns: {"words": N, "chars": N, "bytes": N}
```

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| iterations | 5 | Number of density passes (3-5 recommended) |
| target_words | 80 | Word count to maintain across all iterations |
| return_history | false | Include all intermediate summaries + entities |

## Output Format

### Minimal (default)
```
[Final dense summary text]
```

### With History (return_history=true)
```yaml
final_summary: |
  [Dense summary]
iterations:
  - turn: 1
    adding: "(none - base summary)"
    words: 82
    summary: |
      [Sparse iteration 1]
  - turn: 2
    adding: "entity1; entity2; entity3"
    words: 80
    summary: |
      [Denser iteration 2]
  # ... etc
total_entities: 9
compression_ratio: 0.35
```

## When to Use

- Verbose documentation exceeding 500 words
- Requirements documents needing condensation
- Creating executive summaries from detailed reports
- Compressing skills that exceed 500 lines

## When NOT to Use

- Legal/compliance text (precision required)
- Tutorial content (beginners need explanation)
- Already concise content (<300 words)
- Specifications (don't compress specs)

## Example

**Source** (verbose skill excerpt, 180 words):
```
The name field is a required field that must be present in every skill.
The name field identifies the skill and must follow a specific format.
For the name field, you should use lowercase letters and hyphens only.
The name field can be 1 to 64 characters long. The description field
is also required and tells agents when to use your skill...
```

**Iteration 1** (Sparse, ~80 words):
```
Adding: (none - base summary)

Summary:
This document discusses the requirements for skill configuration fields. It covers various aspects of how fields should be formatted and what values they can contain. The document also mentions validation rules and provides guidance on best practices. Additionally, it includes information about optional and required elements that developers need to consider when creating skills.
```

**Iteration 3** (After 2 densification passes):
```
Adding: "1-64 characters"; "lowercase alphanumeric-hyphens"; "Use when phrase"

Summary:
Skills require `name` (1-64 chars, lowercase alphanumeric-hyphens) and `description` fields. The name identifies the skill; description tells agents when to invoke it. Include "Use when..." phrase for auto-discovery. Validation enforces format rules.
```

**Final** (Iteration 5):
```
Adding: "Claude Code"; "Cursor"; "GitHub Copilot"

Summary:
Required: `name` (1-64 chars, ^[a-z0-9]+(-[a-z0-9]+)*$) and `description` (1-1024 chars). Description must include "Use when..." + discovery keywords for agent auto-invocation across Claude Code, Cursor, GitHub Copilot.
```

## Architecture Note

This skill demonstrates **Claude Code orchestration**:
- Skill = orchestrator (this file)
- Agent = stateless worker (`cod-iteration`)
- Script = deterministic utility (`text_metrics.py`)

Sub-agents cannot call other sub-agents. Only skills orchestrate via Task tool.
