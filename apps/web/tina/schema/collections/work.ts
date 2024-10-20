import { type Collection } from '@tinacms/schema-tools'
import slugify from 'slugify'
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
				const slug = values.title ? slugify(values.title?.toLowerCase()) : ''

				return slug
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
			ui: {
				component: 'textarea',
			},
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
