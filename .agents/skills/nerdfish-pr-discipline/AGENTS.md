# PR Discipline

Agents stop at local work unless the user asks otherwise. Prefer small, draft,
stackable PRs.

## 1. Git & PR Discipline

**Impact: HIGH**

1. Never push unless explicitly asked
2. Never open or submit PRs unless explicitly asked
3. Never commit unless explicitly asked

When asked to stack work: create/checkout branch, implement, commit locally if
requested, then stop. Do not push or open a PR as a follow-up.

## 2. PR Creation Best Practices

**Impact: HIGH**

- Prefer stacked small PRs over one fat PR
- Draft mode by default
- Conventional Commits titles (`feat:`, `fix:`, `refactor:`)
- Size limits: under ~500 lines / ~10 files when practical
- Before push (when asked): typecheck, lint/format, relevant e2e
