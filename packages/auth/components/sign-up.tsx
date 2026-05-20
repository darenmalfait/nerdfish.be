'use client'

import type * as Clerk from '@clerk/nextjs'
import Link from 'next/link'
import { isAuthEnabled } from '../enabled'

const ClerkSignUp = isAuthEnabled()
	? // eslint-disable-next-line @typescript-eslint/no-var-requires -- optional at build time
		(require('@clerk/nextjs') as typeof Clerk).SignUp
	: null

export const SignUp = () => {
	if (!ClerkSignUp) {
		return (
			<p className="text-foreground text-center text-sm">
				Authentication is not configured.{' '}
				<Link href="/app" className="underline">
					Continue to app
				</Link>
			</p>
		)
	}

	return (
		<ClerkSignUp
			appearance={{
				elements: {
					header: 'hidden',
				},
			}}
		/>
	)
}
