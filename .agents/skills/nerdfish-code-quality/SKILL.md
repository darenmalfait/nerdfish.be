---
name: nerdfish-code-quality
description: >
  Code quality standards: clarity over cleverness, comments that explain why
  not what, thorough code review, and avoiding bare useEffect. Use when
  reviewing PRs, writing comments, simplifying clever code, or cleaning up
  effects.
license: MIT
metadata:
  author: nerdfish
  version: '1.0.0'
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

## Rule Categories by Priority

| Priority | Category     | Impact | Prefix     |
| -------- | ------------ | ------ | ---------- |
| 1        | Code Quality | HIGH   | `quality-` |

## Quick Reference

### 1. Code Quality (HIGH)

- `quality-simplicity` - Clarity over cleverness
- `quality-code-comments` - Comments explain why, not what
- `quality-thorough-code-review` - Address all nits before merge
- `quality-no-use-effect` - No effect for sync/derive; prefer derived/handlers/keys

## How to Use

Read individual rule files for detailed explanations and code examples:

```
rules/quality-simplicity.md
rules/quality-code-comments.md
rules/quality-thorough-code-review.md
rules/quality-no-use-effect.md
```

## Full Compiled Document

For the complete guide with all rules expanded: `AGENTS.md`
