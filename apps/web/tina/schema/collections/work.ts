import type { Collection } from '@tinacms/schema-tools'
import slugify from 'slugify'
import { contentTemplate } from '../blocks/content.template'
import { imageGridTemplate } from '../blocks/image-grid.template'
import { testimonialsTemplate } from '../blocks/testimonials.template'
import { portableTextSchema } from '../objects/portable-text'
import { seo } from '../objects/seo'

const workBlocks = [testimonialsTemplate, imageGridTemplate, contentTemplate]

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
			type: 'string',
			name: 'url',
			label: 'URL',
		},
		{
			type: 'string',
			label: 'Client description',
			name: 'excerpt',
			ui: {
				component: 'textarea',
			},
		},
		{
			...portableTextSchema,
			label: 'Short project description',
			name: 'body',
			isBody: true,
		},
		{
			type: 'object',
			list: true,
			name: 'blocks',
			label: 'Page Sections',
			ui: {
				visualSelector: true,
			},
			templates: [...workBlocks],
		},
	],
}

export { workCollection }
