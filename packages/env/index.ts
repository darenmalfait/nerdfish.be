import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	client: {
		NEXT_PUBLIC_URL: z.string().min(1).url(),
		NEXT_PUBLIC_RECAPTCHA_SITEKEY: z.string().min(1).optional(),
		NEXT_PUBLIC_TINA_CLIENT_ID: z.string().min(1),
		// Optional when developing locally
		NEXT_PUBLIC_TINA_BRANCH: z.string().min(1).optional(),

		// Added by Vercel
		NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF: z.string().optional(),
	},
	server: {
		NODE_ENV: z.enum(['development', 'production', 'test']),
		ANALYZE: z.string().optional(),

		TINA_TOKEN: z.string().min(1),
		RECAPTCHA_SECRETKEY: z.string().min(1).optional(),
		NERDFISH_SMTP: z.string().min(1),
		RESEND_API_KEY: z.string().min(1).startsWith('re_'),
		GROQ_API_KEY: z.string(),
		CHAT_SYSTEM_PROMPT: z.string().optional(),
		SKIP_EMAILS: z.boolean().optional(),

		// Added by Vercel
		VERCEL: z.string().optional(),
		NEXT_RUNTIME: z.enum(['nodejs', 'edge']).optional(),

		// Added by Netlify
		HEAD: z.string().optional(),
	},
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		ANALYZE: process.env.ANALYZE,
		TINA_TOKEN: process.env.TINA_TOKEN,
		RECAPTCHA_SECRETKEY: process.env.RECAPTCHA_SECRETKEY,
		NERDFISH_SMTP: process.env.NERDFISH_SMTP,
		RESEND_API_KEY: process.env.RESEND_API_KEY,
		GROQ_API_KEY: process.env.GROQ_API_KEY,
		CHAT_SYSTEM_PROMPT: process.env.CHAT_SYSTEM_PROMPT,
		SKIP_EMAILS: process.env.SKIP_EMAILS === 'true',
		VERCEL: process.env.VERCEL,
		NEXT_RUNTIME: process.env.NEXT_RUNTIME,
		NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
		NEXT_PUBLIC_RECAPTCHA_SITEKEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY,
		NEXT_PUBLIC_TINA_CLIENT_ID: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
		NEXT_PUBLIC_TINA_BRANCH: process.env.NEXT_PUBLIC_TINA_BRANCH,
		NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF:
			process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF,
		HEAD: process.env.HEAD,
	},
})
