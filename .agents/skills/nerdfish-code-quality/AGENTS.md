# Code Quality

Standards for readable, maintainable code and rigorous review.

## 1. Prioritize Clarity Over Cleverness

**Impact: HIGH**

The goal is code that is easy to read and understand quickly, not elegant
complexity.

**Incorrect:**

```typescript
const result = data.reduce(
	(a, b) => ({ ...a, [b.locale]: (a[b.locale] || []).concat(b) }),
	{},
)
```

**Correct:**

```typescript
const groupedByLocale: Record<string, Item[]> = {}

for (const item of data) {
	if (!groupedByLocale[item.locale]) {
		groupedByLocale[item.locale] = []
	}
	groupedByLocale[item.locale].push(item)
}
```

Simple doesn't mean anemic — matching an existing pattern is not gold-plating.

## 2. Code Comment Guidelines

**Impact: MEDIUM**

Comments should explain "why" not "what". Skip obvious comments.

## 3. Address All Nits Before Merging

**Impact: HIGH**

Don't merge with a pile of nits. Request changes; fix before merge.

## 4. No Bare useEffect

**Impact: HIGH**

Avoid bare `useEffect` for syncing props/state or one-off setup. Prefer derived
values, event handlers, framework data APIs, and an explicit mount-only hook for
rare subscribe/cleanup on mount.
