---
title: Prevent Circular Dependencies Between Packages
impact: CRITICAL
impactDescription:
  Prevents build failures, type errors, and maintains a clean dependency graph
tags: architecture, dependencies, packages, imports, circular
---

## Prevent Circular Dependencies Between Packages

**Impact: CRITICAL**

Circular dependencies between packages cause build failures, type errors, and
make the codebase unmaintainable. The dependency graph must be acyclic, with
clear layers from low-level utilities up to high-level features.

Typical hierarchy (lowest → highest):

```
shared lib package (no feature deps)
  ↓
shared domain packages (@repo/* or equivalent)
  ↓
app features/
  ↓
app routes (app/)  — highest; can depend on packages and features
```

**Benefits:**

- Honest dependency graph — no hidden cycles
- Predictable behavior
- Clear mental model
- Reliable builds
- Lower layers testable in isolation

### Shared lib package

**Rules:**

1. Never import from `features/**` or app routes
2. Never import from higher-domain shared packages when that creates an upward
   dependency
3. No feature or app-router UI in the lowest lib package

**Incorrect:**

```typescript
import { blog } from '~/features/blog/api'
import HomePage from '~/app/[locale]/(website)/page'
```

**Correct:**

```typescript
import { cn } from '@repo/lib/utils/class'
```

### Shared packages

**Rules:**

4. Never import from `features/**` or app routes
5. Only depend on lower/shared packages and externals

### Features

**Rules:**

6. Never import from app routes (`app/**`)
7. Cross-feature imports use **leaf modules** only (no feature-root barrels)

**Incorrect:**

```typescript
import type { PageProps } from '~/app/.../blog/page'
import { blog } from '~/features/blog' // barrel
```

**Correct:**

```typescript
import { Section } from '@repo/design-system/components/section'
import { Link } from '~/features/shared/components/link'
```

### App routes

**Rules:**

8. Dependency direction is app → features only (features never depend on app)
9. Routes compose feature leaf modules; keep `generateMetadata` in the route

## Enforcement

- ESLint forbidden-import rules (when available)
- CI checks that fail on cycles
- Code review that flags upward imports
