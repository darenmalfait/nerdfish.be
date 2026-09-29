---
title: Standardize API Mocks With Handler Builders
impact: HIGH
impactDescription: Reusable network mocks + observed payloads
tags: testing, api, mocks, network
---

## Standardize API Mocks With Handler Builders

**Impact: HIGH**

Ad-hoc network stubs repeat status/body logic and leak state between tests. Wrap
each endpoint in a reusable builder; register scenario overrides only inside
`Given` setup.

Same rule for Playwright `page.route`, MSW, Cypress `intercept`, or a seeded
test API — pick the project's mock layer, keep the builder + Given pattern.

### Conventions

- One builder per endpoint / verb (e.g. `mockGetItems`, `mockPostUser`)
- Reset/clean between tests so handlers don't leak
- Register mocks only from a `Given` `beforeEach`
- Verify request payloads via observation callbacks on the builder — not ad-hoc
  request reconstruction in every `it`

**Incorrect:**

```typescript
// Inline stub + one-off request parsing in the assertion
beforeEach(async () => {
  await page.route('**/v1/items', route => route.fulfill({json: [{id: '1'}]}))
})

it('sends the right body', async () => {
  // differently parsed every time
})
```

**Correct (Playwright):**

```typescript
// network.ts
export async function mockPostUser(
  page: Page,
  user: User,
  options?: {onRequest?: (body: unknown) => void},
) {
  await page.route('**/v1/users', async route => {
    const body = route.request().postDataJSON()
    options?.onRequest?.(body)
    await route.fulfill({status: 201, json: user})
  })
}

describe('User Story: As a user, I want to sign up', () => {
  describe('Given the sign-up form is shown', () => {
    const seen: unknown[] = []

    beforeEach(async () => {
      await mockPostUser(page, MOCK_USER(), {
        onRequest: body => seen.push(body),
      })
      await signUpPage.goto()
    })

    describe('When the user submits valid details', () => {
      beforeEach(async () => {
        await signUpPage.fillAndSubmit({
          name: 'Alice Smith',
          email: 'alice@example.com',
        })
      })

      it('should send the correct user data', () => {
        expect(seen[0]).toEqual(
          expect.objectContaining({
            name: 'Alice Smith',
            email: 'alice@example.com',
          }),
        )
      })
    })
  })
})
```

**Correct (MSW / component tests — same shape):**

```typescript
export function postUserHandler(
  user: User,
  options?: {onInitiated?: (payload: {body: unknown}) => void},
) {
  return http.post('*/v1/users', async ({request}) => {
    const body = await request.json()
    options?.onInitiated?.({body})
    return HttpResponse.json(user, {status: 201})
  })
}

// in Given:
server.use(postUserHandler(MOCK_USER(), {onInitiated: postUserMock}))
render(<SignUpForm />)
```
