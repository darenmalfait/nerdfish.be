---
title: User-Story BDD Structure
impact: HIGH
impactDescription: Specs tell a coherent user story
tags: testing, bdd, user-story
---

## User-Story BDD Structure

**Impact: HIGH**

User-facing specs must tell a story. Runner APIs differ (`describe` /
`test.describe`, `beforeEach`, `it` / `test`) — the nesting rules do not.

### Structure

1. Top-level `describe` starts with `User Story:`
2. Nested blocks start with `Given ` or `When `
3. User stories mention **user** (unless permission/role-specific)
4. `When` actions live in `beforeEach` — not loose in the block
5. Assertions (`expect`) only in `it` / `test` cases — not in Given/When
6. No `"and"` in titles — split into nested When / separate tests
7. One coherent action per When

**Incorrect:**

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

**Correct:**

```typescript
describe('User Story: The user wants to submit the contact form', () => {
	describe('Given the user is on the contact page', () => {
		beforeEach(async () => {
			await contactPage.goto()
		})

		describe('When the user opens the contact form', () => {
			beforeEach(async () => {
				await contactPage.openForm()
			})

			describe('When the user submits the form', () => {
				beforeEach(async () => {
					await contactPage.form.submit()
				})

				it('it should show a success alert', async () => {
					await expect(contactPage.getSuccessAlert()).toBeVisible()
				})
			})
		})
	})
})
```

Put selectors in page/screen objects, not in the spec. Colocate spec + object +
fixture/builders next to the feature under test when the project supports it.
