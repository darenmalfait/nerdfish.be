---
title: Enforce Feature Boundaries Through Public APIs
impact: CRITICAL
impactDescription: Prevents architectural erosion and maintains loose coupling
tags: architecture, boundaries, imports, coupling
---

## Enforce Feature Boundaries Through Public APIs

**Impact: CRITICAL**

Features communicate through well-defined interfaces. If home needs blog
overview data, it imports from `~/features/blog` through exported interfaces,
not by reaching into internal implementation details.

**Incorrect (reaching into internals):**

```typescript
// Bad - Importing internal implementation details
import { filterBlog } from '~/features/blog/filter'
import { BlogOverviewContent } from '~/features/blog/components/blog-overview/blog-overview-content'
```

**Correct (using public API):**

```typescript
// Good - Import through the feature's public API
import { BlogOverview, blog } from '~/features/blog'
import type { Blog } from '~/features/blog'
```

**Shared code placement:**

- Domain-agnostic utilities and cross-cutting concerns (auth, logging):
  `packages/lib` / `@repo/lib`, `@repo/observability`
- Shared UI primitives: `@repo/design-system`, `@nerdfish/react`

**Enforcement:** Domain boundaries are enforced automatically through linting.
If `apps/web/src/features/home` tries to import from
`apps/web/src/features/blog/components/blog-overview/blog-overview-content`, the
linter will block it. All cross-feature dependencies must go through the
feature's public API.

**Benefits:**

- Discoverability: Looking for blog logic? It's all in
  `apps/web/src/features/blog`
- Easier testing: Test the entire feature as a unit with all pieces in one place
- Clearer dependencies: When you see
  `import { BlogOverview } from '~/features/blog'`, you know exactly which
  feature you're depending on

Reference: `AGENTS.md`, `architecture-features-modules.md`
