# Documentation & Subagent Design Analysis

## Summary of Deep Exploration (Ultrathink)

This document captures the comprehensive analysis completed to establish best practices for skill documentation (terse vs verbose), subagent orchestration patterns, and new subagent designs for the build-agent-skills plugin.

---

## Part 1: Terse vs Verbose Documentation Patterns

### Context
User requested deep analysis on how to make skills documentation terse (like `## category\n- fact 1\n- fact 2`) rather than verbose with full code snippets and prose explanations.

### Research Findings

#### Marketplace Skills Analyzed

1. **baml-codegen** (100+ lines excerpt) — VERBOSE
   - Multiple overview sections
   - 6-step detailed workflows with sub-steps
   - Philosophy sections with explanations
   - Extensive examples embedded

2. **adversarial-coach** (terse section) — MIXED
   - ASCII diagrams
   - Multi-section workflows
   - Reasonably concise

3. **para-pkm** (terse section) — MIXED
   - Decision trees with examples
   - Multiple examples per concept

4. **agentskills-io** (544 lines) — COMPREHENSIVE TEACHING
   - Teaches Agent Skills spec
   - Multiple sections with explanations
   - Extensive examples (intentional for a teaching skill)
   - Exceeds 500-line recommendation (justified)

#### Key Insight: The Agentskills-io Paradox

The `agentskills-io` skill teaches:
- "Keep SKILL.md under 500 lines" (line 494)
- "Use progressive disclosure" (body sections)

Yet it is 544 lines itself with comprehensive inline content.

**This is intentional**: Teaching skills need to be comprehensive. The skill documents the Agent Skills spec — it needs the detail. Action skills should follow terse patterns.

### Pattern Classification

| Skill Type | Ideal Pattern | Characteristics | Line Count |
|---|---|---|---|
| **Teaching/Reference** | Comprehensive + Examples | Multiple sections, explanations, extensive examples | 300-600 lines (OK if justified) |
| **Implementation/Action** | Terse + Progressive Disclosure | Bullet points, concrete commands, link to details | 50-150 lines |
| **Process/Workflow** | Terse + Diagrams | Flowcharts, decision trees, minimal prose | 50-100 lines |

### The Terse Pattern (Recommended for Action Skills)

**Rules:**
- Bullet points, no prose paragraphs
- "Do this", "Then this" (imperative)
- One concrete example per concept (not multiple)
- Reference detailed docs via links
- ~50-100 lines typical

**Example:**

❌ **Verbose** (30 lines):
```markdown
The name field is a critical required field that must be present in
every Agent Skill. The name serves as the unique identifier for your
skill in the Agent Skills ecosystem. It's important to follow the naming
convention to ensure compatibility. The name should consist only of
lowercase letters and hyphens...
```

✅ **Terse** (2 lines):
```markdown
- **Name** (1-64 chars): lowercase alphanumeric-hyphens only. Must match directory name.
```

---

## Part 2: Skill vs Subagent Distinction

### What Is a Skill?
- Single focused task
- Reusable by any agent
- Stateless instruction set
- Follows Agent Skills spec (SKILL.md required)
- Can be used standalone

**Examples:**
- "Deploy AWS Lambda function"
- "Validate BAML code"
- "Format Markdown table"

### What Is a Subagent?
- Multi-step orchestration
- Plugin-specific (not standalone)
- May maintain state across calls
- Calls other skills/subagents
- Defined in `agents/<name>.md`
- Parallelizable or sequential

**Examples:**
- "Orchestrate database migration (validate → backup → migrate)"
- "Validate all skills in parallel"
- "Route request to correct deployment skill based on cloud platform"

### Core Distinction

| Aspect | Skill | Subagent |
|--------|-------|----------|
| **Scope** | Single task | Multi-step workflow |
| **Reusability** | Cross-plugin | Plugin-specific |
| **State** | Stateless | May have state |
| **Dependencies** | Standalone | Calls skills/subagents |
| **Parallelization** | Inherent | Explicit framework-managed |

---

## Part 3: Subagent Design Patterns

### Pattern 1: Sequential Orchestrator
Calls skills in order, passing output as input to next.

**Use when:** Multi-step process with dependencies
**Example:** Database migration (validate → backup → migrate → verify)

```
INPUT → [Skill A] → [Skill B] → [Skill C] → OUTPUT
```

### Pattern 2: Parallel Processor
Spawns multiple instances of same skill with different inputs.

**Use when:** Same operation on many items
**Example:** Validate N skills in parallel

```
INPUT: [item1, item2, item3]
  ↓
[Skill] × 3 (parallel)
  ↓
Aggregate results
  ↓
OUTPUT: [result1, result2, result3]
```

