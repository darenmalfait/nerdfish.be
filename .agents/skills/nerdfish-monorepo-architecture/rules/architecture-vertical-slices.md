---
title: Organize Code by Domain Using Vertical Slices
impact: CRITICAL
impactDescription:
  Dramatically improves discoverability and reduces cross-cutting churn
tags: architecture, vertical-slices, ddd, organization
---

## Organize Code by Domain Using Vertical Slices

**Impact: CRITICAL**

Organize the web app by **domain**, not by technical layer. A `features/`
(or equivalent) tree holds **reusable domain blocks** (UI, `api.ts`, utils,
forms). App Router `page.tsx` / `layout.tsx` files own **route composition** —
metadata, route-level data loading, and wiring feature blocks together.

**Incorrect (traditional layered architecture):**

```
src/
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
features/work/components/work-page.tsx   # full page JSX
app/.../work/page.tsx                    # re-exports / thin wrapper
```

The route owns how blocks are arranged. Features should not export `*-page`
composers that replace `page.tsx`.

**Correct (vertical slice + route composition):**

```
features/
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
  shared/                # cross-feature primitives

app/.../work/page.tsx
  # generateMetadata + compose WorkOverview / Cta / …
```

Each feature folder is a self-contained slice that can include:

- Content/API readers for that domain
- Path/helpers used outside the feature
- UI **blocks** for that domain (overviews, forms — not full pages)
- Form schemas/actions when the feature is app-only

**App Router owns:**

- `generateMetadata` / `generateStaticParams`
- Page-level data fetching for the route
- Composition of feature blocks (including `Suspense` boundaries)
- Page e2e colocated under the route

**Benefits:**

- Domain blocks live together under one feature folder
- Routes stay the single place to see page structure
- Features stay reusable across multiple routes

Portable multi-app code belongs in shared packages (`@repo/*` or equivalent) —
not in feature folders.
