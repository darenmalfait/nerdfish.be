'use client'

import { useMountEffect } from '@repo/lib/hooks/use-mount-effect'
import { cn } from '@repo/lib/utils/class'
import {
	type AnimationPlaybackControls,
	animate,
	inView,
	motion,
	useMotionValue,
	useTransform,
} from 'motion/react'
import {
	type ComponentPropsWithoutRef,
	type CSSProperties,
	type Ref,
	useMemo,
	useRef,
	useState,
} from 'react'

const DEFAULT_COLORS = [
	'var(--color-destructive)',
	'var(--color-success)',
	'var(--color-warning)',
	'var(--color-info)',
	'var(--color-accent)',
]
const BAND_HALF = 17
const SWEEP_START = -BAND_HALF
const SWEEP_END = 100 + BAND_HALF
const TEXT_SWAP_EASE = [0.22, 1, 0.36, 1] as const

type DiaTextMotionProps = ComponentPropsWithoutRef<typeof motion.span>

export type DiaTextRevealProps = Omit<
	DiaTextMotionProps,
	'children' | 'style' | 'animate' | 'transition' | 'color' | 'className'
> & {
	ref?: Ref<HTMLSpanElement>
	text: string | string[]
	colors?: string[]
	textColor?: string
	duration?: number
	delay?: number
	repeat?: boolean
	repeatDelay?: number
	triggerOnView?: boolean
	once?: boolean
	className?: string
	fixedWidth?: boolean
}

const sweepEase = (t: number) =>
	t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2

function buildGradient(pos: number, colors: string[], textColor: string) {
	const bandStart = pos - BAND_HALF
	const bandEnd = pos + BAND_HALF

	if (bandStart >= 100) {
		return `linear-gradient(90deg, ${textColor}, ${textColor})`
	}

	const count = colors.length
	const parts: string[] = []

	if (bandStart > 0) {
		parts.push(`${textColor} 0%`, `${textColor} ${bandStart.toFixed(2)}%`)
	}

	colors.forEach((color, index) => {
		const pct =
			count === 1 ? pos : bandStart + (index / (count - 1)) * BAND_HALF * 2

		parts.push(`${color} ${pct.toFixed(2)}%`)
	})

	if (bandEnd < 100) {
		parts.push(`transparent ${bandEnd.toFixed(2)}%`, 'transparent 100%')
	}

	return `linear-gradient(90deg, ${parts.join(', ')})`
}

function measureWidths(element: HTMLElement, texts: string[]) {
	const ghost = element.cloneNode() as HTMLElement

	Object.assign(ghost.style, {
		position: 'absolute',
		visibility: 'hidden',
		pointerEvents: 'none',
		width: 'auto',
		whiteSpace: 'nowrap',
	})

	element.parentElement?.appendChild(ghost)

	const widths = texts.map((entry) => {
		ghost.textContent = entry
		return ghost.getBoundingClientRect().width
	})

	ghost.remove()
	return widths
}

