import { InViewBackground } from '@repo/design-system/components/in-view-background'
import { Section } from '@repo/design-system/components/section'
import { H1, Skeleton } from '@repo/design-system/components/ui'
import { getLocale } from '@repo/i18n/server'
import { type Testimonial } from 'content-collections'
import * as React from 'react'
import { testimonials as testimonialsApi } from '../../api'
import { Testimonials, type TestimonialsProps } from './testimonials'

export interface TestimonialsBlockProps extends TestimonialsProps {
	filter?: {
		type?: Testimonial['type']
		tags?: Testimonial['tags']
	}
}

async function TestimonialsContent({
	filter,
	testimonials: testimonialsProp = [],
	...testimonialsProps
}: TestimonialsBlockProps) {
	const locale = await getLocale()
	const allTestimonials = await testimonialsApi.getAll({ locale })

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

	return (
		<Testimonials
			{...testimonialsProps}
			testimonials={[...testimonialsProp, ...testimonials]}
		/>
	)
}

export function TestimonialsBlock(props: TestimonialsBlockProps) {
	return (
		<InViewBackground className="bg-blog/20">
			<Section>
				<React.Suspense
					fallback={
						<Testimonials {...props} testimonials={[]}>
							<div className="relative flex w-full flex-col justify-center">
								<H1>
									<Skeleton count={3} />
								</H1>
							</div>
						</Testimonials>
					}
				>
					<TestimonialsContent {...props} />
				</React.Suspense>
			</Section>
		</InViewBackground>
	)
}
