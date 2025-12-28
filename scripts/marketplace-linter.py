#!/usr/bin/env python3
"""
Marketplace Linter - Analyzes plugins and skills for Agent Skills spec compliance.
Identifies missing optional frontmatter attributes and provides improvement suggestions.
"""

import json
import os
import re
import sys
from pathlib import Path
from typing import Any, TypedDict
from dataclasses import dataclass, asdict

# Agent Skills specification optional frontmatter fields
OPTIONAL_FRONTMATTER = {
    "license": {
        "description": "SPDX license identifier",
        "examples": ["Apache-2.0", "MIT", "Proprietary"],
        "default": "Apache-2.0 (recommended)"
    },
    "compatibility": {
        "description": "Environment and dependency requirements",
        "examples": ["Python 3.9+, AWS CLI 2.x", "Node.js 16+, Docker"],
        "default": "Not specified"
    },
    "metadata": {
        "description": "Custom key-value metadata (author, version, tags, category, difficulty, etc.)",
        "subfields": {
            "author": "Who created/maintains this skill",
            "version": "Semantic version of the skill",
            "tags": "Searchable keywords",
            "category": "Functional category",
            "difficulty": "beginner, intermediate, advanced"
        },
        "default": "Not specified"
    },
    "allowed-tools": {
        "description": "Pre-approved tools for sandboxed execution (experimental)",
        "examples": ["bash python", "bash aws python node"],
        "default": "Not specified"
    }
}

REQUIRED_FRONTMATTER = {
    "name": "Skill identifier (1-64 chars, lowercase alphanumeric with hyphens)",
    "description": "What the skill does and when to use it (1-1024 chars)"
}

@dataclass
class FrontmatterIssue:
    field: str
    status: str  # "missing", "empty", "incomplete"
    suggestion: str
    importance: str  # "critical", "high", "medium", "low"

@dataclass
class SkillLint:
    name: str
    path: str
    found: bool
    is_valid: bool
    frontmatter_present: bool
    frontmatter: dict[str, Any]
    issues: list[FrontmatterIssue]
    file_size_lines: int
    has_references: bool
    has_assets: bool
    has_scripts: bool


@dataclass
class PluginLint:
    name: str
    path: str
    version: str
    description: str
    skills: list[SkillLint]
    plugin_json_issues: list[str]

def parse_frontmatter(content: str) -> tuple[dict[str, Any], str]:
    """Extract YAML frontmatter and return (frontmatter_dict, body)."""
    if not content.startswith("---"):
        return {}, content

    match = re.match(r"^---\n(.*?)\n---\n(.*)", content, re.DOTALL)
    if not match:
        return {}, content

    yaml_str = match.group(1)
    body = match.group(2)

    # Simple YAML parser (enough for our needs)
    frontmatter = {}
    current_key = None

    for line in yaml_str.split("\n"):
        if not line.strip():
            continue

        if line.startswith("  "):  # Nested value
            if current_key and current_key in frontmatter:
                if not isinstance(frontmatter[current_key], dict):
                    # Convert to dict if not already
                    frontmatter[current_key] = {}
                # Parse nested structure
                key_val = line.strip().split(":", 1)
                if len(key_val) == 2:
                    frontmatter[current_key][key_val[0].strip()] = key_val[1].strip().strip('"\'')
        else:  # Top-level key
            key_val = line.split(":", 1)
            if len(key_val) == 2:
                current_key = key_val[0].strip()
                value = key_val[1].strip().strip('"\'')
                if value and not value.startswith("["):
                    frontmatter[current_key] = value
                elif value.startswith("["):
                    # List parsing
                    frontmatter[current_key] = [v.strip() for v in value[1:-1].split(",")]
                else:
                    # Empty value, likely a dict marker
                    frontmatter[current_key] = {}

    return frontmatter, body

def validate_name_format(name: str) -> bool:
    """Check if name matches required format."""
    return bool(re.match(r"^[a-z0-9]+(-[a-z0-9]+)*$", name))

