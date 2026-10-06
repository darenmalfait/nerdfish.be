---
name: nerdfish-code-quality
description: >
  Code quality standards: clarity over cleverness, comments that explain why
  not what, thorough code review, avoiding bare useEffect, and shaping feature
  flags for easy removal. Use when reviewing PRs, writing comments, simplifying
  clever code, cleaning up effects, or gating code behind feature flags.
metadata:
  author: nerdfish
  version: '1.1.0'
---

# Code Quality

Standards for readable, maintainable code and rigorous review.

## When to Apply

Reference these guidelines when:

- Writing or simplifying application code
- Adding comments
- Reviewing pull requests
- Challenging “good enough for now” shortcuts
- Replacing misuse of `useEffect` with derived state, handlers, or keys
- Gating new behavior behind a release flag

## Rule Categories by Priority

| Priority | Category     | Impact |
| -------- | ------------ | ------ |
| 1        | Code Quality | HIGH   |

## Quick Reference

### 1. Code Quality (HIGH)

- `simplicity` - Clarity over cleverness
- `code-comments` - Comments explain why, not what
- `thorough-code-review` - Address all nits before merge
- `no-use-effect` - No effect for sync/derive; prefer derived/handlers/keys
- `feature-flag-shape` - Structure flags so removal is a small delete

## How to Use

Read individual rule files for detailed explanations and code examples:

```
rules/simplicity.md
rules/code-comments.md
rules/thorough-code-review.md
rules/no-use-effect.md
rules/feature-flag-shape.md
```

## Full Compiled Document

For the complete guide with all rules expanded: `AGENTS.md`
