---
title: Enforce Feature Boundaries Through Leaf Modules
impact: CRITICAL
impactDescription: Prevents architectural erosion and maintains loose coupling
tags: architecture, boundaries, imports, coupling
---

## Enforce Feature Boundaries Through Leaf Modules

**Impact: CRITICAL**

Features expose stable **leaf modules** (`api.ts`, `utils.ts`, top-level
components). Cross-feature and `app/` imports use those paths — never a
feature-root barrel, and avoid deep internals when a leaf already exists.

**Incorrect:**

```typescript
// Bad - feature-root barrel (do not create index.ts / server.ts / client.ts)
import { BlogOverview, blog } from '~/features/blog'

// Bad - reaching past the public leaf into implementation details
import { BlogOverviewContent } from '~/features/blog/components/blog-overview/blog-overview-content'
import { filterBlog } from '~/features/blog/filter'
```

**Correct:**

```typescript
// Good - import leaf modules
import { BlogOverview } from '~/features/blog/components/blog-overview'
import { blog } from '~/features/blog/api'
import { getBlogPath } from '~/features/blog/utils'
import { Link } from '~/features/shared/components/link'
```

**Public leaf convention** (`apps/web/src/features/<name>/`):

| Path | Role |
| --- | --- |
| `api.ts` | Content readers / data access used outside the feature |
| `utils.ts` | Path helpers and pure utils used outside the feature |
| `components/<thing>` | UI meant for composition by `app/` or other features |
| `*.schema.tsx` / `*.actions.tsx` | Forms (when web-only) |

Do **not** add `features/<name>/index.ts`, `server.ts`, or `client.ts` barrels.

**Shared code placement:**

- Domain-agnostic utilities: `packages/lib` / `@repo/lib`, `@repo/observability`
- Shared UI primitives: `@repo/design-system`, `@nerdfish/react`
- Marketing chrome shared across pages: `~/features/site/...`
- Cross-feature primitives (Link, NuqsProvider): `~/features/shared/...`

**Dependency rules:**

- `app/` may import feature leaf modules and `@repo/*`
- Features may import other features' **leaf** modules, `site` / `shared`, and
  `@repo/*`
- Features never import `~/app/**` or `apps/web/src/app/**`
- Prefer not to import deep private files when a leaf module re-exports the
  intended surface (e.g. use `blog-overview`, not `blog-overview-content`)

**Enforcement:** Review-enforced until ESLint boundary rules land. Prefer leaf
imports in code review; reject new feature barrels.

**Benefits:**

- Discoverability: blog logic lives under `apps/web/src/features/blog`
- Clearer deps: `~/features/blog/api` names the dependency surface
- Better tree-shaking than feature-root re-export barrels

Reference: `AGENTS.md`, `architecture-features-modules.md`,
`quality-avoid-barrel-imports.md`
