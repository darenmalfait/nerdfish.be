'use client'

import type * as Clerk from '@clerk/nextjs'
import Link from 'next/link'
import { isAuthEnabled } from '../enabled'

const ClerkSignIn = isAuthEnabled()
	? // eslint-disable-next-line @typescript-eslint/no-var-requires -- optional at build time
		(require('@clerk/nextjs') as typeof Clerk).SignIn
	: null

export const SignIn = () => {
	if (!ClerkSignIn) {
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
		<ClerkSignIn
			appearance={{
				elements: {
					header: 'hidden',
				},
			}}
		/>
	)
}
