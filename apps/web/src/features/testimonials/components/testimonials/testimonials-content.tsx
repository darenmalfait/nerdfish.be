'use client'

import { useMountEffect } from '@repo/lib/hooks/use-mount-effect'
import { cn } from '@repo/lib/utils/class'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { type ComponentType, type ReactNode, useState } from 'react'

export type TestimonialCard = {
	quote: string
	author?: {
		name: string
		company: string
	}
}

function Author({ author }: { author: TestimonialCard['author'] }) {
	if (!author?.name) return null

	return (
		<div className="gap-bff flex flex-col justify-center">
			<span className="before:bg-foreground flex items-center font-medium before:mr-2 before:inline-block before:h-2 before:w-2 before:rounded-full before:content-['']">
				{author.name}
			</span>
			<span className="text-foreground/80 text-sm">{author.company}</span>
		</div>
	)
}

function TestimonialActions({
	onNext,
	onPrevious,
}: {
	onNext?: () => void
	onPrevious?: () => void
}) {
	if (!onNext || !onPrevious) return null

	return (
		<div className="gap-friends rounded-base p-friends md:hover:bg-background-inverted group flex transition duration-300 hover:scale-110">
			<button
				aria-label="Previous testimonial"
				onClick={onPrevious}
				className="active:-translate-x-bff rounded-base focus-visible:outline-active group-hover:text-foreground-inverted transition duration-300 outline-none group-hover:opacity-25 hover:opacity-100!"
			>
				<ArrowLeftIcon className="size-8" />
			</button>
			<button
				aria-label="Next testimonial"
				onClick={onNext}
				className="rounded-base focus-visible:outline-active active:translate-x-bff group-hover:text-foreground-inverted transition duration-300 outline-none group-hover:opacity-25 hover:opacity-100!"
			>
				<ArrowRightIcon className="size-8" />
			</button>
		</div>
	)
}

function TestimonialItem({
	layout,
	testimonial,
	onNext,
	onPrevious,
}: {
	layout?: {
		variant?: 'primary' | 'secondary'
	}
	testimonial?: TestimonialCard
	onNext?: () => void
	onPrevious?: () => void
}) {
	if (!testimonial) return null

	return (
		<div className="gap-acquaintances relative flex flex-col justify-center">
			<blockquote
				className={cn(
					layout?.variant === 'secondary'
						? 'typography-title'
						: 'typography-heading-sm',
					'text-foreground font-bold before:content-["“"] after:content-["”"]',
				)}
			>
				{testimonial.quote}
			</blockquote>

			<div className="gap-acquaintances flex flex-col justify-between md:flex-row md:items-center">
				<Author author={testimonial.author} />
				<div className="flex w-auto items-center justify-end">
					<TestimonialActions onNext={onNext} onPrevious={onPrevious} />
				</div>
			</div>
		</div>
	)
}

type MotionFrame = ComponentType<{
	itemKey: number
	variant?: 'primary' | 'secondary'
	children: ReactNode
}>

function prefersReducedMotion() {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function scheduleIdle(callback: () => void) {
	if (typeof window.requestIdleCallback === 'function') {
		const id = window.requestIdleCallback(callback, { timeout: 2000 })
		return () => window.cancelIdleCallback(id)
	}

	const id = window.setTimeout(callback, 200)
	return () => window.clearTimeout(id)
}

function preloadMotionFrame() {
	return import('./testimonials-motion-frame')
}

export interface TestimonialsContentProps {
	testimonials: TestimonialCard[]
	layout?: {
		variant?: 'primary' | 'secondary'
	}
	children?: ReactNode
}

export function TestimonialsContent({
	layout,
	testimonials,
	children,
}: TestimonialsContentProps) {
	const [currentTestimonial, setCurrentTestimonial] = useState(
		testimonials.length ? testimonials.length - 1 : 0,
	)
	const [MotionFrame, setMotionFrame] = useState<MotionFrame | null>(null)

	useMountEffect(() => {
		if (prefersReducedMotion()) return

		return scheduleIdle(() => {
			void preloadMotionFrame().then((mod) => {
				setMotionFrame(() => mod.TestimonialsMotionFrame)
			})
		})
	})

	function loadMotion() {
		if (MotionFrame || prefersReducedMotion()) return
		void preloadMotionFrame().then((mod) => {
			setMotionFrame(() => mod.TestimonialsMotionFrame)
		})
	}

	function onNext() {
		loadMotion()
		setCurrentTestimonial((current) =>
			current + 1 >= testimonials.length ? 0 : current + 1,
		)
	}

	function onPrevious() {
		loadMotion()
		setCurrentTestimonial((current) =>
			current - 1 < 0 ? testimonials.length - 1 : current - 1,
		)
	}

	const testimonial = testimonials[currentTestimonial]
	if (!testimonial && !children) return null

	const body = (
		<>
			<TestimonialItem
				layout={layout ?? undefined}
				testimonial={testimonial}
				onNext={testimonials.length > 1 ? onNext : undefined}
				onPrevious={testimonials.length > 1 ? onPrevious : undefined}
			/>
			{children}
		</>
	)

	return (
		<div className="relative">
			{MotionFrame ? (
				<MotionFrame itemKey={currentTestimonial} variant={layout?.variant}>
					{body}
				</MotionFrame>
			) : (
				<div
					className={cn('flex w-full flex-col items-center justify-center', {
						'min-h-[80vh]': layout?.variant !== 'secondary',
					})}
				>
					{body}
				</div>
			)}
		</div>
	)
}
