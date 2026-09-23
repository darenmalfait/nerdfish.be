---
title: PR Creation Best Practices
impact: HIGH
impactDescription: PRs that don't follow guidelines slow down review cycles
tags: pull-request, code-review, workflow, gh-stack
---

# PR Creation Best Practices

**Impact: HIGH**

Prefer small, draft, stackable PRs. Do **not** push branches or open/submit PRs
unless the user explicitly asks — see `git-pr-discipline.md`.

## Do Not Push or Open PRs Automatically

Local work stops at branch + commit (when commit was requested). Never run as a
follow-up unless asked:

- `git push`, `gh stack push`
- `gh pr create`, `gh stack submit`, `gh stack link`

When the user asks to put work on a stack: create/checkout the branch,
implement, commit locally if requested, then stop. Tell them the branch name and
that they can ask to push or open a PR.

## Stacked PRs

Large work should be a **stack of small PRs**, not one fat PR.

- Bottom of the stack is closest to trunk (`main`); top is furthest
- PR title/body describe **that layer only**, not the whole feature
- Prefer stacked tooling (`gh stack` or equivalent) when a change depends on an
  unmerged lower layer

**Incorrect:** one PR that mixes schema + server action + form UI + e2e

**Correct:** three stacked PRs

1. `feat(contact): add field to schema and i18n`
2. `feat(contact): wire server action and email`
3. `feat(contact): form UI and Playwright coverage`

## Draft Mode

Create pull requests in **draft** mode by default. A human marks ready for
review when the stack layer is actually ready.

## PR Title

- Conventional Commits: `feat:`, `fix:`, `refactor:` (scope optional)
- Specific: `fix(booking): handle timezone edge case in creation`
- Not generic: `fix: booking bug`

## Size Limits

- **Large PRs** (>500 lines or >10 files) are not recommended
- Split large changes by layer (schema, API, UI) or by feature piece

## Before Pushing (when the user asks to push)

1. Typecheck
2. Lint / format
3. Run relevant e2e for touched UI/routes
