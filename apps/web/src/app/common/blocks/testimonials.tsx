'use client'

import { H2 } from '@nerdfish/ui'
import { InViewBackground, Section } from '@nerdfish-website/ui/components'
import { ArrowLeftIcon, ArrowRightIcon } from '@nerdfish-website/ui/icons'
import { AnimatePresence, motion } from 'motion/react'
import * as React from 'react'
import {
	type PageBlocksTestimonials,
	type Block,
	type GlobalTestimonialsItems,
} from '~/app/cms'
import { useGlobal } from '~/app/global-provider'

const BlockLayout = ({ children }: { children: React.ReactNode }) => {
	if (!children) return null

	return (
		<InViewBackground className="bg-info">
			<Section>{children}</Section>
		</InViewBackground>
	)
}

function Author({ author }: { author: GlobalTestimonialsItems['author'] }) {
	if (!author?.name) return null

	return (
		<div className="gap-xs flex flex-col justify-center">
			<span className="before:bg-inverted flex items-center font-medium before:mr-2 before:inline-block before:h-2 before:w-2 before:rounded-full before:content-['']">
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
	onNext: () => void
	onPrevious: () => void
}) {
	return (
		<div className="gap-md rounded-semi md:hover:bg-primary p-md group flex transition duration-300">
			<button
				aria-label="Previous testimonial"
				onClick={onPrevious}
				className="focus-visible:outline-active rounded-semi outline-none transition duration-300 hover:!opacity-100 active:-translate-x-1 group-hover:opacity-25"
			>
				<ArrowLeftIcon className="size-8" />
			</button>
			<button
				aria-label="Next testimonial"
				onClick={onNext}
				className="focus-visible:outline-active rounded-semi outline-none transition duration-300 hover:!opacity-100 active:translate-x-1 group-hover:opacity-25"
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
	onNext: () => void
	onPrevious: () => void
}) {
	return (
		<div className="gap-xl relative flex flex-col justify-center">
			<blockquote className="text-3xl leading-tight before:content-['“'] after:content-['”'] md:text-5xl lg:text-7xl">
				{testimonial.quote}
			</blockquote>

			<div className="gap-xl flex flex-col justify-between md:flex-row md:items-center">
				<Author author={testimonial.author} />
				<div className="flex w-auto items-center justify-end">
					<TestimonialActions onNext={onNext} onPrevious={onPrevious} />
				</div>
			</div>
		</div>
	)
}

export function TestimonialsBlock(data: Block<PageBlocksTestimonials>) {
	const { testimonials } = useGlobal()
	const [currentTestimonial, setCurrentTestimonial] = React.useState(
		testimonials?.items?.length ? testimonials.items.length - 1 : 0,
	)

	const { type } = data

	const testimonial = testimonials?.items?.filter((item) => {
		if (!type) return true
		return item?.type && type.includes(item.type)
	})[currentTestimonial]

	const onNext = React.useCallback(() => {
		const nextTestimonialIndex =
			currentTestimonial + 1 >= (testimonials?.items?.length ?? 0)
				? 0
				: currentTestimonial + 1

		setCurrentTestimonial(nextTestimonialIndex)
	}, [testimonials?.items?.length, currentTestimonial])

	const onPrevious = React.useCallback(() => {
		const previousTestimonialIndex =
			currentTestimonial - 1 < 0
				? (testimonials?.items?.length ?? 0) - 1
				: currentTestimonial - 1

		setCurrentTestimonial(previousTestimonialIndex)
	}, [testimonials?.items?.length, currentTestimonial])

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
							onNext={onNext}
							onPrevious={onPrevious}
						/>
					</motion.div>
				</AnimatePresence>
			</div>
		</BlockLayout>
	)
}
