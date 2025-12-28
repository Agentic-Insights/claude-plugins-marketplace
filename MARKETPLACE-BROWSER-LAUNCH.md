# 🏪 Marketplace Browser - Launch Instructions

## Quick Start (One Command)

```bash
# Navigate to the marketplace repository root
cd <path-to-foundry>
scripts/launch-marketplace-browser.sh
```

Then open your browser to: **http://localhost:8000/marketplace-browser.html**

## What You're Launching

A professional **Agent Skills specification compliance linter & browser** that:

- 📊 Analyzes all plugins and skills in the marketplace
- 🎨 Shows a beautiful interactive dashboard
- 🔍 Identifies missing optional frontmatter fields
- 🎯 Categorizes issues by priority (Critical/High/Medium/Low)
- 💡 Provides actionable improvement suggestions

## What You'll See

### Dashboard Stats (Top)
- **6 Plugins** analyzed
- **6 Skills** total
- **0 Valid Skills** (all have room for improvement)
- **0 Critical Issues** (no blocking problems)
- **2 High Priority** (file size violations)
- **14 Medium** (missing optional fields)

### Interactive Filters
- **All** - Show everything
- **✓ Valid** - Only error-free skills
- **⚠ Has Issues** - Skills with problems
- **🔴 Critical** - Only critical issues

### Plugin Cards
Each card shows:
- Plugin name & version
- Description
- Skill count and status
- Detailed skill-level issues

### Issue Details
Each issue shows:
- **Field name** - What's missing or wrong
- **Status** - missing/invalid/too_large/too_short
- **Suggestion** - 💡 How to fix it

## Browser Features

### Color-Coded Severity
- 🔴 **Critical** (Red) - Must fix
- 🟠 **High** (Orange) - Strongly recommended
- 🟡 **Medium** (Yellow) - Best practice
- 🔵 **Low** (Blue) - Nice to have

### Inline Documentation
Click **"View Agent Skills Spec"** button at the bottom to see:
- Full Agent Skills specification
- Required vs optional fields
- Best practices
- Links to official resources

### Real-Time Filtering
Click any filter button to instantly see:
- Only valid plugins
- Only plugins with issues
- Only critical issues

## Files Created

Located in `scripts/` directory:

1. **marketplace-linter.py** (14KB)
   - Python script that analyzes plugins
   - Parses SKILL.md files
   - Validates against Agent Skills spec
   - Outputs JSON for the browser

2. **marketplace-browser.html** (24KB)
   - Single-page web application
   - Dark theme UI
   - Interactive dashboard & filters
   - Loads data from JSON

3. **launch-marketplace-browser.sh** (809 bytes)
   - Convenience launcher
   - Runs linter + starts server
   - Easy one-command startup

4. **MARKETPLACE-BROWSER.md** (Complete Documentation)
   - Full feature overview
   - Usage guide with examples
   - Troubleshooting tips
   - Integration patterns

## Generated Output

**`.cache/marketplace-lint.json`** (15KB)
- Complete linting results
- All 6 plugins analyzed
- All 6 skills analyzed
- 22 total issues categorized
- Ready for programmatic access

## Quick Examples

### Example 1: View All Issues
1. Click **All** filter
2. See all 6 plugins with their issues
3. Each skill shows 4-6 issues

### Example 2: Find Critical Issues Only
1. Click **Critical** filter
2. See 0 plugins (we have no critical issues - good!)
3. All issues are fixable best-practices

### Example 3: See Valid Skills Only
1. Click **Valid** filter
2. See 0 plugins (all have some room for improvement)
3. Notice the issue counts for each

## Common Issues & Fixes

### Issue: "Missing license"
**Fix**: Add to SKILL.md frontmatter:
```yaml
license: Apache-2.0
```

### Issue: "SKILL.md is 518 lines"
**Fix**: Use progressive disclosure
- Keep main SKILL.md under 500 lines
- Move detailed docs to `references/`
- Move templates to `assets/`
- Move scripts to `scripts/`

### Issue: "Missing metadata"
**Fix**: Add to SKILL.md frontmatter:
```yaml
metadata:
  author: your-name
  version: "1.0.0"
  tags: [tag1, tag2]
```

## What Each Optional Field Means

| Field | Purpose | Example |
|-------|---------|---------|
| **license** | SPDX identifier | `Apache-2.0`, `MIT` |
| **compatibility** | Environment requirements | `Python 3.9+, AWS CLI 2.x` |
| **metadata** | Custom key-value pairs | `author`, `version`, `tags` |
| **allowed-tools** | Pre-approved tools | `bash python node` |

## Next Steps

### 1. Review & Understand
- Launch the browser
- Review the dashboard
- Click filters to explore issues

### 2. Improve Your Plugins
- Use the browser suggestions (💡)
- Edit `plugins/*/skills/*/SKILL.md`
- Add missing optional fields
- Reorganize large skills

### 3. Verify Improvements
- Re-run: `uv run scripts/marketplace-linter.py`
- Refresh browser to see updates
- Repeat until satisfied

### 4. Integrate into Workflow
```bash
# Pre-commit hook
#!/bin/bash
uv run scripts/marketplace-linter.py || exit 1
```

```bash
# GitHub Actions (CI/CD)
- name: Lint marketplace
  run: uv run scripts/marketplace-linter.py
```

## Troubleshooting

### Browser won't load
```bash
# Check server is running
curl http://localhost:8000/marketplace-browser.html

# If not, start manually:
cd <path-to-foundry>
python3 -m http.server 8000
```

### Linter data is old
```bash
# Re-run linter
uv run scripts/marketplace-linter.py

# Refresh browser (Cmd+R or Ctrl+Shift+R)
```

### "Permission denied" error
```bash
# Make scripts executable
chmod +x scripts/marketplace-linter.py
chmod +x scripts/launch-marketplace-browser.sh
```

## Resources

- **Agent Skills Spec**: https://agentskills.io/specification
- **Reference Implementation**: https://github.com/agentskills/agentskills
- **Claude Code Docs**: https://docs.claude.com/en/docs/agents-and-tools/agent-skills
- **Full Documentation**: `scripts/MARKETPLACE-BROWSER.md`

## Pro Tips

1. **Best example in repo**: Check `plugins/build-agent-skills/skills/agentskills-io/` - it's the most complete skill!

2. **Validate individual skills**:
   ```bash
   skills-ref validate plugins/my-plugin/skills/my-skill/
   ```

3. **Check frontmatter quickly**:
   ```bash
   grep -A 10 "^---" plugins/*/skills/*/SKILL.md | head -20
   ```

4. **View just issues**:
   ```bash
   jq '.plugins[].skills[].issues' .cache/marketplace-lint.json
   ```

## That's It!

The marketplace browser is ready to help you improve plugin quality across the marketplace. Launch it, explore, and use the suggestions to enhance your plugins!

🎉 Happy linting!
