# 🏪 Claude Plugins Marketplace - Linter & Browser

Professional linter and interactive browser for analyzing Claude plugins and skills against the **Agent Skills specification** (agentskills.io).

## Features

- **Real-time Linting** - Analyzes all plugins and skills in the marketplace
- **Spec Compliance Checking** - Validates against the official Agent Skills specification
- **Missing Frontmatter Detection** - Shows which optional fields are missing
- **Interactive UI** - Filter by status (valid, has issues, critical issues)
- **Detailed Reporting** - Priority-categorized issues with actionable suggestions
- **Beautiful Dashboard** - Stats overview and plugin cards with drill-down

## Quick Start

### 1. Run the Linter

Generate lint data by analyzing all plugins:

```bash
# From marketplace repository root
cd <path-to-claude-plugins-marketplace>
uv run scripts/marketplace-linter.py
```

This creates `.cache/marketplace-lint.json` with full analysis results.

### 2. Launch the Browser

**Option A: Use the launcher script**

```bash
scripts/launch-marketplace-browser.sh
```

Then open: **http://localhost:8000/marketplace-browser.html**

**Option B: Manual start**

```bash
cd scripts
python3 -m http.server 8000
# Open browser to http://localhost:8000/marketplace-browser.html
```

## What It Reports

### Required Fields (Must Have)
- **`name`** - Skill identifier (1-64 chars, lowercase alphanumeric with hyphens)
- **`description`** - What the skill does and when to use it (1-1024 chars)

### Optional Fields (Nice to Have)
The linter highlights missing optional fields to help improve plugin quality:

- **`license`** - SPDX identifier (e.g., `Apache-2.0`, `MIT`, `Proprietary`)
  - *Why*: Clarifies usage rights and legal compliance
  - *Recommended*: `Apache-2.0` for corporate-friendly sharing

- **`compatibility`** - Environment and dependency requirements (max 500 chars)
  - *Examples*: "Python 3.9+, AWS CLI 2.x", "Node.js 16+, Docker"
  - *Why*: Users know if they have prerequisites

- **`metadata`** - Custom key-value pairs for extensibility
  - *Useful keys*: `author`, `version`, `tags`, `category`, `difficulty`
  - *Why*: Provides rich context beyond the spec minimum

- **`allowed-tools`** - Space-delimited pre-approved tools (experimental)
  - *Example*: `bash python`, `bash aws python node`
  - *Why*: Security: restricts tool access for read-only or limited-scope skills

### Issue Categories

**🔴 Critical** - Must fix for spec compliance
- Missing required fields
- Invalid name format
- Directory name doesn't match frontmatter

**🟠 High** - Strongly recommended
- File size > 500 lines (use progressive disclosure)
- Description too short/long
- Invalid subdirectories

**🟡 Medium** - Best practice
- Missing `license`, `compatibility`, `metadata` fields

**🔵 Low** - Nice to have
- Missing `allowed-tools`

## Usage Examples

### Finding Skills That Need Work

1. **See all issues at once**: Dashboard shows summary stats
2. **Filter by priority**: Click "Critical" to see must-fix issues
3. **Sort by plugin**: Each plugin card groups related issues
4. **Read suggestions**: Each issue has a "💡" actionable tip

### Improving a Plugin

Example: Plugin has missing `license` field

```yaml
---
name: my-skill
description: Does something useful
---
```

Add the recommended field:

```yaml
---
name: my-skill
description: Does something useful
license: Apache-2.0
---
```

Example: Adding metadata

```yaml
---
name: my-skill
description: Deploys Python to AWS Lambda with dependencies. Use when creating serverless APIs.
license: Apache-2.0
metadata:
  author: agentic-insights
  version: "1.0.0"
  tags: ["aws", "lambda", "deployment"]
  category: "aws-deployment"
  difficulty: "intermediate"
compatibility: Requires AWS CLI 2.x, Python 3.9+, valid AWS credentials
---
```

## Linter Architecture

### `marketplace-linter.py`

Python script that:
1. **Scans** all `plugins/*/skills/*/SKILL.md` files
2. **Parses** YAML frontmatter and extracts metadata
3. **Validates** against Agent Skills spec requirements
4. **Reports** issues with priority levels and suggestions
5. **Exports** results to `.cache/marketplace-lint.json`

**Key Functions:**
- `scan_marketplace()` - Recursively find all plugins
- `lint_plugin()` - Analyze a single plugin
- `lint_skill()` - Check SKILL.md compliance
- `parse_frontmatter()` - Extract YAML metadata
- `validate_name_format()` - Ensure name format is valid
- `export_json()` - Write results for UI consumption

### `marketplace-browser.html`

Single-page web application that:
1. **Loads** linting results from JSON
2. **Displays** dashboard with stats
3. **Filters** plugins by status
4. **Shows** detailed issue information
5. **Provides** spec documentation inline

