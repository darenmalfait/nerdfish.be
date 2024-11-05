import { type Template } from '@tinacms/schema-tools'
import { portableTextSchema } from '../objects'

export const sayHelloTemplate: Template = {
	name: 'sayHello',
	label: 'Say Hello',
	ui: {
		previewSrc: '/blocks/unknown.png',
	},
	fields: [
		{
			...portableTextSchema,
			name: 'text',
		},
	],
}
