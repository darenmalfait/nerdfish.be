'use client'

import { Button } from '@nerdfish/react/button'
import { cx } from '@repo/lib/utils/base'
import emblaClassName from 'embla-carousel-class-names'
import useEmblaCarousel, {
	type UseEmblaCarouselType,
} from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import {
	type ComponentProps,
	createContext,
	type KeyboardEvent,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
	opts?: CarouselOptions
	plugins?: CarouselPlugin
	orientation?: 'horizontal' | 'vertical'
	setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
	carouselRef: ReturnType<typeof useEmblaCarousel>[0]
	api: ReturnType<typeof useEmblaCarousel>[1]
	scrollPrev: () => void
	scrollNext: () => void
	canScrollPrev: boolean
	canScrollNext: boolean
	isDragging: boolean
	setIsDragging: (isDragging: boolean) => void
} & CarouselProps

const CarouselContext = createContext<CarouselContextProps | null>(null)

function useCarousel() {
	const context = useContext(CarouselContext)

	if (!context) {
		throw new Error('useCarousel must be used within a <Carousel />')
	}

	return context
}

function Carousel({
	orientation = 'horizontal',
	opts,
	setApi,
	plugins,
	className,
	children,
	...props
}: ComponentProps<'div'> & CarouselProps) {
	const [carouselRef, api] = useEmblaCarousel(
		{
			...opts,
			axis: orientation === 'horizontal' ? 'x' : 'y',
		},
		[
			...(plugins ?? []),
			emblaClassName({
				snapped: 'is-snapped',
			}),
		],
	)
	const [canScrollPrev, setCanScrollPrev] = useState(false)
	const [canScrollNext, setCanScrollNext] = useState(false)
	const [isDragging, setIsDragging] = useState(false)

	const onSelect = useCallback((carouselApi: CarouselApi) => {
		if (!carouselApi) return
		setCanScrollPrev(carouselApi.canScrollPrev())
		setCanScrollNext(carouselApi.canScrollNext())
	}, [])

	const scrollPrev = useCallback(() => {
		api?.scrollPrev()
	}, [api])

	const scrollNext = useCallback(() => {
		api?.scrollNext()
	}, [api])

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			if (event.key === 'ArrowLeft') {
				event.preventDefault()
				scrollPrev()
			} else if (event.key === 'ArrowRight') {
				event.preventDefault()
				scrollNext()
			}
		},
		[scrollPrev, scrollNext],
	)

	useEffect(() => {
		if (!api || !setApi) return
		setApi(api)
	}, [api, setApi])

	useEffect(() => {
		if (!api) return
		onSelect(api)
		api.on('reInit', onSelect)
		api.on('select', onSelect)

		return () => {
			api.off('reInit', onSelect)
			api.off('select', onSelect)
		}
	}, [api, onSelect])

	return (
		<CarouselContext
			value={useMemo(
				() => ({
					carouselRef,
					api,
					opts,
					orientation,
					scrollPrev,
					scrollNext,
					canScrollPrev,
					canScrollNext,
					isDragging,
					setIsDragging,
				}),
				[
					carouselRef,
					api,
					opts,
					orientation,
					scrollPrev,
					scrollNext,
					canScrollPrev,
					canScrollNext,
					isDragging,
					setIsDragging,
				],
			)}
		>
			<div
				onKeyDownCapture={handleKeyDown}
				className={cx('relative', className)}
				role="region"
				aria-roledescription="carousel"
				data-slot="carousel"
				onMouseDown={() => setIsDragging(true)}
				onMouseUp={() => {
					setIsDragging(false)
				}}
				{...props}
			>
				{children}
			</div>
		</CarouselContext>
	)
}

function CarouselContent({ className, ...props }: ComponentProps<'div'>) {
	const { carouselRef, orientation } = useCarousel()

	return (
		<div
			ref={carouselRef}
			className="py-friends overflow-hidden"
			data-slot="carousel-content"
		>
			<div
				className={cx(
					'group/carousel-content flex cursor-grab',
					orientation === 'horizontal' ? '-ml-friends' : '-mt-friends flex-col',
					className,
				)}
				{...props}
			/>
		</div>
	)
}

function CarouselItem({
	className,
	children,
	index,
	scaleActive = true,
	...props
}: ComponentProps<'div'> & { index?: number; scaleActive?: boolean }) {
	const { orientation, isDragging } = useCarousel()

	return (
		<div
			role="group"
			aria-roledescription="slide"
			data-slot="carousel-item"
			className={cx(
				'min-w-0 shrink-0 grow-0 basis-full',
				orientation === 'horizontal' ? 'pl-friends' : 'pt-friends',
				scaleActive && '[&.is-snapped>div]:scale-105',
				isDragging && '[&.is-snapped>div]:scale-100',
				className,
			)}
			{...props}
		>
			<div
				className={cx(
					'scale-90 transition-transform duration-300',
					isDragging && 'scale-100',
				)}
			>
				{children}
			</div>
		</div>
	)
}

function CarouselPrevious({
	className,
	variant = 'secondary',
	icon = true,
	...props
}: ComponentProps<typeof Button>) {
	const { orientation, scrollPrev, canScrollPrev } = useCarousel()

	return (
		<Button
			data-slot="carousel-previous"
			variant={variant}
			icon={icon}
			className={cx(
				'absolute!',
				orientation === 'horizontal'
					? 'top-1/2 -left-16 -translate-y-1/2'
					: '-top-16 left-1/2 -translate-x-1/2 rotate-90',
				className,
			)}
			disabled={!canScrollPrev}
			onClick={scrollPrev}
			{...props}
		>
			<ArrowLeft />
			<span className="sr-only">Previous slide</span>
		</Button>
	)
}

function CarouselNext({
	className,
	variant = 'secondary',
	icon = true,
	...props
}: ComponentProps<typeof Button>) {
	const { orientation, scrollNext, canScrollNext } = useCarousel()

	return (
		<Button
			data-slot="carousel-next"
			variant={variant}
			icon={icon}
			className={cx(
				'absolute!',
				orientation === 'horizontal'
					? 'top-1/2 -right-16 -translate-y-1/2'
					: '-bottom-16 left-1/2 -translate-x-1/2 rotate-90',
				className,
			)}
			disabled={!canScrollNext}
			onClick={scrollNext}
			{...props}
		>
			<ArrowRight />
			<span className="sr-only">Next slide</span>
		</Button>
	)
}

export {
	type CarouselApi,
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
}
