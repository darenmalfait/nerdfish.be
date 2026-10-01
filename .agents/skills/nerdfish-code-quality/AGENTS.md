# Code Quality

Standards for readable, maintainable code and rigorous review — including
shaping release flags so cleanup stays cheap.

## 1. Prioritize Clarity Over Cleverness

**Impact: HIGH**

The goal is code that is easy to read and understand quickly, not elegant
complexity.

**Incorrect:**

```typescript
const result = data.reduce(
	(a, b) => ({ ...a, [b.locale]: (a[b.locale] || []).concat(b) }),
	{},
)
```

**Correct:**

```typescript
const groupedByLocale: Record<string, Item[]> = {}

for (const item of data) {
	if (!groupedByLocale[item.locale]) {
		groupedByLocale[item.locale] = []
	}
	groupedByLocale[item.locale].push(item)
}
```

Simple doesn't mean anemic — matching an existing pattern is not gold-plating.

## 2. Code Comment Guidelines

**Impact: MEDIUM**

Comments should explain "why" not "what". Skip obvious comments.

## 3. Address All Nits Before Merging

**Impact: HIGH**

Don't merge with a pile of nits. Request changes; fix before merge.

## 4. No Bare useEffect

**Impact: HIGH**

`useEffect` synchronizes React with **external systems**. It is not an internal
data-flow mechanism. Before writing one, walk this:

```
Does this interact with something outside React?
│
├─ No
│  ├─ Derived value?              → calculate during render
│  ├─ Expensive derived value?    → useMemo only if actually needed
│  ├─ Response to user action?    → event handler
│  ├─ Reset state on identity?    → key on the component
│  └─ State mirrored from state?  → rethink the state model
│
└─ Yes
   ├─ Data fetching?              → framework / router data APIs
   ├─ External store (for render)? → useSyncExternalStore
   └─ Connect / subscribe / DOM / browser API?
                                  → useEffect (or the project's mount-only
                                    helper if one exists)
```

If the codebase already has a mount-only wrapper (`useMountEffect`,
`useOnMount`, …), prefer it so mount intent is searchable. Don't invent one
just to satisfy this rule.

### 1. Derived state → calculate during render

**Incorrect:**

```typescript
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [fullName, setFullName] = useState('')

useEffect(() => {
	setFullName(`${firstName} ${lastName}`)
}, [firstName, lastName])
```

**Correct:**

```typescript
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')

const fullName = `${firstName} ${lastName}`
```

If you can derive it from existing props/state, it doesn't need to be state.

### 2. Derived / filtered data → calculate during render

**Incorrect:**

```typescript
const [visibleTodos, setVisibleTodos] = useState([])

useEffect(() => {
	setVisibleTodos(todos.filter((todo) => todo.completed === false))
}, [todos])
```

**Correct:**

```typescript
const visibleTodos = todos.filter((todo) => !todo.completed)
```

If the calculation is genuinely expensive:

```typescript
const visibleTodos = useMemo(
	() => getFilteredTodos(todos, filter),
	[todos, filter],
)
```

`useMemo` caches an expensive calculation. It is not a general-purpose
replacement for `useEffect`.

### 3. "When state changes, do X" → event handler

**Incorrect:**

```typescript
const [submitted, setSubmitted] = useState(false)

useEffect(() => {
	if (submitted) {
		sendAnalytics()
	}
}, [submitted])

function handleSubmit() {
	setSubmitted(true)
}
```

**Correct:**

```typescript
function handleSubmit() {
	setSubmitted(true)
	sendAnalytics()
}
```

Prefer the event handler when the behavior is caused by a specific user
interaction.

### 4. "State changed → notify parent" → update both in the event

**Incorrect:**

```typescript
function Toggle({ onChange }: { onChange: (value: boolean) => void }) {
	const [isOn, setIsOn] = useState(false)

	useEffect(() => {
		onChange(isOn)
	}, [isOn, onChange])

	return (
		<button onClick={() => setIsOn(!isOn)}>
			{isOn ? 'ON' : 'OFF'}
		</button>
	)
}
```

Creates a chain: click → setState → render → effect → onChange → parent
setState → another render.

**Correct:**

```typescript
function Toggle({ onChange }: { onChange: (value: boolean) => void }) {
	const [isOn, setIsOn] = useState(false)

	function update(nextValue: boolean) {
		setIsOn(nextValue)
		onChange(nextValue)
	}

	return (
		<button onClick={() => update(!isOn)}>
			{isOn ? 'ON' : 'OFF'}
		</button>
	)
}
```

Often better: lift state and make the component controlled.

### 5. Resetting state when a prop changes → key

**Incorrect:**

```typescript
function Profile({ userId }: { userId: string }) {
	const [comment, setComment] = useState('')

	useEffect(() => {
		setComment('')
	}, [userId])

	// ...
}
```

**Correct:**

```typescript
function ProfilePage({ userId }: { userId: string }) {
	return <Profile userId={userId} key={userId} />
}

function Profile({ userId }: { userId: string }) {
	const [comment, setComment] = useState('')

	// ...
}
```

Changing `key` creates a fresh instance with fresh state.

### 6. Selected object → store the ID, derive the object

**Incorrect:**

```typescript
const [selectedItem, setSelectedItem] = useState<Item | null>(null)

useEffect(() => {
	if (!items.includes(selectedItem)) {
		setSelectedItem(null)
	}
}, [items, selectedItem])
```

