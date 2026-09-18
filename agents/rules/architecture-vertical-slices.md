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
`apps/web/src/features` holds **reusable domain blocks** (UI, `api.ts`,
`utils.ts`, forms). App Router `page.tsx` / `layout.tsx` files own **route
composition** — metadata, data loading for the route, and wiring feature blocks
together.

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

**Incorrect (page composition living in the feature):**

```
apps/web/src/features/work/components/work-page.tsx   # full page JSX
apps/web/src/app/.../work/page.tsx                    # re-exports / thin wrapper
```

The route owns how blocks are arranged. Features should not export `*-page`
composers that replace `page.tsx`.

**Correct (vertical slice + route composition):**

```
apps/web/src/features/
  blog/
    api.ts
    utils.ts
    components/          # BlogOverview, BlogContent, …
  contact/
    components/          # form, buttons, …
    *.schema.tsx
    *.actions.tsx
  work/
    api.ts
    utils.ts
    components/          # WorkOverview, WorkContent, …
  site/                  # shared marketing chrome blocks
  shared/                # cross-feature primitives (Link, NuqsProvider, …)

apps/web/src/app/[locale]/(website)/work/page.tsx
  # generateMetadata + compose WorkOverview / Cta / Testimonials / …
```

Each feature folder is a self-contained slice that can include:

- Content readers (`api.ts`) for that domain
- Path/helpers (`utils.ts`) used outside the feature
- UI **blocks** for that domain (overviews, forms, embeds — not full pages)
- Form schemas/actions when the feature is web-only
- Filters and other domain-specific modules

**App Router owns:**

- `generateMetadata` / `generateStaticParams`
- Page-level data fetching for the route
- Composition of feature blocks (including `Suspense` boundaries)
- Page Playwright under `app/.../__tests__/`

**Notes for this repo:**

- Portable multi-app code stays in `@repo/*` packages — see
  `architecture-features-modules.md`
- Cross-feature imports use leaf modules — see
  `architecture-feature-boundaries.md`

**Benefits:**

- Domain blocks live together under one feature folder
- Routes stay the single place to see page structure
- Features stay reusable across multiple routes

Reference: `architecture-features-modules.md`, `AGENTS.md`
