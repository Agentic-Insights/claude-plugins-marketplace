# AI Navigation Best Practices

Guidelines for creating efficient AI agent navigation files (AGENTS.md, CLAUDE.md, etc.)

## Purpose

AI navigation files help AI agents efficiently explore PARA knowledge bases with minimal token usage. They serve as entry points that guide AI agents to relevant information without loading unnecessary context.

## Core Principle: Minimal Token Usage

**Every token counts.** Navigation files share the context window with:
- System prompts
- Conversation history
- Tool outputs
- Actual work content

Keep navigation files under 100 lines when possible.

## Essential Elements

### 1. Purpose Statement (1-2 lines)
Tell the AI what this knowledge base is for.

**Good:**
```markdown
**Purpose**: PARA-based PKM system for John's coding projects and career development.
```

**Too verbose:**
```markdown
**Purpose**: This is a comprehensive knowledge management system that helps
organize all aspects of life including work, personal projects, learning,
and more. It uses the PARA method which stands for Projects, Areas, Resources,
and Archives, created by Tiago Forte...
```

### 2. Quick Lookup Paths
Direct paths to common queries, not explanations.

**Good:**
```markdown
## Quick Lookup Paths

**Active projects**: `projects/active/`
**Job hunt materials**: `projects/stories/`, `resources/career-materials/`
**Consulting ops**: `areas/consulting/operations/`
**Coding standards**: `resources/coding-standards/`
```

**Too verbose:**
```markdown
## Quick Lookup Paths

**Active Projects**: Located in the projects/active/ directory. This is where
you'll find all currently ongoing projects including client work, personal
projects, and any other time-bound goals...
```

### 3. Current Context (When Relevant)
What's actually happening now, not capabilities.

**Good:**
```markdown
## Current Projects (Nov 2025)

**Active client work**:
- homeshow-ai, nitch-labs, distro

**Personal**:
- job-hunt-2025 (Principal/Staff AI roles, $350-450K target)
```

**Unnecessary if nothing active:**
```markdown
## Structure Available

You can put projects in projects/active/ when you have projects...
```

### 4. PARA Structure (Brief reminder)
Short definition, not tutorial.

**Good:**
```markdown
## PARA Structure

```
projects/     = Time-bound goals with deadlines
areas/        = Ongoing responsibilities
resources/    = Reference material
archives/     = Completed/inactive work
```
```

**Too much:**
```markdown
## PARA Method Explanation

PARA stands for Projects, Areas, Resources, and Archives. It was created by
Tiago Forte and is designed to organize information by actionability...

[5 more paragraphs]
```

### 5. Navigation Instructions (1-2 lines)
How to find things, not what to find.

**Good:**
```markdown
Use grep to find specific topics. Use glob for file patterns.
```

**Overkill:**
```markdown
To find information in this knowledge base, you can use several strategies:
1. Use the grep tool with relevant keywords
2. Use glob patterns to find files by name
3. Read the overview files in each area
4. Check the index files marked with _index.md
...
```

## Anti-Patterns to Avoid

### ❌ Explaining PARA Method
Don't explain what PARA is. AI models already know. Just show the structure.

### ❌ Listing All Files
Don't list every file. Show the structure, let AI grep/glob.

**Bad:**
```markdown
Projects:
- projects/active/project-a.md
- projects/active/project-b.md
- projects/active/project-c.md
[...50 more files...]
```

**Good:**
```markdown
**Active projects**: `projects/active/`
```

### ❌ Usage Instructions
Don't explain how to use the KB. Focus on navigation.

**Bad:**
```markdown
## How to Use This Knowledge Base

When you want to add a new project, create a file in projects/active/.
When you complete a project, move it to archives/.
```

**Good:**
Just show where things are. AI will figure out usage from PARA principles.

### ❌ Duplicate Information
Don't repeat what's in individual files.

**Bad:**
```markdown
## Consulting Business

Overview: LLC in Austin, TX. Founded 2024. Focus on AI consulting.
Clients: homeshow-ai, nitch-labs, distro
Services: Security audits ($5-10K), Implementations ($15-25K)
```

**Good:**
```markdown
**Consulting business**: `areas/consulting/` (overview, clients, operations)
```

