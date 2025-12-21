---
name: para-pkm
description: Manage PARA-based personal knowledge management (PKM) systems using Projects, Areas, Resources, and Archives organization method. Use when users need to (1) Create a new PARA knowledge base, (2) Organize or reorganize existing knowledge bases into PARA structure, (3) Decide where content belongs in PARA (Projects vs Areas vs Resources vs Archives), (4) Create AI-friendly navigation files for knowledge bases, (5) Archive completed projects, (6) Validate PARA structure, or (7) Learn PARA organizational patterns for specific use cases (developers, consultants, researchers, etc.)
---

# PARA PKM Manager

Comprehensive toolkit for creating and managing PARA-based personal knowledge management systems.

## Overview

The PARA method organizes information by actionability:
- **Projects** = Time-bound goals with deadlines
- **Areas** = Ongoing responsibilities to maintain
- **Resources** = Reference material and topics of interest
- **Archives** = Inactive items from other categories

This skill provides scripts, templates, and guidance for implementing PARA effectively.

## Quick Start

### Creating a New PARA Knowledge Base

Use `scripts/init_para_kb.py` to scaffold a new PARA structure:

```bash
python scripts/init_para_kb.py my-knowledge-base
```

This creates:
```
my-knowledge-base/
├── projects/
│   ├── active/
│   └── stories/
├── areas/
├── resources/
├── archives/
├── README.md
└── AGENTS.md
```

### Decision Guide: Where Does Content Belong?

Use this decision tree:

```
Is it completed/inactive?
└─ YES → Archives
└─ NO ↓

Does it have a deadline or clear end state?
└─ YES → Projects
└─ NO ↓

Is it an ongoing responsibility to maintain?
└─ YES → Areas
└─ NO → Resources
```

**For detailed examples and edge cases**, see `references/decision-guide.md`.

## Common Tasks

### 1. Organizing Existing Content into PARA

**Workflow:**

1. **Identify current projects** - What are you actively working on with deadlines?
   - Create files in `projects/active/` for each
   - Use template: `assets/project.md.template`

2. **Identify ongoing areas** - What responsibilities do you maintain?
   - Create folders in `areas/` for each domain
   - Use template: `assets/area-overview.md.template`

3. **Move reference material** - Coding standards, templates, documentation?
   - Organize in `resources/` by topic

4. **Archive completed work** - Old projects, inactive areas?
   - Move to `archives/` using `scripts/archive_project.py`

5. **Create navigation** - Generate AI-friendly index:
   ```bash
   python scripts/generate_nav.py --kb-path path/to/kb/
   ```

**When unsure where something belongs**, temporarily put it in `resources/` and move it later as clarity emerges.

### 2. Deciding Projects vs Areas

**Projects have end states. Areas don't.**

Examples:
- "Get promoted to Senior Engineer" = **Project** (clear end)
- "Career development" = **Area** (ongoing)

- "Launch product by Q2" = **Project** (deadline)
- "Product development" (ongoing R&D) = **Area** (continuous)

- "Migrate to new CRM" = **Project** (finite task)
- "Client relationship management" = **Area** (ongoing responsibility)

**For more examples**, see `references/decision-guide.md`.

### 3. Handling Complex Scenarios

**Client work that's both project and relationship:**

```
projects/active/
  └── client-x.md              # Technical deliverables, current work

areas/consulting/clients/
  └── client-x.md              # Relationship notes, billing, history
```

Cross-reference between both files.

**Research with many experiments:**

```
areas/product-development/
  ├── active/                  # Shipping products
  ├── research/                # Experiments by category
  │   ├── image-generation/
  │   ├── voice/
  │   └── agents/
  ├── graduated/               # Ready to ship
  └── legacy/                  # Historical reference
```

**For proven patterns by role**, see `references/common-patterns.md`.

### 4. Creating AI-Friendly Navigation

Generate navigation file:

```bash
python scripts/generate_nav.py
```

Or use template:

```bash
cp assets/AGENTS.md.template AGENTS.md
# Edit to customize
```

**Key principles for AI navigation:**
- Keep under 100 lines
- Point to paths, don't list all files
- Include current active context
- Use minimal tokens

**For detailed best practices**, see `references/ai-navigation.md`.

### 5. Archiving Completed Projects

```bash
python scripts/archive_project.py projects/active/completed-project.md
```

This:
- Adds archive metadata (date, original location)
- Moves to `archives/` with timestamp
- Removes from `projects/active/`

### 6. Validating PARA Structure

```bash
python scripts/validate_para.py
```

Checks for:
- Required PARA folders exist
- Common anti-patterns (inbox/, todo/ folders)
- Navigation files present
- Structural issues

## PARA Principles

### Core Concepts

