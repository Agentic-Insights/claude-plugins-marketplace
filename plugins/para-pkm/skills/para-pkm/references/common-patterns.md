# Common PARA Patterns

Proven organizational patterns for different use cases and personas.

## Table of Contents

1. Software Developers
2. Consultants & Freelancers
3. Researchers & Academics
4. Product Builders
5. Career Professionals
6. Multi-Role Individuals

## 1. Software Developers

### Basic Structure
```
projects/
  └── active/
      ├── feature-x.md
      ├── bug-fix-y.md
      └── migration-z.md

areas/
  ├── professional-development/
  │   ├── learning-rust.md
  │   └── system-design-mastery.md
  └── open-source/
      ├── project-a-maintenance.md
      └── community-involvement.md

resources/
  ├── coding-standards/
  │   ├── general-principles.md
  │   ├── language-specifics.md
  │   └── testing-practices.md
  ├── platform-configs/
  │   ├── vscode-setup.md
  │   ├── git-workflow.md
  │   └── dev-environment.md
  └── library-preferences/
      ├── frontend-stack.md
      ├── backend-stack.md
      └── data-tools.md
```

### Key Patterns
- **Active projects** = Features, bugs, migrations with deadlines
- **Professional development** = Ongoing skill building
- **Resources** = Reusable standards and configs
- **No "work" vs "personal" split** = Organized by actionability

## 2. Consultants & Freelancers

### Basic Structure
```
projects/
  └── active/
      ├── client-a-project.md      # Technical deliverables
      ├── client-b-project.md
      └── proposal-client-c.md      # Active proposals

areas/
  └── consulting-business/
      ├── _overview.md              # Business details
      ├── operations/
      │   ├── client-onboarding.md
      │   ├── invoicing-workflow.md
      │   ├── crm-system.md
      │   └── consulting-standards.md
      └── clients/
          ├── client-a.md           # Relationship notes
          └── client-b.md

resources/
  ├── proposal-templates/
  ├── contract-templates/
  └── service-offerings/
      ├── audit-package.md
      └── implementation-package.md
```

### Key Patterns
- **Dual tracking**: Technical work (Projects) + Business relationship (Areas)
- **Operations in Areas**: Repeatable processes
- **Clients in both places**: Active engagement (Project) + Ongoing relationship (Area)
- **Templates as Resources**: Reusable proposal/contract templates

### Alternative: Simple Consulting
If you have just a few clients and simple operations:
```
projects/
  └── active/
      ├── client-a.md              # Everything in one place
      └── client-b.md

resources/
  └── consulting-templates/
```

## 3. Researchers & Academics

### Basic Structure
```
projects/
  ├── active/
  │   ├── paper-for-may-conference.md
  │   ├── grant-proposal-nsf.md
  │   └── dataset-collection.md
  └── stories/                     # For job market
      └── research-narratives/

areas/
  ├── teaching/
  │   ├── course-fall-2025.md
  │   └── advising.md
  ├── lab-management/
  └── research-program/
      ├── _overview.md
      └── experiments/
          ├── experiment-a/
          └── experiment-b/

resources/
  ├── literature-review/
  │   └── papers-by-topic/
  ├── methodologies/
  └── datasets/
```

### Key Patterns
- **Projects** = Papers, grants, specific experiments with deadlines
- **Research program** = Ongoing area with sub-experiments
- **Literature** = Resources, not Projects
- **Teaching** = Ongoing area (courses change each semester but teaching continues)

## 4. Product Builders

### Basic Structure
```
projects/
  └── active/
      ├── launch-feature-x.md
      ├── customer-feedback-q1.md
      └── partnership-with-y.md

areas/
  └── product-development/
      ├── _overview.md
      ├── active/                  # Shipping products
      │   ├── product-a.md
      │   └── product-b.md
      ├── research/                # Experiments
      │   ├── ai-features/
      │   ├── voice-integration/
      │   └── image-generation/
      ├── graduated/               # Ready to launch/publish
      │   └── _ready-to-ship.md
      └── legacy/                  # Past products
          └── product-archive.md

resources/
  ├── market-research/
  ├── user-feedback/
  └── competitor-analysis/
```

### Key Patterns
- **Research pipeline**: Experiments → Validation → Graduation → Ship
- **Active products** in Areas (ongoing), **feature launches** in Projects (time-bound)
- **Graduated folder** = Ready to promote from research to production
- **Resources** = Market intelligence, not active work

## 5. Career Professionals

