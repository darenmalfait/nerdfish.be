---
title: Playwright BDD Structure
impact: HIGH
impactDescription: Enforced by ESLint @nerdfish/testing-bdd (error)
tags: testing, playwright, bdd, eslint
---

## Playwright BDD Structure

**Impact: HIGH**

This repo spreads `@nerdfish/config/eslint/testing/bdd`. Specs under
`__tests__/` must tell a story. Match existing contact/blog/work specs.

### Structure

1. Top-level `describe` / `test.describe` starts with `User Story:`
2. Nested blocks start with `Given ` or `When `
3. User stories mention **user** (unless permission/role-specific)
4. `When` actions live in `beforeEach` — not loose in the block
5. Assertions (`expect`) only in `test` / `it` cases — not in Given/When
6. No `"and"` in titles — split into nested When / separate tests
7. One coherent action per When

**Incorrect:**

```typescript
test.describe('Contact form', () => {
	test('opens and submits', async ({ contactPage }) => {
		await contactPage.goto()
		await contactPage.openForm()
		await contactPage.form.submit()
		await expect(contactPage.getSuccessAlert()).toBeVisible()
	})
})
```

**Correct:**

```typescript
test.describe('User Story: The user wants to submit the contact form', () => {
	test.describe('Given the user is on the contact page', () => {
		test.beforeEach(async ({ contactPage }) => {
			await contactPage.goto()
		})

		test.describe('When the user opens the contact form', () => {
			test.beforeEach(async ({ contactPage }) => {
				await contactPage.openForm()
			})

			test.describe('When the user submits the form', () => {
				test.beforeEach(async ({ contactPage }) => {
					await contactPage.form.submit()
				})

				test('it should show a success alert', async ({ contactPage }) => {
					await expect(contactPage.getSuccessAlert()).toBeVisible()
				})
			})
		})
	})
})
```

Colocate `*.spec.ts` + `*.page.ts` + `*.fixture.ts` + `*.builders.ts`. Put
selectors in the page object, not the spec.

Reference: `@nerdfish/config/eslint/testing/bdd`, `AGENTS.md` (Playwright),
`apps/web/src/app/[locale]/(website)/contact/__tests__/contact.spec.ts`
