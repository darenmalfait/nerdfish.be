# Nerdfish Engineering Rules

This directory contains **repo-specific** modular rules for nerdfish.be.

Portable guidelines (React performance, composition, BDD, PR discipline, etc.)
live in skills from
[`darenmalfait/nerdfish-agent-skills`](https://github.com/darenmalfait/nerdfish-agent-skills)
— see [`.agents/README.md`](../README.md). Do not re-add those here.

## Structure

Rules are organized by section prefix, as defined in `_sections.md`:

| Prefix          | Section         | Impact      |
| --------------- | --------------- | ----------- |
| `architecture-` | Architecture    | CRITICAL    |
| `quality-`      | Code Quality    | CRITICAL    |
| `data-`         | Data Layer      | HIGH        |
| `api-`          | API Design      | HIGH        |
| `performance-`  | Performance     | HIGH        |
| `testing-`      | Testing         | MEDIUM-HIGH |
| `patterns-`     | Design Patterns | MEDIUM      |
| `culture-`      | Team Culture    | MEDIUM      |
| `ci-`           | CI/CD           | HIGH        |
| `reference-`    | Reference       | LOW         |

## Files

- `_sections.md` - Defines all sections, their ordering, and impact levels
- `_template.md` - Template for creating new rules
- `{section}-{rule-name}.md` - Individual rule files

## Rule Format

Each rule file follows a consistent format with YAML frontmatter:

```markdown
---
title: Rule Title Here
impact: CRITICAL | HIGH | MEDIUM | LOW
impactDescription: Optional description (e.g., "20-50% improvement")
tags: tag1, tag2, tag3
---

## Rule Title Here

**Impact: LEVEL (optional description)**

Brief explanation of the rule and why it matters.

**Incorrect (description):** \`\`\`typescript // Bad code example \`\`\`

**Correct (description):** \`\`\`typescript // Good code example \`\`\`

Reference: [Link](url)
```

## Adding New Rules

1. Copy `_template.md` to a new file with the appropriate section prefix
2. Fill in the frontmatter (title, impact, tags)
3. Write a clear explanation of the rule
4. Provide incorrect and correct code examples from this repo
5. Add a reference link if applicable (`AGENTS.md`, a source file, or a doc)

## Usage

These rules are designed to be:

- **Human-readable**: Engineers can browse and learn from them
- **Machine-readable**: AI agents can parse and apply them
- **Modular**: Individual rules can be updated without affecting others
- **Versionable**: Changes are tracked in git history

## Core Principles

Engineering philosophy for this repo:

> Move fast while shipping quality software with no shortcuts. Match existing
> patterns in this pnpm/Turbo monorepo, keep diffs small, and don't invent
> architecture (Prisma, tRPC, REST controllers) that this codebase doesn't use.

The rules in this directory encode the specific practices that enable this
philosophy.
