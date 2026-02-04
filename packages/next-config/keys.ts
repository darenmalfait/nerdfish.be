import { vercel } from '@t3-oss/env-core/presets-zod'
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const keys = () =>
	createEnv({
		extends: [vercel()],
		server: {
			ANALYZE: z.string().optional(),
			NODE_ENV: z.enum(['development', 'production', 'test']).optional(),

			// Added by Vercel
			NEXT_RUNTIME: z.enum(['nodejs', 'edge']).optional(),
		},
		client: {
			NEXT_PUBLIC_URL: z.url(),
		},
		runtimeEnv: {
			ANALYZE: process.env.ANALYZE,
			NODE_ENV: process.env.NODE_ENV,
			NEXT_RUNTIME: process.env.NEXT_RUNTIME,
			NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
		},
	})
