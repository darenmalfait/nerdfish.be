# nerdfish.be Agent Documentation Index

- **[../AGENTS.md](../AGENTS.md)** — Main guide (structure, tech stack,
  commands, examples)
- **[rules/README.md](rules/README.md)** — Repo-specific rules (how to add)
- **[rules/\_sections.md](rules/_sections.md)** — Sections for local rules

## Layout

```
.agents/
  skills/   # from npx skills add (portable)
  rules/    # nerdfish.be-only
```

`.cursor/{skills,rules}` and `.claude/{skills,rules}` symlink here.

## Skills (from `darenmalfait/nerdfish-agent-skills`)

```bash
npx skills add darenmalfait/nerdfish-agent-skills --all -y
npx skills update -y
```

Portable guidelines live under `skills/` — do **not** duplicate them under
`rules/`.

| Skill                                                             | Use                                                           |
| ----------------------------------------------------------------- | ------------------------------------------------------------- |
| `nerdfish-review`                                                 | Meta: review the current diff against all `nerdfish-*` skills |
| `nerdfish-react-best-practices`                                   | React / Next.js performance                                   |
| `nerdfish-composition-patterns`                                   | Compound components, avoid boolean props                      |
| `nerdfish-monorepo-architecture`                                  | Vertical slices, cycles, factory entry points                 |
| `nerdfish-code-quality`                                           | Clarity, comments, review rigor, no bare `useEffect`          |
| `nerdfish-bdd-testing`                                            | User Story → Given → When; accessible queries                 |
| `nerdfish-pr-discipline`                                          | Never push/PR/commit unless asked; small draft stacks         |
| `web-design-guidelines`                                           | UI / a11y audit                                               |
| `specification-website`                                           | Website Spec MCP / Markdown audits                            |
| `writing-guidelines`                                              | Docs / prose                                                  |
| `vercel-optimize` / `deploy-to-vercel` / `vercel-cli-with-tokens` | Vercel platform                                               |

See `../skills-lock.json` for pinned versions.

## Repo-specific rules (`rules/`)

Only rules that are **nerdfish.be-specific** (paths, ESLint packages, CI gate).

### Architecture

- [architecture-feature-boundaries](rules/architecture-feature-boundaries.md) —
  Cross-feature / app imports via feature leaf modules (no feature barrels)
- [architecture-features-modules](rules/architecture-features-modules.md) —
  `@repo/*` vs `apps/web/src/features` placement

### Code Quality

- [quality-avoid-barrel-imports](rules/quality-avoid-barrel-imports.md) —
  Package and feature barrels; leaf / subpath imports
- [quality-naming-conventions](rules/quality-naming-conventions.md) — `is*` /
  `handle*` / `to*` / `by*` / `use*` (`@nerdfish/config`)

### CI/CD

- [ci-check-failure](rules/ci-check-failure.md) — Quality Gate failures (format,
  lint, typecheck, e2e)