### Basic Structure
```
projects/
  ├── active/
  │   ├── job-hunt-2025.md
  │   ├── promotion-packet.md
  │   └── conference-talk-june.md
  └── stories/
      ├── _index.md
      ├── project-a-narrative.md   # Full stories
      ├── project-b-narrative.md
      └── fragments/               # Atomic pieces
          ├── leadership-example.md
          └── technical-achievement.md

areas/
  ├── career-development/
  │   ├── skill-building.md
  │   ├── networking.md
  │   └── thought-leadership.md
  └── professional-network/

resources/
  └── career-materials/
      ├── resume-templates.md
      ├── linkedin-profile.md
      ├── cover-letter-templates.md
      └── interview-prep.md
```

### Key Patterns
- **Stories for applications**: Full narratives + atomic fragments for remixing
- **Job hunt** = Project (time-bound goal)
- **Career development** = Area (ongoing)
- **Templates** = Resources (reusable)

## 6. Multi-Role Individuals

Example: Developer + Consultant + Product Builder + Job Seeker

### Basic Structure
```
projects/
  ├── active/
  │   ├── client-x.md              # Consulting
  │   ├── feature-y.md             # Day job
  │   ├── launch-side-project.md   # Product
  │   └── job-hunt-2025.md         # Career
  └── stories/                     # Career materials
      └── ...

areas/
  ├── consulting-business/         # Consulting role
  │   └── ...
  ├── professional-development/    # Career growth
  │   └── ...
  └── product-development/         # Side projects
      └── ...

resources/
  ├── coding-standards/            # Developer resources
  ├── consulting-templates/        # Consulting resources
  └── career-materials/            # Career resources

archives/
  └── ...
```

### Key Patterns
- **Don't separate by role** (no "work/" vs "consulting/" vs "side-projects/")
- **Organize by actionability**, regardless of role
- **Areas capture ongoing responsibilities** across all roles
- **Projects track time-bound goals** from any role
- **Resources organized by topic**, accessible to all roles

## Cross-Cutting Patterns

### Pattern: Nested Areas
When an Area grows complex, nest it:

```
areas/
  └── business-name/
      ├── _overview.md             # Area overview
      ├── operations/              # Sub-area
      ├── clients/                 # Sub-area
      └── marketing/               # Sub-area
```

**Guidelines**:
- Keep depth to 2-3 levels maximum
- Each level should have `_overview.md` or similar
- Only nest when truly needed (>10 files at one level)

### Pattern: Project Stories
For portfolios, job applications, case studies:

```
projects/
  └── stories/
      ├── _index.md                # Master catalog
      ├── project-a.md             # Full narrative
      ├── project-b.md
      └── fragments/               # Atomic pieces
          ├── leadership.md
          ├── technical-deep-dive.md
          └── business-impact.md
```

**Usage**:
- **Full narratives** = Complete project stories
- **Fragments** = Reusable pieces you can mix for applications
- **Index** = Quick reference of all stories

### Pattern: Research Organization
For extensive experimentation:

```
areas/
  └── research/
      ├── _categories.md           # Index of research areas
      ├── category-a/
      │   ├── experiment-1.md
      │   └── experiment-2.md
      └── category-b/
          └── experiment-3.md
```

**Usage**:
- Organize by technology/domain, not by date
- `_categories.md` provides overview
- Move successful experiments to `graduated/` when ready

### Pattern: AI Navigation
For AI-assisted knowledge bases:

```
AGENTS.md                          # Root navigation file
  └── References:
      ├── projects/active/*
      ├── areas/business/*
      ├── areas/product-dev/*
      └── resources/*
```

**Best practices**:
- Keep AGENTS.md under 100 lines
- Use minimal tokens
- Point to specific paths for grep/glob
- Update when structure changes significantly

### Pattern: Graduated Content
Track items ready to transition:

```
areas/
  └── product-development/
      ├── research/                # Experiments
      │   └── ...
      ├── graduated/               # Ready to ship
      │   └── _ready-to-ship.md
      └── active/                  # Shipping
          └── ...
```

Or for content creation:

```
areas/
  └── thought-leadership/
      ├── ideas/                   # Raw ideas
      ├── drafts/                  # Being written
      └── graduated/               # Ready to publish
          └── _ready-for-blog.md
```

## Choosing Your Pattern

1. **Start simple**: Begin with basic Projects/Areas/Resources/Archives
2. **Let patterns emerge**: Don't over-organize upfront
3. **Copy proven patterns**: Use examples above as templates
4. **Adapt as needed**: Patterns should serve you, not constrain you
5. **Review periodically**: Reorganize as your needs evolve

Remember: PARA is flexible. These patterns are starting points, not rules.
