import { createOpenAI } from '@ai-sdk/openai'
import { convertToCoreMessages, type Message, streamText, tool } from 'ai'
import { z } from 'zod'

const groq = createOpenAI({
	baseURL: 'https://api.groq.com/openai/v1',
	apiKey: process.env.GROQ_API_KEY ?? '',
})

export const runtime = 'edge'

export async function POST(req: Request) {
	const { messages }: { messages: Message[] } = await req.json()

	const coreMessages = convertToCoreMessages(messages)

	try {
		const result = await streamText({
			model: groq('llama3-8b-8192'),
			system: process.env.CHAT_SYSTEM_PROMPT ?? '',
			messages: coreMessages,
			experimental_activeTools: ['booking'],
			tools: {
				booking: tool({
					parameters: z.object({
						title: z.string(),
					}),
					description: 'Book a video call meeting with the user',
					execute: async () => {
						return {
							content: 'Here you go!',
						}
					},
				}),
			},
			toolChoice: 'auto',
		})

		return result.toDataStreamResponse()
	} catch (error) {
		console.error('error', error)
		return new Response('Internal server error', { status: 500 })
	}
}
