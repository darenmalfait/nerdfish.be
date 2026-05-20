'use client'

import type * as Clerk from '@clerk/nextjs'
import { isAuthEnabled } from './enabled'

function EmptyUserButton() {
	return null
}

export const UserButton = isAuthEnabled()
	? // eslint-disable-next-line @typescript-eslint/no-var-requires -- optional at build time
		(require('@clerk/nextjs') as typeof Clerk).UserButton
	: EmptyUserButton
