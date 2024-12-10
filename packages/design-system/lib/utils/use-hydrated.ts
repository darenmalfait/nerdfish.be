import * as React from 'react'

let hydrating = true
export function useHydrated() {
	const [hydrated, setHydrated] = React.useState(() => !hydrating)
	React.useEffect(() => {
		hydrating = false
		setHydrated(true)
	}, [])
	return hydrated
}
