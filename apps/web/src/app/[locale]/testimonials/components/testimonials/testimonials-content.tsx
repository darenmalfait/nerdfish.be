'use client'

import { ArrowLeftIcon, ArrowRightIcon } from '@repo/design-system/icons'
import { cn } from '@repo/lib/utils/class'
import { type Testimonial } from 'content-collections'
import { AnimatePresence, motion } from 'motion/react'
import { type ReactNode, useCallback, useState } from 'react'

function Author({ author }: { author: Testimonial['author'] }) {
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

const variants = {
	initial: { opacity: 0, y: '10%', scale: 0.1 },
	animate: { opacity: 1, y: 0, scale: 1 },
	exit: { opacity: 0, y: '10%', scale: 0.1 },
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
	testimonial?: Testimonial
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

export interface TestimonialsContentProps {
	testimonials: Testimonial[]
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

	const onNext = useCallback(() => {
		const nextTestimonialIndex =
			currentTestimonial + 1 >= testimonials.length ? 0 : currentTestimonial + 1

		setCurrentTestimonial(nextTestimonialIndex)
	}, [currentTestimonial, testimonials.length])

	const onPrevious = useCallback(() => {
		const previousTestimonialIndex =
			currentTestimonial - 1 < 0
				? testimonials.length - 1
				: currentTestimonial - 1

		setCurrentTestimonial(previousTestimonialIndex)
	}, [currentTestimonial, testimonials.length])

	const testimonial = testimonials[currentTestimonial]
	if (!testimonial && !children) return null

	return (
		<div className="relative">
			<AnimatePresence mode="popLayout">
				<motion.div
					key={currentTestimonial}
					initial="initial"
					animate="animate"
					exit="exit"
					className={cn('flex w-full flex-col items-center justify-center', {
						'min-h-[80vh]': layout?.variant !== 'secondary',
					})}
					variants={variants}
					transition={{
						type: 'spring',
						stiffness: 200,
						damping: 20,
						duration: 0.5,
					}}
				>
					<TestimonialItem
						layout={layout ?? undefined}
						testimonial={testimonial}
						onNext={testimonials.length > 1 ? onNext : undefined}
						onPrevious={testimonials.length > 1 ? onPrevious : undefined}
					/>

					{/* can be used for skeleton */}
					{children}
				</motion.div>
			</AnimatePresence>
		</div>
	)
}
