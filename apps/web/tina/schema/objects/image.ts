import { type Template } from '@tinacms/schema-tools'

export const imageSchema: Template = {
	label: 'Image',
	name: 'image',
	fields: [
		{
			name: 'src',
			label: 'Image Source',
			type: 'image',
		},
		{
			name: 'alt',
			label: 'Alt Text',
			type: 'string',
		},
	],
}
