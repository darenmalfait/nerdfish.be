'use client'

import { useHydrated } from '@repo/lib/utils'
import * as React from 'react'

interface TFrame {
	isDefault?: boolean
	frame: number
	progress: number
	length: number
}

const StageContext = React.createContext<TFrame>({
	isDefault: true,
	frame: 0,
	progress: 0,
	length: 0,
})

const ActorContext = React.createContext<TFrame>({
	isDefault: true,
	frame: 0,
	progress: 0,
	length: 0,
})

export function Stage({
	frame,
	length,
	children,
}: {
	frame: number
	length: number
	children: React.ReactNode
}) {
	const progress = frame / length

	return (
		<StageContext.Provider
			value={React.useMemo(() => {
				return { frame, progress, length }
			}, [frame, progress, length])}
		>
			{children}
		</StageContext.Provider>
	)
}

export function Actor({
	type = 'progress',
	start: startProp,
	end: endProp,
	persistent = false,
	children,
}: {
	type?: 'progress' | 'frame'
	start: number
	end?: number
	persistent?: boolean
	children: React.ReactNode
}) {
	const stage = React.useContext(StageContext)
	const actor = useActor()
	const parent = actor.isDefault ? stage : actor

	const start = type === 'progress' ? startProp * parent.length : startProp
	const end = endProp
		? type === 'progress'
			? endProp * parent.length
			: endProp
		: parent.length

	const length = end - start
	const frame = parent.frame - start
	const progress = Math.max(0, Math.min(frame / length, 1))

	const value = React.useMemo(() => {
		const context: TFrame = { frame, progress, length }
		return context
	}, [frame, progress, length])

	const onStage = persistent
		? true
		: parent.frame >= start && (endProp ? parent.frame < end : true)

	if (!onStage) return null

	return <ActorContext.Provider value={value}>{children}</ActorContext.Provider>
}

function getStageLength(pages: number) {
	return window.innerHeight * pages
}

export function ScrollStage({
	pages,
	fallbackFrame = 0,
	fallbackLength = 1080,
	children,
}: {
	pages: number
	fallbackFrame?: number
	fallbackLength?: number
	children: React.ReactNode
}) {
	const ref = React.useRef<HTMLDivElement>(null)
	const relativeScroll = useRelativeWindowScroll(ref, fallbackFrame)
	const hydrated = useHydrated()

	const [length, setLength] = React.useState<number>(() => {
		return hydrated ? getStageLength(pages) : fallbackLength
	})

	// set length after server render
	React.useEffect(() => setLength(getStageLength(pages)), [pages])
	useOnResize(
		React.useCallback(() => setLength(getStageLength(pages)), [pages])
	)

	return (
		<Stage
			frame={Math.max(0, Math.min(relativeScroll, length))}
			length={length}
		>
			<div ref={ref} style={{ minHeight: `${pages * 100}vh` }}>
				{children}
			</div>
		</Stage>
	)
}

export function useActor(): TFrame {
	return React.useContext(ActorContext)
}

export function useStage(): TFrame {
	return React.useContext(StageContext)
}

function useOnResize(fn: () => void) {
	React.useEffect(() => {
		window.addEventListener('resize', fn)
		return () => window.removeEventListener('resize', fn)
	}, [fn])
}

const canUseDom = typeof window !== 'undefined'

function useWindowScroll(fallback = 0): number {
	const hydrated = useHydrated()
	const [scroll, setScroll] = React.useState<number>(
		hydrated && canUseDom ? window.scrollY : fallback
	)
	const handleScroll = React.useCallback(() => {
		setScroll(window.scrollY)
	}, [])

	React.useEffect(() => {
		handleScroll()
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [handleScroll])

	useOnResize(handleScroll)

	return scroll
}

function useRelativeWindowScroll(
	ref: React.RefObject<HTMLElement>,
	fallback = 0
): number {
	const windowScroll = useWindowScroll(fallback)
	if (!ref.current) return fallback
	return windowScroll - ref.current.offsetTop + window.innerHeight
}
