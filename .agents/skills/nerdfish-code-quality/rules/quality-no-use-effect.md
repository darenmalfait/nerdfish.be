---
title: No Bare useEffect
impact: HIGH
impactDescription: Prefer derived state, event handlers, and explicit mount hooks
tags: quality, react, use-effect
---

## No Bare useEffect

**Impact: HIGH**

Avoid bare `useEffect` for syncing props/state or one-off setup. Prefer:

- Derived values for sync computation
- Event handlers for user-driven work
- Framework/router data APIs for fetching
- An explicit mount-only hook (e.g. `useMountEffect`) for rare subscribe/cleanup
  on mount

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

useMountEffect(() => {
	const subscription = api.subscribe(id)
	return () => subscription.unsubscribe()
})
```

Empty-deps `useEffect(..., [])` should become an explicit mount hook so
mount-only intent is searchable.
