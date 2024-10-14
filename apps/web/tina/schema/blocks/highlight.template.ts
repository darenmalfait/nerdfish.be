import { type Template } from 'tinacms'
import { portableTextSchema } from '../objects'

export const highlightTemplate: Template = {
	name: 'highlight',
	label: 'Highlight',
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
