import { type Template } from '@tinacms/schema-tools'
import { imageSchema, portableTextSchema } from '../objects'

export const splitWithImageTemplate: Template = {
	name: 'splitWithImage',
	label: 'Split With Image',
	ui: {
		previewSrc: '/blocks/unknown.png',
		defaultItem: {
			body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.',
		},
	},
	fields: [
		{
			...imageSchema,
			type: 'object',
			label: 'Image',
			name: 'image',
		},
		{
			...portableTextSchema,
			label: 'Body',
			name: 'body',
		},
		{
			type: 'boolean',
			label: 'Reverse',
			name: 'reverse',
		},
	],
}
