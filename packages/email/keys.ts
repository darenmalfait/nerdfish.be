import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const keys = () =>
	createEnv({
		server: {
			RESEND_API_KEY: z.string().min(1).startsWith('re_'),
			EMAIL_FROM: z.string().min(1),
			SKIP_EMAILS: z.boolean().optional(),
		},
		runtimeEnv: {
			RESEND_API_KEY: process.env.RESEND_API_KEY,
			SKIP_EMAILS: process.env.SKIP_EMAILS,
			EMAIL_FROM: process.env.EMAIL_FROM,
		},
	})
