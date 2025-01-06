import { keys as ai } from '@repo/ai/keys'
import { keys as email } from '@repo/email/keys'
import { keys as core } from '@repo/next-config/keys'
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	extends: [ai(), core(), email()],
	// specific to web
	server: {
		RECAPTCHA_SECRETKEY: z.string().min(1).optional(),
		TINA_TOKEN: z.string().min(1),
	},
	client: {
		NEXT_PUBLIC_RECAPTCHA_SITEKEY: z.string().min(1).optional(),
		NEXT_PUBLIC_TINA_BRANCH: z.string().min(1).optional(), // Optional when developing locally
		NEXT_PUBLIC_TINA_CLIENT_ID: z.string().min(1),
	},
	runtimeEnv: {
		RECAPTCHA_SECRETKEY: process.env.RECAPTCHA_SECRETKEY,
		TINA_TOKEN: process.env.TINA_TOKEN,
		NEXT_PUBLIC_RECAPTCHA_SITEKEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY,
		NEXT_PUBLIC_TINA_BRANCH: process.env.NEXT_PUBLIC_TINA_BRANCH,
		NEXT_PUBLIC_TINA_CLIENT_ID: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
	},
})