### ❌ Detailed File Descriptions
Don't describe file contents in navigation.

**Bad:**
```markdown
- coding-standards.md - Contains our Python style guide, testing practices,
  code review checklist, and general programming principles following clean
  code guidelines
```

**Good:**
```markdown
- `resources/coding-standards/`
```

## Progressive Disclosure

Navigation file → grep/glob → read specific files

**Navigation provides:**
- High-level structure
- Entry points for search
- Current active context

**Agent discovers through tools:**
- Specific file contents
- Detailed information
- Related documents

## Template

```markdown
# AI Agent Navigation Index

**Purpose**: [One line description]

## Quick Lookup Paths

**Key area 1**: `path/to/area/`
**Key area 2**: `path/to/area/`
[Only the most common queries]

## Current Context

[Optional: What's actually active right now]

## PARA Structure

```
projects/     = Time-bound goals
areas/        = Ongoing responsibilities
resources/    = Reference material
archives/     = Completed work
```

## Navigation Tips

Use grep for keywords. Use glob for patterns.
```

Total: ~30-50 lines

## Examples from Real Knowledge Bases

### Example 1: Developer
```markdown
# AI Agent Navigation Index

**Purpose**: Personal PKM for coding projects and career development.

## Quick Lookup Paths

**Coding preferences**: `resources/coding-standards/`
**Active projects**: `projects/active/`
**Career materials**: `resources/career-materials/`

## PARA Structure

```
projects/     = Time-bound goals
areas/        = Ongoing responsibilities
resources/    = Reference material
archives/     = Completed work
```

Use grep to find topics.
```

### Example 2: Consultant
```markdown
# AI Agent Navigation Index

**Purpose**: PARA PKM for consulting business and client work.

## Quick Lookup Paths

**Active clients**: `projects/active/` (technical), `areas/consulting/clients/` (relationships)
**Operations**: `areas/consulting/operations/`
**Proposals**: `resources/templates/`

## Current Clients (Dec 2025)
- client-a, client-b, client-c

## PARA Structure

```
projects/     = Time-bound goals
areas/        = Ongoing responsibilities
resources/    = Reference material
archives/     = Completed work
```
```

### Example 3: Multi-Role
```markdown
# AI Agent Navigation Index

**Purpose**: PKM for software engineering, consulting, and product development.

## Quick Lookup Paths

**Coding prefs**: `resources/coding-standards/`
**Active projects**: `projects/active/`
**Consulting**: `areas/consulting/`
**Product R&D**: `areas/product-development/`
**Career materials**: `projects/stories/`, `resources/career-materials/`

## Current Work (Nov 2025)

**Consulting**: 3 active clients (homeshow-ai, nitch-labs, distro)
**Products**: mem8-cli, neocortx, dreamgen
**Career**: Job hunt 2025 (Principal/Staff AI, $350-450K)

## PARA Structure

```
projects/     = Time-bound goals
areas/        = Ongoing responsibilities
resources/    = Reference material
archives/     = Completed work
```
```

## Updating Navigation

### When to Update

Update AGENTS.md when:
- Major structural changes (new Areas added)
- Active projects change significantly
- New patterns emerge in usage

Don't update for:
- Individual file additions
- Minor tweaks
- Content updates within existing files

### Using generate_nav.py

Script can scaffold navigation automatically:

```bash
python scripts/generate_nav.py --kb-path ~/my-kb/
```

Then customize the generated file with:
- Current context
- Key lookup paths
- Domain-specific guidance

## Multiple AI Systems

If using multiple AI systems, consider:

**Option 1: Single file, multiple names**
```bash
AGENTS.md
CLAUDE.md → (reference to AGENTS.md)
```

**Option 2: System-specific files**
```bash
AGENTS.md      # Generic
CLAUDE.md      # Claude-specific context
COPILOT.md     # Copilot-specific
```

Keep all versions minimal. Different AI systems don't need different organizations.

## Key Takeaway

**Less is more.** Navigation files guide, they don't explain. Point to paths, let AI explore using tools.

Target: 30-100 lines
Maximum: 150 lines

If longer, split content:
- Core navigation stays in AGENTS.md
- Detailed context goes in area overviews
- Domain knowledge goes in resources/
