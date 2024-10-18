import { type Template } from '@tinacms/schema-tools'

export const textRevealTemplate: Template = {
	name: 'textReveal',
	label: 'Text Reveal',
	ui: {
		previewSrc: '/blocks/unknown.png',
	},
	fields: [
		{
			type: 'string',
			label: 'Text',
			name: 'label',
		},
	],
}
