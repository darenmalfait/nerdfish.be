import { type Template } from '@tinacms/schema-tools'
import { imageSchema } from '../objects/image'
import { tagsSchema } from '../objects/tags'

export const workTemplate: Template = {
	name: 'Work',
	label: 'Work',
	ui: {
		previewSrc: '/blocks/blog.png',
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
				imageSchema,
			],
		},
		{
			type: 'boolean',
			label: 'Is search enabled?',
			name: 'searchEnabled',
		},
		{
			type: 'boolean',
			label: 'Is featured enabled?',
			name: 'featuredEnabled',
		},
		tagsSchema,
		{
			type: 'number',
			label: 'Number of visible items, leave empty for all.',
			name: 'count',
		},
	],
}
