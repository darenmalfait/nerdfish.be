import { createOpenAI } from '@ai-sdk/openai'
import { type CoreMessage, streamText, tool } from 'ai'
import { z } from 'zod'

const groq = createOpenAI({
	baseURL: 'https://api.groq.com/openai/v1',
	apiKey: process.env.GROQ_API_KEY ?? '',
})

const systemPrompt = process.env.CHAT_SYSTEM_PROMPT ?? ''

export const runtime = 'edge'

export async function POST(req: Request) {
	const { messages }: { messages: CoreMessage[] } = await req.json()

	const result = await streamText({
		model: groq('llama3-8b-8192'),
		tools: {
			booking: tool({
				parameters: z.object({
					bookingType: z
						.enum(['30min', '1hour'])
						.describe('The length of the meeting'),
				}),
				description: 'Book a video call meeting with the user',
			}),
		},
		messages: [
			// Set an optional system message. This sets the behavior of the
			// assistant and can be used to provide specific instructions for
			// how it should behave throughout the conversation.
			{
				role: 'system',
				content: systemPrompt,
			},
			// Add a user message, this is the message the user sent
			...messages,
		],
	})

	return result.toDataStreamResponse()
}
