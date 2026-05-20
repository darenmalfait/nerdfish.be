import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

const optionalClerkKey = (prefix: 'sk_' | 'pk_') =>
	z.preprocess(
		(value) => (value === '' ? undefined : value),
		z.string().startsWith(prefix).optional(),
	)

export const keys = () =>
	createEnv({
		server: {
			CLERK_SECRET_KEY: optionalClerkKey('sk_'),
		},
		client: {
			NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: optionalClerkKey('pk_'),
			NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.url().optional(),
			NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.url().optional(),
		},
		runtimeEnv: {
			CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
			NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
				process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
			NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
			NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL:
				process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
		},
	})
