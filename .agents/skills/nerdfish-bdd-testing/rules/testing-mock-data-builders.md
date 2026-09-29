---
title: Use Mock Data Builders
impact: HIGH
impactDescription: Typed builders beat brittle inline fixtures
tags: testing, fixtures, builders
---

## Use Mock Data Builders

**Impact: HIGH**

Inline fixtures are noisy and break when API models change. Create test data
through typed builder functions and override only fields that matter for the
scenario.

Same builders feed Playwright routes, MSW handlers, Cypress fixtures, or a
seeded backend — don't fork fixture shapes per runner.

### Conventions

- Name builders `MOCK_<ENTITY>` (e.g. `MOCK_ITEM`, `MOCK_USER`)
- Defaults should be realistic (faker / similar is fine)
- Spread `overrides?: Partial<Entity>` last
- Colocate builders near the feature or shared test utils

**Incorrect:**

```typescript
await mockGetItems(page, [
  {
    id: '1',
    name: 'Laptop',
    category: 'Electronics',
    price: 999,
    sku: 'ABC-1',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
])
```

**Correct:**

```typescript
// item.builders.ts
export function MOCK_ITEM(overrides?: Partial<Item>): Item {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    category: faker.helpers.arrayElement(['Electronics', 'Books', 'Clothing']),
    price: faker.number.int({min: 1, max: 2000}),
    ...overrides,
  }
}

// in a Given beforeEach — any runner
await mockGetItems(page, [
  MOCK_ITEM({category: 'Electronics'}),
  MOCK_ITEM({category: 'Books'}),
])

server.use(
  getItemsHandler([
    MOCK_ITEM({category: 'Electronics'}),
    MOCK_ITEM({category: 'Books'}),
  ]),
)
```
