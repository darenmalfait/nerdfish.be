---
title: Naming Conventions (@nerdfish/config)
impact: HIGH
impactDescription: Enforced by ESLint @nerdfish/conventions (warn)
tags: quality, naming, conventions, eslint
---

## Naming Conventions (@nerdfish/config)

**Impact: HIGH**

This repo spreads `@nerdfish/config/eslint/conventions` in `eslint.config.js`.
Follow these prefixes so lint stays clean and intent stays readable.

### Booleans — `is` / `has` / `can` / `should`

Locals initialized from an obvious boolean expression must use an approved
prefix.

**Incorrect:**

```typescript
const valid = email.includes('@')
const accepted = terms === true
```

**Correct:**

```typescript
const isValidEmail = email.includes('@')
const hasAcceptedTerms = terms === true
const canSubmit = isValidEmail && hasAcceptedTerms
```

### Event handlers — `handle*`

Locally defined handlers passed to JSX `on*` props must start with `handle`.
Forwarded props (`onClick={onClick}`) and inline lambdas are fine.

**Incorrect:**

```typescript
function submitForm() { /* ... */ }
<button onClick={submitForm} />
```

**Correct:**

```typescript
function handleSubmit() { /* ... */ }
<button onClick={handleSubmit} />
<button onClick={onClick} /> // prop / forwarded — OK
```

### `.map()` transformers — `to*`

Named callbacks passed to `.map()` must start with `to`. Inline arrows are OK.

**Incorrect:**

```typescript
users.map(getId)
```

**Correct:**

```typescript
users.map(toUserId)
users.map((user) => user.id) // inline — OK
```

### `.sort()` comparators — `by*`

Named comparators passed to `.sort()` must start with `by`.

**Incorrect:**

```typescript
users.sort(compareName)
```

**Correct:**

```typescript
users.sort(byName)
;[...users].sort((a, b) => a.name.localeCompare(b.name)) // inline — OK
```

### `use*` prefix — must call a hook

Functions named `useX` must call another hook. Otherwise drop the prefix. Empty
stubs and allowlisted names (`useMDXComponents`) are exceptions.

**Incorrect:**

```typescript
function useProjectTitle(project: Project) {
	return project.title
}
```

**Correct:**

```typescript
function getProjectTitle(project: Project) {
	return project.title
}

function useLocalDraft(key: string) {
	return useLocalStorage(key) // calls a hook — OK
}
```

Reference: `@nerdfish/config/eslint/conventions`, `eslint.config.js`
