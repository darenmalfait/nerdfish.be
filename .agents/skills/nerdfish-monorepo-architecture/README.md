# Monorepo Architecture

Structured rules for vertical slices, acyclic dependencies, and factory entry
points.

## Structure

- `rules/` - Individual rule files
  - `_sections.md` - Section metadata
  - `_template.md` - Template for creating new rules
- **`AGENTS.md`** - Compiled output
- **`SKILL.md`** - Agent skill entry point

## Rules

### Vertical slices (CRITICAL)

- `vertical-slices.md` - Domain folders; routes compose blocks

### Acyclic dependencies (CRITICAL)

- `circular-dependencies.md` - Never import upward

### Entry-point factories (HIGH)

- `factory-entry-points.md` - Push conditionals to routes/factories

## Creating a New Rule

1. Copy `rules/_template.md` to `rules/{name}.md`
2. Fill in frontmatter and content
3. Update `_sections.md`, `SKILL.md`, and `AGENTS.md`
