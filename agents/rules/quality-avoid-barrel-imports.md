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
// Importing from a local index.ts barrel
import { blog, work } from './api'

// Importing from package-root barrels
import { Button } from '@nerdfish/react'
import { Section } from '@repo/design-system'
```

**Correct (importing directly from source):**

```typescript
// Import directly from source files
import { blog } from './blog/api'
import { work } from './work/api'

// Import directly from the component path
import { Button } from '@nerdfish/react/button'
import { Section } from '@repo/design-system/components/section'
```

**Exceptions** — packages that actually ship a root entry:

- `@repo/email`
- `@repo/next-config`

Reference: `AGENTS.md` (Imports)
