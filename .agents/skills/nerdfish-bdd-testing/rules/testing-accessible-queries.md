---
title: Prefer Accessible Test Queries
impact: HIGH
impactDescription: Query the UI the way a user would
tags: testing, a11y, queries
---

## Prefer Accessible Test Queries

**Impact: HIGH**

Query the UI the way a user (or assistive tech) would — roles, labels, text —
not implementation details. Same idea in Testing Library, Playwright, Cypress,
etc.

### Prefer

- Role queries (`getByRole` / `findByRole`)
- Label queries (`getByLabel` / `findByLabelText`)
- Page/screen-object wrappers around those

### Avoid

- `getByTestId` / `data-testid` as primary selectors
- CSS / class / DOM-structure chasing
- Preferring placeholder/title/raw text when a role or label query exists
- Caching query results across navigations or remounts (stale scope)

**Incorrect:**

```typescript
await screen.getByTestId('contact-submit').click()
await page.locator('.btn-primary').click()
await screen.getByPlaceholderText('Email').fill('a@b.c')
```

**Correct:**

```typescript
await screen.getByRole('button', { name: 'Submit' }).click()
await screen.getByLabel('Email address').fill('a@b.c')

// Better: hide selectors in the page/screen object
await contactPage.form.getEmailInput().fill('a@b.c')
await contactPage.form.submit()
```
