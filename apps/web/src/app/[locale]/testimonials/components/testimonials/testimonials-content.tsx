'use client'

import { H1, H2 } from '@repo/design-system/components/ui'
import { ArrowLeftIcon, ArrowRightIcon } from '@repo/design-system/icons'
import { cx } from '@repo/lib/utils/base'
import { type Testimonial } from 'content-collections'
import { AnimatePresence, motion } from 'motion/react'
import { type ReactNode, useCallback, useState } from 'react'

function Author({ author }: { author: Testimonial['author'] }) {
	if (!author?.name) return null

	return (
		<div className="gap-xs flex flex-col justify-center">
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
		<div className="gap-md rounded-base p-md md:hover:bg-background-inverted group flex transition duration-300 hover:scale-110">
			<button
				aria-label="Previous testimonial"
				onClick={onPrevious}
				className="active:-translate-x-xs rounded-base focus-visible:outline-active group-hover:text-foreground-inverted outline-none transition duration-300 hover:!opacity-100 group-hover:opacity-25"
			>
				<ArrowLeftIcon className="size-8" />
			</button>
			<button
				aria-label="Next testimonial"
				onClick={onNext}
				className="rounded-base focus-visible:outline-active active:translate-x-xs group-hover:text-foreground-inverted outline-none transition duration-300 hover:!opacity-100 group-hover:opacity-25"
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
	const Element = layout?.variant === 'secondary' ? H2 : H1

	if (!testimonial) return null

	return (
		<div className="gap-xl relative flex flex-col justify-center">
			<Element
				as="blockquote"
				className='text-foreground font-bold before:content-["“"] after:content-["”"]'
			>
				{testimonial.quote}
			</Element>

			<div className="gap-xl flex flex-col justify-between md:flex-row md:items-center">
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
					className={cx('flex w-full flex-col items-center justify-center', {
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
