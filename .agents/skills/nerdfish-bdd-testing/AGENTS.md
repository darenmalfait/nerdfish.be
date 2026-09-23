# BDD Testing

Specs tell a user story. Queries match how a user (or assistive tech)
interacts. Hide selectors behind page/screen objects.

Applies to any user-facing test runner — Playwright, Testing Library, Cypress,
or similar.

## 1. User-Story BDD Structure

**Impact: HIGH**

1. Top-level `describe` starts with `User Story:`
2. Nested blocks start with `Given ` or `When `
3. User stories mention **user** (unless permission/role-specific)
4. `When` actions live in `beforeEach`
5. Assertions only in `it` / `test`
6. No `"and"` in titles — split instead
7. One coherent action per When

**Incorrect:** flat “does X and Y” tests that mix setup, action, and assertion.

**Correct:** nested User Story → Given → When, with outcomes only in `it` /
`test`.

## 2. Prefer Accessible Test Queries

**Impact: HIGH**

**Prefer:** role and label queries; page/screen-object wrappers.

**Avoid:** `testId` as primary, CSS class chasing, stale scopes after
navigation/remount.
