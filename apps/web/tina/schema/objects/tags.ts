import type { StringField } from '@tinacms/schema-tools'

export const tagsSchema: StringField = {
	type: 'string',
	list: true,
	name: 'tags',
	label: 'Tags',
}