**Correct:**

```typescript
const [selectedId, setSelectedId] = useState<string | null>(null)

const selectedItem =
	items.find((item) => item.id === selectedId) ?? null
```

`selectedItem` can't go stale relative to `items`.

### 7. Effect pipeline → derive the final result

**Incorrect:**

```typescript
useEffect(() => {
	setActiveTodos(todos.filter((todo) => !todo.done))
}, [todos])

useEffect(() => {
	setVisibleTodos(showActive ? activeTodos : todos)
}, [showActive, todos, activeTodos])

useEffect(() => {
	setFooter(`${activeTodos.length} todos left`)
}, [activeTodos])
```

**Correct:**

```typescript
const activeTodos = todos.filter((todo) => !todo.done)

const visibleTodos = showActive ? activeTodos : todos

const footer = `${activeTodos.length} todos left`
```

Don't build a mini reactive system out of effects and mirrored state.

### 8. POST triggered by a button → put it in the handler

**Incorrect:**

```typescript
const [dataToSubmit, setDataToSubmit] = useState<Payload | null>(null)

useEffect(() => {
	if (dataToSubmit) {
		post('/api/register', dataToSubmit)
	}
}, [dataToSubmit])

function handleSubmit() {
	setDataToSubmit({ firstName, lastName })
}
```

**Correct:**

```typescript
function handleSubmit() {
	post('/api/register', { firstName, lastName })
}
```

The request is caused by the click, not by rendering.

### 9. External system → `useEffect` belongs here

WebSocket / connection:

```typescript
useEffect(() => {
	const connection = createConnection(roomId)
	connection.connect()
	return () => connection.disconnect()
}, [roomId])
```

Browser event:

```typescript
useEffect(() => {
	window.addEventListener('resize', handleResize)
	return () => window.removeEventListener('resize', handleResize)
}, [])
```

Third-party widget / DOM sync is the same category. Prefer
`useSyncExternalStore` when the external store drives **rendered** state.

### Cheat sheet

| Effect is doing…                         | Usually use instead              |
| ---------------------------------------- | -------------------------------- |
| Calculate / filter / map a value         | Plain calculation                |
| Expensive calculation                    | `useMemo` if actually needed     |
| Respond to button / input / submit       | Event handler                    |
| POST / notify after user action          | Event handler                    |
| Tell parent something happened           | Event handler / lift state       |
| Reset entire subtree                     | `key`                            |
| Keep two pieces of React state in sync   | Restructure / derive             |
| Store selected object                    | Store ID, derive object          |
| Subscribe to store for rendering         | `useSyncExternalStore`           |
| WebSocket / DOM / browser API sync       | `useEffect`                      |
| Fetch for currently displayed data       | Framework / router data APIs     |

## 5. Shape Feature Flags for Easy Removal

**Impact: HIGH**

Release flags are temporary inventory. Write them so removing the flag is
deleting a guard (or swapping a strategy), not untangling nested branches.

Prefer the **new path as the trunk**. Put the legacy / off path behind an early
return or a thin toggle point at the edge. When the flag ships to 100%, delete
the guard and the dead path — the happy path stays unindented.

**Incorrect: new feature nested under the flag (removal rewrites the trunk):**

```typescript
async function checkout(cart: Cart) {
	if (flags.isEnabled('checkout-v2')) {
		const quote = await quoteV2(cart)
		const payment = await chargeV2(quote)
		return finalizeV2(payment)
	}

	const quote = await quoteV1(cart)
	const payment = await chargeV1(quote)
	return finalizeV1(payment)
}
```

**Correct: early return for the off path; new path is the default body:**

```typescript
async function checkout(cart: Cart) {
	if (!flags.isEnabled('checkout-v2')) {
		return checkoutV1(cart)
	}

	const quote = await quoteV2(cart)
	const payment = await chargeV2(quote)
	return finalizeV2(payment)
}

// After 100% rollout: delete the guard + checkoutV1. Trunk stays.
```

**Incorrect: flag checks sprinkled through the flow:**

```typescript
function CheckoutPage({ cart }: Props) {
	const v2 = useFlag('checkout-v2')

	return (
		<form>
			{v2 ? <AddressFieldsV2 /> : <AddressFieldsV1 />}
			{v2 ? <PaymentV2 /> : <PaymentV1 />}
			{v2 ? <SummaryV2 cart={cart} /> : <SummaryV1 cart={cart} />}
		</form>
	)
}
```

**Correct: one toggle point; compose variants (or strategies) outside:**

```typescript
function CheckoutPage({ cart }: Props) {
	if (!useFlag('checkout-v2')) {
		return <CheckoutV1 cart={cart} />
	}

	return <CheckoutV2 cart={cart} />
}
```

For longer-lived or multi-callsite flags, resolve once (factory / strategy /
`FeatureDecisions`) and inject the implementation — don't thread booleans
through the call graph.

**Also:**

- Default the flag evaluation to **old / safe** behavior for release flags
- Don't leave inverted names (`disable-old-thing`) — prefer positive enable of
  the new path
- Plan removal when you add the flag (ticket, expiry, or a follow-up branch
  that already deletes the guard)

**Not this rule:** ops/permission flags that are permanent product gates — those
aren't meant to vanish. Still keep the toggle point thin.
