import { type Template } from '@tinacms/schema-tools'

export const ctaTemplate: Template = {
	name: 'cta',
	label: 'CTA',
	ui: {
		previewSrc: '/blocks/unknown.png',
	},
	fields: [
		{
			type: 'string',
			label: 'Title',
			name: 'title',
		},
		{
			type: 'string',
			label: 'Sub Title',
			name: 'subtitle',
		},
		{
			type: 'reference',
			label: 'Link to page',
			name: 'page',
			collections: ['page'],
		},
	],
}
