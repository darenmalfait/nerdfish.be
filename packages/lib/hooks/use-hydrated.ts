import { useEffect, useState } from 'react'

let hydrating = true
export function useHydrated() {
	const [hydrated, setHydrated] = useState(() => !hydrating)

	useEffect(() => {
		hydrating = false
		setHydrated(true)
	}, [])

	return hydrated
}
