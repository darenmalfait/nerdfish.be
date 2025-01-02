'use client'

import { cx } from '@nerdfish/utils'
import { InViewBackground } from '@repo/design-system/components/in-view-background'
import { Section } from '@repo/design-system/components/section'
import { H1, H2 } from '@repo/design-system/components/ui'
import { ArrowLeftIcon, ArrowRightIcon } from '@repo/design-system/lib/icons'
import { type Testimonial } from 'content-collections'
import { AnimatePresence, motion } from 'motion/react'
import * as React from 'react'
import { type PageBlocksTestimonialsLayout } from '~/app/cms/types'
import { useGlobal } from '~/app/global-provider'

const BlockLayout = ({ children }: { children: React.ReactNode }) => {
	if (!children) return null

	return (
		<InViewBackground className="bg-blog/20">
			<Section>{children}</Section>
		</InViewBackground>
	)
}

function Author({ author }: { author: Testimonial['author'] }) {
	if (!author?.name) return null

	return (
		<div className="gap-xs flex flex-col justify-center">
			<span className="before:bg-inverted flex items-center font-medium before:mr-2 before:inline-block before:h-2 before:w-2 before:rounded-full before:content-['']">
				{author.name}
			</span>
			<span className="text-primary/80 text-sm">{author.company}</span>
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
		<div className="gap-md rounded-container p-md md:hover:bg-primary group flex transition duration-300 hover:scale-110">
			<button
				aria-label="Previous testimonial"
				onClick={onPrevious}
				className="active:-translate-x-xs rounded-container focus-visible:outline-active outline-none transition duration-300 hover:!opacity-100 group-hover:opacity-25"
			>
				<ArrowLeftIcon className="size-8" />
			</button>
			<button
				aria-label="Next testimonial"
				onClick={onNext}
				className="rounded-container focus-visible:outline-active active:translate-x-xs outline-none transition duration-300 hover:!opacity-100 group-hover:opacity-25"
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
	layout?: PageBlocksTestimonialsLayout
	testimonial: Testimonial
	onNext?: () => void
	onPrevious?: () => void
}) {
	const Element = layout?.variant === 'secondary' ? H2 : H1

	return (
		<div className="gap-xl relative flex flex-col justify-center">
			<Element
				as="blockquote"
				className='text-primary font-bold before:content-["“"] after:content-["”"]'
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

export interface TestimonialsBlockProps {
	layout?: {
		variant?: 'primary' | 'secondary'
	}
	type?: Testimonial['type']
	tags?: Testimonial['tags']
}

export function TestimonialsBlock(data: TestimonialsBlockProps) {
	const { type, tags, layout } = data

	const { testimonials: allTestimonials } = useGlobal()

	const testimonials =
		allTestimonials
			// filter by type
			?.filter((item) => {
				if (!type) return true
				return type.includes(item.type)
			})
			// filter by tags
			.filter((item) => {
				if (!tags) return true
				return item.tags && tags.every((tag) => item.tags?.includes(tag))
			}) ?? []

	const [currentTestimonial, setCurrentTestimonial] = React.useState(
		testimonials.length ? testimonials.length - 1 : 0,
	)

	const onNext = React.useCallback(() => {
		const nextTestimonialIndex =
			currentTestimonial + 1 >= testimonials.length ? 0 : currentTestimonial + 1

		setCurrentTestimonial(nextTestimonialIndex)
	}, [currentTestimonial, testimonials.length])

	const onPrevious = React.useCallback(() => {
		const previousTestimonialIndex =
			currentTestimonial - 1 < 0
				? testimonials.length - 1
				: currentTestimonial - 1

		setCurrentTestimonial(previousTestimonialIndex)
	}, [currentTestimonial, testimonials.length])

	const testimonial = testimonials[currentTestimonial]
	if (!testimonial) return null

	return (
		<BlockLayout>
			<H2 className="sr-only">Testimonials</H2>
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
					</motion.div>
				</AnimatePresence>
			</div>
		</BlockLayout>
	)
}
