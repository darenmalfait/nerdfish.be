import { type TinaField } from 'tinacms'

export const tagsSchema: TinaField = {
	type: 'string',
	list: true,
	name: 'tags',
	label: 'Tags',
}
