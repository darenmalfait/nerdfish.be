import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const keys = () =>
	createEnv({
		server: {
			GROQ_API_KEY: z.string(),
			CHAT_SYSTEM_PROMPT: z.string().optional(),
		},
		runtimeEnv: {
			GROQ_API_KEY: process.env.GROQ_API_KEY,
			CHAT_SYSTEM_PROMPT: process.env.CHAT_SYSTEM_PROMPT,
		},
	})
