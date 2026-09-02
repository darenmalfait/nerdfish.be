# nerdfish.be Agent Documentation Index

- **[../AGENTS.md](../AGENTS.md)** - Main guide (structure, tech stack,
  commands, examples)
- **[rules/README.md](rules/README.md)** - How rules are structured and added
- **[rules/\_sections.md](rules/_sections.md)** - Section order and impact
- **[skills/web-design-guidelines/SKILL.md](skills/web-design-guidelines/SKILL.md)** -
  Web Interface Guidelines UI review

## Rules Index

### Architecture

### Code Quality

- [quality-avoid-barrel-imports](rules/quality-avoid-barrel-imports.md) - Avoid
  `index.ts` barrel imports (`@nerdfish/react/button`, not `@nerdfish/react`)
- [quality-simplicity](rules/quality-simplicity.md) - Keep code simple
- [quality-thorough-code-review](rules/quality-thorough-code-review.md) - Code
  review standards
- [quality-code-comments](rules/quality-code-comments.md) - Comment guidelines
- [quality-naming-conventions](rules/quality-naming-conventions.md) - `is*` /
  `handle*` / `to*` / `by*` / `use*` (`@nerdfish/config` conventions)
- [quality-no-use-effect](rules/quality-no-use-effect.md) - No bare `useEffect`;
  use `useMountEffect` for mount-only side effects

### Data Layer

### API Design

### Performance

### Testing

- [testing-bdd-structure](rules/testing-bdd-structure.md) - User Story / Given /
  When Playwright BDD structure
- [testing-accessible-queries](rules/testing-accessible-queries.md) - Prefer
  role/label queries; no `testId` / CSS selectors

### Design Patterns

- [patterns-component-composition](rules/patterns-component-composition.md) -
  Composition + early returns for loading/empty/data, optional sections, and
  required params

### Team Culture

### CI/CD

- [git-pr-discipline](rules/git-pr-discipline.mdc) - Never push, open PRs, or
  commit unless the user explicitly asks
- [ci-check-failure](rules/ci-check-failure.md) - Handling Quality Gate failures
  (format, lint, typecheck, e2e)

### Reference
