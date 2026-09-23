# BDD Testing

Structured rules for user-story BDD specs and accessible selectors. Runner-
agnostic (Playwright, Testing Library, Cypress, …).

## Structure

- `rules/` - Individual rule files
  - `_sections.md` - Section metadata
  - `_template.md` - Template for creating new rules
- `metadata.json` - Document metadata
- **`AGENTS.md`** - Compiled output
- **`SKILL.md`** - Agent skill entry point

## Rules

### Testing (HIGH)

- `testing-bdd-structure.md` - User Story → Given → When
- `testing-accessible-queries.md` - Role/label over testId/CSS

## Creating a New Rule

1. Copy `rules/_template.md` to `rules/testing-description.md`
2. Fill in frontmatter and content
3. Update `_sections.md`, `SKILL.md`, and `AGENTS.md`
