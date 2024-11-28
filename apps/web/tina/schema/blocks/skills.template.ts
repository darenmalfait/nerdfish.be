import type { Option, Template } from '@tinacms/schema-tools'

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
