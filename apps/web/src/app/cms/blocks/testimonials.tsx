'use client'

import { H1, H2 } from '@nerdfish/ui'
import { InViewBackground } from '@repo/ui/components/in-view-background'
import { Section } from '@repo/ui/components/section'
import { ArrowLeftIcon, ArrowRightIcon } from '@repo/ui/icons'
import { AnimatePresence, motion } from 'motion/react'
import * as React from 'react'
import type {
	Block,
	GlobalTestimonialsItems,
	PageBlocksTestimonials,
} from '~/app/cms/types'
import { useGlobal } from '~/app/global-provider'

const BlockLayout = ({ children }: { children: React.ReactNode }) => {
	if (!children) return null

	return (
		<InViewBackground className="bg-blog/20">
			<Section>{children}</Section>
		</InViewBackground>
	)
}

function Author({ author }: { author: GlobalTestimonialsItems['author'] }) {
	if (!author?.name) return null

	return (
		<div className="flex flex-col justify-center gap-xs">
			<span className="flex items-center font-medium before:mr-2 before:inline-block before:h-2 before:w-2 before:rounded-full before:bg-inverted before:content-['']">
				{author.name}
			</span>
			<span className="text-muted text-sm">{author.company}</span>
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
		<div className="group flex gap-md rounded-container p-md transition duration-300 hover:scale-110 md:hover:bg-primary">
			<button
				aria-label="Previous testimonial"
				onClick={onPrevious}
				className="active:-translate-x-xs hover:!opacity-100 rounded-container outline-none transition duration-300 focus-visible:outline-active group-hover:opacity-25"
			>
				<ArrowLeftIcon className="size-8" />
			</button>
			<button
				aria-label="Next testimonial"
				onClick={onNext}
				className="hover:!opacity-100 rounded-container outline-none transition duration-300 focus-visible:outline-active active:translate-x-xs group-hover:opacity-25"
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

function Testimonial({
	testimonial,
	onNext,
	onPrevious,
}: {
	testimonial: GlobalTestimonialsItems
	onNext?: () => void
	onPrevious?: () => void
}) {
	return (
		<div className="relative flex flex-col justify-center gap-xl">
			<H1
				as="blockquote"
				className='font-normal text-primary before:content-["""] after:content-["""]'
			>
				{testimonial.quote}
			</H1>

			<div className="flex flex-col justify-between gap-xl md:flex-row md:items-center">
				<Author author={testimonial.author} />
				<div className="flex w-auto items-center justify-end">
					<TestimonialActions onNext={onNext} onPrevious={onPrevious} />
				</div>
			</div>
		</div>
	)
}

export function TestimonialsBlock(data: Block<PageBlocksTestimonials>) {
	const { type, tags } = data

	const { testimonials: allTestimonials } = useGlobal()

	const testimonials =
		allTestimonials?.items
			// filter by type
			?.filter((item) => {
				if (!type) return true
				return item?.type && type.includes(item.type)
			})
			// filter by tags
			.filter((item) => {
				if (!tags) return true
				return item?.tags && tags.every((tag) => item.tags?.includes(tag))
			}) ?? []

	const [currentTestimonial, setCurrentTestimonial] = React.useState(
		testimonials.length ? testimonials.length - 1 : 0
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
						className="flex min-h-[80vh] w-full flex-col items-center justify-center"
						variants={variants}
						transition={{
							type: 'spring',
							stiffness: 200,
							damping: 20,
							duration: 0.5,
						}}
					>
						<Testimonial
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
