---
name: nerdfish-pr-discipline
description: >
  Git and PR discipline for agents: never push, open PRs, or commit unless the
  user explicitly asks. Prefer small draft stacked PRs with conventional commit
  titles. Use when branching, committing, stacking, or opening pull requests.
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

| Priority | Category       | Impact |
| -------- | -------------- | ------ |
| 1        | Git discipline | HIGH   |
| 2        | PR creation    | HIGH   |

## Quick Reference

### 1. Git discipline (HIGH)

- `git-discipline` - Never push, open PRs, or commit unless asked

### 2. PR creation (HIGH)

- `pr-creation` - Small draft stacked PRs; conventional titles

## How to Use

```
rules/git-discipline.md
rules/pr-creation.md
```

## Full Compiled Document

For the complete guide with all rules expanded: `AGENTS.md`
