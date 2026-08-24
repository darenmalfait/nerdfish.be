---
title: CI Check Failure Handling
impact: HIGH
impactDescription: Misinterpreting CI failures wastes debugging time
tags: ci, debugging, workflow
---

# CI Check Failure Handling

## What to Focus On

When reviewing CI check failures on this repo (Quality Gate in
`.github/workflows/code-quality.yml`):

1. **E2E tests can be flaky** and may fail intermittently (Playwright timing,
   network, local `reuseExistingServer`)
2. **Focus only on CI failures that are directly related to your code changes**
3. Infrastructure-related failures (dependency install, Actions cache, runner
   disk) can be disregarded if all code-specific checks pass — format, lint,
   typecheck, and e2e assertions you touched still count as code-specific

## Known CI Issues to Ignore

This repo has **no** SAML/Postgres/yarn jobs. Do **not** ignore format, lint, or
typecheck. The following are setup issues, not product bugs — fix the setup,
don't "skip" the check:

- Missing `content-collections` types because `pnpm build:content-collections`
  wasn't run (lint/typecheck in CI always run this first)
- E2e trying to send mail locally because `SKIP_EMAILS` is unset (CI sets
  `SKIP_EMAILS: true`)

There is no ignore-list for `"password authentication failed for user postgres"`
or `"Invalid URL"` — those don't apply here.

## E2E Tests

**E2E is always required on this repo.** There is no `ready-for-e2e` (or
similar) label that skips tests.

- CI runs `turbo test:e2e --continue` after a full `pnpm build`
- CI sets `SKIP_EMAILS: true` so contact-form tests don't hit Resend
- Do not treat a failed e2e job as "expected skip" — if assertions broke, fix
  the app or the test
- If e2e is skipped locally, that's a local config issue, not CI policy

## Before Blaming CI

Always run type checks locally before concluding that CI failures are unrelated
to your changes:

```bash
pnpm build:content-collections
pnpm typecheck
```

Even if errors appear in files you haven't directly modified, your changes might
still be causing type issues through `@repo/*` dependencies, content-
collections schema, `routing.ts`, or i18n dictionaries.
