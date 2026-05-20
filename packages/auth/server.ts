import 'server-only'

import { isAuthEnabled } from './enabled'

const devUser = {
	id: 'dev-user',
	firstName: 'Dev',
	lastName: 'User',
	fullName: 'Dev User',
	imageUrl: '',
	primaryEmailAddress: { emailAddress: 'dev@local.test' },
} as const

export async function auth() {
	if (!isAuthEnabled()) {
		return { userId: devUser.id, redirectToSignIn: () => null }
	}

	const { auth: clerkAuth } = await import('@clerk/nextjs/server')
	return clerkAuth()
}

export async function currentUser() {
	if (!isAuthEnabled()) {
		return devUser
	}

	const { currentUser: clerkCurrentUser } = await import('@clerk/nextjs/server')
	return clerkCurrentUser()
}
