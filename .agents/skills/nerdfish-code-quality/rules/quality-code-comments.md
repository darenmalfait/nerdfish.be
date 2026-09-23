---
title: Code Comment Guidelines
impact: MEDIUM
impactDescription:
  Excessive comments add noise; missing comments hurt maintainability
tags: comments, documentation, readability
---

# Code Comment Guidelines

## General Principle

Keep comments limited and avoid obvious ones. Comments should explain "why" not
"what" — the code itself should be clear enough to explain what it does.

## When to Comment

- Business decisions or domain logic that isn't obvious from the code
- Workarounds or hacks with explanation of why they're needed
- Non-obvious performance optimizations
- Important security considerations
- Troubleshooting context (why a particular approach was chosen after hitting
  issues)

If none of these apply, skip the comment entirely.

## When NOT to Comment

```typescript
// ❌ Bad - Obvious comment
// Get the post
const post = await blog.get({ slug, locale })

// ❌ Bad - Restating the code
// Loop through projects
for (const project of projects) {
	render(project)
}
```

## Good Examples

```typescript
// ✅ Good - Explains why, not what
// Secure cookies are dropped on http://localhost, which breaks
// localePrefix: 'as-needed' (default locale redirects bounce via Accept-Language)
secure: process.env.NODE_ENV === 'production',

// ✅ Good - Documents a non-obvious constraint
// Auth middleware wraps other middleware in its callback
export default authMiddleware((_auth, request) => languageMiddleware(request))
```
