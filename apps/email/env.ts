import { keys as email } from '@repo/email/keys'
import { keys as core } from '@repo/next-config/keys'
import { createEnv } from '@t3-oss/env-nextjs'

export const env = createEnv({
	extends: [core(), email()],
	server: {},
	client: {},
	runtimeEnv: {},
})
