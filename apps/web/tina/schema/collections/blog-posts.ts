import type { Collection } from '@tinacms/schema-tools'
import slugify from 'slugify'
import { portableTextSchema, seo, tagsSchema } from '../objects'

const blogPostsCollection: Collection = {
	label: 'Blog Posts',
	name: 'blog',
	path: 'content/blogs',
	format: 'mdx',
	defaultItem: () => {
		return {
			title: '',
			date: new Date().toISOString(),
		}
	},
	ui: {
		router: async ({ document }) => {
			return `/blog/${document._sys.relativePath.substring(
				0,
				document._sys.relativePath.lastIndexOf('.')
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
		tagsSchema,
		{
			type: 'string',
			name: 'category',
			label: 'Category',
			options: ['technical', 'coaching', 'blog', 'project'],
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

export { blogPostsCollection }
