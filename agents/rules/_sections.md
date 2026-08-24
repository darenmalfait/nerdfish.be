# Sections

This file defines all sections, their ordering, impact levels, and descriptions.
The section ID (in parentheses) is the filename prefix used to group rules.

---

## 1. Architecture (architecture)

**Impact:** CRITICAL

**Description:** Next.js App Router (route groups, `[locale]`), pnpm/Turbo
package boundaries, and where code lives (`apps/web` vs `@repo/*`) — the
foundation of how this codebase is organized.

## 2. Code Quality (quality)

**Impact:** CRITICAL

**Description:** Standards for maintaining high-quality, maintainable code
including PR reviews, testing, and accountability.

## 3. Data Layer (data)

**Impact:** HIGH

**Description:** content-collections, MDX under `apps/web/content/`, and
colocated `api.ts` readers. Isolates content shape from pages so UI doesn't
couple to collection internals. This repo has no Prisma, no repositories, no
DTOs.

## 4. API Design (api)

**Impact:** HIGH

**Description:** `next-safe-action` + Zod for mutations, package `keys.ts` for
env, Resend for email. Keep HTTP/server-action concerns out of UI. This repo has
no tRPC and no REST controllers.

## 5. Performance (performance)

**Impact:** HIGH

**Description:** Bundle size, tree-shaking (no package barrels), Next.js
`<Image>` instead of `<img>`, and avoiding unnecessary client JS.

## 6. Testing (testing)

**Impact:** MEDIUM-HIGH

**Description:** Playwright BDD coverage, colocated `__tests__/`, page objects,
fixtures, and builders. No unit-test runner.

## 7. Design Patterns (patterns)

**Impact:** MEDIUM

**Description:** Early returns, colocated form `*.schema.tsx` / `*.actions.tsx`,
`createMetadata`, and composition over new abstractions.

## 8. Team Culture (culture)

**Impact:** MEDIUM

**Description:** Engineering culture, accountability, and collaboration
standards — draft PRs, conventional commits, small diffs.

## 9. CI/CD (ci)

**Impact:** HIGH

**Description:** GitHub Actions Quality Gate (format, lint, typecheck, e2e),
type checking priorities, and git workflow standards. Lint/typecheck need
`pnpm build:content-collections` first.

## 10. Reference (reference)

**Impact:** LOW

**Description:** Informational lookups, file locations, and local development
setup guides. Prefer `AGENTS.md`.
