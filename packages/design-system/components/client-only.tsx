import * as React from 'react'

/** React hook that returns true if the component has mounted client-side */
export function useClientOnly() {
	const [hasMounted, setHasMounted] = React.useState(false)

	React.useEffect(() => {
		setHasMounted(true)
	}, [])

	return hasMounted
}

/** React component that renders its children client-side only / after first mount */
export function ClientOnly({ children }: { children: React.ReactNode }) {
	const hasMounted = useClientOnly()

	if (!hasMounted) {
		return null
	}

	return React.createElement(React.Fragment, { children })
}
