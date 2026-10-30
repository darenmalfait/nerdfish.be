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

Web-specific **domain blocks** live in `apps/web/src/features/...`:

- Feature UI embeds (`BlogOverview`, form drawers, …)
- Content readers (`api/get-posts.ts`) and helpers (`utils/get-blog-path.ts`),
  one per file
- Form schemas/actions when web-only (`forms/`)

App-wide code that several features use (`Body`, `Link`, providers, types,
global styles) lives next to `features/` in `src/components`, `src/providers`,
`src/types`, `src/utils` and `src/styles`. Folder shape and import rules:
`architecture-feature-boundaries.md`.

**Page composition** (wiring blocks + `Suspense` + route data) stays in
`apps/web/src/app/.../page.tsx`. Do not put `*-page.tsx` composers in features.
Domain organization and vertical slices: `nerdfish-monorepo-architecture`
(skill).

Playwright specs for a **route** stay under `apps/web/src/app/.../__tests__/`
next to that page (not in `features/`).

## Example Structure

```
packages/email/
├── templates/
│   └── …                         # Shared email templates - OK here
└── keys.ts

apps/web/src/features/blog/
├── api/
│   ├── get-post.ts               # One content reader per file
│   └── get-posts.ts
├── utils/
│   ├── get-blog-path.ts          # One helper per file
│   └── filter-blog.ts
└── components/
    └── blog-overview/            # Reusable block — OK here

apps/web/src/app/[locale]/(website)/blog/
├── page.tsx                      # Metadata + compose feature blocks
└── __tests__/
    └── blog.spec.ts              # Page e2e — next to the page
```

Import by file: `~/features/blog/api/get-posts`,
`~/features/blog/utils/get-blog-path`,
`~/features/blog/components/blog-overview` — never `~/features/blog`.

## Why This Matters

```typescript
// ❌ Bad - web-only route composition in a @repo package
import { setRequestLocale } from '@repo/i18n/server'
import { getPathname } from 'routing'

// ❌ Bad - full page composer in a feature (belongs in app/.../page.tsx)
// apps/web/src/features/blog/components/blog-page.tsx

// ✅ Good - reusable block in the feature; page composes it in app/
// apps/web/src/features/blog/components/blog-overview/index.tsx
// apps/web/src/app/[locale]/(website)/blog/page.tsx
```

This separation keeps `@repo/*` portable and keeps routes as the place to read
page structure.
