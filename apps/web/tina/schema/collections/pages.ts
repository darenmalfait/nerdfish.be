import { type Collection } from '@tinacms/schema-tools'
import slugify from 'slugify'
import { blocks } from '../blocks'
import { seo } from '../objects/seo'

const pagesCollection: Collection = {
	label: 'Pages',
	name: 'page',
	path: 'content/pages',
	format: 'mdx',
	ui: {
		router: async ({ document }) => {
			if (document._sys.filename === 'home') {
				return '/'
			}

			return `/${document._sys.filename}`
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
			type: 'object',
			list: true,
			name: 'blocks',
			label: 'Page Sections',
			ui: {
				visualSelector: true,
			},
			templates: [...blocks],
		},
	],
}

export { pagesCollection }
