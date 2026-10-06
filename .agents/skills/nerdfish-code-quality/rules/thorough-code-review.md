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
about being nice. It's about maintaining quality standards.

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
Reviewer: "Please colocate the Zod schema next to the form"
Reviewer: "Requesting changes - please address before merging"
// PR updated to meet all standards before merge
```

**The principle:** Every nitpick matters. Every pattern violation matters.
Address them before merging, not after.

**Make it normal to challenge poor decisions, respectfully:**

- If someone says "let's hard-code this string for now," ask what it takes to do
  it properly the first time
- If someone wants to ship untested user-facing UI, push for coverage
- If someone suggests copy-paste instead of the existing pattern, call it out
