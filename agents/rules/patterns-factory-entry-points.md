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
	async get(slug: string, kind: string, locale?: Locale) {
		if (kind === 'blog') {
			// Blog-specific logic
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

**Correct (Factory pattern with specialized services):**

```typescript
// Entry point (route) makes the decision — import the leaf, don't switch on kind
import { blog } from '~/features/blog/api'
import { wiki } from '~/features/wiki/api'
import { work } from '~/features/work/api'

// Each service handles ONLY its specific logic - no conditionals
class BlogContentService extends LocalizedContentService<Post> {
	constructor() {
		super(allPosts)
	}
}

class WikiContentService extends SingleLocaleContentService<Wiki> {
	constructor() {
		super(allWikis)
	}
}

class WorkContentService extends LocalizedContentService<Project> {
	constructor() {
		super(allProjects)
	}
}

export const blog = new BlogContentService()
export const wiki = new WikiContentService()
export const work = new WorkContentService()
```

**Benefits:**

- Services stay focused with one responsibility
- Changes are isolated to specific service implementations
- Testing is straightforward - test each service independently
- New requirements don't pollute existing code

**Guidelines:**

- Push conditionals up to routes, factories, or routing logic
- Keep services pure and focused on a single responsibility
- Prefer polymorphism over conditionals
- Prefer feature leaf imports (`~/features/blog/api`) over a shared kind
  switcher
- Watch for if statement accumulation during code review

Reference: `~/features/shared/content/content-service.ts`,
`~/features/blog/api.ts`, `~/features/wiki/api.ts`, `~/features/work/api.ts`
