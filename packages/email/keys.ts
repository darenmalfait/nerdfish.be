import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const keys = () =>
	createEnv({
		server: {
			RESEND_API_KEY: z.string().min(1).startsWith('re_'),
			EMAIL_FROM: z.string().min(1),
			SKIP_EMAILS: z.preprocess((val) => {
				if (typeof val === 'string') {
					if (['1', 'true'].includes(val.toLowerCase())) return true
					if (['0', 'false'].includes(val.toLowerCase())) return false
				}
				return false
			}, z.coerce.boolean()),
		},
		runtimeEnv: {
			RESEND_API_KEY: process.env.RESEND_API_KEY,
			SKIP_EMAILS: process.env.SKIP_EMAILS,
			EMAIL_FROM: process.env.EMAIL_FROM,
		},
	})
