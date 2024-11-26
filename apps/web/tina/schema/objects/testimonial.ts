import { type ObjectField } from '@tinacms/schema-tools'

export const testimonialTypes = ['project', 'client', 'colleague']

export const testimonial: ObjectField = {
	name: 'testimonial',
	label: 'Testimonial',
	type: 'object',
	fields: [
		{
			type: 'string',
			label: 'Select Type',
			name: 'type',
			options: testimonialTypes,
		},
		{
			type: 'string',
			label: 'Tags',
			name: 'tags',
			list: true,
		},
		{
			type: 'string',
			label: 'Quote',
			name: 'quote',
		},
		{
			type: 'object',
			label: 'Author',
			name: 'author',
			fields: [
				{
					type: 'string',
					label: 'Name',
					name: 'name',
				},
				{
					type: 'string',
					label: 'Company',
					name: 'company',
				},
			],
		},
	],
}
