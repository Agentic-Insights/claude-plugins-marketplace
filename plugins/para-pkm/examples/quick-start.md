# PARA PKM Quick Start Example

This example demonstrates how to use the para-pkm skill to create and organize a personal knowledge base.

## Scenario

You're a software developer who wants to organize your notes, projects, and resources using the PARA method.

## Step 1: Create Knowledge Base

```bash
cd ~/projects/foundry/plugins/para-pkm
python skills/para-pkm/scripts/init_para_kb.py my-dev-kb
```

**Output:**
```
Created PARA knowledge base at: my-dev-kb/
├── projects/
│   ├── active/
│   └── stories/
├── areas/
├── resources/
├── archives/
├── README.md
└── AGENTS.md
```

## Step 2: Add Your First Project

**Create** `my-dev-kb/projects/active/api-migration.md`:

```markdown
# API Migration to GraphQL

## Overview
Migrate REST API to GraphQL by end of Q1 2025.

## Status
Active - In Progress

## Deadline
2025-03-31

## Tasks
- [ ] Design GraphQL schema
- [ ] Set up Apollo Server
- [ ] Create resolver functions
- [ ] Update client queries
- [ ] Write tests
- [ ] Deploy to staging

## Notes
- Consider using DataLoader for batching
- Need to maintain REST endpoints during transition
```

## Step 3: Create an Area for Ongoing Work

**Create** `my-dev-kb/areas/professional-development/README.md`:

```markdown
# Professional Development

Ongoing learning and career growth.

## Current Focus
- Learning GraphQL best practices
- Building side projects
- Contributing to open source

## Resources
- Online courses in `/resources/learning/`
- Conference talks in `/resources/talks/`

## Goals
- Get promoted to Senior Engineer
- Speak at a tech conference
```

## Step 4: Add Reference Resources

**Create** `my-dev-kb/resources/coding-standards/graphql.md`:

```markdown
# GraphQL Coding Standards

## Naming Conventions
- Types: PascalCase (e.g., `UserProfile`)
- Fields: camelCase (e.g., `firstName`)
- Enums: SCREAMING_SNAKE_CASE (e.g., `USER_ROLE`)

## Schema Organization
- Group related types together
- Use interfaces for shared fields
- Document with descriptions

## Best Practices
- Always add descriptions to types and fields
- Use non-null (!) judiciously
- Prefer granular types over large objects
```

## Step 5: Validate Structure

```bash
python skills/para-pkm/scripts/validate_para.py my-dev-kb
```

**Output:**
```
✓ PARA structure valid
✓ All required folders present
✓ Navigation file exists
✓ No anti-patterns detected
```

## Step 6: Generate AI Navigation

```bash
python skills/para-pkm/scripts/generate_nav.py --kb-path my-dev-kb
```

**Output** `my-dev-kb/AGENTS.md`:

```markdown
# AI Agent Navigation - Dev Knowledge Base

## Current Focus
Active project: API Migration to GraphQL (projects/active/api-migration.md)

## Structure
- projects/active/ - Current work with deadlines
- areas/ - Ongoing responsibilities (professional-development, open-source)
- resources/ - Reference material (coding-standards, learning, talks)
- archives/ - Completed/inactive items

## Quick Access
- GraphQL resources: resources/coding-standards/graphql.md
- Learning materials: resources/learning/
- Career notes: areas/professional-development/

## Recent Updates
- 2025-12-21: Created API migration project
- 2025-12-21: Initialized knowledge base
```

## Step 7: Complete and Archive Project

When the API migration is complete:

```bash
python skills/para-pkm/scripts/archive_project.py \
  my-dev-kb/projects/active/api-migration.md \
  --kb-path my-dev-kb
```

**Result:**
- File moved to `archives/2025-12-21-api-migration.md`
- Metadata added (archive date, original location)
- Removed from `projects/active/`

## Decision Examples

### Example 1: Client Work

**Question:** Where should I put notes about a client project?

**Answer:** Depends on the content:
- **Deliverable work** (has deadline) → `projects/active/client-x-feature.md`
- **Relationship notes** (ongoing) → `areas/consulting/clients/client-x.md`

You can have both! Cross-reference between them.

### Example 2: Learning Material

**Question:** I'm learning React. Where should this go?

**Answer:**
- **Tutorial you're working through** (active, has end) → `projects/active/learn-react.md`
- **React documentation** (reference) → `resources/learning/react-docs.md`
- **Career learning goal** (ongoing) → Mention in `areas/professional-development/`

### Example 3: Side Project

**Question:** My side project has been running for a year. Project or Area?

**Answer:** Ask: "Does it have a clear end state?"
- **Launching an MVP by date** → Project
- **Ongoing experimentation** → Area (e.g., `areas/side-projects/`)
- **Completed and inactive** → Archives

## Tips

1. **When in doubt, use Resources** - Move to correct location as clarity emerges
2. **Projects are temporary** - Most projects should archive within 3-6 months
3. **Review monthly** - Archive completed work, reassess areas
4. **Keep it flat** - Avoid deep folder hierarchies
5. **One home per item** - Use links instead of duplicating content

## Next Steps

- Add more projects to `projects/active/`
- Organize existing notes into PARA structure
- Set up monthly review reminder
- Customize templates in `skills/para-pkm/assets/`
- Explore reference docs in `skills/para-pkm/references/`
