# Monorepo Architecture

Organize by domain, not by technical layer. Keep the dependency graph acyclic.
Push product/kind conditionals to routes and factories.

## 1. Organize Code by Domain Using Vertical Slices

**Impact: CRITICAL**

A `features/` tree holds reusable domain blocks. App Router `page.tsx` /
`layout.tsx` own route composition.

**Incorrect:** layered `components/` + `api/` + `utils/`, or `*-page` composers
inside features.

**Correct:**

```
features/
  blog/
    api.ts
    utils.ts
    components/
  shared/

app/.../work/page.tsx  # compose blocks + metadata
```

## 2. Prevent Circular Dependencies Between Packages

**Impact: CRITICAL**

```
shared lib
  ↓
shared packages
  ↓
features/
  ↓
app routes
```

Never import upward. Cross-feature imports use leaf modules only (no
feature-root barrels). Routes compose features; features never import routes.

## 3. Factory Entry Points

**Impact: HIGH**

If statements belong at the entry point, not scattered throughout services.

**Incorrect:** one service switching on `kind === 'blog' | 'wiki' | …`

**Correct:** route/page imports specialized leaf modules (`blog`, `wiki`,
`work`); each module stays branch-free.
