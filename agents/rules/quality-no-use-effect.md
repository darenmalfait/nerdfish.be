---
title: No Bare useEffect
impact: HIGH
impactDescription: Enforced by ESLint @nerdfish/conventions/no-use-effect
tags: quality, react, conventions, eslint
---

## No Bare useEffect

**Impact: HIGH**

`@nerdfish/conventions/no-use-effect` bans direct `useEffect`. Syncing with
props/state → derived values. User work → event handlers. Data fetching →
router/framework. The rare mount-only side effect goes through `useMountEffect`
(re-exported from `@repo/lib/hooks/use-mount-effect`).

**Incorrect:**

```typescript
useEffect(() => {
	setDerived(compute(props.value))
}, [props.value])

useEffect(() => {
	const subscription = api.subscribe(id)
	return () => subscription.unsubscribe()
}, [])
```

**Correct:**

```typescript
const derived = compute(props.value)

import { useMountEffect } from '@repo/lib/hooks/use-mount-effect'

useMountEffect(() => {
	const subscription = api.subscribe(id)
	return () => subscription.unsubscribe()
})
```

Empty-deps `useEffect(..., [])` specifically should become `useMountEffect` so
mount-only intent is searchable.

Reference: `@nerdfish/config/eslint/conventions` → `no-use-effect`,
`packages/lib/hooks/use-mount-effect.tsx`
