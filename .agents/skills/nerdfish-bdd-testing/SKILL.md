---
name: nerdfish-bdd-testing
description: >
  User-story BDD structure for UI tests (User Story → Given → When) and
  accessible queries (role/label over testId/CSS). Use when writing or reviewing
  e2e, component, or integration tests that exercise the product as a user —
  Playwright, Testing Library, Cypress, or similar.
license: MIT
metadata:
  author: nerdfish
  version: '1.0.0'
---

# BDD Testing

Specs tell a user story. Queries match how a user (or assistive tech) interacts.
Hide selectors behind page/screen objects.

Applies to any user-facing test runner (Playwright, Testing Library, Cypress,
etc.) — the nesting and query rules are the same.

## When to Apply

Reference these guidelines when:

- Writing or reviewing user-facing tests
- Designing page/screen objects or fixtures
- Planning BDD / acceptance coverage

## Rule Categories by Priority

| Priority | Category | Impact | Prefix     |
| -------- | -------- | ------ | ---------- |
| 1        | Testing  | HIGH   | `testing-` |

## Quick Reference

### 1. Testing (HIGH)

- `testing-bdd-structure` - User Story → Given → When nesting
- `testing-accessible-queries` - Prefer role/label over testId/CSS

## How to Use

```
rules/testing-bdd-structure.md
rules/testing-accessible-queries.md
```

## Full Compiled Document

For the complete guide with all rules expanded: `AGENTS.md`