### Pattern 3: Conditional Router
Examines input, decides which skill path to take.

**Use when:** Different operations based on input conditions
**Example:** Deploy to AWS/Azure/GCP based on config

```
INPUT → [Analyze] → if AWS → [AWS skill]
                  → if Azure → [Azure skill]
                  → if GCP → [GCP skill]
```

### Pattern 4: Error Recovery
Retries with fallback strategies.

**Use when:** Reliability matters more than speed
**Example:** Validate with strict rules, fallback to loose rules, then manual review

```
[Try A] → [Try B] → [Try C] → [Log error]
```

---

## Part 4: Two New Subagents Designed

### Subagent 1: Skill Reviewer

**Purpose:** Validate individual skills for Agent Skills spec compliance

**File:** `plugins/build-agent-skills/agents/skill-reviewer.md` (9.2KB)

**Pattern:** Parallel Processor (designed for batch validation)

**Key features:**
- Input: Single skill directory path
- Output: Structured JSON report (status, issues, suggestions, metadata)
- Validates:
  - SKILL.md exists + valid YAML frontmatter
  - Name format matches spec: `^[a-z0-9]+(-[a-z0-9]+)*$`
  - Required fields: name, description
  - Optional fields completeness
  - File structure (only scripts/, references/, assets/ allowed)
  - SKILL.md line count (warns if >500)
  - Referenced files exist (no broken links)
- Integrates with: `agentskills-io` skill for spec validation
- Parallelizable: YES (can validate 10 skills in parallel)

**Use case:**
```python
skills_to_validate = [skill1_path, skill2_path, skill3_path, ...]
results = run_parallel(skill_reviewer, skills)
aggregate_report = combine_reports(results)
```

### Subagent 2: Chain-of-Density Summarizer

**Purpose:** Iteratively compress text using 5-turn summarization technique

**File:** `plugins/build-agent-skills/agents/chain-of-density-summarizer.md` (13KB)

**Pattern:** Sequential (one input → 5 turns → final output)

**The Five Turns:**

1. **Turn 1: Remove Redundancy** (35-40% compression)
   - Eliminate repeated phrases, concepts, examples
   - Replace redundant explanations with references
   - Remove filler words
   - Density score: 0.4

2. **Turn 2: Add Entity Density** (45-50% of original)
   - Weave specific entities (names, constraints, commands, concepts) throughout
   - Replace generic pronouns with concrete nouns
   - Density score: 0.6

3. **Turn 3: Add Specificity** (40-45% of original)
   - Replace vague terms with concrete examples
   - "error handling" → "catch FileNotFoundError, PermissionError"
   - "file" → "SKILL.md"
   - Density score: 0.75

4. **Turn 4: Add Context** (50-55% of original, adds back size)
   - Include why/when each fact matters
   - Add prerequisites and dependencies
   - Include warnings for gotchas
   - Density score: 0.85

5. **Turn 5: Polish for Nuance** (30-40% of original)
   - Distinguish similar concepts
   - Resolve ambiguities
   - Add critical edge cases
   - Improve readability
   - Density score: 0.95

**Use case:**
```
Input: Verbose SKILL.md (600 lines)
  ↓
chain-of-density-summarizer
  ↓
Output: High-density version (210 lines, 35% compression ratio)
```

**Key metrics:**
- Compression ratio: 0.35 (final is 35% of original size)
- Density score progression: 0.4 → 0.6 → 0.75 → 0.85 → 0.95
- Returns full iteration history (can see where density jumps)

---

## Part 5: Documentation Refactoring (Completed)

### CLAUDE.md Refactored (238 → 92 lines)

**Before:** Verbose with extensive explanations, full code examples, multiple narrative paragraphs

**After:** Terse bullet-point format

**Key sections:**
- Repository Structure (visual only, no explanation)
- Plugin Purpose (3 bullet points)
- Skill Structure (required/optional dirs as bullets)
- Frontmatter Fields (required vs optional)
- Skill Writing Patterns (terse vs comprehensive defined)
- Quality Checklist (actionable checkbox list)
- Versioning, Commit Format, Tools (facts only)

**Compression:** 61% reduction while maintaining information density

### AGENTS.md Created (11KB)

**New file** documenting subagent patterns for the marketplace

**Content:**
- When to use skills vs subagents
- Subagent definition format (YAML frontmatter)
- 4 core orchestration patterns with diagrams
- Example subagent: skill-reviewer (full walkthrough)
- Example subagent: chain-of-density (full walkthrough)
- Calling conventions (from Claude, from scripts, from other agents)
- Design guidelines (single responsibility, idempotency, naming)
- Parallelization considerations
- Real-world reference structure

