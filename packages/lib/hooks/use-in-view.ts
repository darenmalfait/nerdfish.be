'use client'

import { type RefObject, useState } from 'react'
import { useMountEffect } from './use-mount-effect'

type UseInViewOptions = {
	once?: boolean
	/** IntersectionObserver threshold (0–1) */
	amount?: number
}

/** Native IntersectionObserver stand-in for motion/react useInView */
export function useInView(
	ref: RefObject<Element | null>,
	{ once = false, amount = 0 }: UseInViewOptions = {},
) {
	const [inView, setInView] = useState(false)

	useMountEffect(() => {
		const element = ref.current
		if (!element) return

		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0]
				if (!entry) return

				if (entry.isIntersecting) {
					setInView(true)
					if (once) observer.disconnect()
					return
				}

				if (!once) setInView(false)
			},
			{ threshold: amount },
		)

		observer.observe(element)
		return () => observer.disconnect()
	})

	return inView
}
