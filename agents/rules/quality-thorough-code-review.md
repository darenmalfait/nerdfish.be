---
title: Address All Nits Before Merging
impact: HIGH
impactDescription: Prevents codebase degradation over time
tags: quality, code-review, standards
---

## Address All Nits Before Merging

**Impact: HIGH**

Don't let PRs through with a lot of nits just to avoid being "the bad person."
This is precisely how codebases become sloppy over time. Code review is not
about being nice. It's about maintaining the quality standards this repo
demands.

**Incorrect approach:**

```
Reviewer: "This variable name could be clearer, but it's fine I guess"
Reviewer: "We usually colocate the schema here, but this works"
Reviewer: "Approved with minor suggestions"
// PR merged with multiple small issues
```

**Correct approach:**

```
Reviewer: "Please rename `d` to `project` for clarity"
Reviewer: "Please colocate the Zod schema next to the form (`*.schema.tsx`)"
Reviewer: "Requesting changes - please address before merging"
// PR updated to meet all standards before merge
```

**The principle:** Every nitpick matters. Every pattern violation matters.
Address them before merging, not after. We hold each other accountable for
quality because cutting corners might feel faster in the moment, but it creates
problems that slow everyone down later.

**Make it normal to challenge poor decisions, respectfully:**

- If someone says "let's just hard-code this string for now," ask "what would it
  take to add it to both `en.json` and `nl.json` the first time?"
- If someone wants to commit untested user-facing UI, push back — add Playwright
  coverage
- If someone suggests copying and pasting instead of following the existing
  pattern (contact form, blog `api.ts`), call it out respectfully
