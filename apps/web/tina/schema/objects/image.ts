import type { ObjectField } from '@tinacms/schema-tools'

export const imageSchema: ObjectField = {
	label: 'Image',
	type: 'object',
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
