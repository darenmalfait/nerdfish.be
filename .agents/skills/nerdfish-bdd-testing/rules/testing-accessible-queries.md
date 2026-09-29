---
title: Prefer Accessible Test Queries
impact: HIGH
impactDescription: Query the UI the way a user would
tags: testing, a11y, queries
---

## Prefer Accessible Test Queries

**Impact: HIGH**

Query the UI the way a user (or assistive tech) would — roles, labels, visible
name — not implementation details. Applies equally to Playwright, Testing
Library, Cypress, and similar.

### Prefer

- Role queries (`getByRole` / `page.getByRole` / role-based Cypress commands)
- Label queries (`getByLabel` / `page.getByLabel` / …)
- Page/screen-object methods that wrap those queries
- Query at interaction/assertion time — don't hold resolved nodes across
  remounts or navigations

### Avoid

- `getByTestId` / `data-testid` / `data-test` as primary selectors
- CSS / class / DOM-structure chasing
- Preferring placeholder/title/raw text when a role or label query exists
- Caching resolved elements or `ElementHandle`s across navigations
- Asserting literal translated copy as the primary check — prefer keys, roles,
  or behavior that survives locale changes

| Runner          | Role                                   | Label                     |
| --------------- | -------------------------------------- | ------------------------- |
| Playwright      | `page.getByRole('button', { name })`   | `page.getByLabel(text)`   |
| Testing Library | `screen.getByRole(...)`                | `screen.getByLabel(...)`  |
| Cypress         | `cy.findByRole(...)` (Testing Library) | `cy.findByLabelText(...)` |

Playwright locators are lazy (re-query on use). In Testing Library, wrap
repeated lookups in getter functions so remounts don't leave stale nodes.

**Incorrect:**

```typescript
await page.getByTestId('contact-submit').click()
await page.locator('.btn-primary').click()
await screen.getByPlaceholderText('Email').fill('a@b.c')

const submitButton = screen.getByRole('button', {name: 'Submit'})
// …re-render / navigation…
await user.click(submitButton) // stale

expect(screen.getByText('Welkom terug')).toBeInTheDocument()
```

**Correct:**

```typescript
// Prefer page/screen objects in every runner
await contactPage.form.getEmailInput().fill('a@b.c')
await contactPage.form.submit()

// Direct queries when needed
await page.getByRole('button', {name: 'Submit'}).click()
await screen.getByRole('button', {name: 'Submit'}).click()

// Testing Library: getter if reused after remount
const getSubmitButton = () => screen.getByRole('button', {name: 'Submit'})
await user.click(getSubmitButton())

// i18n: assert key / semantic role, not locale string
await expect(page.getByRole('heading', {name: 'welcome.message'})).toBeVisible()
```
