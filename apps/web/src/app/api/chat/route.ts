import { type Message, convertToCoreMessages, streamText } from '@repo/ai'
import { provider } from '@repo/ai/provider'
import { env } from 'env'

export const runtime = 'edge'

export async function POST(req: Request) {
	const { messages }: { messages: Message[] } = await req.json()

	const coreMessages = convertToCoreMessages(messages)

	try {
		const result = streamText({
			model: provider('llama3-8b-8192'),
			system: env.CHAT_SYSTEM_PROMPT ?? '',
			messages: coreMessages,
		})

		return result.toDataStreamResponse()
	} catch (error) {
		console.error('error', error)
		return new Response('Internal server error', { status: 500 })
	}
}
