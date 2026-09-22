'use client'

import { useLayoutEffect, useRef } from 'react'

/**
 * Keep a ref pointed at the latest value without re-subscribing effects that
 * only need to read it from event listeners / stable callbacks.
 */
export function useLatest<T>(value: T) {
	const ref = useRef(value)

	useLayoutEffect(() => {
		ref.current = value
	})

	return ref
}
