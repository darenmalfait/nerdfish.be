# BDD Testing

Runner-agnostic rules for user-story BDD specs, accessible selectors, mock-data
builders, and network mock builders. Applies to Playwright, Testing Library,
Cypress, and any other user-based UI test. Not for pure unit tests.

## Structure

- `rules/` - Individual rule files
  - `_sections.md` - Section metadata
  - `_template.md` - Template for creating new rules
- **`AGENTS.md`** - Compiled output
- **`SKILL.md`** - Agent skill entry point

## Rules

### Testing (HIGH)

- `bdd-structure.md` - User Story → Given → When; nesting and scope
- `accessible-queries.md` - Role/label; page/screen objects
- `mock-data-builders.md` - `MOCK_<ENTITY>` builders
- `api-handler-builders.md` - Network mock builders + payload
  observation
- `file-organization.md` - Related stories together until ~2000 lines

## Creating a New Rule

1. Copy `rules/_template.md` to `rules/{name}.md`
2. Fill in frontmatter and content
3. Update `_sections.md`, `SKILL.md`, and `AGENTS.md`
