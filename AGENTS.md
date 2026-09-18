# nerdfish.be Development Guide for AI Agents

You are a senior engineer working on nerdfish.be, Daren Malfait's freelance
website. This is a pnpm/Turbo monorepo. Prioritize type safety, small reviewable
diffs, and matching existing patterns.

## Do

- Use `import type { X }` for TypeScript type imports
- Use early returns to reduce nesting: `if (!post) return notFound()`
- Use conventional commits: `feat:`, `fix:`, `refactor:`
- Create PRs in draft mode by default
- Import from subpaths, not package roots (e.g.
  `@repo/design-system/components/section`, `@nerdfish/react/button`)
- Import features via leaf modules (e.g. `~/features/blog/api`,
  `~/features/blog/components/blog-overview`) — never feature-root barrels
- Add UI strings to **both** `packages/i18n/dictionaries/en.json` and `nl.json`
- When adding a public route, update `apps/web/src/routing.ts` pathnames
- Use `date-fns` or native `Date` for dates
- Colocate forms as `*.schema.tsx` + `*.actions.tsx` + the form component
- Mutations go through `next-safe-action` (`createSafeActionClient`), not ad-hoc
  server actions
- Env vars live in package `keys.ts` files and are composed in the app `env.ts`
- Use `createMetadata` from `@repo/seo/metadata` for page metadata
- Use `parseError` from `@repo/observability/error` when catching errors
- Use `rg` (ripgrep) for searching; fall back to `grep`
- Use Prettier + ESLint (`@nerdfish/config`) for formatting and linting
- Only add code comments that explain **why**, not **what**
- File names are kebab-case

## Don't

- Never use `as any` — use proper type-safe solutions instead
- Never commit secrets, API keys, or `.env` files
- Never hardcode user-facing strings — use next-intl
- Never import from package barrels (`@repo/design-system`, `@nerdfish/react`)
- Never add feature-root barrels (`features/<name>/index.ts` / `server.ts` /
  `client.ts`) — use leaf imports
- Never skip typecheck / lint / format before pushing
- Never create large PRs (>500 lines or >10 files) — split them instead
- Never add comments that restate what the code does
- Never edit `.content-collections/generated` or other generated files
- Never use `<img>` — Next.js image / ESLint `no-img-element` is an error
- Never put new env vars only in `apps/web/env.ts` — add them to the owning
  package's `keys.ts` first

## PR Size Guidelines

Keep PRs small and self-contained. Limits apply to code files only (docs,
lockfiles, generated files excluded).

- **Lines changed**: under 500 (additions + deletions)
- **Files changed**: under 10 code files
- **Single responsibility**: each PR does one thing

Split large work by layer (content schema → API → UI), by feature piece, or
refactor vs feature. Example: instead of one "add contact field" PR:

- PR 1: Zod schema + i18n strings
- PR 2: server action + email template
- PR 3: form UI + Playwright coverage

## Commands

```bash
pnpm i                          # Install
pnpm dev                        # Dev (web on :3000)
pnpm typecheck                  # Type check (always run before pushing)
pnpm lint                       # ESLint
pnpm lint:fix                   # ESLint --fix
pnpm format                     # Prettier check
pnpm format:fix                 # Prettier write
pnpm checks                     # format + lint + typecheck
pnpm checks:fix                 # format:fix + lint:fix + typecheck
pnpm test:e2e                   # Playwright
pnpm build:content-collections  # Regenerate CMS types after collection/schema changes
pnpm create-package             # Scaffold a new @repo/* package
```

Husky runs `pnpm checks:fix` on pre-commit and commitlint on commit-msg.

CI (`.github/workflows/code-quality.yml`) runs format, lint, typecheck, and e2e.
Lint and typecheck need `pnpm build:content-collections` first.

## Boundaries

### Always do

- Run `pnpm typecheck` on changed work before committing
- Run relevant Playwright tests before pushing UI/route changes
- Follow conventional commits for commit messages **and** PR titles
- Run `pnpm checks:fix` (or equivalent) before pushing
- Update **both** locale dictionaries when adding UI copy

### Ask first

- Adding new dependencies
- Adding a new workspace package
- Content-collection schema changes
- Changes affecting multiple packages
- Deleting files
- Running a full production build or the full e2e suite

### Never do

- Commit secrets, API keys, or `.env` files
- Use `as any` type casting
- Force push or rebase shared branches
- Modify generated files (`.content-collections/generated`, `next-env.d.ts`)

## Project Structure

