import { type Template } from '@tinacms/schema-tools'
import { testimonialTypes } from '../objects'

export const testimonialsTemplate: Template = {
	name: 'testimonials',
	label: 'Testimonials',
	ui: {
		previewSrc: '/blocks/unknown.png',
	},
	fields: [
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
