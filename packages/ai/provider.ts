import { createOpenAI } from '@ai-sdk/openai'
import { env } from '@repo/env'

export const provider = createOpenAI({
	baseURL: 'https://api.groq.com/openai/v1',
	apiKey: env.GROQ_API_KEY,
	compatibility: 'strict',
})

// if you want to use the openai api, you can use this:
// export const provider = createOpenAI({
//   apiKey: env.OPENAI_API_KEY,
//   compatibility: 'strict',
// });
