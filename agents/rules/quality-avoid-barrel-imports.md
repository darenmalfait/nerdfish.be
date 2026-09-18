---
title: Avoid Barrel Imports
impact: MEDIUM
impactDescription: Improves tree-shaking and reduces bundle size
tags: imports, performance, bundling
---

## Avoid Barrel Imports

**Impact: MEDIUM (Improves tree-shaking and reduces bundle size)**

Barrel files (`index.ts` that re-export from multiple modules) can hurt
tree-shaking and increase bundle sizes. Import directly from source files
instead.

**Incorrect (importing from barrel files):**

```typescript
// Feature-root barrels — do not create these
import { BlogOverview, blog } from '~/features/blog'
import { Body } from '~/features/site'

// Package-root barrels
import { Button } from '@nerdfish/react'
import { Section } from '@repo/design-system'
```

**Correct (importing directly from source):**

```typescript
// Feature leaf modules
import { BlogOverview } from '~/features/blog/components/blog-overview'
import { blog } from '~/features/blog/api'
import { Body } from '~/features/site/components/body'

// Package subpaths
import { Button } from '@nerdfish/react/button'
import { Section } from '@repo/design-system/components/section'
```

**Do not add** `apps/web/src/features/<name>/index.ts`, `server.ts`, or
`client.ts` re-export barrels. Prefer stable leaf files (`api.ts`, `utils.ts`,
`components/...`).

**Exceptions** — packages that actually ship a root entry:

- `@repo/email`
- `@repo/next-config`

Reference: `AGENTS.md` (Imports), `architecture-feature-boundaries.md`
