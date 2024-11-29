import type { Template } from '@tinacms/schema-tools'
import { testimonialTypes } from '../objects/testimonial'

export const testimonialsTemplate: Template = {
	name: 'testimonials',
	label: 'Testimonials',
	ui: {
		previewSrc: '/blocks/unknown.png',
	},
	fields: [
		{
			type: 'object',
			label: 'Layout',
			name: 'layout',
			fields: [
				{
					type: 'string',
					label: 'Variant',
					name: 'variant',
					options: ['default', 'secondary'],
				},
			],
		},
		{
			type: 'string',
			label: 'Type',
			name: 'type',
			options: testimonialTypes,
			list: true,
		},
		{
			type: 'string',
			label: 'Tags',
			name: 'tags',
			list: true,
		},
	],
}
