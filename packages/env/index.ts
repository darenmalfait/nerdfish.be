import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	client: {
		// Base
		NEXT_PUBLIC_URL: z.string().min(1).url(),
		NEXT_PUBLIC_RECAPTCHA_SITEKEY: z.string().min(1).optional(),

		// App specific
		NEXT_PUBLIC_TINA_BRANCH: z.string().min(1).optional(), // Optional when developing locally
		NEXT_PUBLIC_TINA_CLIENT_ID: z.string().min(1),

		// Added by Vercel
		NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF: z.string().optional(),
	},
	server: {
		NODE_ENV: z.enum(['development', 'production', 'test']),
		ANALYZE: z.string().optional(),

		// Base
		RECAPTCHA_SECRETKEY: z.string().min(1).optional(),
		ARCJET_KEY: z.string().min(1).optional(),
		RESEND_API_KEY: z.string().min(1).startsWith('re_'),
		SKIP_EMAILS: z.boolean().optional(),
		EMAIL_FROM: z.string().min(1),

		// App specific
		TINA_TOKEN: z.string().min(1),
		GROQ_API_KEY: z.string(),
		CHAT_SYSTEM_PROMPT: z.string().optional(),

		// Added by Vercel
		VERCEL: z.string().optional(),
		NEXT_RUNTIME: z.enum(['nodejs', 'edge']).optional(),

		// Added by Netlify
		HEAD: z.string().optional(),
	},
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		ANALYZE: process.env.ANALYZE,

		// Base
		NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
		NEXT_PUBLIC_RECAPTCHA_SITEKEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY,
		RECAPTCHA_SECRETKEY: process.env.RECAPTCHA_SECRETKEY,
		ARCJET_KEY: process.env.ARCJET_KEY,
		EMAIL_FROM: process.env.EMAIL_FROM,
		RESEND_API_KEY: process.env.RESEND_API_KEY,
		SKIP_EMAILS: process.env.SKIP_EMAILS === 'true',

		// App specific
		TINA_TOKEN: process.env.TINA_TOKEN,
		NEXT_PUBLIC_TINA_CLIENT_ID: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
		NEXT_PUBLIC_TINA_BRANCH: process.env.NEXT_PUBLIC_TINA_BRANCH,
		GROQ_API_KEY: process.env.GROQ_API_KEY,
		CHAT_SYSTEM_PROMPT: process.env.CHAT_SYSTEM_PROMPT,

		// OTHERS
		NEXT_RUNTIME: process.env.NEXT_RUNTIME,
		NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF:
			process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF,
		VERCEL: process.env.VERCEL,
		HEAD: process.env.HEAD,
	},
})
