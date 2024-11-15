import { type Template } from '@tinacms/schema-tools'
import { portableTextSchema } from '../objects'

export const neonTemplate: Template = {
	name: 'neon',
	label: 'Neon',
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
		{ ...portableTextSchema, name: 'content' },
	],
}