```
apps/web/                         # Next.js 16 App Router site
  src/app/[locale]/(website)/     # Routes + metadata + page __tests__/
  src/app/[locale]/app/           # Authenticated app routes (thin)
  src/features/                   # Feature UI, api.ts, utils (leaf imports)
    shared/  site/  theme/  blog/  work/  wiki/  contact/ …
    home/  about/  privacy/  expertise/  product/  testimonials/
    app-shell/  resume/  sign-in/
  src/routing.ts                  # Localized pathnames (next-intl)
  content/                        # MDX/MD CMS source
    blog/  wiki/  projects/  products/  testimonials/
apps/email/                       # react-email preview (:3003)
apps/og-image/                    # OG image app (:4200)
packages/
  auth/                           # Clerk (optional; mock user if keys missing)
  calendar/                       # Calendar UI + date-fns helpers
  content-collections/            # Collection schemas + MDX pipeline
  design-system/                  # Site components, icons, fonts
  email/                          # Resend client + email templates
  global-settings/                # Company info, socials
  i18n/                           # next-intl wrappers + dictionaries
  lib/                            # Shared hooks + utils
  location/                       # Location data
  next-config/                    # Shared Next config + env keys
  observability/                  # Error parsing
  og-utils/                       # OG image URL params
  recaptcha/                      # Recaptcha client/server
  seo/                            # createMetadata + JSON-LD
  timesheets/                     # Timesheets feature
  typescript-config/              # Shared tsconfig
  github-actions/                 # CI install composite action
```

### Key files

- Routes: `apps/web/src/app/[locale]/` (compose feature leaves; own metadata)
- Features: `apps/web/src/features/` (no feature-root barrels)
- Page e2e: `apps/web/src/app/.../__tests__/` next to the page under test
- Proxy/middleware: `apps/web/src/proxy.ts`
- Localized routes: `apps/web/src/routing.ts`
- Env composition: `apps/web/env.ts`
- Translations: `packages/i18n/dictionaries/{en,nl}.json`
- Collection config: `packages/content-collections/config.ts`
- Collection schemas: `packages/content-collections/collections/`
- Playwright config: `apps/web/playwright.config.ts`
- Architecture rules: `agents/rules/architecture-*.md`

### Path aliases (`apps/web`)

- `~/*` → `apps/web/src/*`
- `routing` → `apps/web/src/routing.ts`
- `env` → `apps/web/env.ts`
- `content-collections` → generated types
- `@repo/*` → `packages/*`

## Tech Stack

- **Runtime / app**: Next.js 16 (App Router, Turbopack), React 19
- **Language**: TypeScript (strict), ESM
- **Monorepo**: pnpm workspaces + Turbo
- **CMS**: content-collections (MDX), no database
- **Mutations**: next-safe-action + Zod
- **Auth**: Clerk (`@repo/auth`); disabled when keys are missing
- **i18n**: next-intl, locales `en` (default, no prefix) and `nl`
- **Styling**: Tailwind CSS 4, `@nerdfish/react` primitives,
  `@repo/design-system`
- **Email**: Resend + react-email
- **Env**: `@t3-oss/env-nextjs` + Zod
- **Testing**: Playwright only (BDD, colocated under `app/.../__tests__/`)
- **Lint/format**: ESLint 9 + Prettier via `@nerdfish/config`
- **Commits**: commitlint conventional + husky

## Code Examples

### Imports

```typescript
// Good - type imports, package subpaths, feature leaf modules
import type { WithLocale } from '@repo/i18n/types'
import { Button } from '@nerdfish/react/button'
import { Section } from '@repo/design-system/components/section'
import { cn } from '@repo/lib/utils/class'
import { BlogOverview } from '~/features/blog/components/blog-overview'
import { blog } from '~/features/blog/api'
import { Link } from '~/features/shared/components/link'

// Bad - value import for types, package-root / feature-root barrels
import { WithLocale } from '@repo/i18n/types'
import { Button } from '@nerdfish/react'
import { Section } from '@repo/design-system'
import { BlogOverview, blog } from '~/features/blog'
```

Exceptions with a real package entry: `@repo/email`, `@repo/next-config`. No
exception for `apps/web/src/features/*/index.ts` — use leaf paths.

### i18n

```typescript
// Server
import { getTranslations } from '@repo/i18n/server'
const t = await getTranslations('contact.page')

// Client
import { useTranslations } from '@repo/i18n/client'
const t = useTranslations('contact.page')
```

`params` is a Promise (Next 16): `params: Promise<WithLocale>`.

