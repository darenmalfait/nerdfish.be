import { type Template } from '@tinacms/schema-tools'
import { tagsSchema } from '../objects/tags'

export const productsTemplate: Template = {
	name: 'products',
	label: 'Products',
	ui: {
		previewSrc: '/blocks/products.png',
	},
	fields: [
		{
			name: 'header',
			label: 'Header',
			type: 'object',
			fields: [
				{
					type: 'string',
					label: 'Title',
					name: 'title',
				},
				{
					type: 'string',
					label: 'subtitle',
					name: 'subtitle',
				},
				{
					type: 'string',
					label: 'Link',
					name: 'link',
					description: 'Optional CTA link',
				},
			],
		},
		tagsSchema,
		{
			type: 'number',
			label: 'Number of visible items, leave empty for all.',
			name: 'count',
		},
	],
}
