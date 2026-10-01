---
title: Shape Feature Flags for Easy Removal
impact: HIGH
impactDescription: Makes flag cleanup a small diff instead of a refactor
tags: quality, feature-flags, maintainability
---

## Shape Feature Flags for Easy Removal

**Impact: HIGH**

Release flags are temporary inventory. Write them so removing the flag is
deleting a guard (or swapping a strategy), not untangling nested branches.

Prefer the **new path as the trunk**. Put the legacy / off path behind an early
return or a thin toggle point at the edge. When the flag ships to 100%, delete
the guard and the dead path — the happy path stays unindented.

**Incorrect: new feature nested under the flag (removal rewrites the trunk):**

```typescript
async function checkout(cart: Cart) {
	if (flags.isEnabled('checkout-v2')) {
		const quote = await quoteV2(cart)
		const payment = await chargeV2(quote)
		return finalizeV2(payment)
	}

	const quote = await quoteV1(cart)
	const payment = await chargeV1(quote)
	return finalizeV1(payment)
}
```

**Correct: early return for the off path; new path is the default body:**

```typescript
async function checkout(cart: Cart) {
	if (!flags.isEnabled('checkout-v2')) {
		return checkoutV1(cart)
	}

	const quote = await quoteV2(cart)
	const payment = await chargeV2(quote)
	return finalizeV2(payment)
}

// After 100% rollout: delete the guard + checkoutV1. Trunk stays.
```

**Incorrect: flag checks sprinkled through the flow:**

```typescript
function CheckoutPage({ cart }: Props) {
	const v2 = useFlag('checkout-v2')

	return (
		<form>
			{v2 ? <AddressFieldsV2 /> : <AddressFieldsV1 />}
			{v2 ? <PaymentV2 /> : <PaymentV1 />}
			{v2 ? <SummaryV2 cart={cart} /> : <SummaryV1 cart={cart} />}
		</form>
	)
}
```

**Correct: one toggle point; compose variants (or strategies) outside:**

```typescript
function CheckoutPage({ cart }: Props) {
	if (!useFlag('checkout-v2')) {
		return <CheckoutV1 cart={cart} />
	}

	return <CheckoutV2 cart={cart} />
}
```

For longer-lived or multi-callsite flags, resolve once (factory / strategy /
`FeatureDecisions`) and inject the implementation — don't thread booleans
through the call graph.

**Also:**

- Default the flag evaluation to **old / safe** behavior for release flags
- Don't leave inverted names (`disable-old-thing`) — prefer positive enable of
  the new path
- Plan removal when you add the flag (ticket, expiry, or a follow-up branch
  that already deletes the guard)

**Not this rule:** ops/permission flags that are permanent product gates — those
aren't meant to vanish. Still keep the toggle point thin.
