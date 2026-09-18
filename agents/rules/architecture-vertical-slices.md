---
title: Organize Code by Domain Using Vertical Slices
impact: CRITICAL
impactDescription:
  Dramatically improves discoverability and reduces cross-cutting churn
tags: architecture, vertical-slices, ddd, organization
---

## Organize Code by Domain Using Vertical Slices

**Impact: CRITICAL**

Our web app is organized by domain, not by technical layer.
`apps/web/src/features` is the heart of this approach. Each folder inside is a
vertical slice for the domain it owns. Thin App Router files under
`apps/web/src/app` compose those slices (routes, metadata, page e2e).

**Incorrect (traditional layered architecture):**

```
apps/web/src/
  components/
    blog-overview.tsx
    contact-form.tsx
    work-overview.tsx
  api/
    blog.ts
    work.ts
  utils/
    blog-path.ts
    work-path.ts
```

This scatters one feature across directories, makes ownership unclear, and turns
small feature changes into wide diffs.

**Correct (vertical slice architecture):**

```
apps/web/src/features/
  blog/
    api.ts
    utils.ts
    components/
  contact/
    components/
    *.schema.tsx
    *.actions.tsx
  work/
    api.ts
    utils.ts
    components/
  site/          # shared marketing chrome
  shared/        # cross-feature primitives (Link, NuqsProvider, …)
```

Each feature folder is a self-contained slice that can include:

- Content readers (`api.ts`) for that domain
- Path/helpers (`utils.ts`) used outside the feature
- UI components for that domain
- Form schemas/actions when the feature is web-only
- Filters and other domain-specific modules

**Notes for this repo:**

- Page Playwright specs stay under `apps/web/src/app/.../__tests__/` next to the
  route (not inside `features/`)
- Portable multi-app code stays in `@repo/*` packages, not in features — see
  `architecture-features-modules.md`
- Cross-feature imports use leaf modules — see
  `architecture-feature-boundaries.md`

**Benefits:**

- Everything related to a feature lives in one directory
- You can understand the feature by exploring one folder
- Features stay loosely coupled and can evolve independently

Reference: `architecture-features-modules.md`, `AGENTS.md`
