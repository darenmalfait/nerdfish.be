---
title: Compose Conditional UI with Early Returns
impact: HIGH
impactDescription:
  flatter trees, safer Hooks, stronger narrowing than nested JSX
tags: rendering, composition, early-returns, conditional, quality
---

## Compose Conditional UI with Early Returns

**Repo extension** (nerdfish) — pairs with upstream
`rendering-conditional-render`. Do not treat ternary as the ceiling.

Preference order for conditional UI:

1. **Composition + early returns** (best when possible)
2. Explicit ternary (`cond ? <A /> : null`)
3. `&&` — avoid; falsy values (`0`, `NaN`) can render

Use composition + early returns instead of nesting loading / empty / data (or
optional sections) in one return. Extract a child that guards and returns
`null`, or a shared layout with mutually exclusive early returns.

**Incorrect (nested conditional JSX — ternary floor only):**

```tsx
export function ShoppingList() {
	const { data, isPending } = useQuery(/* ... */)

	return (
		<Card>
			{isPending ? (
				<Skeleton />
			) : !data ? (
				<EmptyScreen />
			) : (
				<>
					{data.assignee ? <UserInfo {...data.assignee} /> : null}
					{data.content.map((item) => (
						<ShoppingItem key={item.id} {...item} />
					))}
				</>
			)}
		</Card>
	)
}
```

**Correct (layout + early returns):**

```tsx
function Layout({ children, title }: { children: ReactNode; title?: string }) {
	return (
		<Card>
			<CardHeading>{title ?? 'Welcome'}</CardHeading>
			<CardContent>{children}</CardContent>
		</Card>
	)
}

export function ShoppingList() {
	const { data, isPending } = useQuery(/* ... */)

	if (isPending) {
		return (
			<Layout>
				<Skeleton />
			</Layout>
		)
	}

	if (!data) {
		return (
			<Layout>
				<EmptyScreen />
			</Layout>
		)
	}

	return (
		<Layout title={data.title}>
			<AssigneeInfo assignee={data.assignee} />
			{data.content.map((item) => (
				<ShoppingItem key={item.id} {...item} />
			))}
		</Layout>
	)
}
```

**Optional sections — child with early return:**

```tsx
function Panel({ isVisible }: { isVisible: boolean }) {
	return (
		<Card>
			<VisibleContent isVisible={isVisible} />
		</Card>
	)
}

function VisibleContent({ isVisible }: { isVisible: boolean }) {
	if (!isVisible) return null
	return <div>Visible content</div>
}
```

Run all Hooks at the top level, then early-return. Never call Hooks inside
conditions or after a guard that skips them.

Full local rule: `agents/rules/quality-component-composition.md`. Also see:
`rendering-conditional-render` (ternary vs `&&` only).
