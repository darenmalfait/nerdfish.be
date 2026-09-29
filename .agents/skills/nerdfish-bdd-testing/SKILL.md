---
name: nerdfish-bdd-testing
description: >
  Runner-agnostic user-story BDD for Playwright, Testing Library, Cypress, or
  any other user-based UI test. Covers User Story → Given → When nesting,
  accessible queries, mock-data builders, and API mock builders. Use when
  writing or reviewing e2e, component, or integration tests that exercise the
  product as a user. Not for pure unit tests.
license: MIT
metadata:
  author: nerdfish
  version: '1.2.0'
---

# BDD Testing

Guideline for **any** user-based UI test — Playwright e2e, Testing Library
component/integration, Cypress, etc.

Specs tell a user story. Queries match how a user (or assistive tech) interacts.
Fixtures and network mocks are builders. Hide selectors behind page/screen
objects. Nesting and query rules are the same; only the runner API changes.

Skip BDD nesting for pure unit tests.

## When to Apply

Reference these guidelines when:

- Writing or reviewing Playwright, Testing Library, Cypress, or similar specs
- Designing page/screen objects, fixtures, or API mocks
- Planning BDD / acceptance coverage
- Deciding whether a test should use BDD nesting at all

## Rule Categories by Priority

| Priority | Category | Impact | Prefix     |
| -------- | -------- | ------ | ---------- |
| 1        | Testing  | HIGH   | `testing-` |

## Quick Reference

### 1. Testing (HIGH)

- `testing-bdd-structure` - User Story → Given → When; scope and nesting rules
- `testing-accessible-queries` - Role/label over testId/CSS; page objects
- `testing-mock-data-builders` - `MOCK_<ENTITY>` builders over inline fixtures
- `testing-api-handler-builders` - Reusable network mocks; observe payloads
- `testing-file-organization` - Keep related stories together until ~2000 lines

## How to Use

```
rules/testing-bdd-structure.md
rules/testing-accessible-queries.md
rules/testing-mock-data-builders.md
rules/testing-api-handler-builders.md
rules/testing-file-organization.md
```

## Full Compiled Document

For the complete guide with all rules expanded: `AGENTS.md`
