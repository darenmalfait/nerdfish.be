---
title: User-Story BDD Structure
impact: HIGH
impactDescription: Specs tell a coherent user story
tags: testing, bdd, user-story
---

## User-Story BDD Structure

**Impact: HIGH**

Guideline for Playwright, Testing Library, Cypress, or any other user-based UI
test. Runner APIs differ (`describe` / `test.describe`, `beforeEach`, `it` /
`test`) — the nesting rules do not.

Use BDD nesting for e2e, component, and integration tests that exercise a user
flow. Do **not** use it for unit tests of pure functions or isolated helpers —
those stay flat (`describe` + `it` only).

### Structure

1. Top-level `describe` starts with `User Story:`
2. Prefer `As a user` unless permission/role is intrinsic to the behavior
3. `Given` blocks sit directly under the User Story — never nest Given under
   Given or under When
4. `Given` = scenario setup: mocks/seed data + arrive at starting UI state.
   Practical marker: navigation or mount (`page.goto` / page-object `goto`,
   `render(...)`, `cy.visit`, …)
5. User actions may appear in Given only as prerequisites to reach that starting
   state — not when the action itself is under test
6. `When` = one coherent user gesture (click, fill, select, submit, …).
   Practical marker: a real interaction API. No gesture → not a When
7. `When` actions live in `beforeEach` — not loose in the block
8. Nest `When` under `When` for sequential actions after the scenario is set
9. Assertions (`expect`) only in `it` / `test` — not in Given/When
10. `it` may sit directly under `Given` for initial-state assertions (no user
    gesture after setup). Do not invent passive Whens like
    `When the page is rendered` / `When the page has loaded`
11. No `"and"` / `"then"` in titles — split into nested When or another test
12. One coherent outcome per `it`

**Canonical shapes:**

- With a user action: `User Story → Given → When → it`
- Initial state only: `User Story → Given → it`

### Runner API map

| Concern      | Playwright                          | Testing Library                   | Cypress               |
| ------------ | ----------------------------------- | --------------------------------- | --------------------- |
| Arrive at UI | `page.goto` / `contactPage.goto()`  | `render(<Page />)`                | `cy.visit(...)`       |
| Gesture      | `getByRole(...).click()` / `fill()` | `userEvent.click` / `type`        | `cy.get(...).click()` |
| Assert       | `expect(locator).toBeVisible()`     | `expect(...).toBeInTheDocument()` | `cy.contains(...)`    |

Prefer **page/screen objects** so specs look the same across runners — put
`goto`, clicks, and queries behind methods; keep the BDD nesting identical.

**Incorrect (flat, mixes setup/action/assert):**

```typescript
describe('Contact form', () => {
  it('opens and submits', async () => {
    await contactPage.goto()
    await contactPage.openForm()
    await contactPage.form.submit()
    await expect(contactPage.getSuccessAlert()).toBeVisible()
  })
})
```

**Incorrect (nested Given under When; passive When):**

```typescript
describe('User Story: As a user, I want to check out', () => {
  describe('Given I have items in my cart', () => {
    describe('When I proceed to checkout', () => {
      describe('Given the payment API fails', () => {
        it('shows an error message', () => {})
      })
    })
  })
})

describe('Given products are available', () => {
  beforeEach(async () => {
    await productsPage.goto()
  })

  describe('When the page first renders', () => {
    it('should display all products', () => {})
  })
})
```

**Correct (page/screen objects — same shape in Playwright or component tests):**

```typescript
describe('User Story: As a user, I want to submit the contact form', () => {
  describe('Given the user is on the contact page', () => {
    beforeEach(async () => {
      await contactPage.goto() // or render(<ContactPage />) behind goto()
    })

    describe('When the user opens the contact form', () => {
      beforeEach(async () => {
        await contactPage.openForm()
      })

      describe('When the user submits the form', () => {
        beforeEach(async () => {
          await contactPage.form.submit()
        })

        it('should show a success alert', async () => {
          await expect(contactPage.getSuccessAlert()).toBeVisible()
        })
      })
    })
  })
})

describe('User Story: As a user, I want to browse products', () => {
  describe('Given products are available', () => {
    beforeEach(async () => {
      await productsPage.goto()
    })

    it('should display all products', async () => {
      await expect(productsPage.getProductRows()).toHaveCount(2)
    })

    describe('When the user filters by category', () => {
      beforeEach(async () => {
        await productsPage.filterByCategory('Electronics')
      })

      it('should show only matching products', async () => {
        await expect(productsPage.getProductRows()).toHaveCount(1)
      })

      describe('When the user then clears the filter', () => {
        beforeEach(async () => {
          await productsPage.clearFilters()
        })

        it('should show all products again', async () => {
          await expect(productsPage.getProductRows()).toHaveCount(2)
        })
      })
    })
  })
})
```

**Unit tests stay flat:**

```typescript
describe('formatPrice', () => {
  it('formats whole numbers with a currency symbol', () => {
    expect(formatPrice(10)).toBe('$10.00')
  })
})
```

Use a role in the story only when the role is part of the behavior:

```typescript
describe('User Story: As an admin, I want to delete an item', () => {})
```

Colocate spec + page/screen object + builders next to the feature under test
when the project supports it.
