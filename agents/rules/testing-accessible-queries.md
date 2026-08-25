---
title: Prefer Accessible Test Queries
impact: HIGH
impactDescription: Enforced by ESLint @nerdfish/testing (error)
tags: testing, playwright, a11y, eslint
---

## Prefer Accessible Test Queries

**Impact: HIGH**

This repo spreads `@nerdfish/config/eslint/testing`. Query the UI the way a user
(or assistive tech) would — roles, labels, text — not implementation details.

### Prefer

- `getByRole` / `findByRole`
- `getByLabel` / `findByLabelText`
- Page-object wrappers around those (`contactPage.form.getNameInput()`)

### Avoid (lint errors)

- `getByTestId` / `findByTestId` / etc. as primary selectors
- CSS: `querySelector`, `getByClassName`, `locator('.foo')`-style class chasing
- Storing query results then reusing after navigation (stale scope)
- Preferring `getByText` / `getByPlaceholderText` / `getByTitle` when a role or
  label query exists

**Incorrect:**

```typescript
await page.getByTestId('contact-submit').click()
await page.locator('.btn-primary').click()
await page.getByPlaceholderText('Email').fill('a@b.c')
```

**Correct:**

```typescript
await page.getByRole('button', { name: 'Submit' }).click()
await page.getByLabel('Email address').fill('a@b.c')

// Better: hide selectors in the page object
await contactPage.form.getEmailInput().fill('a@b.c')
await contactPage.form.submit()
```

Reference: `@nerdfish/config/eslint/testing`,
`apps/web/src/app/[locale]/(website)/contact/__tests__/contact.page.ts`
