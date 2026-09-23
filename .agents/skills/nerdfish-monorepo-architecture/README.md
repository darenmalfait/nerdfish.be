# Monorepo Architecture

Structured rules for vertical slices, acyclic dependencies, and factory entry
points.

## Structure

- `rules/` - Individual rule files
  - `_sections.md` - Section metadata
  - `_template.md` - Template for creating new rules
- `metadata.json` - Document metadata
- **`AGENTS.md`** - Compiled output
- **`SKILL.md`** - Agent skill entry point

## Rules

### Vertical slices (CRITICAL)

- `architecture-vertical-slices.md` - Domain folders; routes compose blocks

### Acyclic dependencies (CRITICAL)

- `architecture-circular-dependencies.md` - Never import upward

### Entry-point factories (HIGH)

- `patterns-factory-entry-points.md` - Push conditionals to routes/factories

## Creating a New Rule

1. Copy `rules/_template.md` to `rules/{prefix}-description.md`
2. Fill in frontmatter and content
3. Update `_sections.md`, `SKILL.md`, and `AGENTS.md`
