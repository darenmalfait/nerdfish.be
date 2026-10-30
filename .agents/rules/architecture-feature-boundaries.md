---
title: Feature Folder Structure and Boundaries (nerdfish.be)
impact: CRITICAL
impactDescription: Prevents architectural erosion and maintains loose coupling
tags: architecture, boundaries, imports, coupling, structure
---

## Feature Folder Structure and Boundaries (nerdfish.be)

**Impact: CRITICAL**

The general rules (feature folder shape, one function per file in `api/` and
`utils/`, no cross-feature imports, import by file path, routes compose
features) live in the `nerdfish-monorepo-architecture` skill
(`rules/vertical-slices.md`, `rules/circular-dependencies.md`). This file only
records where things live in this repo.

**Shared code in `apps/web/src/`:**

| Folder        | Holds                                                                                          |
| ------------- | ---------------------------------------------------------------------------------------------- |
| `components/` | MDX `Body`, `ImageGrid`, `ImageCredit`, `Skills`, `Link`, `ThemeToggle`                        |
| `providers/`  | `AppProviders`, `ThemeProvider`, `NuqsProvider`                                                |
| `types/`      | `image.ts`, `locale-alternates.ts`, `middleware.ts`                                            |
| `utils/`      | One helper per file (`filter-by-locale`, `fuzzy-filter`, `get-content-language-alternates`, …) |
| `styles/`     | `global.css`                                                                                   |

Domain-agnostic code that other apps could use goes in `@repo/lib` /
`@repo/observability`; shared UI primitives in `@repo/design-system` /
`@nerdfish/react`.

**Repo examples:**

- Content readers: `~/features/blog/api/get-posts`,
  `~/features/blog/api/get-post`
- Path helpers: `~/features/blog/utils/get-blog-path`
- Search: `~/features/blog/utils/filter-blog` wraps `~/utils/fuzzy-filter` with
  the blog's search keys
- Route injecting another feature:
  `app/[locale]/(website)/work/[...slug]/page.tsx` passes `Testimonials` to
  `WorkContent` via `bodyComponents`

**Enforcement:** ESLint, via `@nerdfish/conventions/feature-folder-structure`
and `@nerdfish/conventions/no-cross-feature-imports` (`@nerdfish/config` ≥ 4.3).

Reference: `nerdfish-monorepo-architecture` skill, `AGENTS.md`,
`architecture-features-modules.md`, `quality-avoid-barrel-imports.md`
