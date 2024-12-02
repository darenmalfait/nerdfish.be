import { type Template } from '@tinacms/schema-tools'
import { imageSchema } from '../objects/image'
import { sectionHeaderSchema } from '../objects/section-header'

export const highlightsTemplate: Template = {
	name: 'highlights',
	label: 'Highlights',
	ui: {
		previewSrc: '/blocks/unknown.png',
	},
	fields: [
		sectionHeaderSchema,
		{
			type: 'object',
			name: 'items',
			list: true,
			label: 'Highlights',
			ui: {
				itemProps: (item) => {
					return { label: item.title }
				},
			},
			fields: [
				imageSchema,

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
		},
	],
}
