import type { Template } from '@tinacms/schema-tools'

const defaultHighlight = {
	title: "Here's Another Highlight",
	description:
		"This is where you might talk about the highlight, if this wasn't just filler text.",
}

export const imageGridTemplate: Template = {
	name: 'imageGrid',
	label: 'Image Grid',
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
					type: 'image',
					label: 'Image',
					name: 'imageSrc',
				},
			],
		},
	],
}
