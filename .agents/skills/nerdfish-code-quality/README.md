# Code Quality

Structured rules for clarity, comments, review rigor, effects discipline, and
feature-flag shape.

## Structure

- `rules/` - Individual rule files
  - `_sections.md` - Section metadata
  - `_template.md` - Template for creating new rules
- **`AGENTS.md`** - Compiled output
- **`SKILL.md`** - Agent skill entry point

## Rules

### Code Quality (HIGH)

- `simplicity.md` - Clarity over cleverness
- `code-comments.md` - Comments explain why, not what
- `thorough-code-review.md` - Address all nits before merge
- `no-use-effect.md` - No bare `useEffect`
- `feature-flag-shape.md` - Shape flags for easy removal

## Creating a New Rule

1. Copy `rules/_template.md` to `rules/{name}.md`
2. Fill in frontmatter and content
3. Update `_sections.md`, `SKILL.md`, and `AGENTS.md`
