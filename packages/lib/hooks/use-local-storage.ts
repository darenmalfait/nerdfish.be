'use client'

import { useCallback, useMemo, useState, useSyncExternalStore } from 'react'

function subscribe(onStoreChange: () => void) {
	window.addEventListener('storage', onStoreChange)
	return () => window.removeEventListener('storage', onStoreChange)
}

function getServerSnapshot() {
	return null
}

function readItem(key: string) {
	try {
		return window.localStorage.getItem(key)
	} catch (error) {
		console.warn(`Error reading localStorage key "${key}":`, error)
		return null
	}
}

export function useLocalStorage<T>(
	key: string,
	initialValue: T,
): [T, (value: T | ((val: T) => T)) => void] {
	const [fallback] = useState(initialValue)
	// The raw string is the snapshot so it stays referentially stable between reads
	const storedItem = useSyncExternalStore(
		subscribe,
		() => readItem(key),
		getServerSnapshot,
	)

	const localState = useMemo<T>(() => {
		if (!storedItem) return fallback

		try {
			return JSON.parse(storedItem) as T
		} catch (error) {
			console.warn(`Error parsing localStorage key "${key}":`, error)
			return fallback
		}
	}, [key, storedItem, fallback])

	const handleSetState = useCallback(
		(value: T | ((val: T) => T)) => {
			try {
				const valueToStore =
					value instanceof Function ? value(localState) : value
				window.localStorage.setItem(key, JSON.stringify(valueToStore))
				// The storage event only fires in other tabs, so notify this one too
				window.dispatchEvent(new StorageEvent('storage', { key }))
			} catch (error) {
				console.warn(`Error setting localStorage key "${key}":`, error)
			}
		},
		[key, localState],
	)

	return [localState, handleSetState]
}
