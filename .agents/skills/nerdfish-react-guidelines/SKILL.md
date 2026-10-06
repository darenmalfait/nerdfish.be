---
name: nerdfish-react-guidelines
description: >
  Keep work aligned with nerdfish standards during implementation and when
  auditing changes. Loads the right nerdfish-* and related skills for the task
  at hand (React, monorepo, tests, PR workflow, etc.). Use while writing or
  refactoring code, before shipping, or when the user asks to follow nerdfish
  guidelines, "nerdfish review", "review with nerdfish skills",
  "audit against nerdfish", or "check my changes".
metadata:
  author: nerdfish
  version: '1.3.0'
---

# Nerdfish React Guidelines

Orchestrate **nerdfish standards** in two ways:

1. **Development** — while implementing, load and follow the applicable skills
   so new code matches guidelines without a separate review pass.
2. **Audit** — on request (or before push/PR when the user asks), review the diff
   and report findings in priority order.

This skill does not duplicate rules; it **loads** the other skills in
`skills/`.

## When to Apply

**Development (proactive):**

- Writing or refactoring React / Next.js UI, server code, or data fetching
- Adding or changing tests, page objects, or mocks
- Structuring features, packages, or imports in a monorepo
- Gating behavior behind feature flags
- Any task where another `nerdfish-*` or listed upstream skill clearly applies

Apply rules **as you edit** (read `SKILL.md` + relevant rules when unsure).
Do not paste a full audit report after every small change unless the user wants
one.

**Audit (explicit or pre-ship):**

- "Nerdfish review" / "audit against nerdfish" / "check my diff"
- Pre-push or pre-PR pass when the user asks for it
- After a large change set when the user wants a structured pass

## Skill index (always-on vs conditional)

**Prefer during most app work** (read each skill’s `SKILL.md`, then `rules/` /
`AGENTS.md` as needed):

| Priority | Skill | Why |
| -------- | ----- | --- |
| 1 | `vercel-react-best-practices` | Waterfalls, bundle, server/client perf |
| 2 | `vercel-composition-patterns` | Boolean props, compound components |
| 3 | `nerdfish-monorepo-architecture` | Vertical slices, cycles, factories |
| 4 | `nerdfish-code-quality` | Clarity, comments, effects, flag shape |

**Load when the work touches that domain:**

| Skill | Load when |
| ----- | --------- |
| `nerdfish-bdd-testing` | Specs, page/screen objects, fixtures, e2e/component tests |
| `nerdfish-pr-discipline` | User is about to push/PR/commit, or reviewing PR workflow |
| `nerdfish-pr` | Drafting a PR body |
| `typescript-discriminated-unions` | Mutually exclusive variants, invalid-state prevention, exhaustiveness, variant props/args/state |
| `vercel-react-view-transitions` | View transitions, route animations, `transitionTypes` |
| `vercel-react-native-skills` | React Native / Expo files |

**Optional (alongside nerdfish):**

| Skill | Load when |
| ----- | --------- |
| `web-design-guidelines` | UI / a11y / UX surfaces |
| `specification-website` | Site-wide capability / compliance questions |

Paths (this repo after install):

```
skills/vercel-react-best-practices/SKILL.md
skills/vercel-composition-patterns/SKILL.md
skills/nerdfish-monorepo-architecture/SKILL.md
skills/nerdfish-code-quality/SKILL.md
skills/nerdfish-bdd-testing/SKILL.md
skills/nerdfish-pr-discipline/SKILL.md
skills/typescript-discriminated-unions/SKILL.md
skills/vercel-react-view-transitions/SKILL.md
skills/vercel-react-native-skills/SKILL.md
```

## Development workflow

1. **Scope the task** — files, stack (React, RN, tests, packages), and risk
   (auth, perf, public API).
2. **Select skills** from the tables above; skip what clearly does not apply.
3. **Read highest-priority applicable skills** before or while editing — not
   only after finishing.
4. **Implement** using those rules; prefer incorrect → correct patterns from the
   skill docs when choosing structure.
5. **Self-check** before handing off: obvious violations of loaded skills fixed
   inline. Mention only material tradeoffs to the user — no mandatory report.

When two skills overlap, prefer the higher-priority skill’s framing.

## Audit workflow

### 1. Collect the change set

```bash
git status --short
git diff --stat
git diff
# branch vs main:
git diff main...HEAD --stat
git log main..HEAD --oneline
```

Summarize: languages, areas, and risk hotspots.

### 2. Select skills

Same tables as development; bias toward anything the diff touches.

### 3. Review

For each selected skill, in priority order:

1. Read `SKILL.md` (and critical rules if present)
2. Scan the diff for highest-impact violations first
3. Record findings — don’t soft-pass nits

Prefer **incorrect → correct** citations from skill rules over vague advice.

### 4. Report

```markdown
## Nerdfish guidelines audit

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

Severity: Critical → High → Medium. Group by severity, not by skill. Cite skill
+ rule id (e.g. `vercel-react-best-practices` / `async-parallel`).

### 5. Stop conditions

- Audit only: **do not** push, open a PR, or commit unless asked (see
  `nerdfish-pr-discipline`).
- User asks to fix findings: Critical/High first, re-diff, then stop.

## Notes

- **Development** = follow guidelines continuously; **audit** = structured
  report on a change set.
