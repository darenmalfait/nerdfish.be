---
name: nerdfish-pr-discipline
description: >
  Git and PR discipline for agents: never push, open PRs, or commit unless the
  user explicitly asks. Prefer small draft stacked PRs with conventional commit
  titles. Use when branching, committing, stacking, or opening pull requests.
license: MIT
metadata:
  author: nerdfish
  version: '1.0.0'
---

# PR Discipline

Agents stop at local work unless the user asks otherwise. Prefer small, draft,
stackable PRs.

## When to Apply

Reference these guidelines when:

- Any git push / PR / commit decision
- Splitting large work into reviewable layers
- Writing PR titles and bodies

## Rule Categories by Priority

| Priority | Category      | Impact | Prefix     |
| -------- | ------------- | ------ | ---------- |
| 1        | Git discipline| HIGH   | `git-`     |
| 2        | PR creation   | HIGH   | `quality-` |

## Quick Reference

### 1. Git discipline (HIGH)

- `git-pr-discipline` - Never push, open PRs, or commit unless asked

### 2. PR creation (HIGH)

- `quality-pr-creation` - Small draft stacked PRs; conventional titles

## How to Use

```
rules/git-pr-discipline.md
rules/quality-pr-creation.md
```

## Full Compiled Document

For the complete guide with all rules expanded: `AGENTS.md`
