import { createOpenAI } from '@ai-sdk/openai'
import { env } from '@nerdfish-website/env'
import { convertToCoreMessages, type Message, streamText } from 'ai'

const groq = createOpenAI({
	baseURL: 'https://api.groq.com/openai/v1',
	apiKey: env.GROQ_API_KEY,
})

export const runtime = 'edge'

export async function POST(req: Request) {
	const { messages }: { messages: Message[] } = await req.json()

	const coreMessages = convertToCoreMessages(messages)

	try {
		const result = await streamText({
			model: groq('llama3-8b-8192'),
			system: env.CHAT_SYSTEM_PROMPT ?? '',
			messages: coreMessages,
		})

		return result.toDataStreamResponse()
	} catch (error) {
		console.error('error', error)
		return new Response('Internal server error', { status: 500 })
	}
}
