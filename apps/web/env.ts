import { keys as ai } from '@repo/ai/keys'
import { keys as email } from '@repo/email/keys'
import { keys as core } from '@repo/next-config/keys'
import { keys as recaptcha } from '@repo/recaptcha/keys'
import { createEnv } from '@t3-oss/env-nextjs'

export const env = createEnv({
	extends: [ai(), core(), email(), recaptcha()],

	server: {},
	client: {},
	runtimeEnv: {},
})
