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
- Am I thinking too much about possible future use cases (third locale, another
  CMS, a new `@repo/*` package)?
- Have I considered at least 1 other alternative for solving this? How does it
  compare? Does this repo already have a simpler version?

**Incorrect (clever but hard to understand):**

```typescript
// Clever one-liner that's hard to parse
const result = data.reduce(
	(a, b) => ({ ...a, [b.locale]: (a[b.locale] || []).concat(b) }),
	{},
)
```

**Correct (clear and readable):**

```typescript
// Clear, step-by-step approach
const groupedByLocale: Record<string, Item[]> = {}

for (const item of data) {
	if (!groupedByLocale[item.locale]) {
		groupedByLocale[item.locale] = []
	}
	groupedByLocale[item.locale].push(item)
}
```

**Important note:** Simple doesn't mean lacking in features. Just because our
goal is to create simple systems, this doesn't mean they should feel anemic and
lacking obvious functionality. A contact form still gets Zod, recaptcha, and a
safe action — that's the existing pattern, not gold-plating.
