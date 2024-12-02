import { type ObjectField } from '@tinacms/schema-tools'

export const price: ObjectField = {
	name: 'price',
	label: 'Price',
	type: 'object',
	fields: [
		{
			type: 'string',
			label: 'Title',
			name: 'title',
		},
		{
			type: 'string',
			label: 'Description',
			name: 'description',
		},
		{
			type: 'string',
			label: 'Price',
			name: 'price',
		},
		{
			type: 'boolean',
			label: 'Is featured',
			name: 'featured',
		},
		{
			type: 'string',
			label: 'Features',
			name: 'features',
			list: true,
		},
		{
			type: 'string',
			label: 'Link',
			name: 'link',
		},
		{
			type: 'string',
			label: 'Button Text',
			name: 'buttonText',
		},
	],
}
