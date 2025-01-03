import { type Collection } from '@tinacms/schema-tools'

const globalCollection: Collection = {
	label: 'Global',
	name: 'global',
	path: 'content/global',
	format: 'json',
	ui: {
		global: true,
	},
	fields: [
		{
			type: 'object',
			label: 'Navigation',
			name: 'navigation',
			fields: [
				{
					type: 'object',
					label: 'Main navigation',
					name: 'main',
					list: true,
					ui: {
						itemProps: (item) => {
							return { label: item.label }
						},
						defaultItem: {
							href: 'home',
							label: 'Home',
						},
					},
					fields: [
						{
							type: 'string',
							label: 'Label',
							name: 'label',
							required: true,
						},
						{
							type: 'string',
							label: 'Variant',
							name: 'variant',
							description: 'The variant of the navigation item',
							options: ['ghost', 'accentuate'],
						},
						{
							type: 'string',
							label: 'Link',
							name: 'href',
							description:
								'If there are sub navigation items, this link will be ignored.',
						},
						{
							type: 'object',
							label: 'Sub navigation',
							name: 'sub',
							list: true,
							ui: {
								itemProps: (item) => {
									return { label: item.label }
								},
								defaultItem: {
									href: 'sub',
									label: 'Sub',
								},
							},
							fields: [
								{
									type: 'string',
									label: 'Label',
									name: 'label',
									required: true,
								},
								{
									type: 'string',
									label: 'Description',
									name: 'description',
								},
								{
									type: 'string',
									label: 'Link',
									name: 'href',
									required: true,
								},
							],
						},
					],
				},
				{
					type: 'object',
					label: 'Actions',
					name: 'actions',
					list: true,
					ui: {
						itemProps: (item) => {
							return { label: item.label }
						},
						defaultItem: {
							href: 'action',
							label: 'action',
						},
					},
					fields: [
						{
							type: 'string',
							label: 'Link',
							name: 'href',
							required: true,
						},
						{
							type: 'string',
							label: 'Label',
							name: 'label',
							required: true,
						},
					],
				},
			],
		},
		{
			type: 'object',
			label: 'Cal.com',
			name: 'calcom',
			fields: [
				{
					type: 'string',
					label: 'Profile Name',
					name: 'profileName',
				},
				{
					type: 'object',
					name: 'types',
					list: true,
					fields: [
						{
							type: 'string',
							label: 'Slug',
							name: 'slug',
						},
						{
							type: 'string',
							label: 'Title',
							name: 'title',
						},
						{
							type: 'number',
							label: 'Duration',
							name: 'duration',
						},
					],
				},
			],
		},
	],
}

export { globalCollection }
