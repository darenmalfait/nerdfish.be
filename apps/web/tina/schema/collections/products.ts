import type { Collection } from '@tinacms/schema-tools'
import slugify from 'slugify'
import { tagsSchema } from '../objects/tags'

const productsCollection: Collection = {
	label: 'Products',
	name: 'product',
	path: 'content/products',
	format: 'mdx',
	ui: {
		router: async ({ document }) => {
			return `/products/${document._sys.filename}`
		},
		filename: {
			readonly: true,
			slugify: (values) => {
				return slugify(values.title?.toLowerCase() ?? '')
			},
		},
	},
	fields: [
		{
			type: 'string',
			label: 'Title',
			name: 'title',
			isTitle: true,
			required: true,
		},
		{
			type: 'string',
			label: 'Description',
			name: 'description',
			required: true,
		},
		{
			type: 'string',
			label: 'Link',
			name: 'link',
		},
		{
			type: 'string',
			label: 'Source',
			name: 'sourceUrl',
		},
		{
			type: 'boolean',
			label: 'Soon',
			name: 'soon',
		},
		{
			type: 'image',
			label: 'Image',
			name: 'image',
			required: true,
		},
		tagsSchema,
	],
}

export { productsCollection }
