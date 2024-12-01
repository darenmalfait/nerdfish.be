import type { ObjectField } from '@tinacms/schema-tools'

export const sectionHeaderSchema: ObjectField = {
	type: 'object',
	name: 'sectionHeader',
	label: 'Section Header',
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
	],
}
