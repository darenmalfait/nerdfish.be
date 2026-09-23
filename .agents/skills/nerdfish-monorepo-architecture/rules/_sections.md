# Sections

This file defines all sections, their ordering, impact levels, and descriptions.
The section ID (in parentheses) is the filename prefix used to group rules.

---

## 1. Vertical slices (architecture)

**Impact:** CRITICAL  
**Description:** Organize by domain under `features/`. App Router owns route
composition. Features export blocks, not full pages.

## 2. Acyclic dependencies (architecture)

**Impact:** CRITICAL  
**Description:** Keep an acyclic graph: shared lib → shared packages → features
→ app routes. Never import upward.

## 3. Entry-point factories (patterns)

**Impact:** HIGH  
**Description:** Push kind/type/product conditionals to routes and factories so
domain modules stay single-purpose and branch-free.