**Features:**
- Dark theme optimized for development
- Responsive design (desktop and mobile)
- Real-time filtering
- Modal with full Agent Skills spec reference
- Color-coded issue priorities

## CLI Integration

### Direct Linting
```bash
# Run linter and see summary
uv run scripts/marketplace-linter.py

# Output:
# 🔍 Scanning marketplace at: /path/to/marketplace
# ✅ Linting complete. Results saved to: .cache/marketplace-lint.json
# 📊 Summary:
#    Plugins: 6
#    Skills: 6
#    Valid: 0
#    With issues: 6
#    Critical: 0
#    High: 2
```

### Browser Launch
```bash
# Start server and display results
scripts/launch-marketplace-browser.sh [PORT]

# Default port is 8000
scripts/launch-marketplace-browser.sh 9000
```

## Integration with Justfile

Add to your `justfile`:

```just
[doc("Lint all plugins and skills for Agent Skills spec compliance")]
lint-marketplace:
    @uv run scripts/marketplace-linter.py

[doc("Launch marketplace browser for interactive linting")]
browse-marketplace PORT="8000":
    cd scripts && python3 -m http.server {{ PORT }}
    @echo "🏪 Open http://localhost:{{ PORT }}/marketplace-browser.html"
```

Then use:
```bash
just lint-marketplace
just browse-marketplace        # port 8000
just browse-marketplace 9000   # custom port
```

## JSON Output Format

The linter produces `.cache/marketplace-lint.json` with this structure:

```json
{
  "plugins": {
    "plugin-name": {
      "name": "plugin-name",
      "path": "/absolute/path",
      "version": "1.0.0",
      "description": "...",
      "plugin_json_issues": [],
      "skills": [
        {
          "name": "skill-name",
          "path": "/absolute/path/to/skill",
          "found": true,
          "is_valid": false,
          "frontmatter_present": true,
          "frontmatter": {
            "name": "skill-name",
            "description": "..."
          },
          "issues": [
            {
              "field": "license",
              "status": "missing",
              "suggestion": "Missing optional field 'license'. SPDX identifier...",
              "importance": "medium"
            }
          ],
          "file_size_lines": 200,
          "has_references": false,
          "has_assets": false,
          "has_scripts": false
        }
      ]
    }
  },
  "stats": {
    "total_plugins": 6,
    "total_skills": 6,
    "valid_skills": 0,
    "skills_with_issues": 6,
    "critical_issues": 0,
    "high_issues": 2,
    "medium_issues": 14,
    "low_issues": 6
  }
}
```

## Tips for Writing Better Skills

Based on what the linter checks:

1. **Start with frontmatter**
   ```yaml
   ---
   name: descriptive-skill-name
   description: Clear description of what this does. Use when...
   license: Apache-2.0
   compatibility: Environment requirements if any
   metadata:
     author: your-name
     version: "1.0.0"
   ---
   ```

2. **Keep SKILL.md concise** (under 500 lines)
   - Main content in SKILL.md
   - Detailed docs in `references/`
   - Templates/examples in `assets/`
   - Executable code in `scripts/`

3. **Write discovery-friendly descriptions**
   - Include "Use when..." for better agent matching
   - Mention actual error messages or symptoms
   - Include synonyms and tool names

4. **Organize supporting files**
   ```
   skill-name/
   ├── SKILL.md              # Main instructions
   ├── references/
   │   ├── api-reference.md  # Detailed docs
   │   └── examples.md       # Extended examples
   ├── assets/
   │   └── template.yaml     # Templates
   └── scripts/
       └── helper.py         # Executable code
   ```

## Troubleshooting

### "Data not found" error
The linter hasn't been run yet. Execute:
```bash
uv run scripts/marketplace-linter.py
```

### Skills not showing up
Make sure SKILL.md exists in the skill directory with proper frontmatter:
```bash
ls plugins/plugin-name/skills/skill-name/SKILL.md
```

### Port already in use
Use a different port:
```bash
scripts/launch-marketplace-browser.sh 9000
```

### JSON parsing error in browser console
The JSON may be incomplete. Re-run the linter:
```bash
rm .cache/marketplace-lint.json
uv run scripts/marketplace-linter.py
```

## References

- **Agent Skills Spec**: https://agentskills.io/specification
- **Reference Implementation**: https://github.com/agentskills/agentskills
- **skills-ref Validator**: https://github.com/agentskills/agentskills/tree/main/skills-ref
- **Claude Code Docs**: https://docs.claude.com/en/docs/agents-and-tools/agent-skills

## Future Enhancements

- Export reports as HTML/PDF
- CI/CD integration (GitHub Actions)
- Auto-fix suggestions
- Version history tracking
- Marketplace search and discovery
- Plugin quality scoring
