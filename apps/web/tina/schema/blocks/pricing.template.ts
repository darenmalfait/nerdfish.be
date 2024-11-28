import type { Template } from '@tinacms/schema-tools'
import { price } from '../objects'

export const pricingTemplate: Template = {
	name: 'pricing',
	label: 'Pricing',
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
			...price,
			list: true,
			ui: {
				label: 'Pricing',
			},
		},
	],
}
