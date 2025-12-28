# Migration Plan: Marketplace Browser → agenticinsights.com

## Current State

```
foundry-frontend-updates/
├── plugins/                    # Plugin content (stays here)
│   ├── mem8/
│   ├── build-agent-skills/
│   └── ...
├── marketplace-browser/        # React/Vite app (migrates)
│   ├── src/
│   ├── index.html
│   └── package.json
└── .claude-plugin/            # Marketplace manifest
    └── marketplace.json
```

## Target State

### This Repo (agentic-insights/foundry)
- **Purpose**: Pure plugin content
- **Contains**: plugins/, marketplace.json, README.md
- **No frontend code**

### agenticinsights.com Repo (killerapp/agenticinsights.com)
- **Purpose**: Main website + Foundry marketplace browser
- **Route**: `/foundry` or `/marketplace` (TBD)
- **Stack**: Next.js (existing) + embedded Vite app OR migrated to Next.js

## Migration Options

### Option A: Embed as Subdirectory (Quick)
```
agenticinsights.com/
├── app/
│   ├── foundry/           # New Next.js route
│   │   └── page.tsx       # Marketplace browser (ported)
│   └── ...
└── components/
    └── marketplace/       # React components from Vite app
```

### Option B: Cloudflare Pages Subdomain (Current)
- Keep marketplace-browser as separate Vite app
- Deploy to `foundry.agenticinsights.com` or `codebasecontext.org`
- Link from main site

### Option C: Monorepo with Turborepo
- Combine both repos
- Shared components
- Single deploy pipeline

## Recommended: Option A (Embed)

**Rationale:**
1. Single domain = better SEO
2. Shared components with main site
3. Consistent branding/navigation
4. Easier to maintain

**Steps:**
1. Create `/app/foundry/` route in agenticinsights.com
2. Port React components to Next.js (minimal changes needed)
3. Update marketplace.json source URLs to point to GitHub
4. Configure API route to fetch marketplace.json from foundry repo
5. Update DNS/redirects

## Data Flow (Post-Migration)

```
User visits agenticinsights.com/foundry
    ↓
Next.js fetches marketplace.json from:
  - GitHub: raw.githubusercontent.com/agentic-insights/foundry/main/.claude-plugin/marketplace.json
    ↓
Renders plugin cards with install commands
    ↓
User runs: /plugin marketplace add agentic-insights/foundry
    ↓
Claude Code fetches plugins/ from GitHub
```

## Skills Permalink Strategy

Since no standard `skill://` URI exists:

| Format | Example | Use Case |
|--------|---------|----------|
| Web anchor | `agenticinsights.com/foundry#marketplace` | Human browsing |
| GitHub source | `github.com/agentic-insights/foundry/tree/main/plugins/mem8/skills/commit` | Developer reference |
| Install command | `/plugin marketplace add agentic-insights/foundry@mem8` | Claude Code |

## Timeline

1. **Now**: Keep developing in foundry-frontend-updates branch
2. **Next**: Copy marketplace-browser to agenticinsights.com as Next.js route
3. **Then**: Update foundry repo to remove frontend, keep plugins only
4. **Finally**: Redirect codebasecontext.org → agenticinsights.com/foundry

## Open Questions

- [ ] Route: `/foundry` vs `/marketplace` vs `/skills`?
- [ ] Keep codebasecontext.org as alias or redirect?
- [ ] Version marketplace.json API for future skill spec changes?
