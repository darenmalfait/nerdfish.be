import { type RefObject, useEffect, useRef } from 'react'

export function useScrollToBottom<T extends HTMLElement>(): [
	RefObject<T | null>,
	RefObject<T | null>,
] {
	const containerRef = useRef<T | null>(null)
	const endRef = useRef<T | null>(null)

	useEffect(() => {
		const container = containerRef.current
		const end = endRef.current

		if (container && end) {
			const observer = new MutationObserver(() => {
				end.scrollIntoView({ behavior: 'instant', block: 'end' })
			})

			observer.observe(container, {
				childList: true,
				subtree: true,
				attributes: true,
				characterData: true,
			})

			return () => observer.disconnect()
		}
	}, [])

	return [containerRef, endRef]
}
