import type { Template } from '@tinacms/schema-tools'
import { imageSchema, portableTextSchema } from '../objects'

export const heroTemplate: Template = {
	name: 'hero',
	label: 'Hero',
	ui: {
		previewSrc: '/blocks/hero.png',
		defaultItem: {
			title: 'Here is a title',
			text: 'Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.',
		},
	},
	fields: [
		{
			type: 'string',
			label: 'Variant',
			name: 'variant',
			options: ['default', 'secondary'],
		},
		{
			type: 'string',
			label: 'Title',
			name: 'title',
		},
		portableTextSchema,
		{ ...imageSchema, type: 'object' },
	],
}
