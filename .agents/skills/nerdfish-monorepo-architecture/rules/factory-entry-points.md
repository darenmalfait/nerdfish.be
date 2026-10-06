---
title: Use Factory Pattern to Push Conditionals to Entry Points
impact: HIGH
impactDescription: Keeps services focused and prevents complexity accumulation
tags: patterns, factory, conditionals, single-responsibility
---

## Use Factory Pattern to Push Conditionals to Entry Points

**Impact: HIGH**

If statements belong at the entry point, not scattered throughout your services.
This is one of the most important architectural principles for maintaining
clean, focused code that doesn't spiral into unmaintainable complexity.

**The problem with scattered conditionals:**

A service is written for a clear, specific purpose. Then a new product
requirement arrives, and someone adds an if statement. A few years later, that
service is littered with conditional checks. The service becomes:

- Complicated and hard to read
- Difficult to understand and reason about
- More susceptible to bugs
- Violating single responsibility
- Nearly impossible to test thoroughly

**Incorrect (conditionals scattered in service):**

```typescript
class ContentService {
	async get(slug: string, kind: string, locale?: string) {
		if (kind === 'blog') {
			const post = await this.getPost(slug, locale)
			if (post?.category === 'engineering') {
				// More nested conditionals...
			}
		} else if (kind === 'wiki') {
			// Wiki-specific logic
		} else if (kind === 'work') {
			// Work-specific logic
		}
	}
}
```

**Correct (specialized modules; entry point chooses):**

```typescript
// Route / page imports the leaf — no kind switcher in a shared service
import { blog } from '~/features/blog/api'
import { wiki } from '~/features/wiki/api'
import { work } from '~/features/work/api'

// Each module handles ONLY its domain — no kind conditionals
export const blog = {
	get: async ({ slug, locale }: { slug: string; locale?: string }) => {
		/* ... */
	},
}

export const wiki = {
	get: async ({ slug }: { slug: string }) => {
		/* ... */
	},
}

export const work = {
	get: async ({ slug, locale }: { slug: string; locale?: string }) => {
		/* ... */
	},
}
```

**Benefits:**

- Services stay focused with one responsibility
- Changes are isolated to specific implementations
- Testing is straightforward — test each module independently
- New requirements don't pollute existing code

**Guidelines:**

- Push conditionals up to routes, factories, or routing logic
- Keep domain modules pure and focused on a single responsibility
- Prefer polymorphism / separate modules over conditionals
- Prefer leaf imports over a shared kind switcher
- Watch for if-statement accumulation during code review
