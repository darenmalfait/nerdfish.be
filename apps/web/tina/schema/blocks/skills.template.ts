import { type Option, type Template } from '@tinacms/schema-tools'

export const skills = [
	'javascript',
	'typescript',
	'node',
	'react',
	'sass',
	'vscode',
	'css',
	'html',
	'git',
	'figma',
	'next',
	'tailwind',
	'sanity',
	'webflow',
] as const

export const skillsTemplate: Template = {
	name: 'Skills',
	label: 'Skills',
	ui: {
		previewSrc: '/blocks/keyword-list.png',
		defaultItem: {
			items: [],
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
					name: 'maxCols',
					label: 'Maximum Columns',
					options: ['3', '4', '5'],
				},
			],
		},
		{
			type: 'string',
			label: 'Title',
			name: 'title',
		},
		{
			type: 'rich-text',
			label: 'Description',
			name: 'description',
		},
		{
			type: 'string',
			label: 'Skills',
			name: 'skills',
			options: skills as unknown as Option[],
			list: true,
		},
	],
}
