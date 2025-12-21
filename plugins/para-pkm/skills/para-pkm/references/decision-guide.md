# PARA Decision Guide: Where Does Content Belong?

Quick reference for deciding which PARA category content belongs in.

## Decision Tree

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

## Quick Examples

### Projects (Time-bound, has deadline)
✅ "Launch new website by Q2"
✅ "Write research paper for May conference"
✅ "Client engagement: Build auth system"
✅ "Job hunt 2025"
✅ "Plan wedding by June"

❌ "Career development" (no end state → Area)
❌ "Web development notes" (reference → Resource)

### Areas (Ongoing responsibility)
✅ "Health & fitness"
✅ "Business operations" (LLC management)
✅ "Product development" (ongoing R&D)
✅ "Professional development"
✅ "Home maintenance"

❌ "Get promoted" (has end state → Project)
❌ "Python best practices" (reference → Resource)

### Resources (Reference material)
✅ "Coding standards"
✅ "Design patterns reference"
✅ "Career materials" (resume templates, etc.)
✅ "Platform configurations"
✅ "Library preferences"

❌ "Update coding standards" (actionable → Project)
❌ "Maintain design system" (ongoing → Area)

### Archives (Inactive)
✅ "Completed project from 2024"
✅ "Old consulting engagement"
✅ "Previous job hunt materials"
✅ "Deprecated documentation"

## Common Scenarios

### Scenario: Client Consulting Work

**Question**: "I'm a consultant with 3 active clients. Where do they go?"

**Answer**: Depends on the nature:

**Option 1: Client work is time-bound projects**
```
projects/active/
  ├── client-a.md          # Technical work, deliverables
  ├── client-b.md
  └── client-c.md
```

**Option 2: Consulting is ongoing business**
```
areas/consulting/
  ├── operations/          # Workflows, invoicing
  └── clients/
      ├── client-a.md      # Relationship, meetings, notes
      ├── client-b.md
      └── client-c.md
```

**Option 3: Both (recommended for complex consulting)**
```
projects/active/
  ├── client-a.md          # Technical work, current sprint

areas/consulting/
  ├── operations/
  └── clients/
      └── client-a.md      # Relationship, billing, history
```

### Scenario: Research Experiments

**Question**: "I'm experimenting with AI models. Where does research go?"

**Answer**: Depends on stage:

**Active research/experiments** → Area
```
areas/product-development/research/
  ├── image-generation/
  │   └── flux-experiments.md
  └── voice/
      └── tts-research.md
```

**Research for specific project** → Project
```
projects/active/
  └── build-image-gen-api.md    # Include relevant research here
```

**Published research / general knowledge** → Resource
```
resources/research-papers/
  └── diffusion-models.md       # Reference material
```

### Scenario: Stories for Job Applications

**Question**: "I need project descriptions for job applications. Where do they go?"

**Answer**: Depends on purpose:

**Active job hunting** → Project
```
projects/
  ├── active/
  │   └── job-hunt-2025.md     # Current applications, interviews
  └── stories/
      ├── project-x-story.md   # Full narratives
      └── fragments/
          └── hipaa-deployment.md  # Reusable pieces
```

**General career materials** → Resource
```
resources/career-materials/
  ├── resume-template.md
  ├── linkedin-profile.md
  └── elevator-pitch.md
```

### Scenario: Learning New Technology

**Question**: "I'm learning Rust. Where do learning materials go?"

**Answer**: Depends on context:

**Learning for specific project** → Include in project
```
projects/active/
  └── port-to-rust.md         # Include learning notes here
```

**General skill development** → Area
```
areas/professional-development/
  └── rust-learning.md
```

**Reference/cheat sheets** → Resource
```
resources/coding-standards/
  └── rust-patterns.md
```

**After proficiency** → Resource
```
resources/library-preferences/
  └── rust-stack.md
```

### Scenario: Business Operations

**Question**: "I run an LLC. Is that a Project or Area?"

**Answer**: **Area** (ongoing responsibility)

```
areas/business-name/
  ├── _overview.md           # LLC details, positioning
  ├── operations/
  │   ├── invoicing.md
  │   ├── client-onboarding.md
  │   └── crm.md
  └── clients/               # If consulting business
      └── ...
```

Specific business goals can be Projects:
```
projects/active/
  └── get-to-10-clients-q2.md    # Time-bound goal
```

### Scenario: Mixed Purpose Content

**Question**: "My consulting clients are also technical projects I'm building. Where do they go?"

**Answer**: **Both** - split concerns:

**Technical work** → Projects
```
projects/active/
  └── client-x.md
      # Technical architecture
      # Current sprint work
      # Code repositories
```

**Business relationship** → Areas
```
areas/consulting/clients/
  └── client-x.md
      # Contract details
      # Meeting notes
      # Invoicing history
```

Cross-reference between them in each file.

## Edge Cases

### Graduate Projects to Areas

Sometimes a project becomes ongoing:

**Example**: "Build knowledge base" (Project) → "Maintain knowledge base" (Area)

**Process**:
1. Mark project as complete in `projects/active/build-kb.md`
2. Archive with `scripts/archive_project.py`
3. Create `areas/knowledge-management/kb-maintenance.md`

### Split Large Areas

When an Area grows too large, split it:

**Before**:
```
areas/
  └── product-development.md    # Too much in one file
```

**After**:
```
areas/product-development/
  ├── _overview.md
  ├── active/                   # Active products
  ├── research/                 # Research experiments
  ├── graduated/                # Ready to publish
  └── legacy/                   # Historical reference
```

### Temporary Projects

Short projects (< 1 week) can sometimes just be todos:

**Tiny task**: "Fix broken link" → Just do it
**Small project**: "Reorganize notes" → Maybe still a project
**Medium project**: "Migrate to new system" → Definitely a project

Use judgment. PARA is flexible.

## Checklist for Ambiguous Content

When unsure, ask:

- [ ] Does it have a deadline? → Projects
- [ ] Is it ongoing responsibility? → Areas
- [ ] Is it reference material? → Resources
- [ ] Is it inactive? → Archives
- [ ] Will I work on it this week/month? → Projects or Areas
- [ ] Might I need it someday? → Resources

When still unsure: **Put it in Resources temporarily**. Move it later as clarity emerges.
