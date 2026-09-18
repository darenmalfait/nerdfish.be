---
title: @repo packages vs apps/web/src/features
impact: HIGH
impactDescription: Wrong placement causes tight coupling and import issues
tags: architecture, features, packages
---

# @repo packages vs apps/web/src/features

## @repo packages (`packages/`)

`@repo/*` packages should contain only framework-agnostic (or multi-app) code:

- Shared clients and helpers (email, auth, seo, recaptcha, …)
- Content-collection config and pipelines
- Design-system primitives
- Types and interfaces owned by that package

**Files in `packages/**` should NOT import from `apps/web` or `~/features/**`.**

## apps/web/src/features

Web-specific code, particularly anything that is route-adjacent UI or
Next.js-only, should live in `apps/web/src/features/...`:

- React page composers and feature UI
- `next-safe-action` forms (`*.schema.tsx`, `*.actions.tsx`)
- Content readers (`api.ts`) used by the marketing/app UI
- Colocated Playwright `__tests__/`

## Example Structure

```
packages/email/
├── templates/
│   └── …                         # Shared email templates - OK here (used by apps/email + web)
└── keys.ts                       # Package-owned env - OK here

apps/web/src/features/blog/
├── api.ts                        # Content reader - OK here
├── components/
│   └── blog-overview/            # Web UI - OK here
└── __tests__/
    └── blog.spec.ts              # Playwright - MUST be here (or under this feature)
```

## Why This Matters

```typescript
// ❌ Bad - web-only Next.js page composer in a @repo package
// packages/blog/blog-page.tsx
import { setRequestLocale } from '@repo/i18n/server'
import { getPathname } from 'routing'

// ✅ Good - web-only composer in apps/web/src/features
// apps/web/src/features/blog/blog-page.tsx
import { setRequestLocale } from '@repo/i18n/server'
import { getPathname } from 'routing'
```

This separation ensures that `@repo/*` remains portable and can be used by other
apps (like `apps/email` or `apps/og-image`) without pulling in web-specific
dependencies.
