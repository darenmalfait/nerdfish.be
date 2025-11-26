'use client'

import { Button } from '@nerdfish/react/button'
import { cn } from '@repo/lib/utils/class'
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
import { useMediaQuery } from '../hooks/use-media-query'

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
	scaleActive: boolean
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
	const isSmall = useMediaQuery('(min-width: 40rem)')
	const isLarge = useMediaQuery('(min-width: 64rem)')
	const isXLarge = useMediaQuery('(min-width: 80rem)')

	const [carouselRef, api] = useEmblaCarousel(
		{
			...opts,
			align: 'center',
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

	const scaleActive = useMemo(() => {
		if (!api) return true

		if (isXLarge) {
			return api.slideNodes().length > 7
		}
		if (isLarge) {
			return api.slideNodes().length > 5
		}
		if (isSmall) {
			return api.slideNodes().length > 4
		}
		return true
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [api, isLarge, isSmall, children])

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
					scaleActive,
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
					scaleActive,
				],
			)}
		>
			<div
				onKeyDownCapture={handleKeyDown}
				className={cn(
					'relative',
					'[--slide-size:calc(100vw-96px)]',
					'sm:[--slide-size:calc(min(100vw,1440px)/2)]',
					'lg:[--slide-size:calc(min(100vw,1440px)*14/48)]',

					className,
				)}
				role="region"
				aria-roledescription="carousel"
				data-slot="carousel"
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
			className="py-friends cursor-grab overflow-hidden [&.is-dragging]:cursor-grabbing [&.is-dragging_[data-slot=carousel-item-content]]:scale-100! [&.is-dragging_[data-slot=carousel-item-content]]:px-0!"
			data-slot="carousel-content"
		>
			<div
				className={cn(
					'group/carousel-content flex',
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
	...props
}: ComponentProps<'div'> & { index?: number }) {
	const { orientation, scaleActive } = useCarousel()

	return (
		<div
			role="group"
			aria-roledescription="slide"
			data-slot="carousel-item"
			className={cn(
				'min-w-0 shrink-0 grow-0 basis-(--slide-size)',
				orientation === 'horizontal' ? 'pl-friends' : 'pt-friends',
				scaleActive && '[&.is-snapped>div]:scale-105',
				className,
			)}
			{...props}
		>
			<div
				data-slot="carousel-item-content"
				className={cn('scale-95 transition-all duration-300')}
			>
				{children}
			</div>
		</div>
	)
}

function CarouselPrevious({
	variant = 'secondary',
	icon = true,
	...props
}: ComponentProps<typeof Button>) {
	const { scrollPrev, canScrollPrev } = useCarousel()

	return (
		<Button
			data-slot="carousel-previous"
			variant={variant}
			icon={icon}
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
	variant = 'secondary',
	icon = true,
	...props
}: ComponentProps<typeof Button>) {
	const { scrollNext, canScrollNext } = useCarousel()

	return (
		<Button
			data-slot="carousel-next"
			variant={variant}
			icon={icon}
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