def lint_skill(skill_path: Path) -> SkillLint:
    """Lint a single SKILL.md file."""
    skill_md = skill_path / "SKILL.md"

    if not skill_md.exists():
        return SkillLint(
            name=skill_path.name,
            path=str(skill_path),
            found=False,
            is_valid=False,
            frontmatter_present=False,
            frontmatter={},
            issues=[],
            file_size_lines=0,
            has_references=False,
            has_assets=False,
            has_scripts=False
        )

    content = skill_md.read_text()
    frontmatter, body = parse_frontmatter(content)
    lines = content.split("\n")

    issues: list[FrontmatterIssue] = []

    # Check required fields
    for field, description in REQUIRED_FRONTMATTER.items():
        if field not in frontmatter:
            issues.append(FrontmatterIssue(
                field=field,
                status="missing",
                suggestion=f"Add required field: {description}",
                importance="critical"
            ))
        elif not frontmatter[field] or (isinstance(frontmatter[field], str) and not frontmatter[field].strip()):
            issues.append(FrontmatterIssue(
                field=field,
                status="empty",
                suggestion=f"Field '{field}' is empty. {description}",
                importance="critical"
            ))

    # Check optional fields
    for field, info in OPTIONAL_FRONTMATTER.items():
        if field not in frontmatter or not frontmatter.get(field):
            suggestion = f"Missing optional field '{field}'. {info['description']}"
            if info.get("examples"):
                suggestion += f" Examples: {', '.join(info['examples'])}"
            issues.append(FrontmatterIssue(
                field=field,
                status="missing",
                suggestion=suggestion,
                importance="low" if field == "allowed-tools" else "medium"
            ))

    # Check name format if present
    if "name" in frontmatter and not validate_name_format(frontmatter["name"]):
        issues.append(FrontmatterIssue(
            field="name",
            status="invalid",
            suggestion="Name must be lowercase alphanumeric with hyphens (e.g., 'my-skill-name')",
            importance="critical"
        ))

    # Check directory name matches frontmatter name
    if "name" in frontmatter and skill_path.name != frontmatter["name"]:
        issues.append(FrontmatterIssue(
            field="name",
            status="mismatch",
            suggestion=f"Directory name '{skill_path.name}' doesn't match frontmatter name '{frontmatter['name']}'",
            importance="critical"
        ))

    # Check description length
    if "description" in frontmatter:
        desc_len = len(frontmatter["description"])
        if desc_len < 10:
            issues.append(FrontmatterIssue(
                field="description",
                status="too_short",
                suggestion=f"Description is too short ({desc_len} chars). Aim for 50-200 chars with 'Use when...' context.",
                importance="high"
            ))
        elif desc_len > 1024:
            issues.append(FrontmatterIssue(
                field="description",
                status="too_long",
                suggestion=f"Description is too long ({desc_len} chars). Keep under 1024 chars.",
                importance="high"
            ))

    # Check file size
    if len(lines) > 500:
        issues.append(FrontmatterIssue(
            field="file_size",
            status="too_large",
            suggestion=f"SKILL.md is {len(lines)} lines. Keep under 500 lines and use progressive disclosure (references/, assets/ directories).",
            importance="high"
        ))

    # Check subdirectories
    has_references = (skill_path / "references").exists()
    has_assets = (skill_path / "assets").exists()
    has_scripts = (skill_path / "scripts").exists()

    # Check for invalid subdirectories
    allowed = {"SKILL.md", "README.md", "references", "assets", "scripts", ".gitkeep"}
    for item in skill_path.iterdir():
        if item.name not in allowed and not item.name.startswith("."):
            issues.append(FrontmatterIssue(
                field="structure",
                status="invalid_subdir",
                suggestion=f"Unexpected directory '{item.name}'. Only 'references/', 'assets/', and 'scripts/' are allowed.",
                importance="medium"
            ))

    return SkillLint(
        name=frontmatter.get("name", skill_path.name),
        path=str(skill_path),
        found=True,
        is_valid=len([i for i in issues if i.importance in ("critical", "high")]) == 0,
        frontmatter_present=bool(frontmatter),
        frontmatter=frontmatter,
        issues=issues,
        file_size_lines=len(lines),
        has_references=has_references,
        has_assets=has_assets,
        has_scripts=has_scripts
    )

