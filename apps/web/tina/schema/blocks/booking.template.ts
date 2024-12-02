import { type Template } from '@tinacms/schema-tools'
import { portableTextSchema } from '../objects/portable-text'

export const bookingTemplate: Template = {
	name: 'booking',
	label: 'Booking',
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
		{ ...portableTextSchema, name: 'content' },
	],
}
