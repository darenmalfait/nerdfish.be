import { keys as ai } from '@repo/ai/keys'
import { keys as email } from '@repo/email/keys'
import { keys as core } from '@repo/next-config/keys'
import { keys as recaptcha } from '@repo/recaptcha/keys'
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	extends: [ai(), core(), email(), recaptcha()],
	// specific to web
	server: {
		TINA_TOKEN: z.string().min(1),
	},
	client: {
		NEXT_PUBLIC_TINA_BRANCH: z.string().min(1).optional(), // Optional when developing locally
		NEXT_PUBLIC_TINA_CLIENT_ID: z.string().min(1),
	},
	runtimeEnv: {
		TINA_TOKEN: process.env.TINA_TOKEN,
		NEXT_PUBLIC_TINA_BRANCH: process.env.NEXT_PUBLIC_TINA_BRANCH,
		NEXT_PUBLIC_TINA_CLIENT_ID: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
	},
})