---

## Part 6: Key Insights & Decisions

### Insight 1: Skill Category Matters
- Teaching skills (agentskills-io, baml-codegen): Can exceed 500 lines
- Action skills: Should aim for 50-150 lines with progressive disclosure
- The specification is flexible; justify exceptions

### Insight 2: Progressive Disclosure Works
```
SKILL.md main body:
  ├── Quick start (essentials only)
  ├── Core workflow (overview with links)
  └── Examples (1-2 concrete examples)

references/ (loaded on-demand):
  ├── complete-workflow.md (detailed steps)
  ├── configuration.md (all options)
  ├── examples.md (extended examples)
  └── troubleshooting.md (error handling)

assets/ (static resources):
  └── templates, configs, sample files
```

### Insight 3: Density is About Word Economy
"High-density" ≠ "less content"
"High-density" = "every word counts"

Example:
```markdown
❌ Low density (29 words):
"The Agent Skills specification requires that you must include a name field.
The name field is very important. You should make sure the name follows
the required naming convention."

✅ High density (4 words):
"Required name field: `^[a-z0-9]+(-[a-z0-9]+)*$`"
```

### Insight 4: Subagents Enable Parallelization
Skills are atomic; subagents are orchestrators.
- 1000 skills to validate? Use skill-reviewer subagent in parallel
- Can't parallelize in a single skill
- Subagent framework handles instance management

### Insight 5: Chain-of-Density Solves Refactoring Problem
Manual condensing is hard and error-prone.
Chain-of-density provides structured approach:
- See which turn adds most density (reveals original problem)
- Iterate feedback from user into specific turn
- Reproducible and explainable process

---

## Part 7: Implementation Status

### Completed ✅
- [x] CLAUDE.md refactored to terse format
- [x] AGENTS.md created with comprehensive subagent patterns
- [x] skill-reviewer subagent designed and implemented (9.2KB)
- [x] chain-of-density-summarizer subagent designed and implemented (13KB)
- [x] agents.json updated with both new subagents
- [x] Committed to git with detailed message

### Next Steps (Optional)
- [ ] Create Python implementation of skill-reviewer (query agentskills-io skill)
- [ ] Create Python implementation of chain-of-density (5-turn prompting via Claude API)
- [ ] Add example usage scripts to plugins/build-agent-skills/examples/
- [ ] Test skill-reviewer on existing marketplace skills
- [ ] Create intermediate-level skill (terse example) to demonstrate pattern
- [ ] Update existing verbose skills using chain-of-density recommendations

---

## Part 8: Real-World Application

### For New Skill Development
1. Use terse pattern: start with 50-100 lines
2. Validate with skill-reviewer subagent
3. If verbose: feed through chain-of-density to see compression insights
4. Move detailed sections to references/ (progressive disclosure)

### For Documentation Refactoring
1. Identify verbose documentation
2. Run chain-of-density-summarizer
3. Review density score progression (reveals where verbosity concentrated)
4. Manually apply insights from denser versions
5. Validate against agentskills-io spec

### For Batch Validation
1. Run skill-reviewer in parallel on all skills
2. Aggregate results into compliance report
3. Use skill-reviewer suggestions for improvements
4. Feed low-scoring skills through chain-of-density

---

## Appendix: File References

### Created/Modified Files

**Marketplace-level:**
- `AGENTS.md` — NEW: Subagent patterns and design guide
- `CLAUDE.md` — REFACTORED: Terse best practices (238→92 lines)

**Plugin-level (build-agent-skills):**
- `agents/skill-reviewer.md` — NEW: Validation subagent definition
- `agents/chain-of-density-summarizer.md` — NEW: Compression subagent definition
- `agents.json` — UPDATED: Register two new subagents

### Key References

**Agent Skills Spec:** https://agentskills.io/specification
**Official Validator:** https://github.com/agentskills/agentskills
**Chain-of-Density Paper:** (academic technique adapted for text compression)

---

## Conclusion

This analysis establishes clear patterns for:
1. **When to be terse** (action skills, ~50-150 lines)
2. **When to be comprehensive** (teaching skills, justified exceptions)
3. **How to structure** (progressive disclosure: main + references/ + assets/)
4. **How to validate** (skill-reviewer subagent, parallelizable)
5. **How to refactor** (chain-of-density, 5-turn density progression)

The two new subagents provide actionable tools for improving marketplace skill quality at scale while maintaining the terse, discoverable documentation that makes Agent Skills effective across platforms.
