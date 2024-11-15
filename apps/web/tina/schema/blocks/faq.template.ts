import { type ObjectField, type Template } from '@tinacms/schema-tools'

const qa: ObjectField = {
	name: 'qa',
	label: 'Question and Answer',
	type: 'object',
	fields: [
		{
			type: 'string',
			label: 'Question',
			name: 'question',
		},
		{
			type: 'string',
			label: 'Answer',
			name: 'answer',
		},
	],
}

export const faqTemplate: Template = {
	name: 'faq',
	label: 'FAQ',
	ui: {
		previewSrc: '/blocks/unknown.png',
	},
	fields: [
		{
			type: 'string',
			label: 'Title',
			name: 'title',
		},
		{
			type: 'string',
			label: 'Sub Title',
			name: 'subtitle',
		},
		{
			...qa,
			ui: {
				itemProps: (item) => ({
					label: item.data?.question ?? 'Add a question',
				}),
			},
			list: true,
		},
	],
}