def lint_plugin(plugin_path: Path) -> PluginLint:
    """Lint a plugin and all its skills."""
    plugin_json_path = plugin_path / ".claude-plugin" / "plugin.json"

    plugin_metadata = {"name": plugin_path.name, "version": "unknown", "description": ""}
    if plugin_json_path.exists():
        try:
            plugin_metadata = json.loads(plugin_json_path.read_text())
        except json.JSONDecodeError:
            pass

    # Lint all skills
    skills_dir = plugin_path / "skills"
    skill_lints = []

    if skills_dir.exists():
        for skill_path in skills_dir.iterdir():
            if skill_path.is_dir():
                skill_lints.append(lint_skill(skill_path))

    # Check plugin.json issues
    plugin_json_issues = []
    if not plugin_json_path.exists():
        plugin_json_issues.append("Missing .claude-plugin/plugin.json")

    return PluginLint(
        name=plugin_path.name,
        path=str(plugin_path),
        version=plugin_metadata.get("version", "unknown"),
        description=plugin_metadata.get("description", ""),
        skills=skill_lints,
        plugin_json_issues=plugin_json_issues
    )

def scan_marketplace(marketplace_root: Path) -> dict[str, PluginLint]:
    """Scan entire marketplace for plugins."""
    plugins = {}
    plugins_dir = marketplace_root / "plugins"

    if plugins_dir.exists():
        for plugin_path in plugins_dir.iterdir():
            if plugin_path.is_dir():
                plugins[plugin_path.name] = lint_plugin(plugin_path)

    return plugins

def export_json(plugins: dict[str, PluginLint], output_path: Path):
    """Export linting results as JSON for web UI."""
    data = {
        "plugins": {},
        "stats": {
            "total_plugins": len(plugins),
            "total_skills": 0,
            "valid_skills": 0,
            "skills_with_issues": 0,
            "critical_issues": 0,
            "high_issues": 0,
            "medium_issues": 0,
            "low_issues": 0
        }
    }

    for plugin_name, plugin in plugins.items():
        plugin_dict = {
            "name": plugin.name,
            "path": plugin.path,
            "version": plugin.version,
            "description": plugin.description,
            "plugin_json_issues": plugin.plugin_json_issues,
            "skills": []
        }

        for skill in plugin.skills:
            skill_dict = {
                "name": skill.name,
                "path": skill.path,
                "found": skill.found,
                "is_valid": skill.is_valid,
                "frontmatter_present": skill.frontmatter_present,
                "frontmatter": skill.frontmatter,
                "issues": [asdict(i) for i in skill.issues],
                "file_size_lines": skill.file_size_lines,
                "has_references": skill.has_references,
                "has_assets": skill.has_assets,
                "has_scripts": skill.has_scripts
            }
            plugin_dict["skills"].append(skill_dict)

            # Update stats
            data["stats"]["total_skills"] += 1
            if skill.is_valid and not skill.issues:
                data["stats"]["valid_skills"] += 1
            elif skill.issues:
                data["stats"]["skills_with_issues"] += 1
                for issue in skill.issues:
                    if issue.importance == "critical":
                        data["stats"]["critical_issues"] += 1
                    elif issue.importance == "high":
                        data["stats"]["high_issues"] += 1
                    elif issue.importance == "medium":
                        data["stats"]["medium_issues"] += 1
                    elif issue.importance == "low":
                        data["stats"]["low_issues"] += 1

        data["plugins"][plugin_name] = plugin_dict

    output_path.write_text(json.dumps(data, indent=2))
    return data

if __name__ == "__main__":
    root = Path(__file__).parent.parent
    print(f"🔍 Scanning marketplace at: {root}")

    plugins = scan_marketplace(root)

    # Export to JSON
    output_file = root / ".cache" / "marketplace-lint.json"
    output_file.parent.mkdir(exist_ok=True)

    data = export_json(plugins, output_file)
    print(f"✅ Linting complete. Results saved to: {output_file}")
    print(f"\n📊 Summary:")
    print(f"   Plugins: {data['stats']['total_plugins']}")
    print(f"   Skills: {data['stats']['total_skills']}")
    print(f"   Valid: {data['stats']['valid_skills']}")
    print(f"   With issues: {data['stats']['skills_with_issues']}")
    print(f"   Critical: {data['stats']['critical_issues']}")
    print(f"   High: {data['stats']['high_issues']}")
