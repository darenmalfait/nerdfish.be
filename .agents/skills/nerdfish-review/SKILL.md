---
name: nerdfish-review
description: >
  Run a prioritized review of the current changes against all nerdfish-* skills.
  Use when the user asks to "nerdfish review", "review with nerdfish skills",
  "analyze my changes against nerdfish", "audit this PR/diff", or wants a manual
  pass with the most important nerdfish guidelines before shipping.
license: MIT
metadata:
  author: nerdfish
  version: '1.0.0'
---

# Nerdfish Review

Orchestrate a **manual, prioritized** review of the working tree / PR diff using
every `nerdfish-*` skill in this collection. Skip skills that clearly do not
apply to the changed files.

## When to Apply

- "Nerdfish review" / "review with nerdfish skills"
- "Analyze my changes" / "audit this PR against nerdfish"
- Pre-push / pre-PR quality pass when the user asks for it explicitly

Do **not** run this automatically on every edit — only when invoked.

## Workflow

### 1. Collect the change set

```bash
git status --short
git diff --stat
git diff
# if reviewing a branch vs main:
git diff main...HEAD --stat
git log main..HEAD --oneline
```

Summarize: languages, areas (React UI, packages, tests, docs), and risk hotspots.

### 2. Select skills (always-on vs conditional)

**Always load** (read each skill’s `SKILL.md`, then relevant `rules/` / `AGENTS.md`
as needed):

| Priority | Skill | Why |
| -------- | ----- | --- |
| 1 | `nerdfish-react-best-practices` | Waterfalls, bundle, server/client perf |
| 2 | `nerdfish-composition-patterns` | Boolean props, compound components |
| 3 | `nerdfish-monorepo-architecture` | Vertical slices, cycles, factories |
| 4 | `nerdfish-code-quality` | Clarity, comments, review rigor, effects |

**Load if the diff touches that domain:**

| Skill | Load when |
| ----- | --------- |
| `nerdfish-bdd-testing` | Specs, page/screen objects, fixtures, e2e/component tests |
| `nerdfish-pr-discipline` | User is about to push/PR/commit, or reviewing PR workflow |
| `nerdfish-react-view-transitions` | View transitions, route animations, `transitionTypes` |
| `nerdfish-react-native-skills` | React Native / Expo files |

**Optional (not `nerdfish-*` but useful alongside):**

| Skill | Load when |
| ----- | --------- |
| `web-design-guidelines` | UI / a11y / UX surfaces |
| `specification-website` | Site-wide capability / compliance questions |

Paths (same repo after install):

```
skills/react-best-practices/SKILL.md
skills/composition-patterns/SKILL.md
skills/monorepo-architecture/SKILL.md
skills/code-quality/SKILL.md
skills/bdd-testing/SKILL.md
skills/pr-discipline/SKILL.md
skills/react-view-transitions/SKILL.md
skills/react-native-skills/SKILL.md
```

### 3. Review against the selected skills

For each selected skill, in priority order:

1. Read `SKILL.md` (and `_sections.md` / critical rules if present)
2. Scan the diff for violations of that skill’s highest-impact rules first
3. Record findings before moving on — don’t soft-pass nits

Prefer **incorrect → correct** citations from the skill rules over vague advice.

### 4. Report

Use this structure:

```markdown
## Nerdfish review

**Scope:** <branch / files / vs main>
**Skills applied:** <list>
**Skills skipped:** <list + why>

### Critical
- `file:line` — <rule id> — <issue> — <fix direction>

### High
- …

### Medium / nits
- …

### Clean
- <areas that looked fine under applied skills>
```

Severity order: Critical → High → Medium. Group by severity, not by skill.
Cite the skill + rule id (e.g. `nerdfish-react-best-practices` /
`async-parallel`).

### 5. Stop conditions

- If the user only asked for a review: **do not** push, open a PR, or commit
  (see `nerdfish-pr-discipline`).
- If they ask to fix findings: fix Critical/High first, re-diff, then stop.

## Notes

- This skill does not duplicate rules — it **loads** the other skills.
- When two skills overlap, prefer the higher-priority skill’s framing and avoid
  repeating the same finding twice.
