import slugify from 'slugify'
import { type Collection } from 'tinacms'

import { portableTextSchema, seo } from '../objects'

const workCollection: Collection = {
	label: 'Work',
	name: 'work',
	path: 'content/work',
	format: 'mdx',
	defaultItem: () => {
		return {
			title: '',
			date: new Date().toISOString(),
		}
	},
	ui: {
		router: async ({ document }) => {
			return `/work/${document._sys.relativePath.substring(
				0,
				document._sys.relativePath.lastIndexOf('.'),
			)}`
		},
		filename: {
			readonly: true,
			slugify: (values) => {
				return `${values.category}/${values.title ? slugify(values.title?.toLowerCase()) : ''}`
			},
		},
	},
	fields: [
		seo,
		{
			type: 'string',
			label: 'Title',
			name: 'title',
			isTitle: true,
			required: true,
		},
		{
			type: 'string',
			name: 'category',
			label: 'Category',
			options: ['print', 'webdesign', 'branding'],
			required: true,
		},
		{
			type: 'image',
			name: 'heroImg',
			label: 'Hero Image',
		},
		{
			type: 'string',
			label: 'Excerpt',
			name: 'excerpt',
			component: 'textarea',
		},
		{
			type: 'datetime',
			label: 'Posted Date',
			name: 'date',
			ui: {
				dateFormat: 'MMMM DD YYYY',
				timeFormat: 'hh:mm A',
			},
			required: true,
		},
		{
			...portableTextSchema,
			label: 'Body',
			name: 'body',
			isBody: true,
		},
	],
}

export { workCollection }
