import type { Template } from '@tinacms/schema-tools'
import { imageSchema } from '../objects'

export const highlightTemplate: Template = {
	name: 'highlight',
	label: 'Highlight',
	ui: {
		previewSrc: '/blocks/unknown.png',
	},
	fields: [
		{
			type: 'string',
			label: 'Category',
			name: 'category',
		},
		{
			type: 'string',
			label: 'Title',
			name: 'title',
		},
		{
			type: 'string',
			label: 'Description',
			name: 'excerpt',
		},

		{ ...imageSchema, type: 'object' },
		{
			type: 'string',
			label: 'Link Text',
			name: 'linkText',
		},
		{
			type: 'reference',
			label: 'Link to page',
			name: 'reference',
			collections: ['page'],
		},
	],
}
