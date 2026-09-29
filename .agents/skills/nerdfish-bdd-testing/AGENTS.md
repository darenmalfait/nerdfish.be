# BDD Testing

Guideline for **any** user-based UI test — Playwright, Testing Library, Cypress,
or similar.

Specs tell a user story. Queries match how a user (or assistive tech) interacts.
Fixtures and network mocks are builders. Hide selectors behind page/screen
objects. Nesting rules are runner-agnostic; only setup/interaction APIs change.

Skip BDD nesting for pure unit tests.

## 1. User-Story BDD Structure

**Impact: HIGH**

1. Top-level `describe` starts with `User Story:`
2. Prefer `As a user` unless role is intrinsic to the behavior
3. `Given` only directly under the User Story — never nest Given under
   Given/When
4. `Given` = arrive at starting UI state (mocks + `goto` / `render` / mount).
   Actions only as prerequisites
5. `When` = one coherent user gesture (click, fill, select, …). No gesture → not
   a When
6. Nest `When` under `When` for sequential actions
7. `When` actions live in `beforeEach`; assertions only in `it` / `test`
8. `it` may sit directly under `Given` for initial-state asserts — no passive
   When wrappers (`When the page has loaded`)
9. No `"and"` / `"then"` in titles — split instead
10. One coherent outcome per `it`
11. Unit tests stay flat — no User Story / Given / When

| Concern | Playwright                       | Testing Library | Cypress             |
| ------- | -------------------------------- | --------------- | ------------------- |
| Arrive  | `page.goto` / page-object `goto` | `render(...)`   | `cy.visit`          |
| Gesture | `locator.click` / `fill`         | `userEvent.*`   | `cy.click` / `type` |

**Incorrect:** flat “does X and Y” tests; nested Givens;
`When the page renders`.

**Correct:** `User Story → Given → When → it`, or `User Story → Given → it` for
initial state. Prefer page/screen objects so the nesting reads the same in every
runner.

## 2. Prefer Accessible Test Queries

**Impact: HIGH**

**Prefer:** role and label queries; page/screen-object wrappers.

**Avoid:** `testId` as primary, CSS class chasing, holding resolved DOM nodes
across remounts/navigations, literal translated strings as primary asserts.

## 3. Use Mock Data Builders

**Impact: HIGH**

Use typed `MOCK_<ENTITY>(overrides?)` builders with realistic defaults. Override
only fields that matter for the scenario. No fat inline fixtures. Same builders
feed Playwright routes, MSW handlers, or seeded backends.

## 4. Standardize API Mocks With Handler Builders

**Impact: HIGH**

Reusable builders per endpoint — MSW, Playwright `page.route`, Cypress
intercepts, etc. Register mocks only inside `Given`. Verify request payloads via
observation callbacks, not ad-hoc parsing.

## 5. Keep Related Test Stories Together

**Impact: MEDIUM**

Keep related stories for the same page/feature in one file until ~2000 lines or
a clear domain/role split. Don't fragment early; don't mix unrelated domains.
