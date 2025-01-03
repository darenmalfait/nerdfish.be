import { type Template } from '@tinacms/schema-tools'

export const keywordListTemplate: Template = {
	name: 'KeywordList',
	label: 'Keywords',
	ui: {
		previewSrc: '/blocks/keyword-list.png',
		defaultItem: {
			items: ['feature', 'feature', 'feature'],
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
			label: 'Keywords',
			name: 'keywords',
			list: true,
		},
	],
}
