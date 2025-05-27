---
seo:
  title: Flexible useReducer in Reactjs
  description: Snippet for a flexible useReducer in React.js
title: Flexible useReducer in Reactjs
tags:
  - webdevelopment
  - react
excerpt: |
  Snippet for a flexible useReducer in React.js
date: 2022-12-25T23:00:00.000Z
---

useReducer Is a hook in React that is used for managing the state in a
functional component. It is similar to useState, but is more powerful and can be
used for managing more complex state changes.

Here's how useReducer works:

1. You pass useReducer a reducer function and an initial state value.
2. The reducer function is a pure function that takes in the current state and
   an action and returns the new state based on the action.
3. useReducer Returns an array with two elements: the current state and a
   dispatch function.
4. You can call the dispatch function with an action, which will trigger the
   reducer function and update the state.

Here's an example of how you might use useReducer in a React component:

```javascript
import { useReducer } from 'react'

function reducer(state, action) {
	switch (action.type) {
		case 'increment':
			return { count: state.count + 1 }
		case 'decrement':
			return { count: state.count - 1 }
		default:
			throw new Error()
	}
}

function Counter() {
	const [state, dispatch] = useReducer(reducer, { count: 0 })
	return (
		<>
			Count: {state.count}
			<button onClick={() => dispatch({ type: 'increment' })}>+</button>
			<button onClick={() => dispatch({ type: 'decrement' })}>-</button>
		</>
	)
}
```

In this example, we have a counter that increments and decrements based on the
actions dispatched by the buttons. The reducer function is responsible for
updating the state based on the actions.

Because of the way `useReducer` works, we can change it into something flexible.
I tend to use this if my component has a lot of states that belong together.
It's cleaner than `useState` with an object.

```javascript
import * as React from 'react' // import React and its hooks

const initialState = {
	// store initial state
	key: 'value',
}

function Component() {
	const [store, setStore] = React.useReducer(reducer, initialState) // useReducer hook

	function updateStore(values) {
		// update store function
		setStore(values)
	}

	return <div />
}

function reducer(state, newState) {
	// reducer function to update store
	return { ...state, ...newState }
}
```
