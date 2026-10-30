import { Suspense } from 'react'
import { Skeleton } from '@nerdfish/react/skeleton'
import { getLocale } from '@repo/i18n/server'
import { type Testimonial } from 'content-collections'

import { getTestimonials } from '../../api/get-testimonials'

import {
	TestimonialsContent,
	type TestimonialsContentProps,
} from './testimonials-content'

export interface TestimonialsProps extends Omit<
	TestimonialsContentProps,
	'testimonials'
> {
	filter?: {
		type?: Testimonial['type'][]
		tags?: Testimonial['tags']
	}
}

async function TestimonialsData({
	filter,
	...testimonialsProps
}: TestimonialsProps) {
	const locale = await getLocale()
	const allTestimonials = await getTestimonials({ locale })

	const testimonials = allTestimonials
		// filter by type
		.filter((item) => {
			if (!filter?.type) return true
			return filter.type.includes(item.type)
		})
		// filter by tags
		.filter((item) => {
			if (!filter?.tags) return true
			return item.tags && filter.tags.every((tag) => item.tags?.includes(tag))
		})
		// only fields the client carousel needs (drop MDX content / meta)
		.map(({ quote, author }) => ({ quote, author }))

	return (
		<TestimonialsContent {...testimonialsProps} testimonials={testimonials} />
	)
}

export function Testimonials(props: TestimonialsProps) {
	return (
		<Suspense
			fallback={
				<TestimonialsContent {...props} testimonials={[]}>
					<div className="relative flex w-full flex-col justify-center">
						<h1 className="typography-heading">
							<Skeleton count={3} />
						</h1>
					</div>
				</TestimonialsContent>
			}
		>
			<TestimonialsData {...props} />
		</Suspense>
	)
}
