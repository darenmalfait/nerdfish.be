---
title: Prevent Circular Dependencies Between Packages
impact: CRITICAL
impactDescription:
  Prevents build failures, type errors, ensures honest implementation, and
  maintains clean dependency graph
tags: architecture, dependencies, packages, imports, circular
---

## Prevent Circular Dependencies Between Packages

**Impact: CRITICAL**

Circular dependencies between packages cause build failures, type errors, and
make the codebase unmaintainable. The dependency graph must be acyclic, with
clear layers from low-level utilities up to high-level features.

The dependency hierarchy (from lowest to highest):

```
packages/lib (lowest - no feature dependencies)
  ↓
@repo/* shared packages
  ↓
apps/web/src/features
  ↓
apps/web/src/app (highest - can depend on all packages and features)
```

**Benefits:**

- **Honest implementation**: The dependency graph accurately reflects what code
  depends on what, with no hidden or circular relationships that create false
  expectations
- **Predictable behavior**: Code behaves as the dependency structure suggests -
  no surprises from circular imports
- **Clear mental model**: Developers can reason about the system without
  tracking complex circular relationships
- **Build reliability**: No circular dependency errors during compilation or
  bundling
- **Easier testing**: Lower-level packages can be tested independently without
  pulling in the entire codebase

### `packages/lib`

**Rules:**

1. No files in `packages/lib` import from `~/features/**` or `../features/**`
2. No files in `packages/lib` import from `apps/web` or `~/app/**`
3. No files in `packages/lib` import from higher domain `@repo/*` packages (e.g.
   `@repo/timesheets`) when that creates an upward dependency
4. **BONUS:** No feature or app-router UI allowed in `packages/lib` (those
   belong in `apps/web/src/features` or other `@repo/*` packages)

**Incorrect:**

```typescript
// Bad - lib importing from features
import { blog } from '~/features/blog/api'
import { BlogOverview } from '~/features/blog/components/blog-overview'

// Bad - lib importing from the web app
import HomePage from '~/app/[locale]/(website)/page'
```

**Correct:**

```typescript
// Good - lib only imports from other lib files or external packages
import { cn } from '@repo/lib/utils/class'
import { parseError } from '@repo/observability/error'
```

### `@repo/*` shared packages

**Rules:**

5. No files in `@repo/*` shared packages import from `~/features/**` or
   `apps/web/src/features/**`
6. No files in `@repo/*` shared packages import from `apps/web` or `~/app/**`

**Incorrect:**

```typescript
// Bad - shared package importing from features
import { BlogOverview } from '~/features/blog/components/blog-overview'

// Bad - shared package importing from the web app
import HomePage from '~/app/[locale]/(website)/page'
```

**Correct:**

```typescript
// Good - shared packages import from lib and other lower/shared @repo packages
import { cn } from '@repo/lib/utils/class'
import { parseError } from '@repo/observability/error'
```

### `apps/web/src/features`

**Rules:**

7. No files in `apps/web/src/features` import from `apps/web/src/app/**` or
   `~/app/**`
8. No files in `apps/web/src/features` import from `apps/web` route modules
9. Cross-feature imports use **leaf modules** only (no feature-root barrels)

**Incorrect:**

```typescript
// Bad - features importing from the web app
import type { PageProps } from '~/app/[locale]/(website)/blog/page'
import { RootLayout } from '~/app/[locale]/(website)/layout'

// Bad - feature-root barrel
import { blog } from '~/features/blog'
```

**Correct:**

```typescript
// Good - features import from @repo packages and other features' leaf modules
import { Section } from '@repo/design-system/components/section'
import { Link } from '~/features/shared/components/link'
import { getPathname } from 'routing'
```

### `apps/web/src/app`

**Rules:**

10. Dependency direction is app → features only (features never depend on app)
11. App routes compose feature leaf modules; keep `generateMetadata` in the route

**Incorrect:**

```typescript
// Bad - features importing from the web app
import { generateMetadata } from '~/app/[locale]/(website)/blog/page'
```

**Correct:**

```typescript
// Good - app imports from feature leaves and @repo packages
import { BlogOverview } from '~/features/blog/components/blog-overview'
import { createMetadata } from '@repo/seo/metadata'
```

## Enforcement

These rules should be enforced through:

- ESLint rules that detect forbidden import paths (when added)
- CI checks that fail on circular dependencies
- Code review guidelines that flag violations

Reference: `architecture-feature-boundaries.md`, `quality-avoid-barrel-imports.md`