function DiaTextRevealInner({
	texts,
	colors = DEFAULT_COLORS,
	textColor = 'var(--color-foreground)',
	duration = 1.5,
	delay = 0,
	repeat = false,
	repeatDelay = 0.5,
	triggerOnView = true,
	once = true,
	className,
	fixedWidth = false,
	ref,
	...props
}: Omit<DiaTextRevealProps, 'text'> & { texts: string[] }) {
	const spanRef = useRef<HTMLSpanElement | null>(null)
	const [activeIndex, setActiveIndex] = useState(0)
	const [measuredWidths, setMeasuredWidths] = useState<number[]>([])

	const indexRef = useRef(0)
	const hasPlayedRef = useRef(false)
	const onceRef = useRef(once)
	const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
	const controlsRef = useRef<AnimationPlaybackControls | undefined>(undefined)
	const swapControlsRef = useRef<AnimationPlaybackControls[]>([])

	const sweepPos = useMotionValue(SWEEP_START)
	const textOpacity = useMotionValue(1)
	const textBlur = useMotionValue(0)
	const textShift = useMotionValue(0)

	onceRef.current = once

	const isMulti = texts.length > 1

	const backgroundImage = useTransform(sweepPos, (pos) =>
		buildGradient(pos, colors, textColor),
	)
	const contentFilter = useTransform(
		textBlur,
		(blur) => `blur(${blur.toFixed(2)}px)`,
	)
	const contentTransform = useTransform(
		textShift,
		(shift) => `translateY(${(-2 + shift).toFixed(2)}px)`,
	)

	const fixedW = useMemo(
		() =>
			isMulti && fixedWidth && measuredWidths.length > 0
				? Math.max(...measuredWidths)
				: undefined,
		[fixedWidth, isMulti, measuredWidths],
	)

	const animatedW = useMemo(
		() =>
			isMulti && !fixedWidth && measuredWidths[activeIndex] != null
				? measuredWidths[activeIndex]
				: undefined,
		[activeIndex, fixedWidth, isMulti, measuredWidths],
	)

	const containerStyle = useMemo(
		(): NonNullable<DiaTextMotionProps['style']> => ({
			...(isMulti && {
				display: 'inline-block',
				overflow: 'hidden',
				whiteSpace: 'nowrap',
				verticalAlign: 'text-center' as CSSProperties['verticalAlign'],
				...(fixedW != null && { width: fixedW }),
			}),
		}),
		[fixedW, isMulti],
	)

	const contentStyle = useMemo(
		(): NonNullable<DiaTextMotionProps['style']> => ({
			display: 'inline-block',
			color: 'transparent',
			backgroundClip: 'text',
			WebkitBackgroundClip: 'text',
			backgroundSize: '100% 100%',
			backgroundImage,
			opacity: textOpacity,
			filter: contentFilter,
			transform: contentTransform,
			willChange: 'filter, opacity, transform',
		}),
		[backgroundImage, contentFilter, contentTransform, textOpacity],
	)

	function clearCycle() {
		controlsRef.current?.stop()
		controlsRef.current = undefined

		if (timerRef.current) {
			clearTimeout(timerRef.current)
		}

		timerRef.current = undefined
	}

	function clearSwap() {
		for (const control of swapControlsRef.current) {
			control.stop()
		}
		swapControlsRef.current = []
	}

	function runSwapAnimation() {
		clearSwap()

		textOpacity.set(0.58)
		textBlur.set(8)
		textShift.set(5.5)

		swapControlsRef.current = [
			animate(textOpacity, 1, {
				duration: 0.26,
				ease: TEXT_SWAP_EASE,
			}),
			animate(textBlur, 0, {
				duration: 0.34,
				ease: TEXT_SWAP_EASE,
			}),
			animate(textShift, 0, {
				duration: 0.34,
				ease: TEXT_SWAP_EASE,
			}),
		]
	}

	const playRef = useRef<() => void>(() => undefined)

	playRef.current = () => {
		clearCycle()
		sweepPos.set(SWEEP_START)

		controlsRef.current = animate(sweepPos, SWEEP_END, {
			duration,
			delay,
			ease: sweepEase,
			onComplete() {
				if (!repeat || texts.length === 0) {
					return
				}

				timerRef.current = setTimeout(() => {
					const next = (indexRef.current + 1) % texts.length

					indexRef.current = next
					setActiveIndex(next)

					if (texts.length > 1) {
						runSwapAnimation()
					}

					playRef.current()
				}, repeatDelay * 1000)
			},
		})
	}

	// Mount-only: measure, subscribe to in-view, clean up timers/animations
	useMountEffect(() => {
		function cleanup() {
			clearCycle()
			clearSwap()
		}

		const element = spanRef.current
		if (!element) {
			return cleanup
		}

		if (texts.length > 1) {
			setMeasuredWidths(measureWidths(element, texts))
		}

		function start() {
			if (onceRef.current && hasPlayedRef.current) {
				return
			}

			hasPlayedRef.current = true
			playRef.current()
		}

		if (!triggerOnView) {
			start()
			return cleanup
		}

		const stopInView = inView(
			element,
			() => {
				start()
				return () => {
					if (!onceRef.current) {
						hasPlayedRef.current = false
					}
				}
			},
			{ amount: 0.1 },
		)

		return () => {
			stopInView()
			cleanup()
		}
	})

	const setRefs = (node: HTMLSpanElement | null) => {
		spanRef.current = node

		if (typeof ref === 'function') {
			ref(node)
		} else if (ref) {
			ref.current = node
		}
	}

	return (
		<motion.span
			animate={animatedW != null ? { width: animatedW } : undefined}
			className={cn('align-bottom text-inherit', className)}
			ref={setRefs}
			style={containerStyle}
			transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
			{...props}
		>
			<motion.span
				aria-hidden
				className="inline-block text-inherit"
				style={contentStyle}
			>
				{texts[activeIndex]}
			</motion.span>
			<span className="sr-only">{texts[activeIndex]}</span>
		</motion.span>
	)
}

export function DiaTextReveal({ text, ...props }: DiaTextRevealProps) {
	const texts = useMemo(() => (Array.isArray(text) ? text : [text]), [text])
	const textKey = useMemo(() => texts.join('\0'), [texts])

	// Remount on text identity change so cycle/measure restart without useEffect
	return <DiaTextRevealInner key={textKey} texts={texts} {...props} />
}
