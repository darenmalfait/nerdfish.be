import { type Template } from 'tinacms'

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
			type: 'object',
			label: 'Action',
			name: 'action',
			fields: [
				{
					name: 'label',
					label: 'Label',
					type: 'string',
				},
				{
					name: 'href',
					label: 'Href',
					type: 'string',
				},
			],
		},
		{
			type: 'string',
			label: 'Title',
			name: 'title',
		},
		portableTextSchema,
		imageSchema,
	],
}
