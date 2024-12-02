import { type Template } from '@tinacms/schema-tools'
import * as Icons from 'lucide-react'

const defaultFeature = {
	title: "Here's Another Feature",
	description:
		"This is where you might talk about the feature, if this wasn't just filler text.",
	icon: 'AcademicCapIcon',
}

export const featuresTemplate: Template = {
	name: 'features',
	label: 'Features',
	ui: {
		previewSrc: '/blocks/features.png',
		defaultItem: {
			items: [defaultFeature, defaultFeature, defaultFeature],
		},
	},
	fields: [
		{
			type: 'object',
			label: 'Layout',
			name: 'layout',
			fields: [
				{
					type: 'string',
					label: 'Variant',
					name: 'variant',
					options: ['default', 'secondary'],
				},
				{
					type: 'string',
					name: 'maxCols',
					label: 'Maximum Columns',
					options: ['2', '3', '4'],
				},
			],
		},
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
			label: 'Feature Items',
			name: 'items',
			list: true,
			ui: {
				itemProps: (item) => {
					return {
						label: item.title,
					}
				},
				defaultItem: {
					...defaultFeature,
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
					type: 'string',
					label: 'Icon',
					name: 'icon',
					options: Object.keys(Icons).map((name) => ({
						label: name,
						value: name,
					})),
				},
				{
					type: 'reference',
					label: 'Link to detail page',
					name: 'detail',
					collections: ['page'],
				},
			],
		},
	],
}
