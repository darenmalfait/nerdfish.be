import { useState } from 'react'
import { useMountEffect } from './use-mount-effect'

let hydrating = true
export function useHydrated() {
	const [hydrated, setHydrated] = useState(() => !hydrating)

	useMountEffect(() => {
		hydrating = false
		setHydrated(true)
	})

	return hydrated
}
