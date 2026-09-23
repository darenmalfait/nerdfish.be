---
title: Prioritize Clarity Over Cleverness
impact: HIGH
impactDescription: Reduces cognitive load and improves maintainability
tags: quality, simplicity, readability
---

## Prioritize Clarity Over Cleverness

**Impact: HIGH**

The goal is code that is easy to read and understand quickly, not elegant
complexity. Simple systems reduce the cognitive load for every engineer.

**Questions to ask yourself:**

- Am I actually solving the problem at hand?
- Am I thinking too much about possible future use cases?
- Have I considered at least one other alternative? Does this repo already have
  a simpler version?

**Incorrect (clever but hard to understand):**

```typescript
const result = data.reduce(
	(a, b) => ({ ...a, [b.locale]: (a[b.locale] || []).concat(b) }),
	{},
)
```

**Correct (clear and readable):**

```typescript
const groupedByLocale: Record<string, Item[]> = {}

for (const item of data) {
	if (!groupedByLocale[item.locale]) {
		groupedByLocale[item.locale] = []
	}
	groupedByLocale[item.locale].push(item)
}
```

**Important:** Simple doesn't mean anemic. Matching an existing pattern (schema
+ action + form, leaf imports, etc.) is not gold-plating — inventing a clever
shortcut around it is.
