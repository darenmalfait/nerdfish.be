import { type ObjectField } from '@tinacms/schema-tools'

export const seo: ObjectField = {
	name: 'seo',
	label: 'SEO',
	type: 'object',
	ui: {
		defaultItem: {
			cardtype: 'primary',
		},
	},
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
			ui: {
				component: 'textarea',
			},
		},
		{
			type: 'string',
			label: 'Canonical',
			name: 'canonical',
		},
		{
			type: 'image',
			name: 'seoImg',
			label: 'Seo Image',
		},
	],
}
