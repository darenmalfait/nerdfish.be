import { type Template } from '@tinacms/schema-tools'

export const contactTemplate: Template = {
	name: 'contact',
	label: 'Contact',
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
			type: 'string',
			label: 'Open form label',
			name: 'openFormLabel',
		},
		{
			type: 'string',
			label: 'Form Title',
			name: 'formTitle',
		},
		{
			type: 'string',
			label: 'Form Subtitle',
			name: 'formSubtitle',
		},
	],
}
