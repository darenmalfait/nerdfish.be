import { type Template } from '@tinacms/schema-tools'
import * as Icons from 'lucide-react'

export const chatbotTemplate: Template = {
	name: 'chatbot',
	label: 'Chatbot',
	ui: {
		previewSrc: '/blocks/unknown.png',
	},
	fields: [
		{
			type: 'string',
			label: 'Icon',
			name: 'icon',
			options: Object.keys(Icons).map((name) => ({
				label: name,
				value: name,
			})),
		},
	],
}
