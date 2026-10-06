---
title: Keep Related Test Stories Together
impact: MEDIUM
impactDescription: Cohesion until size forces a split
tags: testing, organization, files
---

## Keep Related Test Stories Together

**Impact: MEDIUM**

Related user stories stay in the same spec file until size or domain boundary
forces a split. Splitting too early hides relationships; splitting too late
hurts navigation.

### Rules

1. Keep related stories for the same page/feature together while they share
   setup (e.g. filter, sort, and search on one page)
2. Soft limit: around **2000 lines** — then check whether you can split by
   distinct feature
3. After that, split by domain or role while preserving logical grouping (e.g.
   browsing vs admin management)

**Incorrect:** one tiny file per story for the same page, or one megafile that
mixes unrelated domains.

**Correct:** one file for a page's related flows until it grows past ~2000 lines
or starts mixing distinct domains — then split along those boundaries.
