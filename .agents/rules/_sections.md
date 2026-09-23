# Sections

This file defines sections for **repo-specific** rules under `.agents/rules/`.
Portable guidelines live in installed skills from
[`darenmalfait/nerdfish-agent-skills`](https://github.com/darenmalfait/nerdfish-agent-skills)
(see `.agents/README.md`).

The section ID (in parentheses) is the filename prefix used to group rules.

---

## 1. Architecture (architecture)

**Impact:** CRITICAL

**Description:** nerdfish.be-specific placement — feature leaf modules,
`@repo/*` vs `apps/web/src/features`. Vertical slices / acyclic graphs are in
`nerdfish-monorepo-architecture`.

## 2. Code Quality (quality)

**Impact:** CRITICAL

**Description:** Local ESLint / import conventions (`@nerdfish/config`). Clarity
/ comments / review / no bare `useEffect` are in `nerdfish-code-quality` (this
repo: `@nerdfish/conventions/no-use-effect`, `useMountEffect` from
`@repo/lib/hooks/use-mount-effect`).

## 3. Data Layer (data)

**Impact:** HIGH

**Description:** content-collections, MDX under `apps/web/content/`, colocated
`api.ts` readers. (No dedicated rule files yet.)

## 4. API Design (api)

**Impact:** HIGH

**Description:** `next-safe-action` + Zod, package `keys.ts`, Resend. (No
dedicated rule files yet.)

## 5. CI/CD (ci)

**Impact:** HIGH

**Description:** Quality Gate failures and local CI interpretation. PR/git
discipline is in `nerdfish-pr-discipline`.
