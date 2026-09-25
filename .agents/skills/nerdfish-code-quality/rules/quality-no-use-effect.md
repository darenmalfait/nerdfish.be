---
title: No Bare useEffect
impact: HIGH
impactDescription:
  Prefer derived state, event handlers, and keys over effect sync
tags: quality, react, use-effect
---

## No Bare useEffect

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
`useOnMount`, …), prefer it so mount intent is searchable. Don't invent one just
to satisfy this rule.

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
  setVisibleTodos(todos.filter(todo => todo.completed === false))
}, [todos])
```

**Correct:**

```typescript
const visibleTodos = todos.filter(todo => !todo.completed)
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
function Toggle({onChange}: {onChange: (value: boolean) => void}) {
  const [isOn, setIsOn] = useState(false)

  useEffect(() => {
    onChange(isOn)
  }, [isOn, onChange])

  return <button onClick={() => setIsOn(!isOn)}>{isOn ? 'ON' : 'OFF'}</button>
}
```

Creates a chain: click → setState → render → effect → onChange → parent setState
→ another render.

**Correct:**

```typescript
function Toggle({onChange}: {onChange: (value: boolean) => void}) {
  const [isOn, setIsOn] = useState(false)

  function update(nextValue: boolean) {
    setIsOn(nextValue)
    onChange(nextValue)
  }

  return <button onClick={() => update(!isOn)}>{isOn ? 'ON' : 'OFF'}</button>
}
```

Often better: lift state and make the component controlled.

### 5. Resetting state when a prop changes → key

**Incorrect:**

```typescript
function Profile({userId}: {userId: string}) {
  const [comment, setComment] = useState('')

  useEffect(() => {
    setComment('')
  }, [userId])

  // ...
}
```

**Correct:**

```typescript
function ProfilePage({userId}: {userId: string}) {
  return <Profile userId={userId} key={userId} />
}

function Profile({userId}: {userId: string}) {
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

const selectedItem = items.find(item => item.id === selectedId) ?? null
```

`selectedItem` can't go stale relative to `items`.

### 7. Effect pipeline → derive the final result

**Incorrect:**

```typescript
useEffect(() => {
  setActiveTodos(todos.filter(todo => !todo.done))
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
const activeTodos = todos.filter(todo => !todo.done)

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
  setDataToSubmit({firstName, lastName})
}
```

**Correct:**

```typescript
function handleSubmit() {
  post('/api/register', {firstName, lastName})
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

| Effect is doing…                       | Usually use instead          |
| -------------------------------------- | ---------------------------- |
| Calculate / filter / map a value       | Plain calculation            |
| Expensive calculation                  | `useMemo` if actually needed |
| Respond to button / input / submit     | Event handler                |
| POST / notify after user action        | Event handler                |
| Tell parent something happened         | Event handler / lift state   |
| Reset entire subtree                   | `key`                        |
| Keep two pieces of React state in sync | Restructure / derive         |
| Store selected object                  | Store ID, derive object      |
| Subscribe to store for rendering       | `useSyncExternalStore`       |
| WebSocket / DOM / browser API sync     | `useEffect`                  |
| Fetch for currently displayed data     | Framework / router data APIs |
