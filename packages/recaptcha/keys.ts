import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const keys = () =>
	createEnv({
		client: {
			NEXT_PUBLIC_RECAPTCHA_SITEKEY: z.string().min(1).optional(),
		},
		server: {
			RECAPTCHA_SECRETKEY: z.string().min(1).optional(),
		},
		runtimeEnv: {
			RECAPTCHA_SECRETKEY: process.env.RECAPTCHA_SECRETKEY,
			NEXT_PUBLIC_RECAPTCHA_SITEKEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY,
		},
	})
