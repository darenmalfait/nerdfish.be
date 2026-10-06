---
title: Git & PR Discipline
impact: HIGH
impactDescription: Do not push, open PRs, or commit unless explicitly asked
tags: git, pull-request, workflow, agent
---

## Git & PR Discipline

**Impact: HIGH**

### Rules

1. **Never push** (`git push`, `gh stack push`, etc.) unless the user explicitly
   asks.
2. **Never open or submit PRs** (`gh pr create`, `gh stack submit`,
   `gh stack link`, etc.) unless the user explicitly asks.
3. **Never commit** unless the user explicitly asks.

### What "stack on top" means

When the user asks to put work on a stack or new branch:

- Create/checkout the branch
- Implement and commit locally (only if commit was requested)
- Stop there

Do **not** push or open a PR as a follow-up unless they ask.

### Allowed without asking

- Local git: `status`, `diff`, `log`, `branch`
- Explain what branch/PR commands _would_ be run, and wait for approval

### Examples

**User:** "implement X and put it on a new stack on top of Y"

- Create branch, implement, commit locally if asked
- Tell the user the branch name and that they can ask to push or open a PR
- Do **not** run `gh stack submit`

**User:** "push and open a PR"

- Then push and create the PR
