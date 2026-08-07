import { useMountEffect } from '@repo/lib/hooks/use-mount-effect'
import { useState } from 'react'

export function useMediaQuery(query: string) {
	const [value, setValue] = useState(false)

	useMountEffect(() => {
		function onChange(event: MediaQueryListEvent) {
			setValue(event.matches)
		}

		const result = matchMedia(query)
		result.addEventListener('change', onChange)
		setValue(result.matches)

		return () => result.removeEventListener('change', onChange)
	})

	return value
}
