# PR Discipline

Structured rules for agent git/PR workflow.

## Structure

- `rules/` - Individual rule files
  - `_sections.md` - Section metadata
  - `_template.md` - Template for creating new rules
- `metadata.json` - Document metadata
- **`AGENTS.md`** - Compiled output
- **`SKILL.md`** - Agent skill entry point

## Rules

### Git discipline (HIGH)

- `git-pr-discipline.md` - Never push/PR/commit unless asked

### PR creation (HIGH)

- `quality-pr-creation.md` - Small draft stacked PRs

## Creating a New Rule

1. Copy `rules/_template.md` to `rules/{prefix}-description.md`
2. Fill in frontmatter and content
3. Update `_sections.md`, `SKILL.md`, and `AGENTS.md`