### Content collections

Read generated data through a feature `api.ts` leaf, not ad-hoc filters in
pages. Import it as `~/features/<name>/api`.

```typescript
import { type Locale } from '@repo/i18n/types'
import { allPosts } from 'content-collections'

export const blog = {
	get: async ({ slug, locale }: { slug: string; locale?: Locale }) => {
		return allPosts.find((item) => item.slug === slug && item.locale === locale)
	},
}
```

Blog/projects/products/testimonials are locale-prefixed under
`apps/web/content/<type>/<locale>/`. Wiki is not multilingual
(`apps/web/content/wiki/`, slug = path). After schema changes run
`pnpm build:content-collections`.

### Server actions

```typescript
'use server'

import { parseError } from '@repo/observability/error'
import { type ActionResponse, actionResponseSchema } from '@repo/lib/utils/form'
import { createSafeActionClient } from 'next-safe-action'
import { contactFormSchema } from './contact-form.schema'

export const submitContactFormAction = createSafeActionClient()
	.inputSchema(contactFormSchema)
	.outputSchema(actionResponseSchema)
	.action(async ({ parsedInput }): Promise<ActionResponse<void>> => {
		try {
			// ...
			return { success: true }
		} catch (error) {
			return { success: false, error: parseError(error) }
		}
	})
```

Throw descriptive errors with context, not `'Something went wrong'`-style
generics.

### Env

```typescript
// packages/email/keys.ts — owning package
export const keys = () =>
	createEnv({
		server: { RESEND_API_KEY: z.string() },
		runtimeEnv: { RESEND_API_KEY: process.env.RESEND_API_KEY },
	})

// apps/web/env.ts — compose
export const env = createEnv({
	extends: [core(), email(), recaptcha(), auth()],
	server: {},
	client: {},
	runtimeEnv: {},
})
```

### Auth

Clerk is optional. `currentUser()` from `@repo/auth/server` returns a mock user
when keys are absent. Gate the authenticated app in
`apps/web/src/app/[locale]/app/(authenticated)/layout.tsx`: if `currentUser()`
is missing, call `redirectToSignIn()` from `auth()`. Compose other middleware
inside `authMiddleware` in `apps/web/src/proxy.ts`.

### Playwright (BDD)

Colocate under `app/.../__tests__/` next to the page under test (not under
`features/`):

| File            | Role                                 |
| --------------- | ------------------------------------ |
| `*.spec.ts`     | BDD scenarios                        |
| `*.page.ts`     | Page object (`extends BasePage`)     |
| `*.fixture.ts`  | `test.extend` wiring the page object |
| `*.builders.ts` | Test data / URL patterns             |

```typescript
test.describe('User Story: The user wants to browse the blog', () => {
	test.describe('Given the user is on the blog page', () => {
		test.beforeEach(async ({ blogPage }) => {
			await blogPage.goto()
		})

		test.describe('When the user clicks on a post', () => {
			test.beforeEach(async ({ blogPage }) => {
				await blogPage.openFirstPost()
			})

			test('it should navigate to the post page', async ({ blogPage }) => {
				await expect(blogPage.page).toHaveURL(BLOG_POST_URL_PATTERN)
			})
		})
	})
})
```

- Outermost block: `User Story: ...`
- `Given` = state/setup (`beforeEach`)
- `When` = one user action
- `test()` / `it()` = one outcome
- Selectors go in the page object, not the spec
- No unit-test runner — Playwright only

## PR Checklist

- [ ] Title follows conventional commits: `feat(scope): description`
- [ ] `pnpm typecheck` passes
- [ ] `pnpm lint` / `pnpm format` pass
- [ ] Relevant Playwright tests pass (or were added)
- [ ] Diff is small and focused (<500 lines, <10 files)
- [ ] No secrets or API keys committed
- [ ] UI strings in both `en.json` and `nl.json`
- [ ] New public routes added to `apps/web/src/routing.ts`
- [ ] Created as draft PR

## When Stuck

- Ask a clarifying question before making large speculative changes
- Propose a short plan for complex tasks
- Open a draft PR with notes if unsure about approach
- Fix type errors before test failures — they're often the root cause
- Run `pnpm build:content-collections` if `content-collections` types are
  missing
- Match the nearest existing feature (`~/features/contact`, blog `api.ts`,
  Playwright `app/.../__tests__/`) instead of inventing a new pattern
- Prefer leaf imports; see `agents/rules/architecture-feature-boundaries.md`
