import { type Template } from '@tinacms/schema-tools'

const defaultHighlight = {
	title: "Here's Another Highlight",
	description:
		"This is where you might talk about the highlight, if this wasn't just filler text.",
}

export const highlightsTemplate: Template = {
	name: 'highlights',
	label: 'Highlights',
	ui: {
		previewSrc: '/blocks/features.png',
		defaultItem: {
			items: [defaultHighlight, defaultHighlight, defaultHighlight],
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
			label: 'Sub Title',
			name: 'subtitle',
		},
		{
			type: 'object',
			label: 'Highlight Items',
			name: 'items',
			list: true,
			ui: {
				itemProps: (item) => {
					return {
						label: item.title,
					}
				},
				defaultItem: {
					...defaultHighlight,
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
					label: 'Description',
					name: 'description',
					ui: {
						component: 'textarea',
					},
				},
				{
					type: 'image',
					label: 'Image',
					name: 'image',
				},
			],
		},
	],
}
