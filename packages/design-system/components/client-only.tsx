import { useMountEffect } from '@repo/lib/hooks/use-mount-effect'
import { type ReactNode, useState } from 'react'

/** React hook that returns true if the component has mounted client-side */
export function useClientOnly() {
	const [hasMounted, setHasMounted] = useState(false)

	useMountEffect(() => {
		setHasMounted(true)
	})

	return hasMounted
}

/** React component that renders its children client-side only / after first mount */
export function ClientOnly({ children }: { children: ReactNode }) {
	const hasMounted = useClientOnly()

	if (!hasMounted) {
		return null
	}

	return children
}
