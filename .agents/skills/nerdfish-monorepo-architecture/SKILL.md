---
name: nerdfish-monorepo-architecture
description: >
  Monorepo architecture patterns: organize app code by domain (vertical slices),
  keep an acyclic package dependency graph, and push kind/type conditionals to
  entry-point factories. Use when structuring features, reviewing imports,
  fixing circular dependencies, or refactoring services littered with switches.
license: MIT
metadata:
  author: nerdfish
  version: '1.0.0'
---

# Monorepo Architecture

Organize by domain, not by technical layer. Keep the dependency graph acyclic.
Push product/kind conditionals to routes and factories.

## When to Apply

Reference these guidelines when:

- Deciding where new code lives (package vs feature vs route)
- Reviewing cross-package / cross-feature imports
- Refactoring layered folders into slices
- Hunting circular dependencies
- Services switching on `kind` / `type` / product flags

## Rule Categories by Priority

| Priority | Category             | Impact   | Prefix           |
| -------- | -------------------- | -------- | ---------------- |
| 1        | Vertical slices      | CRITICAL | `architecture-`  |
| 2        | Acyclic dependencies | CRITICAL | `architecture-`  |
| 3        | Entry-point factories| HIGH     | `patterns-`      |

## Quick Reference

### 1. Vertical slices (CRITICAL)

- `architecture-vertical-slices` - Domain folders under `features/`; routes
  compose blocks; no `*-page` composers in features

### 2. Acyclic dependencies (CRITICAL)

- `architecture-circular-dependencies` - lib → packages → features → app; never
  import upward

### 3. Entry-point factories (HIGH)

- `patterns-factory-entry-points` - Push conditionals to routes/factories; keep
  domain modules branch-free

## How to Use

```
rules/architecture-vertical-slices.md
rules/architecture-circular-dependencies.md
rules/patterns-factory-entry-points.md
```

## Full Compiled Document

For the complete guide with all rules expanded: `AGENTS.md`
