---
seo:
  title: Form handling in React without states
  description: |
    Using useStates for form handling, things get clunky fast. This shows a clean scalable way to do form handling in React.
title: Form handling in React without states
excerpt: |
  Using useStates for form handling, things get clunky fast. This shows a clean scalable way to do form handling in React.
date: 2023-04-06T10:00:00.000Z
tags:
  - webdevelopment
  - react
---

Handling forms in React is typically done by storing the values of the form
fields in state. For example:\\

```javascript
import * as React from 'react'

function ExampleForm() {
	const [firstName, setFirstName] = React.useState('')
	const [lastName, setLastName] = React.useState('')

	function handleSubmit(e) {
		e.preventDefault()
		// Do something with the data
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				name="firstName"
				value={firstName}
				onChange={(e) => setFirstName(e.target.value)}
			/>
			<input
				type="text"
				name="lastName"
				value={lastName}
				onChange={(e) => setLastName(e.target.value)}
			/>
			<button type="submit">Submit</button>
		</form>
	)
}
```

The browser has a built-in API called FormData that makes it easy to get the
data from a form. Even if you're using React, FormData simplifies the process of
obtaining the data, without needing to manage the state of each input.

```javascript
import * as React from 'react'

function ExampleForm() {
	function handleSubmit(e) {
		e.preventDefault()
		const formData = new FormData(e.target)
		const firstName = formData.get('firstName')
		const lastName = formData.get('lastName')
		// Do something with the data
	}

	return (
		<form onSubmit={handleSubmit}>
			<input type="text" name="firstName" />
			<input type="text" name="lastName" />
			<button type="submit">Submit</button>
		</form>
	)
}
```

FormData is also a Request body type for the Fetch API. If you're using an edge
function to handle form submissions, you can use FormData to quickly obtain the
data from the request.

```javascript
function handleRequest(request) {
  const formData = await request.formData()
  const firstName = formData.get('firstName')
  const lastName = formData.get('lastName')
  // Do something with the data
}
```