**Organize by actionability, not by topic.**

Traditional organization:
```
work/
personal/
hobbies/
```

PARA organization:
```
projects/     ← What needs attention NOW
areas/        ← What needs maintenance
resources/    ← What might be useful later
archives/     ← What's done
```

**For comprehensive PARA explanation**, see `references/para-principles.md`.

### Lifecycle of Content

Content naturally flows through PARA:

```
Resources → Projects → Archives
  (research)  (active work)  (completed)

Areas → Archives
  (ongoing)  (no longer responsible)

Projects ⟺ Areas
  (goal becomes ongoing or vice versa)
```

## Common Patterns by Role

### Software Developers
```
projects/active/          # Features, bugs, migrations
areas/
  ├── professional-development/
  └── open-source/
resources/
  ├── coding-standards/
  ├── platform-configs/
  └── library-preferences/
```

### Consultants
```
projects/active/          # Client deliverables
areas/consulting/
  ├── operations/         # Repeatable processes
  └── clients/            # Relationship management
resources/
  └── templates/          # Proposals, contracts
```

### Researchers
```
projects/active/          # Papers, grants with deadlines
areas/
  ├── research-program/   # Ongoing experiments
  ├── teaching/
  └── lab-management/
resources/
  └── literature-review/
```

### Product Builders
```
projects/active/          # Feature launches
areas/product-development/
  ├── active/             # Shipping products
  ├── research/           # Experiments
  ├── graduated/          # Ready to ship
  └── legacy/             # Historical
resources/
  ├── market-research/
  └── competitor-analysis/
```

**For detailed patterns and more roles**, see `references/common-patterns.md`.

## Anti-Patterns to Avoid

❌ **Inbox folder** - PARA doesn't need inbox. Capture directly into appropriate category.

❌ **Deep nesting** - Keep max 2-3 levels. Flat is better than nested.

❌ **Topic-based organization** - Don't split by "work" vs "personal". Split by actionability.

❌ **Perfectionism** - "Wrong" location is better than no organization. Move things as understanding evolves.

❌ **Todo folders** - Tasks should live with their projects/areas, not separately.

## Scripts Reference

### init_para_kb.py
Create new PARA knowledge base structure.

**Usage:**
```bash
python scripts/init_para_kb.py <kb-name> [--path <directory>]
```

### validate_para.py
Validate PARA structure and detect issues.

**Usage:**
```bash
python scripts/validate_para.py [path]
```

### archive_project.py
Move completed project to archives with metadata.

**Usage:**
```bash
python scripts/archive_project.py <project-file> [--kb-path <path>]
```

### generate_nav.py
Generate or update AI agent navigation index.

**Usage:**
```bash
python scripts/generate_nav.py [--kb-path <path>] [--output <file>]
```

## Templates

Use templates as starting points:

- `assets/AGENTS.md.template` - AI navigation index
- `assets/project.md.template` - Project file structure
- `assets/area-overview.md.template` - Area overview format
- `assets/README.md.template` - Knowledge base README

Copy and customize for your needs.

## Reference Documentation

**Comprehensive guides:**

- `references/para-principles.md` - Complete PARA method explanation, principles, common questions
- `references/decision-guide.md` - Detailed decision tree with examples for ambiguous cases
- `references/common-patterns.md` - Proven organizational patterns for different roles and use cases
- `references/ai-navigation.md` - Best practices for creating efficient AI-friendly navigation files

**When to read each:**

- **New to PARA?** → Start with `para-principles.md`
- **Unsure where content belongs?** → Check `decision-guide.md`
- **Setting up for specific role?** → See `common-patterns.md`
- **Creating navigation file?** → Review `ai-navigation.md`

## Tips for Success

1. **Start simple** - Begin with basic Projects/Areas/Resources/Archives. Add complexity only as needed.

2. **Projects first** - Ask "What am I working on right now?" Put everything else in Resources temporarily.

3. **Move freely** - Items naturally move between categories. Don't overthink initial placement.

4. **Review regularly** - Monthly review to archive completed projects and reassess areas.

5. **One home per item** - Avoid duplicating content. Use links to reference across categories.

6. **Keep it shallow** - Avoid deep folder hierarchies. Max 2-3 levels of nesting.

7. **Let patterns emerge** - Don't over-organize upfront. Structure will become clear through use.

## Integration with Your Workflow

**For AI assistants:**
- Reference AGENTS.md in your AI configuration
- AI will efficiently navigate using grep/glob
- Keep navigation file minimal (under 100 lines)

**For personal use:**
- Use file explorer or command line
- Leverage templates for consistency
- Run validation periodically

**For collaboration:**
- Keep PARA structure clear in README
- Cross-reference between related content
- Archive completed work regularly
